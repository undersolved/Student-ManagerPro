# 🎓 Student Manager Pro

A modern **Student Management System** built using **FastAPI, SQLite, HTML, CSS, and JavaScript**. It allows users to manage student records through a clean and responsive interface with real-time CRUD operations, dashboard statistics, and a REST API.

> **Live Demo**
>
> - **Frontend:** _(Add your Vercel URL here)_
> - **Backend API:** https://student-managerpro.onrender.com
> - **API Documentation:** https://student-managerpro.onrender.com/docs

---

# 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Database Design](#-database-design)
- [API Endpoints](#-api-endpoints)
- [Frontend Workflow](#-frontend-workflow)
- [Backend Workflow](#-backend-workflow)
- [Installation Guide](#-installation-guide)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

# 📚 Project Overview

Student Manager Pro is a **medium-level full-stack web application** created to demonstrate modern Python web development.

The project focuses on keeping the stack simple while following a clean architecture.

Instead of using a heavy framework like Django, the application uses:

- FastAPI for backend APIs
- SQLAlchemy for database management
- SQLite for data storage
- HTML, CSS, and Vanilla JavaScript for the frontend

The result is a lightweight, responsive, and beginner-friendly project that can be deployed online.

---

# ✨ Features

## Dashboard

- Live student statistics
- Total students
- Average attendance
- Paid fees count
- Pending fees count
- Responsive cards

## Student Management

- Add Student
- Edit Student
- Delete Student
- Search Students
- Instant table updates
- No page refresh required

## User Experience

- Responsive design
- Edit mode
- Cancel editing
- Toast notifications
- Loading states
- Form validation
- Smooth scrolling
- Hover animations

## Backend

- REST API
- SQLite database
- SQLAlchemy ORM
- Automatic API documentation
- CORS enabled

---

# 🛠 Tech Stack

| Category         | Technology         |
| ---------------- | ------------------ |
| Backend          | FastAPI            |
| Language         | Python             |
| ORM              | SQLAlchemy 2.x     |
| Database         | SQLite             |
| Validation       | Pydantic           |
| Frontend         | HTML5              |
| Styling          | CSS3               |
| Scripting        | Vanilla JavaScript |
| API Testing      | Swagger UI         |
| Backend Hosting  | Render             |
| Frontend Hosting | Vercel             |
| Version Control  | Git & GitHub       |

---

# 🏗 Project Architecture

```text
                Browser
                   │
                   │
           Vercel Frontend
      HTML • CSS • JavaScript
                   │
              Fetch API
                   │
                   ▼
         FastAPI Backend
             (Render)
                   │
             SQLAlchemy
                   │
                   ▼
            SQLite Database
```

### Request Flow

1. User interacts with the frontend.
2. JavaScript sends a request using `fetch()`.
3. FastAPI receives the request.
4. SQLAlchemy communicates with SQLite.
5. The response is returned as JSON.
6. JavaScript updates the UI instantly.

---

# 📂 Project Structure

```text
Student_ManagerPro/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── routers/
│   │       ├── __init__.py
│   │       └── students.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── students.db
│
├── frontend/
│   ├── index.html
│   ├── students.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   └── app.js
│   └── vercel.json
│
├── .gitignore
└── README.md
```

---

# 🗄 Database Design

The application stores student records inside SQLite.

### Table: `students`

| Field         | Type    |
| ------------- | ------- |
| id            | Integer |
| name          | Text    |
| roll_number   | Integer |
| student_class | Text    |
| section       | Text    |
| age           | Integer |
| email         | Text    |
| phone         | Text    |
| attendance    | Float   |
| fee_status    | Text    |

### Entity Diagram

```text
students
-----------------------------------
id
name
roll_number
student_class
section
age
email
phone
attendance
fee_status
```

---

# 🌐 API Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/`              | Welcome message  |
| GET    | `/health`        | Health check     |
| GET    | `/students/`     | Get all students |
| GET    | `/students/{id}` | Get one student  |
| POST   | `/students/`     | Create student   |
| PUT    | `/students/{id}` | Update student   |
| DELETE | `/students/{id}` | Delete student   |

### Example Request

```http
POST /students/
```

```json
{
	"name": "Rahul Sharma",
	"roll_number": 1,
	"student_class": "10",
	"section": "A",
	"age": 15,
	"email": "rahul@example.com",
	"phone": "9876543210",
	"attendance": 92,
	"fee_status": "Paid"
}
```

### Example Response

```json
{
	"id": 1,
	"name": "Rahul Sharma",
	"roll_number": 1,
	"student_class": "10",
	"section": "A",
	"age": 15,
	"email": "rahul@example.com",
	"phone": "9876543210",
	"attendance": 92,
	"fee_status": "Paid"
}
```

---

# 🎨 Frontend Workflow

The frontend is built entirely with HTML, CSS, and Vanilla JavaScript.

### Pages

| Page            | Purpose            |
| --------------- | ------------------ |
| `index.html`    | Dashboard          |
| `students.html` | Student management |

### JavaScript Responsibilities

- Fetch API requests
- Dynamic table rendering
- Dashboard statistics
- Search filtering
- Edit mode
- Delete confirmation
- Toast notifications
- Loading states

### UI Features

- Responsive Grid
- Rounded Cards
- Gradient Hero Section
- Hover Animations
- Mobile Friendly Layout

---

# ⚙ Backend Workflow

The backend follows a clean layered architecture.

### `main.py`

- Starts FastAPI
- Configures CORS
- Registers routes
- Creates database tables

### `database.py`

- Creates SQLite connection
- Manages database sessions

### `models.py`

Defines SQLAlchemy models.

### `schemas.py`

Validates incoming and outgoing API data.

### `crud.py`

Contains database operations.

### `routers/students.py`

Defines REST endpoints.

---

# 💻 Installation Guide

## Prerequisites

- macOS
- Python 3.12+
- Git
- VS Code (Recommended)

---

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Student_ManagerPro.git
```

```bash
cd Student_ManagerPro
```

---

# 🚀 Local Development

## Backend

Move into backend.

```bash
cd backend
```

Create virtual environment.

```bash
python3 -m venv .venv
```

Activate.

```bash
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Run server.

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

API Docs:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend

Open another terminal.

```bash
cd frontend
```

Run a local server.

```bash
python3 -m http.server 5500
```

Frontend:

```text
http://127.0.0.1:5500
```

---

# 🌍 Deployment

## Backend — Render

- Runtime: Python
- Root Directory: `backend`
- Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

SQLite is used for storage.

> Note: On Render's free plan, SQLite storage is ephemeral and may reset after redeploys.

---

## Frontend — Vercel

- Framework: Other
- Root Directory: `frontend`

The frontend communicates with the deployed backend using:

```javascript
const API_BASE_URL = "https://student-managerpro.onrender.com";
```

---

# 📸 Screenshots

Add screenshots here after deployment.

### Dashboard

```
images/dashboard.png
```

### Student Page

```
images/students.png
```

### API Documentation

```
images/swagger.png
```

---

# 🧪 Testing Checklist

### Backend

- [x] API starts
- [x] Swagger works
- [x] Create Student
- [x] Update Student
- [x] Delete Student
- [x] Get Students

### Frontend

- [x] Dashboard loads
- [x] Statistics update
- [x] Add Student
- [x] Edit Student
- [x] Delete Student
- [x] Search works
- [x] Responsive layout

---

# 🚀 Future Improvements

Possible enhancements include:

- Student photos
- Export to Excel
- PDF report generation
- Attendance history
- Fee payment history
- Class-wise filtering
- Dark mode
- Pagination
- Sorting
- Bulk student import

---

# 📌 Learning Outcomes

This project demonstrates practical experience with:

- FastAPI
- REST APIs
- SQLAlchemy ORM
- SQLite
- CRUD Operations
- Pydantic Validation
- JavaScript Fetch API
- Responsive CSS
- Git & GitHub
- Render Deployment
- Vercel Deployment
- Full Stack Project Structure

---

# 👨‍💻 Author

**Bhupendra Singh Hapawat**

Built as a full-stack Python portfolio project using modern development practices.

---

# ⭐ If you found this project useful

Feel free to star the repository and use it as a learning reference for building FastAPI + JavaScript CRUD applications.
