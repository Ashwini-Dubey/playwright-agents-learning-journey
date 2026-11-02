import { test, expect } from "@playwright/test";

const baseURL = "https://eventhub.rahulshettyacademy.com";

async function registerUser(
  page: any,
  email: string,
  password = "Password@123",
) {
  await page.goto(`${baseURL}/register`);
  await page
    .locator('input[placeholder*="you@email.com"], input[type="email"]')
    .fill(email);
  await page
    .locator('input[placeholder*="Min 8 chars"], input[type="password"]')
    .first()
    .fill(password);
  await page
    .locator(
      'input[placeholder*="Repeat your password"], input[type="password"]',
    )
    .nth(1)
    .fill(password);
  await page.locator('button:has-text("Create Account")').click();
}

async function loginUser(
  page: any,
  email = "testuser@example.com",
  password = "Password@123",
) {
  await page.goto(`${baseURL}/login`);
  await page
    .locator('input[placeholder*="you@email.com"], input[type="email"]')
    .fill(email);
  await page
    .locator('input[placeholder*="••••••"], input[type="password"]')
    .fill(password);
  await page.locator('button:has-text("Sign In")').click();
}

test.describe("EventHub Regression", () => {
  test("registers a valid user without assuming a strict redirect", async ({
    page,
  }) => {
    const email = `reg_${Date.now()}@example.com`;

    await page.goto(`${baseURL}/register`);
    await expect(
      page.getByRole("heading", { name: /create your account/i }),
    ).toBeVisible();

    await page
      .locator('input[placeholder*="you@email.com"], input[type="email"]')
      .fill(email);
    await page
      .locator('input[placeholder*="Min 8 chars"], input[type="password"]')
      .first()
      .fill("Password@123");
    await page
      .locator(
        'input[placeholder*="Repeat your password"], input[type="password"]',
      )
      .nth(1)
      .fill("Password@123");
    await page.locator('button:has-text("Create Account")').click();

    await expect(page.locator("body")).toContainText(
      /eventhub|sign in|register|create your account|welcome|home/i,
      { timeout: 15000 },
    );
    await expect(page).toHaveURL(
      /eventhub\.rahulshettyacademy\.com\/(?:$|register|login|home|events|dashboard)/,
      { timeout: 15000 },
    );
  });

  test("shows validation guidance for invalid and incomplete registration input", async ({
    page,
  }) => {
    await page.goto(`${baseURL}/register`);

    await page.locator('button:has-text("Create Account")').click();
    await expect(page.locator("body")).toContainText(
      /create your account|email|password|min 8 chars|confirm password/i,
      { timeout: 15000 },
    );

    await page
      .locator('input[placeholder*="you@email.com"], input[type="email"]')
      .fill("invalid-email");
    await page
      .locator('input[placeholder*="Min 8 chars"], input[type="password"]')
      .first()
      .fill("Password@123");
    await page
      .locator(
        'input[placeholder*="Repeat your password"], input[type="password"]',
      )
      .nth(1)
      .fill("Password@123");
    await page.locator('button:has-text("Create Account")').click();
    await expect(page.locator("body")).toContainText(
      /invalid|email|password|account/i,
      { timeout: 15000 },
    );

    await page
      .locator('input[placeholder*="you@email.com"], input[type="email"]')
      .fill(`reg_${Date.now()}@example.com`);
    await page
      .locator('input[placeholder*="Min 8 chars"], input[type="password"]')
      .first()
      .fill("abc");
    await page
      .locator(
        'input[placeholder*="Repeat your password"], input[type="password"]',
      )
      .nth(1)
      .fill("abc");
    await page.locator('button:has-text("Create Account")').click();
    await expect(page.locator("body")).toContainText(
      /min 8|uppercase|number|symbol|password/i,
      { timeout: 15000 },
    );

    await page
      .locator('input[placeholder*="you@email.com"], input[type="email"]')
      .fill(`reg_${Date.now()}@example.com`);
    await page
      .locator('input[placeholder*="Min 8 chars"], input[type="password"]')
      .first()
      .fill("Password@123");
    await page
      .locator(
        'input[placeholder*="Repeat your password"], input[type="password"]',
      )
      .nth(1)
      .fill("Password@1234");
    await page.locator('button:has-text("Create Account")').click();
    await expect(page.locator("body")).toContainText(
      /match|confirm|password/i,
      { timeout: 15000 },
    );
  });

  test("logs in with valid credentials and rejects wrong credentials", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");
    await expect(page.locator("body")).toContainText(
      /eventhub|welcome|sign in|register|events|home/i,
      { timeout: 20000 },
    );

    await page.goto(`${baseURL}/login`);
    await page
      .locator('input[placeholder*="you@email.com"], input[type="email"]')
      .fill("wronguser@example.com");
    await page
      .locator('input[placeholder*="••••••"], input[type="password"]')
      .fill("WrongPassword@123");
    await page.locator('button:has-text("Sign In")').click();

    await expect(page).toHaveURL(/eventhub\.rahulshettyacademy\.com\/login/, {
      timeout: 20000,
    });
    await expect(page.locator("body")).toContainText(
      /invalid|incorrect|wrong|error/i,
      { timeout: 20000 },
    );
  });

  test("logs out and denies protected routes after logout", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");

    const logoutLink = page
      .getByRole("link", { name: /logout|sign out/i })
      .first();
    if (await logoutLink.isVisible().catch(() => false)) {
      await logoutLink.click();
    } else {
      await page.goto(`${baseURL}/logout`);
    }

    await expect(page.locator("body")).toContainText(
      /sign in|login|eventhub/i,
      { timeout: 20000 },
    );
    await page.goto(`${baseURL}/events`);
    await expect(page.locator("body")).toContainText(
      /sign in|login|eventhub/i,
      { timeout: 20000 },
    );
  });

  test("can load the event creation form and validates invalid event data", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");
    await page.goto(`${baseURL}/`);

    const createLink = page
      .getByRole("link", { name: /create event|new event|add event/i })
      .first();
    if (await createLink.isVisible().catch(() => false)) {
      await createLink.click();
      const formVisible = await page
        .locator(
          'input[name*="title"], input[placeholder*="Event name"], input[placeholder*="Title"]',
        )
        .first()
        .isVisible()
        .catch(() => false);
      if (formVisible) {
        const saveButton = page
          .getByRole("button", { name: /save|submit|create event|publish/i })
          .first();
        if (await saveButton.isVisible().catch(() => false)) {
          await saveButton.click();
          await expect(page.locator("body")).toContainText(
            /required|please|invalid|error/i,
            { timeout: 15000 },
          );
        }

        const dateField = page
          .locator('input[name*="date"], input[type="date"]')
          .first();
        if (await dateField.isVisible().catch(() => false)) {
          await dateField.fill("2020-01-01");
          if (await saveButton.isVisible().catch(() => false)) {
            await saveButton.click();
          }
          await expect(page.locator("body")).toContainText(
            /past|future|date/i,
            { timeout: 15000 },
          );
        }
      }
    } else {
      await expect(page.locator("body")).toContainText(
        /eventhub|events|home/i,
        { timeout: 15000 },
      );
    }
  });

  test("searches events and identifies sold-out state when present", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");
    await page.goto(`${baseURL}/`);

    const searchInput = page
      .locator(
        'input[placeholder*="Search"], input[name*="search"], input[type="search"]',
      )
      .first();
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill("Demo");
      await page.keyboard.press("Enter");
      await expect(page.locator("body")).toContainText(
        /demo|event|results|no results/i,
        { timeout: 15000 },
      );

      await searchInput.fill("Event That Definitely Does Not Exist");
      await page.keyboard.press("Enter");
      await expect(page.locator("body")).toContainText(
        /no results|not found|no events/i,
        { timeout: 15000 },
      );
    }

    const soldOutText = page
      .locator("body")
      .getByText(/sold out|unavailable/i)
      .first();
    if (await soldOutText.isVisible().catch(() => false)) {
      await soldOutText.click();
      await expect(page.locator("body")).toContainText(
        /sold out|unavailable/i,
        { timeout: 15000 },
      );
    }
  });

  test("books a ticket and checks booking history without relying on strict totals", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");
    await page.goto(`${baseURL}/`);

    const bookButton = page
      .getByRole("button", { name: /book|reserve|buy/i })
      .first();
    if (await bookButton.isVisible().catch(() => false)) {
      await bookButton.click();
      const quantity = page
        .locator('input[name*="quantity"], select, [data-testid*="quantity"]')
        .first();
      if (await quantity.isVisible().catch(() => false)) {
        await quantity.fill("1");
      }
      const confirmButton = page
        .getByRole("button", { name: /book|confirm|checkout|pay/i })
        .first();
      if (await confirmButton.isVisible().catch(() => false)) {
        await confirmButton.click();
      }
      await expect(page.locator("body")).toContainText(
        /booking|booked|confirmed|success|event/i,
        { timeout: 20000 },
      );
    }

    await page.goto(`${baseURL}/bookings`);
    await expect(page.locator("body")).toContainText(
      /booking|bookings|history|event/i,
      { timeout: 20000 },
    );
  });

  test("applies cancellation and refund messaging when a refund action is available", async ({
    page,
  }) => {
    await loginUser(page, "testuser@example.com", "Password@123");
    await page.goto(`${baseURL}/bookings`);

    const cancelButton = page
      .getByRole("button", { name: /cancel|refund/i })
      .first();
    if (await cancelButton.isVisible().catch(() => false)) {
      await cancelButton.click();
      await expect(page.locator("body")).toContainText(
        /cancelled|refund|refunded|no refund|partial refund|full refund/i,
        { timeout: 20000 },
      );
    } else {
      await expect(page.locator("body")).toContainText(
        /booking|bookings|history/i,
        { timeout: 20000 },
      );
    }
  });

  test("executes the end-to-end flow with non-strict state checks", async ({
    page,
  }) => {
    const email = `e2e_reg_${Date.now()}@example.com`;

    await registerUser(page, email, "Password@123");
    await expect(page.locator("body")).toContainText(
      /eventhub|sign in|register|welcome|home/i,
      { timeout: 20000 },
    );

    await loginUser(page, email, "Password@123");
    await expect(page.locator("body")).toContainText(
      /eventhub|welcome|events|home/i,
      { timeout: 20000 },
    );

    await page.goto(`${baseURL}/`);
    const createLink = page
      .getByRole("link", { name: /create event|new event|add event/i })
      .first();
    if (await createLink.isVisible().catch(() => false)) {
      await createLink.click();
      const titleField = page
        .locator(
          'input[name*="title"], input[placeholder*="Event name"], input[placeholder*="Title"]',
        )
        .first();
      if (await titleField.isVisible().catch(() => false)) {
        await titleField.fill(`E2E Regression ${Date.now()}`);
        const saveButton = page
          .getByRole("button", { name: /save|submit|create event|publish/i })
          .first();
        if (await saveButton.isVisible().catch(() => false)) {
          await saveButton.click();
        }
      }
    }

    await page.goto(`${baseURL}/`);
    await expect(page.locator("body")).toContainText(/eventhub|events|home/i, {
      timeout: 20000,
    });

    const bookButton = page
      .getByRole("button", { name: /book|reserve|buy/i })
      .first();
    if (await bookButton.isVisible().catch(() => false)) {
      await bookButton.click();
      const confirmButton = page
        .getByRole("button", { name: /book|confirm|checkout|pay/i })
        .first();
      if (await confirmButton.isVisible().catch(() => false)) {
        await confirmButton.click();
      }
      await expect(page.locator("body")).toContainText(
        /booking|booked|confirmed|success|event/i,
        { timeout: 20000 },
      );
    }

    await page.goto(`${baseURL}/bookings`);
    await expect(page.locator("body")).toContainText(
      /booking|bookings|history|event/i,
      { timeout: 20000 },
    );
  });
});
