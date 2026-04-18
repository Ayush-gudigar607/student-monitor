from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.ml import ClassificationResponse, RegressionResponse
from app.services.ml_service import classify_student, cluster_students, predict_student_score

router = APIRouter(prefix="/ml", tags=["ml"])


@router.post("/classify/{student_id}", response_model=ClassificationResponse)
def classify(student_id: int, db: Session = Depends(get_db)) -> dict:
    return classify_student(db, student_id)


@router.post("/predict/{student_id}", response_model=RegressionResponse)
def predict(student_id: int, db: Session = Depends(get_db)) -> dict:
    return predict_student_score(db, student_id)


@router.get("/clusters")
def clusters(db: Session = Depends(get_db)) -> list[dict]:
    return cluster_students(db)
