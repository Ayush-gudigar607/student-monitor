from pydantic import BaseModel


class ClassificationResponse(BaseModel):
    student_id: int
    label: str
    confidence: float


class RegressionResponse(BaseModel):
    student_id: int
    predicted_score: float
