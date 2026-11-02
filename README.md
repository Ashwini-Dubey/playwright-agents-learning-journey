# Playwright Agents Learning Journey

A hands-on learning project exploring how AI agents can support the **Playwright test automation lifecycle** — from test planning and test generation to test execution, debugging and test healing.

The goal is to understand how to combine Playwright, GitHub Copilot custom agents and the Playwright MCP server to make browser-test development more structured, repeatable, reliable and maintainable.

This repository combines the fundamentals of Playwright agent-based automation with a practical implementation using the **EventHub application**, demonstrating how AI-assisted testing can be applied to real-world user journeys and business-critical workflows.

> **Project status:** Learning project / work in progress. The repository includes the initial Playwright agent setup, three custom agent definitions, a structured EventHub regression test plan and an implemented regression suite. Further experiments and test coverage will evolve as the learning journey progresses.

---

## Learning Objectives

- Understand how AI agents can assist with software testing.
- Explore agent-based test planning using real application user journeys.
- Generate Playwright tests from documented test scenarios.
- Diagnose failing tests and investigate their root causes using browser and test-runner tools.
- Review AI-generated tests for correctness, reliability, maintainability and meaningful assertions.
- Apply agent-assisted automation to real-world business workflows.
- Validate authentication, event management, booking and refund scenarios.
- Integrate Playwright execution and reporting into CI using GitHub Actions.
- Evaluate the effectiveness and limitations of AI-generated tests and fixes.

## Agent Architecture and Workflow

The repository explores three GitHub Copilot custom agents, each with a distinct responsibility in the Playwright automation lifecycle.

| Agent                         | Responsibility                                                                                            | Expected output                                 |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Playwright Test Planner**   | Explores an application, identifies user journeys and designs positive, negative and edge-case scenarios. | Structured Markdown test plan.                  |
| **Playwright Test Generator** | Uses test-plan scenarios, a seed file and browser interactions to generate Playwright tests.              | Playwright test files for selected scenarios.   |
| **Playwright Test Healer**    | Executes failing tests, investigates errors, examines browser state and applies focused corrections.      | Diagnosed and, where possible, corrected tests. |

### Typical End-to-End Workflow

1. **Plan:** Ask the planner agent to explore the target application and create a structured test plan.
2. **Review:** Validate the generated scenarios, steps, assumptions and expected results.
3. **Generate:** Provide the generator agent with the selected test-plan scenario and seed file.
4. **Execute:** Run the generated tests using Playwright.
5. **Debug and Heal:** If tests fail, use the healer agent to investigate the failure and validate a correction.
6. **Review Results:** Manually review generated or modified code and verify that the tests actually validate the intended requirements.

AI-generated tests and fixes should always be reviewed by a human before being treated as reliable automation.

---

## Practical Implementation: EventHub Application

The EventHub application serves as the practical implementation and demonstration environment for the agent-assisted testing workflow.

**Target application:** https://eventhub.rahulshettyacademy.com

The objective is to develop a regression-focused UI automation suite covering realistic user journeys and business-critical application behavior.

### Application Test Coverage

The regression strategy focuses on the following functional areas:

| Functional Area    | Coverage                                            |
| ------------------ | --------------------------------------------------- |
| Authentication     | User registration and login                         |
| Access Control     | Protected route validation                          |
| Event Management   | Event creation and validation                       |
| Event Discovery    | Event searching and availability                    |
| Sold-out Scenarios | Validation of unavailable events                    |
| Booking            | Event booking and related business rules            |
| Cancellation       | Booking cancellation workflows                      |
| Refunds            | Refund eligibility and business-rule validation     |
| End-to-End         | Complete user journeys across application workflows |

### Test Planning

The application test strategy is documented in `spec/test.plan.md`.

The test plan includes:

- Authentication scenarios.
- Event lifecycle validations.
- Event discovery and search scenarios.
- Booking workflows.
- Cancellation and refund paths.
- Negative and edge-case scenarios.
- End-to-end regression coverage.

### Automation Implementation

The EventHub regression suite was developed through an AI-assisted workflow:

1. Explore the EventHub application and understand its actual behavior.
2. Identify critical user journeys and business rules.
3. Prepare a structured regression-oriented test plan.
4. Generate Playwright tests based on observed application interactions.
5. Refine generated tests to use reliable locators and meaningful assertions.
6. Execute the regression suite in Chromium.
7. Review execution results and retain meaningful project artifacts.

### Execution Evidence

<badge color="success">Successful execution</badge>

The implemented EventHub regression suite was executed successfully in Chromium.

| Metric         |                    Result |
| -------------- | ------------------------: |
| Browser        |                  Chromium |
| Tests passed   |                         9 |
| Tests failed   |                         0 |
| Execution time | Approximately 6.6 seconds |

The suite demonstrates practical automation coverage across authentication, event management, bookings, refunds and end-to-end user journeys.

---

## Repository Structure

The repository is organized to support both the reusable Playwright agent-learning setup and the practical EventHub automation implementation.

```text
playwright-agents-learning-journey/
├── .github/
│   ├── agents/
│   │   ├── playwright-test-planner.agent.md
│   │   ├── playwright-test-generator.agent.md
│   │   └── playwright-test-healer.agent.md
│   └── workflows/
│       ├── copilot-setup-steps.yml
│       └── playwright.yml
├── .vscode/
├── specs/
│   └── README.md
├── spec/
│   └── test.plan.md
├── tests/
│   ├── example.spec.js
│   ├── seed.spec.ts
│   └── eventhub.regression.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

### Key Directories and Files

- `.github/agents/`: Custom agent instructions for planning, generating and healing Playwright tests.
- `.github/workflows/`: GitHub Actions workflows for Playwright execution and Copilot setup.
- `.vscode/`: VS Code project-specific configuration.
- `specs/`: Test plans and scenario specifications for agent-assisted test generation.
- `spec/`: EventHub application regression test strategy.
- `tests/`: Playwright test files and seed files used by the automation workflow.
- `playwright.config.js`: Playwright Test configuration, including browser projects, retries and reporting.
- `package.json`: Project dependencies and npm configuration.

---

## Technology Stack

| Technology                   | Purpose                                                      |
| ---------------------------- | ------------------------------------------------------------ |
| JavaScript / TypeScript      | Test automation programming languages                        |
| Playwright Test              | Browser automation and test execution                        |
| GitHub Copilot Custom Agents | AI-assisted planning, generation and healing                 |
| Playwright MCP Server        | Browser interaction and test-runner tools used by agents     |
| Visual Studio Code           | Development environment                                      |
| Chromium                     | Browser execution for the EventHub regression implementation |
| GitHub Actions               | CI execution and report artifacts                            |

The custom agent definitions specify the Playwright MCP server through:

```bash
npx playwright run-test-mcp-server
```

---

## Prerequisites

Install the following before running the project:

- Node.js (an active LTS release is recommended).
- npm.
- Git.
- Visual Studio Code.
- GitHub Copilot access with support for custom agents.
- A browser-accessible application to explore and test.
- Appropriate MCP server configuration for the agent workflows.

Agent availability and functionality may depend on the editor, Copilot access, supported custom-agent capabilities and MCP configuration.

---

## Project Initialization

The project was initially scaffolded using the official Playwright project initializer, followed by Playwright's agent setup command for the VS Code workflow.

### 1. Initialize a Playwright Project

```bash
npm init playwright@latest
```

The initializer guides you through the initial Playwright setup, including programming language, test directory, browser installation and optional GitHub Actions workflow configuration.

### 2. Initialize Playwright Agents for VS Code

```bash
npx playwright init-agents --loop=vscode
```

This command sets up the Playwright agent workflow for the VS Code loop.

The generated configuration provides a starting point for agent-assisted test planning, test generation and test healing.

Custom agent definitions are maintained under `.github/agents/`.

> These commands are used to bootstrap the learning project. When setting up an existing clone, follow the dependency installation and execution instructions below instead of initializing the project again.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Ashwini-Dubey/playwright-agents-learning-journey.git

cd playwright-agents-learning-journey
```

### 2. Install Dependencies

```bash
npm ci
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

For Linux CI environments:

```bash
npx playwright install --with-deps
```

### 4. Run the Complete Test Suite

```bash
npx playwright test
```

### 5. Run Tests in Specific Browser Projects

```bash
npx playwright test --project=chromium

npx playwright test --project=firefox

npx playwright test --project=webkit
```

### 6. Run the EventHub Regression Suite

```bash
npx playwright test tests/eventhub.regression.spec.ts --project=chromium
```

### 7. Run a Specific Test File

```bash
npx playwright test tests/example.spec.js
```

### 8. View the HTML Report

```bash
npx playwright show-report
```

---

## Using the Custom Agents

The custom agent definitions are maintained under `.github/agents/`.

Open the repository in a compatible editor with GitHub Copilot custom-agent support and select the relevant agent for the task.

### 1. Playwright Test Planner

Use this agent to create a test plan for a website or web application.

The planner is instructed to:

- Explore the application using browser tools.
- Identify key user journeys and interactive elements.
- Cover happy paths, negative scenarios and edge cases.
- Document steps, expected outcomes and starting-state assumptions.
- Save the test plan as a Markdown file.

### 2. Playwright Test Generator

Use this agent to convert a test-plan scenario into an automated Playwright test.

The generator is instructed to:

- Read the selected scenario and its verification criteria.
- Set up the browser page.
- Perform scenario steps using browser tools.
- Read the generator log and create a test file.
- Preserve scenario steps as comments.
- Follow observed Playwright best practices.

The generator expects the scenario details, target test file and seed file to be supplied as part of the task.

### 3. Playwright Test Healer

Use this agent when an existing Playwright test fails.

The healer is instructed to:

- Run tests and identify failures.
- Debug failing tests and inspect browser state.
- Investigate locator, timing, assertion, test-data and environment issues.
- Apply focused corrections and rerun tests.
- Explain the failure and changes made.

A test should never be skipped or marked as fixed merely to obtain a green execution result.

---

## Continuous Integration

The repository includes a GitHub Actions workflow:

`.github/workflows/playwright.yml`

The workflow is designed to:

1. Check out the repository.
2. Set up Node.js LTS.
3. Install dependencies using `npm ci`.
4. Install Playwright browsers and system dependencies.
5. Run the Playwright test suite.
6. Upload the HTML report as a workflow artifact.

**Branch configuration:** Configure the workflow branch filters according to the branches used by the repository (`main`, `master` and/or `dev`) so that pushes and pull requests trigger CI as intended.

---

## Learning Roadmap

The project will evolve incrementally around the following learning areas.

### AI Agents and MCP

- [ ] Understand GitHub Copilot custom agents and agent instructions.
- [ ] Understand Playwright MCP server architecture and capabilities.
- [ ] Explore the interaction between agents, browser tools and Playwright Test.
- [ ] Refine agent instructions and responsibilities.

### Test Planning and Generation

- [ ] Create and refine test plans from real application workflows.
- [ ] Generate tests from test-plan scenarios.
- [ ] Evaluate generated locators, assertions and test structure.
- [ ] Improve test data management and reusable utilities.

### Debugging and Healing

- [ ] Introduce deliberate test failures.
- [ ] Diagnose locator and timing-related failures.
- [ ] Investigate application and environment-related failures.
- [ ] Validate agent-generated corrections.
- [ ] Evaluate whether healing preserves the original test intent.

### EventHub Regression Automation

- [x] Prepare a structured regression test plan.
- [x] Implement an EventHub regression suite.
- [x] Cover authentication and event-related workflows.
- [x] Include booking, cancellation and refund scenarios.
- [x] Execute the regression suite successfully in Chromium (9 passed, 0 failed).
- [ ] Expand negative and edge-case coverage.
- [ ] Extend cross-browser execution.
- [ ] Improve reporting and execution evidence.

### CI/CD and Maintainability

- [ ] Extend browser coverage and CI reporting.
- [ ] Improve test isolation and test-data management.
- [ ] Integrate additional CI execution scenarios.
- [ ] Document limitations, lessons learned and practical examples.

---

## Important Principles

- Treat AI as an assistant, not a replacement for testing knowledge.
- Validate every generated test against the intended requirement.
- Prefer role-based and user-facing locators where appropriate.
- Use Playwright's auto-waiting and web-first assertions instead of arbitrary sleeps.
- Keep tests independent and data-aware.
- Investigate root causes rather than hiding failures.
- Never commit secrets, credentials or sensitive test data.
- Keep test plans and generated tests understandable and reviewable.
- Do not assume that a passing test automatically proves that the application is defect-free.
- Review AI-generated code and fixes before accepting them into the regression suite.

---

## Useful References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Documentation](https://playwright.dev/docs/test-intro)
- [Playwright Agents Documentation](https://playwright.dev/docs/test-agents)
- [Playwright MCP / Test MCP Server](https://playwright.dev/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## About This Repository

This repository is maintained as a practical learning journey to explore AI-assisted browser automation using Playwright, GitHub Copilot custom agents and MCP-based browser interactions.

It combines the conceptual understanding of agent-assisted testing with a practical EventHub regression automation implementation.

The project documents experiments, implementation decisions, generated tests, debugging exercises, execution evidence and lessons learned while exploring how AI agents can improve the software testing lifecycle.

**The ultimate objective is not just to generate Playwright tests using AI, but to understand, validate and build reliable automation with AI as an engineering assistant.**

---

**Project:** Playwright Agents Learning Journey  
**Practical Application:** EventHub  
**Automation Framework:** Playwright Test  
**Language:** JavaScript / TypeScript  
**AI Assistance:** GitHub Copilot Custom Agents  
**Browser Automation:** Playwright MCP  
**CI/CD:** GitHub Actions
