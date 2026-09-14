# SecureTask

SecureTask is a full-stack task management application built with Flask, PostgreSQL, SQLAlchemy, React, and JWT authentication.

The project is being developed with a security-first approach, including authentication, authorization, password hashing, security testing, SAST, secret scanning, dependency security assessment, code quality analysis, Dynamic Application Security Testing (DAST), and secure deployment.

---

# Live Demo

**Live Application:** https://secure-task-chi.vercel.app

SecureTask is deployed as a full-stack application using:

- Frontend: Vercel
- Backend: Render
- Database: Neon PostgreSQL

The live application can be accessed using the link above.

---

# Installation

## 1. Clone Repository

    git clone https://github.com/bhardwajparthirl/SecureTask.git
    cd SecureTask

---

# Backend Setup

Navigate to the backend:

    cd backend

## Create Virtual Environment

### Windows

    python -m venv venv
    venv\Scripts\activate

### Linux/macOS

    python3 -m venv venv
    source venv/bin/activate

## Install Dependencies

    pip install -r requirements.txt

---

# PostgreSQL Configuration

Create or configure your PostgreSQL database and provide the required credentials through environment variables.

Create a `.env` file inside the `backend` directory:

    DATABASE_URL=your_database_url
    JWT_SECRET_KEY=your_secret_key

Do not commit `.env` or any credentials/secrets to GitHub.

The application loads sensitive configuration through environment variables rather than hardcoding credentials in the source code.

---

# Frontend Setup

Open another terminal and navigate to the frontend:

    cd frontend

Install dependencies:

    npm install

Run the development server:

    npm run dev

---

# Run Backend

From the backend directory:

    python app.py

The Flask API will run on the configured backend port.

For production deployment, the Flask application is served using Gunicorn.

---

# Deployment

SecureTask is deployed using a separated frontend, backend, and database architecture.

## Deployment Architecture

    React Frontend
          |
          | HTTPS API Requests
          v
    Flask Backend
          |
          | PostgreSQL
          v
    Neon PostgreSQL

## Deployment Platforms

### Frontend

The React frontend is deployed on Vercel.

Live URL:

    https://secure-task-chi.vercel.app

### Backend

The Flask backend is deployed on Render using Gunicorn.

Backend URL:

    https://securetask-backend.onrender.com

### Database

The application uses managed PostgreSQL hosted on Neon.

Sensitive database credentials are provided through environment variables and are not stored in the Git repository.

## Production Configuration

The deployed application uses:

- Flask with `debug=False`
- Gunicorn as the production WSGI server
- Environment-based database configuration
- Environment-based JWT secret configuration
- HTTPS communication between frontend and backend
- Restricted CORS configuration
- Vercel SPA routing configuration
- Managed PostgreSQL database

The deployed application was tested end-to-end including registration, login, dashboard access, task creation, task retrieval, task update, task deletion, database persistence, and frontend route refresh.

---

# API Endpoints

## Authentication

### Register

    POST /register

Creates a new user account.

### Login

    POST /login

Authenticates the user and returns a JWT access token.

---

## Users

### Get Users

    GET /users

---

## Profile

### Get Current User

    GET /profile

Requires JWT authentication.

---

## Tasks

### Get Tasks

    GET /tasks

Supports task searching and category filtering.

### Create Task

    POST /tasks

Requires JWT authentication.

### Update Task

    PUT /tasks/<task_id>

Requires JWT authentication and verifies task ownership.

### Delete Task

    DELETE /tasks/<task_id>

Requires JWT authentication and verifies task ownership.

---

## Dashboard

### Get Dashboard Statistics

    GET /dashboard

Returns dynamically calculated task statistics for the authenticated user.

---

# Security

Security is a core part of SecureTask development.

The project follows a security-first approach with manual security testing, controlled vulnerability testing, static analysis, secret scanning, dependency vulnerability assessment, code-quality analysis, Dynamic Application Security Testing (DAST), and runtime verification.

## Security Tools

- Bandit
- Semgrep OSS
- Gitleaks
- OWASP Dependency-Check
- pip-audit
- Safety
- SonarQube Community Build
- OWASP ZAP
- bcrypt
- JWT Authentication

## Security Assessment

SecureTask underwent a structured security assessment following:

**Scan → Detection → Analysis → Remediation → Re-scan → Verification → Outcome**

The assessment covered:

- SQL Injection testing
- Cross-Site Scripting (XSS)
- Authentication bypass
- IDOR / authorization
- Password hashing
- Hardcoded secret detection
- CORS security
- Dependency vulnerabilities
- Static code analysis
- Secret scanning
- Dynamic application security testing with OWASP ZAP
- Input validation and error handling
- Runtime security verification

## Security Results

- Bandit: 0 findings after remediation
- Semgrep OSS: 0 findings
- Gitleaks: 0 leaks
- OWASP Dependency-Check: 0 vulnerabilities after remediation
- pip-audit: 0 vulnerabilities in application dependencies
- Safety: 0 vulnerabilities in application dependencies
- SonarQube: 0 security vulnerabilities after remediation
- OWASP ZAP: DAST findings reviewed and application-specific issues remediated

During the security assessment, controlled vulnerabilities were intentionally introduced in a test environment to verify that security tools could detect them. The vulnerable configurations were removed and remediated before the final application state.

The assessment also identified a dependency vulnerability in the transitive `nanoid` package. The affected version was upgraded from `3.3.17` to `3.3.18`, after which OWASP Dependency-Check reported zero vulnerable dependencies.

OWASP ZAP identified multiple alerts during Dynamic Application Security Testing. Relevant findings were manually analyzed and triaged. An application-specific password input-handling issue was identified where excessively long passwords could cause a bcrypt exception. Explicit 72-byte password validation was added to prevent the server-side error and return a controlled HTTP 400 response.

## Security Documentation

Detailed security testing results and vulnerability analysis are available in:

- [Security Test Results](docs/security/test-results.md)
- [Security Vulnerability Report](docs/security/vulnerability-report.md)

Security evidence and screenshots are maintained in:

    docs/security/evidence/

---

# Project Roadmap

## Week 1 - Foundation and Authentication

- [x] Environment Setup
- [x] Flask Project
- [x] PostgreSQL
- [x] SQLAlchemy
- [x] Git Setup
- [x] User Registration
- [x] User Login
- [x] bcrypt Password Hashing
- [x] JWT Authentication
- [x] Protected Backend Routes

---

## Week 2 - Full-Stack Task Management

- [x] Task CRUD APIs
- [x] React Frontend
- [x] Dashboard
- [x] Dynamic Task Statistics
- [x] Search
- [x] Category Filtering
- [x] User Profile
- [x] Axios Integration
- [x] Protected React Routes
- [x] JWT Request Interceptor
- [x] JWT 401 Handling
- [x] Toast Notification System
- [x] Responsive UI

---

## Week 3 - Security Testing

### Manual Security Testing

- [x] SQL Injection Testing
- [x] Cross-Site Scripting (XSS) Testing
- [x] Hardcoded Secret Testing
- [x] Password Hashing Verification
- [x] Authentication Bypass Testing
- [x] IDOR / Authorization Testing
- [x] Verbose Error Handling Testing
- [x] Directory Traversal Assessment
- [x] Insecure File Upload Assessment

### Week 3 Results

- SQL Injection: PASS
- XSS: PASS
- Hardcoded Secrets: PASS
- Password Hashing: PASS
- Authentication Bypass: PASS
- IDOR / Authorization: PASS
- Verbose Error Handling: PASS
- Directory Traversal: Not Applicable
- Insecure File Upload: Not Applicable

Directory traversal and insecure file upload were marked Not Applicable because the current application does not provide user-controlled filesystem paths or file-upload functionality.

---

## Week 4 - Static Application Security Testing

### Security Tools

- [x] Bandit
- [x] Semgrep OSS
- [x] Gitleaks
- [x] Static Application Security Testing
- [x] Security Findings Documentation

### Bandit

Bandit was used to perform static security analysis of the Python backend.

The initial scan identified:

- B105 - Hardcoded Password String
- B201 - Flask Debug Mode Enabled

Both findings were remediated.

The JWT secret was moved from application source code to environment-based configuration.

Flask debug mode was changed from:

    debug=True

to:

    debug=False

A subsequent Bandit scan returned:

    High: 0
    Medium: 0
    Low: 0

### Semgrep

Semgrep OSS was used for additional static security analysis.

Results:

    Rules executed: 459
    Targets scanned: 46
    Findings: 0
    Blocking findings: 0

The scan used the Semgrep OSS rules available without authentication. Additional Semgrep Code and Supply Chain rules were not included.

### Gitleaks

Gitleaks was used to scan the Git repository for accidentally committed secrets.

Results:

    Commits scanned: 17
    Repository data scanned: approximately 317.45 KB
    Leaks found: 0

The scan included Git history, helping verify that secrets were not present in previous commits.

### Week 4 Final Results

| Security Tool | Result |
|---|---|
| Bandit | 0 findings after remediation |
| Semgrep OSS | 0 findings |
| Gitleaks | 0 leaks |

Week 4 SAST and secret scanning: COMPLETE

---

## Week 5 - Dependency Security and Code Quality

### Security Tools

- [x] OWASP Dependency-Check
- [x] pip-audit
- [x] Safety
- [x] SonarQube Community Build
- [x] Dependency Vulnerability Analysis
- [x] Static Code Quality Analysis
- [x] Security Findings Documentation

### OWASP Dependency-Check

OWASP Dependency-Check was used to analyze project dependencies for known vulnerabilities.

The initial assessment identified a Medium-severity vulnerability in the transitive `nanoid` dependency.

The affected version:

    nanoid 3.3.17

was upgraded to:

    nanoid 3.3.18

The final Dependency-Check assessment reported:

    Vulnerable dependencies: 0
    Vulnerabilities: 0
    Suppressed vulnerabilities: 0

Status:

    PASS

### pip-audit

pip-audit was used to audit the application's Python dependencies.

Application dependency scan:

    pip-audit -r backend/requirements.txt

Result:

    No known vulnerabilities found

Status:

    PASS

An additional vulnerability was identified when auditing the complete development virtual environment. The affected package was `nltk 3.10.3`, which is associated with security-scanning tooling and is not part of SecureTask's declared application requirements.

This finding does not represent a known vulnerability in SecureTask's declared application dependencies.

### Safety

Safety was used to assess the Python dependencies and development environment.

Application dependency result:

    0 vulnerabilities reported
    0 vulnerabilities ignored
    No known security vulnerabilities reported

Status:

    PASS for application dependencies

A separate scan of the complete development environment identified one policy-ignored vulnerability associated with development/tooling dependencies. It was not a declared SecureTask runtime dependency.

### SonarQube

SonarQube Community Build was used for additional static code quality and security analysis of the backend and frontend.

The initial analysis identified two security-related findings:

- CSRF protection finding: reviewed and classified as a false positive because SecureTask uses JWT authentication through the `Authorization: Bearer` header rather than cookie-based authentication.
- Permissive CORS policy: confirmed as a valid security finding and remediated by restricting allowed origins.

CORS was changed from a permissive configuration to an explicit allowlist containing the production frontend and local development origins.

Trusted-origin validation confirmed that the production frontend receives the appropriate CORS header, while an untrusted origin does not receive `Access-Control-Allow-Origin`.

Final SonarQube results:

    Security Vulnerabilities: 0
    Critical Vulnerabilities: 0
    Major Vulnerabilities: 0
    New Issues: 0
    Quality Gate: Passed

SonarQube is used as an additional security and code-quality layer alongside manual security testing, Bandit, Semgrep, Gitleaks, and dependency scanning.

### Week 5 Final Results

| Security Tool | Result |
|---|---|
| OWASP Dependency-Check | 0 vulnerabilities after remediation |
| pip-audit | 0 vulnerabilities in application dependencies |
| Safety | 0 vulnerabilities in application dependencies |
| SonarQube | 0 security vulnerabilities after remediation |

Week 5 dependency security and code quality assessment: COMPLETE

---

# Week 6/7 - Dynamic Security Testing and Vulnerability Remediation

### OWASP ZAP

OWASP ZAP was used to perform Dynamic Application Security Testing (DAST) against the locally running SecureTask application.

The assessment covered:

- SecureTask frontend
- SecureTask backend API
- Authentication-related requests
- Authenticated API traffic
- Input handling
- HTTP security headers
- Session-related responses
- Cross-domain behavior

The local testing environment used:

    Frontend: http://localhost:5173
    Backend: http://127.0.0.1:5000

### ZAP Initial Scan

The Active Scan generated:

    Requests: 3,465
    Alert instances: 86
    Distinct alert types: 19

The 86 alert instances represent individual alert occurrences, while 19 represents the distinct alert categories identified.

All relevant alerts were reviewed and triaged rather than treating every scanner-generated alert as a confirmed vulnerability.

### ZAP Vulnerability Analysis

The most significant application-specific issue identified during the assessment involved excessively long password input.

An oversized password caused bcrypt to raise an exception, resulting in an HTTP 500 response.

The root cause was missing input validation before bcrypt processing.

### Remediation

Explicit password byte-length validation was added to the registration and login flows.

Passwords exceeding 72 bytes are now rejected with a controlled HTTP 400 response.

The remediation prevents oversized password input from reaching bcrypt and eliminates the server-side exception.

### Verification

The oversized-password test was repeated after remediation.

The application returned:

    400 Bad Request

with controlled validation behavior rather than exposing a server traceback.

### Additional ZAP Findings

ZAP also identified and documented several other observations, including:

- Server version information
- X-Content-Type-Options header observations
- CSP Header Not Set
- Cross-Domain Misconfiguration
- Information Disclosure involving browser localStorage
- Information Disclosure involving sensitive information in a local development URL
- Session Management Response Identified
- Additional informational and systemic observations

These findings were manually reviewed and categorized according to their actual applicability.

Some observations were informational, development-environment related, systemic, or associated with third-party resources rather than confirmed SecureTask backend vulnerabilities.

### Week 6/7 Final Results

| Security Area | Result |
|---|---|
| OWASP ZAP DAST | Findings reviewed and triaged |
| Password-Length Handling | Remediated and verified |
| Format String Error | Analyzed and addressed through input validation |
| CSP Header Observation | Reviewed |
| Cross-Domain Observation | Reviewed |
| Informational Findings | Reviewed and documented |

Week 6/7 Dynamic Security Testing and Vulnerability Remediation: COMPLETE

---

# Security Documentation

Security testing results and vulnerability assessments are documented in:

    docs/security/test-results.md
    docs/security/vulnerability-report.md

Security evidence and screenshots are maintained in:

    docs/security/evidence/

These documents contain detailed security testing evidence, findings, remediation steps, and assessment results.

---

# Technology Stack

## Backend

- Python
- Flask
- Gunicorn
- SQLAlchemy
- PostgreSQL
- Flask-JWT-Extended
- bcrypt

## Frontend

- React
- Axios
- Tailwind CSS
- Vite

## Database

- PostgreSQL
- Neon

## Deployment

- Vercel
- Render
- Neon PostgreSQL

## Security

- Bandit
- Semgrep OSS
- Gitleaks
- OWASP Dependency-Check
- pip-audit
- Safety
- SonarQube Community Build
- OWASP ZAP
- bcrypt
- JWT Authentication

---

# Project Structure

    SecureTask/
    |
    ├── backend/
    │   ├── models/
    │   ├── routes/
    │   ├── services/
    │   ├── utils/
    │   ├── app.py
    │   ├── config.py
    │   ├── database.py
    │   ├── requirements.txt
    │   └── .env
    |
    ├── frontend/
    │   ├── src/
    │   ├── vercel.json
    │   └── .env
    |
    ├── docs/
    │   └── security/
    │       ├── evidence/
    │       ├── test-results.md
    │       └── vulnerability-report.md
    |
    ├── .gitignore
    └── README.md

Note: `.env` files are local environment configuration files and are excluded from Git tracking.

---

# Current Progress

| Week | Focus | Status |
|---|---|---|
| Week 1 | Foundation and Authentication | Complete |
| Week 2 | Full-Stack Task Management | Complete |
| Week 3 | Manual Security Testing | Complete |
| Week 4 | SAST and Secret Scanning | Complete |
| Week 5 | Dependency Security and Code Quality | Complete |
| Week 6/7 | Dynamic Security Testing, Vulnerability Research and Remediation | Complete |
| Deployment | Vercel + Render + Neon | Complete |

---

# Author

**Parthak Bhardwaj**

B.Tech Computer Science - Artificial Intelligence

Backend Developer | Full-Stack Developer