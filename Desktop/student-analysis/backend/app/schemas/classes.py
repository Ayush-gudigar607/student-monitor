from pydantic import BaseModel


class ClassCardResponse(BaseModel):
    id: int
    name: str
    section: str
    total_students: int
    average_score: float
    topper_name: str


class ClassStudentRow(BaseModel):
    id: int
    name: str
    roll_no: str
    average_score: float
    rank: int


class ClassAnalyticsResponse(BaseModel):
    class_id: int
    class_name: str
    total_students: int
    class_average: float
    top_performer: str
    weak_subject: str
    weak_students: list[dict]
    leaderboard: list[dict]
    subject_performance: list[dict]
    trend: list[dict]
