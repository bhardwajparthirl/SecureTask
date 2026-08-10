# SecureTask API Documentation

## Base URL

http://127.0.0.1:5000

---

## Authentication

SecureTask uses JWT (JSON Web Token) authentication.

Protected endpoints require the following HTTP header:

    Authorization: Bearer <access_token>

The access token is obtained after successful login.

---

# 1. Register User

## Endpoint

    POST /register

## Authentication

Not required.

## Request Body

    {
      "username": "Parthak",
      "email": "test@gmail.com",
      "password": "111"
    }

## Success Response

**201 Created**

    {
      "message": "User registered successfully"
    }

## Possible Errors

### Missing Username

**400 Bad Request**

    {
      "error": "Username is required"
    }

### Missing Email

**400 Bad Request**

    {
      "error": "Email is required"
    }

### Missing Password

**400 Bad Request**

    {
      "error": "Password is required"
    }

### Email Already Registered

**400 Bad Request**

    {
      "error": "Email already registered"
    }

---

# 2. Login

## Endpoint

    POST /login

## Authentication

Not required.

## Request Body

    {
      "email": "test@gmail.com",
      "password": "111"
    }

## Success Response

**200 OK**

    {
      "message": "Login Successful",
      "access_token": "<JWT_TOKEN>"
    }

The returned JWT token is required for protected endpoints.

## Invalid Credentials

**401 Unauthorized**

    {
      "error": "Invalid email or password"
    }

---

# 3. Get User Profile

## Endpoint

    GET /profile

## Authentication

Required.

    Authorization: Bearer <access_token>

## Description

Returns the profile of the currently authenticated user.

The user ID is obtained from the JWT token.

## Success Response

**200 OK**

    {
      "id": 21,
      "username": "Parthak",
      "email": "test@gmail.com"
    }

The user's password is never returned.

## User Not Found

**404 Not Found**

    {
      "message": "User not found"
    }

---

# 4. Create Task

## Endpoint

    POST /tasks

## Authentication

Required.

    Authorization: Bearer <access_token>

## Request Body

    {
      "title": "Build React Frontend",
      "description": "Connect React with Flask",
      "category": "Web Development",
      "status": "Pending"
    }

## Required Fields

- `title`

## Optional Fields

- `description`
- `category`
- `status`

If `status` is not provided, it defaults to `Pending`.

## Success Response

**201 Created**

    {
      "message": "Task created successfully",
      "task": {
        "id": 1,
        "title": "Build React Frontend",
        "description": "Connect React with Flask",
        "category": "Web Development",
        "status": "Pending",
        "user_id": 21
      }
    }

## Missing Title

**400 Bad Request**

    {
      "error": "Title is required"
    }

---

# 5. Get Tasks

## Endpoint

    GET /tasks

## Authentication

Required.

    Authorization: Bearer <access_token>

## Description

Returns only the tasks belonging to the currently authenticated user.

## Success Response

**200 OK**

    [
      {
        "id": 1,
        "title": "Build React Frontend",
        "description": "Connect React with Flask",
        "category": "Web Development",
        "status": "Pending",
        "created_at": "2026-08-10T15:00:00"
      }
    ]

If the user has no tasks:

    []

---

# 6. Search Tasks

## Endpoint

    GET /tasks?search=<keyword>

## Authentication

Required.

    Authorization: Bearer <access_token>

## Example

    GET /tasks?search=react

## Description

Searches the authenticated user's tasks by title.

The search is case-insensitive.

---

# 7. Filter Tasks by Category

## Endpoint

    GET /tasks?category=<category>

## Authentication

Required.

    Authorization: Bearer <access_token>

## Example

    GET /tasks?category=Web%20Development

## Description

Returns tasks belonging to the requested category.

Category matching is case-insensitive.

---

# 8. Search and Filter Tasks

## Endpoint

    GET /tasks?search=<keyword>&category=<category>

## Authentication

Required.

    Authorization: Bearer <access_token>

## Example

    GET /tasks?search=react&category=Web%20Development

## Description

Returns tasks that:

1. Belong to the authenticated user.
2. Contain the search keyword in the task title.
3. Match the requested category.

---

# 9. Update Task

## Endpoint

    PUT /tasks/<task_id>

## Authentication

Required.

    Authorization: Bearer <access_token>

## Example

    PUT /tasks/1

## Request Body

Only the fields that need to be changed are required.

    {
      "title": "React Frontend Completed",
      "status": "Completed"
    }

## Success Response

**200 OK**

    {
      "message": "Task updated successfully",
      "task": {
        "id": 1,
        "title": "React Frontend Completed",
        "description": "Connect React with Flask",
        "category": "Web Development",
        "status": "Completed",
        "created_at": "2026-08-10T15:00:00"
      }
    }

## Authorization

A user can only update tasks that belong to them.

### Task Not Found or Not Authorized

**404 Not Found**

    {
      "message": "Task not found or not authorised"
    }

---

# 10. Delete Task

## Endpoint

    DELETE /tasks/<task_id>

## Authentication

Required.

    Authorization: Bearer <access_token>

## Example

    DELETE /tasks/1

## Success Response

**200 OK**

    {
      "message": "Task Deleted successfully"
    }

## Authorization

A user can only delete tasks that belong to them.

### Task Not Found or Not Authorized

**404 Not Found**

    {
      "message": "Task not found or not authorised"
    }

---

# 11. Dashboard

## Endpoint

    GET /dashboard

## Authentication

Required.

    Authorization: Bearer <access_token>

## Description

Returns task statistics for the currently authenticated user.

## Success Response

**200 OK**

    {
      "total_tasks": 5,
      "pending": 2,
      "in_progress": 1,
      "completed": 2
    }

The statistics only include tasks belonging to the authenticated user.

---

# API Summary

| Method | Endpoint | Authentication | Description |
|---|---|---|---|
| POST | `/register` | No | Register a new user |
| POST | `/login` | No | Login and receive JWT |
| GET | `/profile` | Yes | Get current user's profile |
| POST | `/tasks` | Yes | Create a task |
| GET | `/tasks` | Yes | Get user's tasks |
| GET | `/tasks?search=` | Yes | Search tasks by title |
| GET | `/tasks?category=` | Yes | Filter tasks by category |
| GET | `/tasks?search=&category=` | Yes | Search and filter tasks |
| PUT | `/tasks/<id>` | Yes | Update a task |
| DELETE | `/tasks/<id>` | Yes | Delete a task |
| GET | `/dashboard` | Yes | Get task statistics |

---

# Security Features

- JWT authentication is used for protected endpoints.
- Task ownership is verified using the authenticated user's ID.
- Users can only access their own tasks.
- Users cannot update another user's task.
- Users cannot delete another user's task.
- Passwords are hashed before being stored.
- Passwords are never returned through the profile API.
- Task queries are restricted to the authenticated user.
- Search and category filtering operate only on the authenticated user's tasks.

---

# Task Status Values

The dashboard currently recognizes:

- `Pending`
- `In Progress`
- `Completed`

These statuses are used to calculate dashboard statistics.