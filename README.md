# Task Management Application - Backend

## Overview

The Task Management Application Backend is a RESTful API built using Express.js and Prisma ORM. It provides secure authentication using JWT and enables users to manage their personal tasks through CRUD operations.

The backend follows a modular architecture with separate routes, controllers, middleware, and database configurations to ensure scalability and maintainability.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-Based Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Authorization Middleware

### Task Management

* Create Tasks
* Retrieve Tasks
* Update Tasks
* Delete Tasks
* Filter Tasks by Status
* Filter Tasks by Priority
* Pagination Support

### Security

* JWT Authentication
* Password Hashing
* Protected API Endpoints
* CORS Configuration
* Environment Variable Management

---

## Tech Stack

### Runtime

* Node.js

### Framework

* Express.js

### Database

* PostgreSQL/ Neon DB

### ORM

* Prisma ORM

### Authentication

* JWT (jsonwebtoken)

### Password Encryption

* bcryptjs

### Environment Variables

* dotenv

### Middleware

* Express Middleware
* Custom Authentication Middleware
* CORS

---

## Project Structure

```bash
src/
├── config/
│   └── prisma.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── routes/
│   ├── authRoutes.js
│   ├── protectedRoutes.js
│   └── taskRoutes.js
│
├── app.js
└── server.js

prisma/
├── schema.prisma
└── migrations/

.env
package.json
```

---

## Local Development Setup

### Prerequisites

* Node.js 18+
* PostgreSQL
* npm

---

### Clone Repository

```bash
git clone [<repository-url>](https://github.com/RahulGaniger/task-management-backend.git)

cd task-management-backend
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL="postgresql://username:password@localhost:5432/taskdb"

JWT_SECRET="your_jwt_secret"
```

---

### Generate Prisma Client

```bash
npx prisma generate
```

---

### Run Database Migrations

```bash
npx prisma migrate dev
```

---

### Start Development Server

```bash
npm run dev
```

Server will run on:

```text
http://localhost:5000
https://task-management-backend-uck8.onrender.com
```

---

## Environment Variables

| Variable     | Description                            |
| ------------ | -------------------------------------- |
| PORT         | Server Port                            |
| DATABASE_URL | PostgreSQL Connection String           |
| JWT_SECRET   | Secret Key Used for JWT Authentication |

### Example

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/taskdb

JWT_SECRET=my_super_secret_key
```

---

## API Documentation

### Base URL

```text
http://localhost:5000/api
https://task-management-backend-uck8.onrender.com/api
```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/auth/register
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "message": "User registered successfully"
}
```

---

## Login User

### Endpoint

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "token": "jwt_token"
}
```

---

# Protected Routes

All protected routes require:

```http
Authorization: Bearer <jwt_token>
```

---

# Task APIs

## Get All Tasks

### Endpoint

```http
GET /api/tasks
```

### Query Parameters

```http
?status=TODO
?priority=HIGH
?page=1
&limit=10
```

### Success Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "total": 2,
  "data": []
}
```

---

## Create Task

### Endpoint

```http
POST /api/tasks
```

### Request Body

```json
{
  "title": "Learn Next.js",
  "description": "Complete Next.js course",
  "priority": "HIGH",
  "status": "TODO",
  "dueDate": "2026-06-30"
}
```

---

## Update Task

### Endpoint

```http
PUT /api/tasks/:id
```

### Request Body

```json
{
  "title": "Updated Task",
  "priority": "MEDIUM",
  "status": "IN_PROGRESS"
}
```

---

## Delete Task

### Endpoint

```http
DELETE /api/tasks/:id
```

### Success Response

```json
{
  "message": "Task deleted successfully"
}
```

---

## Database

### ORM

Prisma ORM is used for database operations.

### Main Entities

#### User

```text
id
email
password
createdAt
updatedAt
```

#### Task

```text
id
title
description
priority
status
dueDate
userId
createdAt
updatedAt
```

---

## Authentication Flow

1. User Registers.
2. Password is hashed using bcryptjs.
3. User logs in.
4. JWT token is generated.
5. Token is returned to frontend.
6. Frontend sends token in Authorization header.
7. Middleware validates token before processing requests.

---

## Deployment

### Backend Hosting

Hosted on Render

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

### Environment Variables on Render

```env
DATABASE_URL=database_url

JWT_SECRET=secret_key

NODE_ENV=production
```

---

## API Testing

### Postman Collection

Recommended endpoints to test:

* Register User
* Login User
* Get Tasks
* Create Task
* Update Task
* Delete Task

---

## Future Improvements

* Refresh Token Authentication
* Password Reset
* User Profile APIs
* Role-Based Access Control
* Audit Logging
* Rate Limiting
* Email Verification
* Task Attachments
* Team Collaboration

---

## Author

Rahul Ganiger

Backend Developer

Built using Node.js, Express.js, Prisma ORM, PostgreSQL, JWT Authentication, and bcryptjs.
