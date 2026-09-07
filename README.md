# SecureTask

SecureTask is a full-stack task management application built with Flask, PostgreSQL, SQLAlchemy, React, and JWT authentication.

The project is being developed with a security-first approach, including authentication, authorization, password hashing, security testing, SAST, secret scanning, dependency security assessment, and secure deployment.

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
    npm install
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
       Render
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

The project includes manual security testing, automated static security analysis, secret scanning, dependency security assessment, and deployment security verification.

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

    Rules executed: 290
    Targets scanned: 12
    Findings: 0
    Blocking findings: 0

The scan used the Semgrep OSS rules available without authentication. Additional Semgrep Code and Supply Chain rules were not included.

### Gitleaks

Gitleaks was used to scan the Git repository for accidentally committed secrets.

Results:

    Commits scanned: 9
    Repository data scanned: approximately 279.90 KB
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

## Week 5 - Dependency Security

### Security Tools

- [x] OWASP Dependency-Check
- [x] pip-audit
- [x] Safety
- [x] Dependency Vulnerability Analysis
- [x] Security Findings Documentation

### OWASP Dependency-Check

OWASP Dependency-Check was used to analyze project dependencies for known vulnerabilities.

Results:

    CVE Count: 0
    Highest Severity: 0

Status:

    PASS

### pip-audit

pip-audit 2.10.1 was used to audit the application's Python dependencies.

Application dependency scan:

    pip-audit -r backend/requirements.txt

Result:

    No known vulnerabilities found

Status:

    PASS

An additional vulnerability was identified when auditing the complete development virtual environment. The affected package was `nltk 3.10.3`, which is installed as a dependency of the Safety security-scanning tool and is not part of SecureTask's application requirements.

This finding does not represent a known vulnerability in SecureTask's declared application dependencies.

### Safety

Safety 3.8.1 was used to scan the Python dependencies and development environment.

Results:

    requirements.txt: No issues found
    venv/pyvenv.cfg: No issues found

The complete environment contained one policy-ignored vulnerability. No scan-failing vulnerabilities were reported.

Status:

    PASS for application dependencies

### Week 5 Final Results

| Security Tool | Result |
|---|---|
| OWASP Dependency-Check | 0 CVEs |
| pip-audit | 0 vulnerabilities in application dependencies |
| Safety | 0 issues in application dependencies |

Week 5 dependency security assessment: COMPLETE

---

# Security Documentation

Security testing results and vulnerability assessments are documented in:

    docs/security/test-results.md
    docs/security/vulnerability-report.md

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
- Semgrep
- Gitleaks
- OWASP Dependency-Check
- pip-audit
- Safety
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
| Week 5 | Dependency Security | Complete |
| Deployment | Vercel + Render + Neon | Complete |

---

# Author

**Parthak Bhardwaj**

B.Tech Computer Science - Artificial Intelligence

Backend Developer | Full-Stack Developer | Python