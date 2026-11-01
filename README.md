# Playwright Agents Learning Journey

A hands-on learning repository exploring how AI agents can support the **Playwright test automation lifecycle** — from test planning and test generation to debugging and test healing.

The goal of this project is to understand how to combine Playwright, GitHub Copilot custom agents and the Playwright MCP server to make browser-test development more structured, repeatable and maintainable.

> **Project status:** Learning project / work in progress. The repository currently contains the initial Playwright setup, starter tests and three custom agent definitions. The agent workflows and test coverage will evolve as the project progresses.

## Learning objectives

- Understand how AI agents can assist with software testing.
- Explore agent-based test planning from a website's user journeys.
- Generate Playwright tests from documented test scenarios.
- Diagnose failing tests and investigate their root causes with browser and test-runner tools.
- Review AI-generated tests for correctness, reliability, maintainability and meaningful assertions.
- Integrate Playwright execution and reporting into CI using GitHub Actions.

## Agent workflow

The repository contains three GitHub Copilot custom agents, each with a distinct responsibility.

| Agent | Responsibility | Expected output |
|---|---|---|
| **Playwright Test Planner** | Explores an application, identifies user journeys, and designs positive, negative and edge-case scenarios. | A structured Markdown test plan. |
| **Playwright Test Generator** | Uses a test-plan scenario, a seed file and browser interactions to generate a Playwright test. | A Playwright test file for the selected scenario. |
| **Playwright Test Healer** | Runs failing tests, investigates errors, examines browser state and applies fixes before rerunning tests. | A diagnosed and, where possible, corrected test. |

### Typical end-to-end flow

1. **Plan:** Ask the planner agent to explore the target application and create a test plan.
2. **Review:** Review the generated scenarios, steps, assumptions and expected results.
3. **Generate:** Provide the generator agent with the relevant test-plan item and seed file.
4. **Execute:** Run the generated tests with Playwright.
5. **Heal:** If a test fails, use the healer agent to investigate the failure and validate a correction.
6. **Review the result:** Manually review the generated or modified code. A passing test does not by itself prove that the test is correct or that the application is defect-free.

AI-generated tests and fixes should always be reviewed by a human before being treated as reliable automation.

## Repository structure

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
├── tests/
│   ├── example.spec.js
│   └── seed.spec.ts
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

### Key directories and files

- `.github/agents/`: Custom agent instructions for planning, generating and healing Playwright tests.
- `.github/workflows/`: GitHub Actions workflows for Playwright test execution and Copilot setup.
- `specs/`: Test plans and scenario specifications used as input to the test-generation workflow.
- `tests/`: Playwright test files and seed files used by the test generator.
- `playwright.config.js`: Playwright Test configuration, including browser projects, retries and reporting.
- `package.json`: Project dependencies and npm configuration.

## Technology stack

- **JavaScript / TypeScript**
- **Playwright Test** — browser automation and test execution
- **GitHub Copilot custom agents** — agent instructions and workflows
- **Playwright MCP server** — browser interaction and test-runner tools used by the agents
- **GitHub Actions** — CI execution and report artifacts

The custom agent definitions currently specify the Playwright MCP server through `npx playwright run-test-mcp-server`.

## Prerequisites

Install the following before running the project:

- Node.js (an active LTS release is recommended)
- npm
- Git
- Visual Studio Code
- GitHub Copilot access with support for custom agents
- A browser-accessible application to explore and test

The agent workflows depend on the tools and capabilities configured in the custom agent files. Availability may depend on your editor, Copilot access and MCP setup.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/Ashwini-Dubey/playwright-agents-learning-journey.git
cd playwright-agents-learning-journey
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

Install all browsers configured in the Playwright project:

```bash
npx playwright install
```

On Linux CI environments, install the required operating-system dependencies as well:

```bash
npx playwright install --with-deps
```

### 4. Run the tests

Run the complete Playwright test suite:

```bash
npx playwright test
```

Run tests in a specific browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Run a specific test file:

```bash
npx playwright test tests/example.spec.js
```

### 5. View the HTML report

After a test run, open the Playwright HTML report:

```bash
npx playwright show-report
```

## Using the custom agents

The agent definitions are stored in `.github/agents/`. Open the repository in a compatible editor with GitHub Copilot custom-agent support, and select the relevant agent for the task.

### 1. Playwright Test Planner

Use this agent when you want to create a test plan for a website or web application.

The planner is instructed to:

- Explore the application using browser tools.
- Identify key user journeys and interactive elements.
- Cover happy paths, negative scenarios and edge cases.
- Document steps, expected outcomes and starting-state assumptions.
- Save the test plan as a Markdown file.

### 2. Playwright Test Generator

Use this agent when you want to convert a test-plan scenario into an automated Playwright test.

The generator is instructed to:

- Read the selected scenario and its verification criteria.
- Set up the browser page.
- Perform the scenario steps using browser tools.
- Read the generator log and create a test file.
- Preserve the scenario steps as comments and follow the observed Playwright best practices.

The generator expects the scenario details, target test file and seed file to be supplied as part of the task.

### 3. Playwright Test Healer

Use this agent when an existing Playwright test fails.

The healer is instructed to:

- Run the tests and identify failures.
- Debug failing tests and inspect browser state.
- Investigate locator, timing, assertion, data and environment issues.
- Apply a focused correction and rerun the test.
- Explain the failure and the changes made.

Review any suggested fix carefully. A test should not be skipped or marked as fixed merely to obtain a green run.

## Continuous Integration

The repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml`.

The current workflow:

1. Checks out the repository.
2. Sets up Node.js LTS.
3. Installs dependencies using `npm ci`.
4. Installs Playwright browsers and system dependencies.
5. Runs the Playwright test suite.
6. Uploads the HTML report as a workflow artifact.

**Branch configuration note:** The current workflow is configured for pushes and pull requests targeting `main` and `master`. If you want CI to run for the repository's `dev` branch, add `dev` to the branch filters in the workflow.

## Learning roadmap

The project will grow incrementally around these areas:

- [ ] Understand GitHub Copilot custom agents and agent instructions.
- [ ] Create and refine test plans from real application workflows.
- [ ] Generate tests from test-plan scenarios.
- [ ] Review generated locators, assertions and test structure.
- [ ] Diagnose and heal deliberately introduced test failures.
- [ ] Evaluate the reliability of AI-generated tests and fixes.
- [ ] Improve test data, isolation and reusable test utilities.
- [ ] Extend browser coverage and CI reporting.
- [ ] Document limitations, lessons learned and practical examples.

## Important principles

- Treat AI as an assistant, not a replacement for testing knowledge.
- Validate every generated test against the intended requirement.
- Prefer role-based and user-facing locators where appropriate.
- Use Playwright's auto-waiting and web-first assertions instead of arbitrary sleeps.
- Keep tests independent and data-aware.
- Investigate root causes rather than hiding failures.
- Never commit secrets, credentials or sensitive test data.
- Keep test plans and generated tests understandable and reviewable.

## Useful references

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright Test documentation](https://playwright.dev/docs/test-intro)
- [Playwright MCP / test MCP server](https://playwright.dev/)
- [GitHub Copilot documentation](https://docs.github.com/en/copilot)
- [GitHub Actions documentation](https://docs.github.com/en/actions)

## About this repository

This repository is maintained as a practical learning journey to explore AI-assisted browser automation with Playwright. It will document experiments, implementation decisions, generated tests, debugging exercises and lessons learned as the agent-based workflow develops.
