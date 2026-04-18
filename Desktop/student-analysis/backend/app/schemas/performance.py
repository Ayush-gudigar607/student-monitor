from datetime import date

from pydantic import BaseModel, Field


class ScoreEntryCreate(BaseModel):
    student_id: int
    subject_id: int
    exam_date: date
    marks: float = Field(ge=0, le=100)
    test_score: float = Field(ge=0, le=100)
    max_marks: float = 100
    remarks: str | None = None


class MarkEntryCreate(BaseModel):
    student_id: int
    subject_id: int
    exam_date: date
    marks: float = Field(ge=0, le=100)
    test_score: float = Field(ge=0, le=100)
    max_marks: float = 100
    remarks: str | None = None


class AttendanceCreate(BaseModel):
    student_id: int
    attendance_date: date
    status: str
    attendance_percent: float = Field(ge=0, le=100)
