# EventHub Full Functional Test Plan

## Application Overview

Comprehensive EventHub test plan covering authentication, event creation, search, booking, cancellation, and refund scenarios including full, partial, and no-refund policies.

## Test Scenarios

### 1. Authentication & Access Control

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful registration with valid data

**File:** `tests/auth/registration-success.spec.ts`

**Steps:**
  1. Open https://eventhub.rahulshettyacademy.com/register in a fresh browser session.
    - expect: The registration page loads successfully.
    - expect: The email, password, confirm password, and Create Account controls are visible.
  2. Enter a valid unused email address, such as testuser+new@example.com.
    - expect: The email field accepts the value without an inline validation error.
  3. Enter a password meeting the app rules, such as Password@123.
    - expect: The password field accepts the value and the helper list indicates all rules are satisfied.
  4. Repeat the same password in the confirm password field.
    - expect: The confirm password field accepts the value without mismatch warnings.
  5. Click Create Account.
    - expect: The account is created successfully or the app transitions to the expected next step.
    - expect: No JavaScript console error is triggered during valid registration.

#### 1.2. Registration validation errors

**File:** `tests/auth/registration-validation.spec.ts`

**Steps:**
  1. Leave the email field empty and submit the form.
    - expect: Submission is blocked.
    - expect: A validation message is shown for the email field.
  2. Enter an invalid email format such as testuser or user@ and submit.
    - expect: The form rejects the malformed email and explains the issue.
  3. Enter a short password like Ab1! and submit.
    - expect: The password validation is triggered and the minimum-length rule is flagged.
  4. Enter a password without uppercase, number, or special character and submit.
    - expect: Each unmet rule is highlighted appropriately.
  5. Enter a different value in confirm password and submit.
    - expect: The mismatch validation message is shown and the form does not complete.

#### 1.3. Duplicate account rejection

**File:** `tests/auth/duplicate-registration.spec.ts`

**Steps:**
  1. Attempt registration with an email that is already in the system.
    - expect: The app blocks duplicate creation.
    - expect: A clear duplicate-account message is displayed.
  2. Retry with a unique email.
    - expect: The second attempt proceeds successfully.

#### 1.4. Successful login

**File:** `tests/auth/login-success.spec.ts`

**Steps:**
  1. Open https://eventhub.rahulshettyacademy.com/login.
    - expect: The login form loads correctly.
  2. Enter a valid email and password.
    - expect: The credentials are accepted by the form.
  3. Click Sign In.
    - expect: The user is authenticated and redirected to the main app experience.
    - expect: Important app screens or dashboard data are visible.

#### 1.5. Invalid login handling

**File:** `tests/auth/login-invalid.spec.ts`

**Steps:**
  1. Leave email and password empty and click Sign In.
    - expect: The form blocks submission and shows a validation error.
  2. Enter an invalid email format and submit.
    - expect: The app shows an email validation error or blocks the attempt.
  3. Enter a wrong password for a valid email and submit.
    - expect: The login fails with a clear error message.
    - expect: The user remains on the login page.

#### 1.6. Logout and protected route access

**File:** `tests/auth/logout.spec.ts`

**Steps:**
  1. Log in with valid credentials.
    - expect: The application loads for the authenticated user.
  2. Trigger logout from the app navigation.
    - expect: The session is cleared and the user is redirected to the login page.
  3. Attempt to open a protected route without logging in again.
    - expect: The app redirects the user back to login.
    - expect: No protected content is shown.

### 2. Event Management

**Seed:** `tests/seed.spec.ts`

#### 2.1. Create event with valid data

**File:** `tests/events/create-event-success.spec.ts`

**Steps:**
  1. Log in with a valid user.
    - expect: The user sees the main application dashboard or event list.
  2. Navigate to the event creation form.
    - expect: The event creation screen opens with all required fields visible.
  3. Enter a valid event name, future date, time, location, category, price, and capacity.
    - expect: The form accepts the values without inline validation errors.
  4. Submit the event.
    - expect: The event is created successfully.
    - expect: A success message is shown.
    - expect: The event appears in the available events list.

#### 2.2. Event form validation

**File:** `tests/events/create-event-validation.spec.ts`

**Steps:**
  1. Try to submit the event form with required fields empty.
    - expect: The form blocks submission and shows field-level validation messages.
  2. Set a past event date.
    - expect: The app rejects the date and explains that future dates are required.
  3. Set a negative or zero price.
    - expect: The app blocks the invalid price and prompts for a valid value.
  4. Set a zero or negative capacity.
    - expect: The app prevents creation until a valid positive capacity is entered.

#### 2.3. Search and filter events

**File:** `tests/events/search-events.spec.ts`

**Steps:**
  1. Open the events list page.
    - expect: The page loads with available events visible.
  2. Search for a known valid event title.
    - expect: Only the matching event is returned.
  3. Search for a non-existent event title.
    - expect: The app shows an empty-state or no-results message.
  4. Apply category and availability filters if available.
    - expect: The results match the filters and no unrelated events are shown.

#### 2.4. Event visibility and sold-out states

**File:** `tests/events/sold-out.spec.ts`

**Steps:**
  1. Open an event that has no remaining tickets.
    - expect: The app clearly indicates it is sold out or unavailable.
  2. Attempt to start a booking flow for that event.
    - expect: The user cannot proceed to booking and is shown the appropriate message.

#### 2.5. Edit existing event

**File:** `tests/events/edit-event.spec.ts`

**Steps:**
  1. Create a valid event or use a known editable event.
    - expect: The event is available for modification.
  2. Open the edit form and modify the date, price, or description.
    - expect: The values update without breaking the event card or details page.
  3. Save the changes.
    - expect: The edited details are persisted and visible in the event listing.

### 3. Booking Flow

**Seed:** `tests/seed.spec.ts`

#### 3.1. Book a single ticket for an available event

**File:** `tests/booking/book-single-ticket.spec.ts`

**Steps:**
  1. Log in with a valid user.
    - expect: The user is on the app home page or event listing.
  2. Open an event with available seats.
    - expect: The event details page opens with ticket price and availability details.
  3. Select 1 ticket and continue to checkout.
    - expect: The booking summary reflects the correct price and quantity.
  4. Confirm the booking.
    - expect: The booking is created successfully.
    - expect: A confirmation message is shown.
    - expect: The booking appears in the user’s bookings list.

#### 3.2. Book multiple tickets and validate totals

**File:** `tests/booking/book-multiple-tickets.spec.ts`

**Steps:**
  1. Open an event with enough capacity for multiple tickets.
    - expect: The event details page shows available seats and pricing.
  2. Select 2 or more tickets.
    - expect: The booking total is calculated correctly for the chosen quantity.
  3. Confirm the booking.
    - expect: The order is saved with the correct quantity and total.
    - expect: The booking details match the selected ticket count and amount.

#### 3.3. Booking blocked for sold-out events

**File:** `tests/booking/sold-out-booking.spec.ts`

**Steps:**
  1. Open a sold-out event.
    - expect: The app clearly marks the event as unavailable.
  2. Try to proceed with booking.
    - expect: The booking action is disabled or blocked.
    - expect: The user sees a sold-out message.

#### 3.4. Booking duplicate protection

**File:** `tests/booking/duplicate-booking.spec.ts`

**Steps:**
  1. Book one ticket for an event with available seats.
    - expect: The booking is successful.
  2. Attempt to book the same exact ticket again if the app allows repeated purchase checks.
    - expect: The system prevents duplicate or invalid booking states.
    - expect: The app shows an error or prevents action.

#### 3.5. Booking verification in account history

**File:** `tests/booking/booking-history.spec.ts`

**Steps:**
  1. Create one or more bookings.
    - expect: The bookings are stored and visible to the user.
  2. Open the booking history or account section.
    - expect: Each booking shows the event name, date, quantity, amount, and current status.

### 4. Cancellation & Refund Policy

**Seed:** `tests/seed.spec.ts`

#### 4.1. Full refund scenario

**File:** `tests/refunds/full-refund.spec.ts`

**Steps:**
  1. Create or identify an event configured with a full refund policy.
    - expect: The event is available for booking and its refund policy is clearly indicated.
  2. Book a ticket for that event.
    - expect: The booking is created successfully.
  3. Cancel the booking before the refund cutoff or per the stated policy.
    - expect: The cancellation succeeds.
    - expect: The refund amount equals the original total amount.
    - expect: The user sees a full refund confirmation.

#### 4.2. Partial refund scenario

**File:** `tests/refunds/partial-refund.spec.ts`

**Steps:**
  1. Create or identify an event configured with a partial refund policy.
    - expect: The event exposes the partial refund rule clearly in the UI or test data.
  2. Book a ticket for that event.
    - expect: The booking is created successfully.
  3. Cancel the booking under the policy conditions that generate a partial refund.
    - expect: The cancellation succeeds.
    - expect: The refund amount equals the policy-defined partial value (for example 50% or a calculated partial amount).
    - expect: The app displays the exact refund value.

#### 4.3. No refund scenario

**File:** `tests/refunds/no-refund.spec.ts`

**Steps:**
  1. Create or identify an event configured with a no-refund policy.
    - expect: The app communicates that no refunds are available for this event.
  2. Book a ticket for the event.
    - expect: The booking is successful.
  3. Cancel the event booking under the no-refund condition.
    - expect: The booking is cancelled or marked canceled.
    - expect: The refund amount is zero.
    - expect: A no-refund message is displayed.

#### 4.4. Cancellation after refund window expiry

**File:** `tests/refunds/refund-window-expired.spec.ts`

**Steps:**
  1. Book a ticket for an event with a time-based refund policy.
    - expect: The booking is created successfully.
  2. Attempt cancellation after the refund cutoff has expired.
    - expect: The app stops the cancellation or applies zero refund according to policy.
    - expect: The user sees the correct status and message.

#### 4.5. Cancellation of already-cancelled booking

**File:** `tests/refunds/already-cancelled.spec.ts`

**Steps:**
  1. Cancel a booking once.
    - expect: The cancellation is confirmed.
  2. Attempt to cancel the same booking again.
    - expect: The app prevents duplicate cancellation.
    - expect: The booking status remains consistent and no second refund is processed.

#### 4.6. Refund arithmetic validation

**File:** `tests/refunds/refund-arithmetic.spec.ts`

**Steps:**
  1. Book a known ticket quantity on a full, partial, and no-refund scenario.
    - expect: The system calculates refund values from the selected amount and policy correctly.
  2. Compare displayed refund values with expected totals.
    - expect: The values match exactly for all scenarios.

### 5. End-to-End App Journeys

**Seed:** `tests/seed.spec.ts`

#### 5.1. Register, login, create event, book, cancel, and validate refund

**File:** `tests/e2e/full-event-flow.spec.ts`

**Steps:**
  1. Open the registration page and create a new valid account.
    - expect: The account is created successfully.
  2. Sign in with the new user account.
    - expect: The user can access the main application.
  3. Create a new event with valid details and a known refund policy.
    - expect: The event is published and visible in the event list.
  4. Book one or more tickets for the created event.
    - expect: The booking confirms and appears in the user bookings history.
  5. Cancel the booking.
    - expect: The booking is canceled and the refund amount matches the configured policy.
  6. Check the booking history and refund status.
    - expect: The refund field and cancellation state are accurately displayed.
