import csv
from io import StringIO

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.api.deps import ensure_teacher_has_class_access, get_current_user, require_roles
from app.db.models import Student, User
from app.db.session import get_db
from app.schemas.analytics import DashboardOverview, StudentAnalyticsResponse
from app.services.analytics import (
    get_dashboard_overview,
    get_improvement_status,
    get_student_dataframe,
    get_student_subject_insights,
    get_student_trend,
)
from app.services.ml_service import predict_student_score
from app.services.ranking import get_class_subject_summary

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/dashboard", response_model=DashboardOverview)
def dashboard(
    class_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    if current_user.role == "teacher":
        if not class_id:
            raise HTTPException(status_code=400, detail="Teachers must provide class_id")
        ensure_teacher_has_class_access(class_id, current_user, db)
    return get_dashboard_overview(db)


@router.get("/student/{student_id}", response_model=StudentAnalyticsResponse)
def student_analytics(
    student_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    student = db.get(Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    ensure_teacher_has_class_access(student.class_id, current_user, db)

    df = get_student_dataframe(db, student_id)
    return {
        "student_id": student.id,
        "student_name": student.full_name,
        "trend": get_student_trend(df),
        "subjects": get_student_subject_insights(df),
        "improvement_status": get_improvement_status(df),
        "predicted_score": predict_student_score(db, student_id)["predicted_score"],
    }


@router.get("/subjects")
def subject_summary(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher")),
) -> list[dict]:
    return get_class_subject_summary(db)


@router.get("/export/subjects")
def export_subject_analysis(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> StreamingResponse:
    rows = get_class_subject_summary(db)
    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=["subject", "class_average", "weak_students"])
    writer.writeheader()
    writer.writerows(rows)
    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=subject-analysis.csv"},
    )
