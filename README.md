# PetStore API Automation Framework

A scalable and maintainable API automation framework built using **TypeScript** and **Playwright** for testing the Swagger PetStore REST APIs.

This project demonstrates production-oriented automation practices including layered architecture, reusable components, centralized assertions, structured logging, reporting, environment-based configuration, GitHub Actions CI, and Docker support.

---

# Assignment Coverage

The following assignment requirements have been implemented:

- Automated PET APIs using **POST, GET, PUT and DELETE**
- Status code validations (2xx and 4xx)
- POST response verified against subsequent GET response
- Assertions for response payload validation
- Solution maintained in GitHub

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| TypeScript | Programming Language |
| Playwright | API Automation |
| Node.js | Runtime |
| Winston | Logging |
| Allure | Reporting |
| GitHub Actions | Continuous Integration |
| Docker | Containerized Execution |

---

# Framework Features

- Layered Architecture
- Environment-based Configuration
- Reusable API Client
- Builder Pattern for Test Data
- Service Layer Abstraction
- Centralized Assertions
- Structured Logging
- HTML Report
- Allure Integration
- API Performance Report (CSV)
- Parallel Test Execution
- Retry Support
- GitHub Actions CI
- Docker Support
- Easily Extensible Framework

---

# Project Structure

```text
src
│
├── api
│
├── assertions
│
├── builders
│
├── config
│
├── fixtures
│
├── logger
│
├── models
│
├── services
│
├── tests
│
├── utils
│
└── validators
```

---

# Framework Architecture

```text
Test Specification
        │
        ▼
Playwright Fixture
        │
        ▼
Service Layer
        │
        ▼
API Client
        │
        ▼
Swagger PetStore API
```

The framework follows separation of concerns, making it easy to maintain, extend, and reuse.

---

# Supported API Operations

| API | Method |
|------|--------|
| Create Pet | POST |
| Get Pet | GET |
| Update Pet | PUT |
| Delete Pet | DELETE |
| Find Pet by Status | GET |

---

# Validations Implemented

- HTTP Status Code Validation
- Response Payload Validation
- POST vs GET Data Verification
- Negative Test Validation
- Response Time Capture

---

# Reports

The framework generates the following reports after execution:

- Playwright HTML Report
- Allure Report
- Execution Log
- API Performance CSV Report

---

# Parallel Execution

The framework supports Playwright parallel execution for faster test execution.

---

# Retry Support

Retry can be configured globally or at the test suite level using Playwright configuration.

---

# Environment Configuration

Environment-specific execution is supported through configuration files.

```
.env.dev
.env.stage
.env.ci
```

---

# Execute Tests

Install dependencies

```bash
npm install
```

Run against Development

```bash
npm run test:dev
```

Run against Stage

```bash
npm run test:stage
```

Run against CI

```bash
npm run test:ci
```

---

# HTML Report

```bash
npm run report
```

---

# GitHub Actions

The project includes a GitHub Actions workflow for Continuous Integration.

The workflow supports:

- Repository Checkout
- Dependency Installation
- Playwright Execution
- HTML Report Generation
- Execution Log Upload

The workflow can be triggered:

- On every push
- On pull requests
- Manually using **workflow_dispatch**

---

# Design Principles

The framework has been designed around the following principles:

- Maintainability
- Reusability
- Scalability
- Separation of Concerns
- Configurability
- Readability

---

## Future Enhancements

- Docker-based execution in CI/CD pipeline
- JSON Schema Validation
- API Contract Testing
- Microsoft Teams Notifications
- SonarQube Integration

---

# Author

**Naresh Kumar Paliwal**