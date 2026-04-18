from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import ensure_teacher_has_class_access, require_roles
from app.db.models import Attendance, Score, Student, User
from app.db.session import get_db
from app.schemas.performance import AttendanceCreate, ScoreEntryCreate

router = APIRouter(prefix="/performance", tags=["performance"])


@router.post("/entry")
def add_score_entry(
    payload: ScoreEntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    student = db.get(Student, payload.student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    ensure_teacher_has_class_access(student.class_id, current_user, db)
    score = Score(**payload.model_dump())
    db.add(score)
    db.commit()
    db.refresh(score)
    return {"message": "Score entry added", "id": score.id}


@router.post("/attendance")
def add_attendance(
    payload: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    student = db.get(Student, payload.student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    ensure_teacher_has_class_access(student.class_id, current_user, db)
    attendance = Attendance(**payload.model_dump())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return {"message": "Attendance record added", "id": attendance.id}
