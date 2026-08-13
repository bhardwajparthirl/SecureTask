# 🔐 SecureTask

> A secure full-stack task management application built with **Flask, PostgreSQL, React, JWT Authentication, and DevSecOps practices**.

SecureTask is being developed as part of my **Ericsson DevSecOps Internship**. The project focuses on building a secure task management platform while applying modern backend development, authentication, secure coding, and DevSecOps practices.

---

## 🚀 Current Status

**Version:** v1.0.0

**Progress:** ✅ Week 1 & Week 2 Completed

SecureTask currently includes a complete authentication system, protected frontend routes, task management, dashboard analytics, user profile management, and a premium responsive React interface.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Backend Routes
- Protected React Routes
- Persistent Login
- Automatic JWT attachment to API requests
- `401 Unauthorized` handling
- Session expiration handling
- Logout functionality

---

## 📋 Task Management

- Create Tasks
- View Tasks
- Edit Tasks
- Delete Tasks
- Delete Confirmation Modal
- Task Status Management
- Task Categories
- Search Tasks
- Filter Tasks by Category
- Loading States
- Success/Error Notifications

### Supported Task Statuses

- Pending
- In Progress
- Completed

---

## 📊 Dashboard

The dashboard dynamically displays:

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Completion Percentage
- Task Distribution

All statistics are retrieved dynamically from the backend.

---

## 👤 User Profile

- Authenticated user information
- Username
- Email
- User ID
- Protected `/profile` endpoint

---

## 🎨 Frontend UI/UX

- Premium dark theme
- Responsive layout
- Sidebar navigation
- Hover animations
- Interactive task cards
- Edit modal
- Delete confirmation modal
- Loading indicators
- Global toast notifications
- Responsive forms
- Modern gradients and visual effects

---

# 🛠 Tech Stack

## Backend

- Python
- Flask
- SQLAlchemy
- Flask-JWT-Extended
- Flask-CORS
- bcrypt

## Database

- PostgreSQL
- psycopg2

## Frontend

- React
- React Router
- Tailwind CSS
- Axios
- Vite

## Authentication & Security

- JWT Authentication
- bcrypt Password Hashing
- Protected API Routes
- Protected React Routes
- Axios Request Interceptors
- Axios Response Interceptors
- JWT `401` Handling
- Environment Variables

## Development Tools

- Git
- GitHub
- Postman
- VS Code

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
│   │   └── user.py
│   │
│   └── routes/
│       ├── auth_routes.py
│       └── user_routes.py
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   │
│   └── src/
│       ├── api/
│       │   └── axios.js
│       │
│       ├── components/
│       │   ├── CreateTask.jsx
│       │   ├── EditTask.jsx
│       │   ├── Layout.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── Sidebar.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx
│       │   └── ToastContext.jsx
│       │
│       └── pages/
│           ├── Dashboard.jsx
│           ├── Login.jsx
│           ├── Profile.jsx
│           ├── Register.jsx
│           └── Tasks.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/bhardwajparthirl/SecureTask.git
cd SecureTask
```

---

# 🐍 Backend Setup

Navigate to the backend:

```bash
cd backend
```

## Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

# 🗄️ PostgreSQL Configuration

Create/configure your PostgreSQL database and provide the required database credentials through your environment/configuration setup.

Do **not** commit credentials or secrets to GitHub.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET_KEY=your_secret_key
```

---

# ⚛️ Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
npm install
npm run dev
```

---

# ▶️ Run Backend

From the backend directory:

```bash
python app.py
```

The Flask API will run on the configured backend port.

---

# 📡 API Endpoints

## Authentication

### Register

```http
POST /register
```

Creates a new user account.

### Login

```http
POST /login
```

Authenticates the user and returns a JWT access token.

---

## Users

### Get Users

```http
GET /users
```

---

## Profile

### Get Current User

```http
GET /profile
```

Requires JWT authentication.

---

## Tasks

### Get Tasks

```http
GET /tasks
```

Supports task searching and category filtering.

### Create Task

```http
POST /tasks
```

### Update Task

```http
PUT /tasks/<task_id>
```

### Delete Task

```http
DELETE /tasks/<task_id>
```

All protected task endpoints require JWT authentication.

---

## Dashboard

### Get Dashboard Statistics

```http
GET /dashboard
```

Returns dynamically calculated task statistics for the authenticated user.

---

# 🔐 Authentication Flow

```text
User
 │
 ▼
Login / Register
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
React AuthContext
 │
 ▼
Store JWT
 │
 ▼
Axios Request Interceptor
 │
 ▼
Authorization: Bearer <JWT>
 │
 ▼
Protected Flask Routes
 │
 ▼
Authenticated Response
```

### Expired Token Flow

```text
API Request
    │
    ▼
JWT Attached
    │
    ▼
Backend
    │
    ▼
401 Unauthorized
    │
    ▼
Clear Token
    │
    ▼
Session Expired Notification
    │
    ▼
Redirect to Login
```

---

# 📚 Concepts Implemented

## Backend

- Flask REST APIs
- SQLAlchemy ORM
- PostgreSQL Integration
- Flask Blueprints
- Database Sessions
- CORS
- HTTP Status Codes

## Authentication

- Password Hashing
- bcrypt
- JWT Authentication
- Authentication
- Authorization
- Protected Routes
- Token Persistence

## Frontend

- React Components
- React Hooks
- React Router
- Context API
- Axios
- Protected Routes
- API Interceptors
- State Management
- Form Handling

## UI/UX

- Responsive Design
- Tailwind CSS
- Modal Interfaces
- Loading States
- Toast Notifications
- Hover Animations

---

# 🗺️ Project Roadmap

## ✅ Week 1 — Foundation & Authentication

- [x] Environment Setup
- [x] Flask Project
- [x] PostgreSQL
- [x] SQLAlchemy
- [x] Git Setup
- [x] User Registration
- [x] User Login
- [x] bcrypt
- [x] JWT Authentication
- [x] Protected Backend Routes

---

## ✅ Week 2 — Full-Stack Task Management

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
- [x] Premium Responsive UI

---

## 🔒 Week 3 — Security Testing

Planned security exercises:

- [ ] SQL Injection
- [ ] XSS
- [ ] Hardcoded Secrets
- [ ] Weak Hashing
- [ ] Authentication Bypass
- [ ] Directory Traversal
- [ ] Insecure File Upload
- [ ] Verbose Error Messages

---

## 🛡️ Week 4 — SAST

Planned security tooling:

- [ ] Bandit
- [ ] Semgrep
- [ ] Gitleaks
- [ ] Static Application Security Testing
- [ ] Security Findings Documentation

---

## 📦 Week 5 — Dependency Security

- [ ] pip-audit
- [ ] Safety
- [ ] OWASP Dependency Check
- [ ] CVE Analysis
- [ ] Dependency Updates

---

## 🌐 Week 6 — Dynamic Security Testing

- [ ] OWASP ZAP
- [ ] Passive Scanning
- [ ] Active Scanning
- [ ] Session Testing
- [ ] Authentication Testing
- [ ] Security Headers

---

## 🔧 Week 7 — Vulnerability Remediation

- [ ] Vulnerability Remediation
- [ ] Secure Coding Improvements
- [ ] Input Validation
- [ ] Secure File Uploads
- [ ] Security Headers
- [ ] Logging Improvements
- [ ] Re-scan & Validation

---

## 📄 Week 8 — Finalization

- [ ] Final Documentation
- [ ] Vulnerability Matrix
- [ ] Installation Guide
- [ ] Screenshots
- [ ] Security Report
- [ ] Final Presentation

---

# 🎯 Future Enhancements

- [ ] Email Verification
- [ ] Password Reset
- [ ] Refresh Tokens
- [ ] Docker Support
- [ ] CI/CD Pipeline
- [ ] Deployment
- [ ] Role-Based Authorization
- [ ] Automated Testing

---

# 👨‍💻 Author

**Parthak Bhardwaj**

B.Tech Computer Science — Artificial Intelligence

Backend Developer | Full-Stack Developer | Python

---

# ⭐ Project Status

🚧 **Currently in Active Development**

### Completed

**Week 1 — Foundation & Authentication** ✅

**Week 2 — Full-Stack Task Management** ✅

### Next Milestone

**Week 3 — Security Testing & Vulnerability Assessment** 🔒