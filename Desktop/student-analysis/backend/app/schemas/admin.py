from pydantic import BaseModel, Field


class TeacherClassAssignRequest(BaseModel):
    teacher_id: int
    class_id: int


class SubjectCreate(BaseModel):
    name: str
    code: str
