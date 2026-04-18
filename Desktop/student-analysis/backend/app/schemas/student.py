from datetime import date

from pydantic import BaseModel, EmailStr


class StudentCreate(BaseModel):
    student_code: str
    full_name: str
    class_id: int
    roll_no: str
    contact_email: EmailStr | None = None
    contact_phone: str | None = None
    enrollment_date: date


class StudentRead(StudentCreate):
    id: int

    class Config:
        from_attributes = True


class StudentUpdate(BaseModel):
    full_name: str | None = None
    class_id: int | None = None
    roll_no: str | None = None
    contact_email: EmailStr | None = None
    contact_phone: str | None = None
