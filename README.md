# 🔐 SecureTask

> A secure full-stack task management application built with **Flask**, **PostgreSQL**, **React**, **JWT Authentication**, and **DevSecOps Security Tools**.

SecureTask is being developed as part of my **Ericsson DevSecOps Internship**. The project focuses on building a secure task management application while following modern backend development, authentication, secure coding, and DevSecOps best practices.

---

## 🚀 Current Status

**Version:** v1.0.0

**Progress:** ✅ Week 1 Completed

---

## ✨ Features Implemented

### 🔑 Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes

### 🗄 Database
- PostgreSQL Integration
- SQLAlchemy ORM
- User Model

### 🏗 Backend
- Flask REST APIs
- Blueprints (Modular Routing)
- Database Sessions
- CORS Configuration

---

# 🛠 Tech Stack

## Backend
- Python
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS

## Database
- PostgreSQL
- psycopg2

## Security
- bcrypt
- JWT Authentication

## Frontend (Coming in Week 2)
- React
- Tailwind CSS
- Axios
- React Router

## Tools
- Git
- GitHub
- Postman

---

# 📂 Project Structure

```text
SecureTask/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   │
│   ├── models/
│   │     └── user.py
│   │
│   └── routes/
│         ├── auth_routes.py
│         └── user_routes.py
│
├── frontend/
│   └── (Coming Soon)
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/bhardwajparthirl/SecureTask.git
```

## Navigate

```bash
cd SecureTask/backend
```

## Create Virtual Environment

```bash
python -m venv venv
```

## Activate Environment

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Configure PostgreSQL

Update your PostgreSQL credentials inside your configuration file.

## Run Flask

```bash
python app.py
```

---

# 📡 Current API Endpoints

## Authentication

### Register

```
POST /register
```

### Login

```
POST /login
```

Returns JWT Access Token.

---

## Users

### Get Users

```
GET /users
```

---

## Protected Route

```
GET /profile
```

Requires JWT Authentication.

---

# 🔐 Authentication Flow

```
User Login
      │
      ▼
Email + Password
      │
      ▼
bcrypt Password Verification
      │
      ▼
Generate JWT
      │
      ▼
Return Access Token
      │
      ▼
Client Stores Token
      │
      ▼
Authorization Header
      │
      ▼
Protected Routes
```

---

# 📚 Concepts Implemented

- Flask REST APIs
- SQLAlchemy ORM
- PostgreSQL Integration
- Flask Blueprints
- Password Hashing (bcrypt)
- JWT Authentication
- HTTP Status Codes
- Authentication & Authorization
- Database Sessions

---

# 🗺 Project Roadmap

## ✅ Week 1
- Environment Setup
- Flask Project
- PostgreSQL
- SQLAlchemy
- Git Setup
- User Registration
- User Login
- bcrypt
- JWT Authentication
- Protected Routes

---

## 🚀 Week 2
- Task CRUD APIs
- React Frontend
- Dashboard
- Search
- Categories
- User Profile
- Axios Integration
- Protected React Routes
- API Documentation

---

## 🔒 Week 3
- Introduce Security Vulnerabilities
  - SQL Injection
  - XSS
  - Hardcoded Secrets
  - Weak Hashing
  - Authentication Bypass
  - Directory Traversal
  - Insecure File Upload
  - Verbose Error Messages

---

## 🛡 Week 4
- Bandit
- Semgrep
- Gitleaks
- Static Application Security Testing (SAST)

---

## 📦 Week 5
- pip-audit
- Safety
- OWASP Dependency Check
- CVE Analysis
- Dependency Updates

---

## 🌐 Week 6
- OWASP ZAP
- Passive Scan
- Active Scan
- Session Testing
- Authentication Testing
- Security Headers

---

## 🔧 Week 7
- Vulnerability Remediation
- Secure Coding
- Input Validation
- Secure File Uploads
- Security Headers
- Logging Improvements
- Re-scan & Validation

---

## 📄 Week 8
- Final Documentation
- Vulnerability Matrix
- Installation Guide
- Screenshots
- Final Presentation

---

# 🎯 Future Enhancements

- Email Verification
- Password Reset
- Refresh Tokens
- Docker Support
- CI/CD Pipeline
- Deployment
- Role-Based Authorization

---

# 👨‍💻 Author

**Parthak Bhardwaj**

B.Tech Computer Science (Artificial Intelligence)

Backend Developer | MERN Stack | Python

---

# ⭐ Project Status

🚧 **Currently in Active Development**

Completed: **Week 1**

Next Milestone: **Task Management + React Frontend (Week 2)**