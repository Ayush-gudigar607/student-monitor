# Student Performance Analysis System

Production-ready starter for a student performance analytics platform with:

- `backend/`: FastAPI, SQLAlchemy, Pandas, NumPy, scikit-learn
- `database/`: normalized MySQL schema and seed data
- `frontend/`: Next.js, Tailwind CSS, Zustand, Recharts, Framer Motion

## Authentication and Roles

- JWT-based login with bcrypt password hashing
- Admin and Teacher roles with restricted access boundaries
- Next.js auth proxy routes that store JWT in cookies for protected dashboard navigation
- Admin signup protected by a secret key
- Post-login class selection flow with role-aware class visibility

## Architecture

### Backend

- FastAPI REST API for CRUD, analytics, rankings, and ML predictions
- SQLAlchemy ORM for MySQL persistence
- Service layer for analytics, ranking, and ML orchestration
- Pydantic schemas for clean API contracts

### Machine Learning

- Classification: student status (`Excellent`, `Average`, `Needs Improvement`)
- Regression: future score prediction
- Optional clustering hook for student segmentation

### Frontend

- Next.js App Router dashboard
- Tailwind-based design system
- Reusable cards, charts, tables, and layout primitives
- Zustand store for UI filters and theme preferences

## Folder Structure

```text
student-analysis/
├── backend/
├── database/
└── frontend/
```

## Quick Start

### 1. Database

Create a MySQL database and run:

```sql
SOURCE database/schema.sql;
SOURCE database/sample_data.sql;
```

### 2. Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Create `backend/.env` from `.env.example` and set:

```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/student_analysis
JWT_SECRET_KEY=change-me-in-production
ADMIN_SIGNUP_SECRET=school-admin-secret
```

Use the signup flow to create usable admin or teacher accounts. The seeded `users` rows in `database/sample_data.sql` are mainly there to support relational test data.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional frontend env:

```env
API_BASE_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

## Role Model

- `admin`
  Full student CRUD, subject management, teacher-class assignment, leaderboard access, exports.
- `teacher`
  Mark entry, attendance updates, class-scoped analytics, assigned-student visibility only.

## Class Flow

- `GET /api/v1/classes`
  Returns all classes for admins and only assigned classes for teachers.
- `GET /api/v1/classes/{class_id}/students`
  Returns ranked student rows for the selected class.
- `GET /api/v1/classes/{class_id}/analytics`
  Returns overview metrics, leaderboard, weak student detection, subject analytics, and trend data.

## Key APIs

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/students`
- `PUT /api/v1/students/{student_id}`
- `DELETE /api/v1/students/{student_id}`
- `POST /api/v1/performance/entry`
- `POST /api/v1/marks`
- `GET /api/v1/analytics/dashboard`
- `GET /api/v1/analytics/student/{student_id}`
- `GET /api/v1/leaderboard`
- `POST /api/v1/admin/assign-class`
- `POST /api/v1/ml/classify/{student_id}`
- `POST /api/v1/ml/predict/{student_id}`

## Notes

- The backend targets MySQL in production and defaults to a configurable `DATABASE_URL`.
- The frontend currently uses seeded mock data for UI rendering and is structured to swap to live APIs cleanly.
