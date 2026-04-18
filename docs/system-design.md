# System Design

## 1. Step-by-Step Architecture

1. Data ingestion
   Student records, attendance, and subject scores enter through FastAPI REST endpoints.
2. Persistence layer
   MySQL stores normalized transactional data with indexes optimized for student/date and subject/date analytics.
3. Analytics layer
   Service modules aggregate score history, attendance, class averages, rank lists, and weak-subject insights.
4. ML layer
   Scikit-learn models transform aggregated features into classification labels and future-score predictions.
5. API orchestration
   Route handlers compose CRUD, analytics, and ML services into frontend-friendly JSON contracts.
6. Presentation layer
   Next.js renders a responsive SaaS dashboard with metric cards, charts, leaderboards, and student profiles.
7. Reporting
   CSV export endpoints provide operational reporting, with room to extend to PDF generation.

## 2. Backend Structure

```text
backend/app/
├── api/routes/
├── core/
├── db/
├── ml/
├── schemas/
└── services/
```

- `api/routes`: thin controllers
- `core`: environment-driven configuration
- `db`: ORM models and session lifecycle
- `schemas`: request/response contracts
- `services`: analytics, ranking, ML orchestration

## 3. Database Design

### Normalization

- `students`: one row per student
- `subjects`: one row per subject
- `scores`: one row per student-subject-date test event
- `attendance`: one row per student-date attendance event

### Query optimization

- Composite indexes on `(student_id, exam_date)` and `(subject_id, exam_date)`
- Unique constraints to prevent duplicate score and attendance events
- Aggregations designed around date slicing and subject rollups

## 4. Machine Learning Design

### Features

- Average marks
- Average test score
- Average attendance

### Models

- Classification: Logistic Regression
- Regression: Linear Regression
- Clustering: KMeans

### Labels

- `Excellent`: average score >= 80
- `Average`: average score >= 60 and < 80
- `Needs Improvement`: average score < 60

## 5. API Surface

- `POST /api/v1/students`
- `GET /api/v1/students`
- `POST /api/v1/performance/entry`
- `POST /api/v1/performance/attendance`
- `GET /api/v1/analytics/dashboard`
- `GET /api/v1/analytics/student/{student_id}`
- `GET /api/v1/analytics/subjects`
- `GET /api/v1/analytics/export/subjects`
- `GET /api/v1/leaderboard`
- `POST /api/v1/ml/classify/{student_id}`
- `POST /api/v1/ml/predict/{student_id}`
- `GET /api/v1/ml/clusters`

## 6. Frontend System

### Folder structure

```text
frontend/
├── app/
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── layout/
│   └── students/
├── lib/
└── store/
```

### Reusable component system

- `AppShell`: sidebar, navbar, animated page container
- `MetricCard`: KPI cards
- `PerformanceLineChart`: trend visualization
- `SubjectBarChart`: subject comparison
- `ClassificationPieChart`: ML category distribution
- `LeaderboardTable`: sortable-ready ranking table base
- `StudentProfileCard`: profile summary plus insights

### Styling direction

- Light, premium analytics look
- Soft glass panels and layered radial backgrounds
- Tight spacing scale and rounded cards
- Motion-driven page transitions with Framer Motion

## 7. Scaling Path

- Move model training to scheduled background jobs
- Add Redis caching for heavy analytics queries
- Introduce Celery or RQ for report generation and retraining
- Partition score and attendance tables by academic year for larger datasets
- Add role-based auth for admin, teacher, parent, and student views
