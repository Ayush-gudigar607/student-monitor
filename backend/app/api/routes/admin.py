from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.db.models import Score, SchoolClass, Student, Subject, TeacherClassMap, User
from app.db.session import get_db
from app.schemas.admin import SubjectCreate, TeacherClassAssignRequest

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/overview")
def admin_overview(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> dict:
    total_students = db.scalar(select(func.count(Student.id))) or 0
    average_score = db.scalar(select(func.avg(Score.marks))) or 0
    total_teachers = db.scalar(select(func.count(User.id)).where(User.role == "teacher")) or 0
    return {
        "total_students": total_students,
        "average_score": round(float(average_score), 2),
        "total_teachers": total_teachers,
    }


@router.post("/assign-class", status_code=status.HTTP_201_CREATED)
def assign_teacher_to_class(
    payload: TeacherClassAssignRequest,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> dict:
    teacher = db.get(User, payload.teacher_id)
    if not teacher or teacher.role != "teacher":
        raise HTTPException(status_code=404, detail="Teacher not found")

    existing = db.scalar(
        select(TeacherClassMap).where(
            TeacherClassMap.teacher_id == payload.teacher_id,
            TeacherClassMap.class_id == payload.class_id,
        )
    )
    if existing:
        raise HTTPException(status_code=400, detail="Teacher already assigned to this class")

    school_class = db.get(SchoolClass, payload.class_id)
    if not school_class:
        raise HTTPException(status_code=404, detail="Class not found")

    mapping = TeacherClassMap(**payload.model_dump())
    db.add(mapping)
    db.commit()
    return {"message": "Teacher assigned successfully"}


@router.post("/subjects", status_code=status.HTTP_201_CREATED)
def create_subject(
    payload: SubjectCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin")),
) -> dict:
    subject = Subject(**payload.model_dump())
    db.add(subject)
    db.commit()
    db.refresh(subject)
    return {"id": subject.id, "message": "Subject created"}
