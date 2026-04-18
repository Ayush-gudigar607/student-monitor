from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import decode_token
from app.db.models import TeacherClassMap, User
from app.db.session import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        email = payload.get("sub")
        if not email:
            raise credentials_error
    except ValueError:
        raise credentials_error

    user = db.scalar(select(User).where(User.email == email))
    if not user or not user.is_active:
        raise credentials_error
    return user


def require_roles(*roles: str):
    def dependency(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return current_user

    return dependency


def ensure_teacher_has_class_access(class_id: int, user: User, db: Session) -> None:
    if user.role == "admin":
        return

    mapping = db.scalar(
        select(TeacherClassMap).where(
            TeacherClassMap.teacher_id == user.id,
            TeacherClassMap.class_id == class_id,
        )
    )
    if not mapping:
        raise HTTPException(status_code=403, detail="Teacher does not have access to this class")
