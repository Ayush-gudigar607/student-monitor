from pydantic import BaseModel


class TrendPoint(BaseModel):
    period: str
    average_score: float


class SubjectInsight(BaseModel):
    subject: str
    average_score: float
    status: str


class StudentAnalyticsResponse(BaseModel):
    student_id: int
    student_name: str
    trend: list[TrendPoint]
    subjects: list[SubjectInsight]
    improvement_status: str
    predicted_score: float


class DashboardOverview(BaseModel):
    total_students: int
    average_score: float
    top_performer: str
    weakest_subject: str
