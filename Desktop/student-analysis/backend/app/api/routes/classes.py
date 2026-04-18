from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_roles
from app.db.models import User
from app.db.session import get_db
from app.schemas.classes import ClassAnalyticsResponse, ClassCardResponse, ClassStudentRow
from app.services.class_service import get_class_analytics, get_class_students, get_classes_for_user

router = APIRouter(prefix="/classes", tags=["classes"])


@router.get("", response_model=list[ClassCardResponse])
def list_classes(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> list[dict]:
    return get_classes_for_user(db, current_user)


@router.get("/{class_id}/students", response_model=list[ClassStudentRow])
def class_students(
    class_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> list[dict]:
    return get_class_students(db, class_id, current_user)


@router.get("/{class_id}/analytics", response_model=ClassAnalyticsResponse)
def class_analytics(
    class_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_roles("admin", "teacher")),
) -> dict:
    try:
        return get_class_analytics(db, class_id, current_user)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
