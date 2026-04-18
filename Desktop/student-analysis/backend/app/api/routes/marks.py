from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import ensure_teacher_has_class_access, get_current_user, require_roles
from app.db.models import Score, Student, User
from app.db.session import get_db
from app.schemas.performance import MarkEntryCreate

router = APIRouter(prefix="/marks", tags=["marks"])


@router.post("")
def add_or_update_marks(
    payload: MarkEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    student = db.get(Student, payload.student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    ensure_teacher_has_class_access(student.class_id, current_user, db)

    existing = db.scalar(
        select(Score).where(
            Score.student_id == payload.student_id,
            Score.subject_id == payload.subject_id,
            Score.exam_date == payload.exam_date,
        )
    )

    if existing:
        existing.marks = payload.marks
        existing.test_score = payload.test_score
        existing.max_marks = payload.max_marks
        existing.remarks = payload.remarks
        existing.created_by = current_user.id
        db.commit()
        return {"message": "Marks updated", "id": existing.id}

    score = Score(**payload.model_dump(), created_by=current_user.id)
    db.add(score)
    db.commit()
    db.refresh(score)
    return {"message": "Marks added", "id": score.id}
