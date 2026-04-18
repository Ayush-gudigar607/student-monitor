from __future__ import annotations

import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models import Attendance, Score, Student
from app.services.analytics import get_student_dataframe

STATUS_LABELS = {0: "Needs Improvement", 1: "Average", 2: "Excellent"}


def build_training_frame(db: Session) -> pd.DataFrame:
    query = (
        select(
            Student.id.label("student_id"),
            func.avg(Score.marks).label("avg_marks"),
            func.avg(Score.test_score).label("avg_test_score"),
            func.avg(Attendance.attendance_percent).label("avg_attendance"),
        )
        .join(Score, Score.student_id == Student.id)
        .outerjoin(Attendance, Attendance.student_id == Student.id)
        .group_by(Student.id)
    )
    rows = db.execute(query).mappings().all()
    frame = pd.DataFrame(rows)
    if frame.empty:
        return frame

    frame = frame.fillna({"avg_attendance": 75})
    frame["label"] = frame["avg_marks"].apply(_bucketize_label)
    return frame


def _bucketize_label(score: float) -> int:
    if score >= 80:
        return 2
    if score >= 60:
        return 1
    return 0


def classify_student(db: Session, student_id: int) -> dict:
    frame = build_training_frame(db)
    if frame.empty or student_id not in frame["student_id"].values:
        return {"student_id": student_id, "label": "Insufficient Data", "confidence": 0.0}

    X = frame[["avg_marks", "avg_test_score", "avg_attendance"]]
    y = frame["label"]

    model = Pipeline(
        [
            ("scaler", StandardScaler()),
            ("classifier", LogisticRegression(max_iter=300, multi_class="auto")),
        ]
    )
    model.fit(X, y)

    row = frame.loc[frame["student_id"] == student_id, ["avg_marks", "avg_test_score", "avg_attendance"]]
    probs = model.predict_proba(row)[0]
    label_idx = int(np.argmax(probs))
    return {
        "student_id": student_id,
        "label": STATUS_LABELS[label_idx],
        "confidence": round(float(np.max(probs)), 4),
    }


def predict_student_score(db: Session, student_id: int) -> dict:
    frame = build_training_frame(db)
    student_df = get_student_dataframe(db, student_id)
    if frame.empty or student_df.empty or student_id not in frame["student_id"].values:
        return {"student_id": student_id, "predicted_score": 0.0}

    frame["target"] = frame["avg_marks"] * 0.7 + frame["avg_test_score"] * 0.2 + frame["avg_attendance"] * 0.1
    X = frame[["avg_marks", "avg_test_score", "avg_attendance"]]
    y = frame["target"]

    model = LinearRegression()
    model.fit(X, y)

    current = frame.loc[frame["student_id"] == student_id, ["avg_marks", "avg_test_score", "avg_attendance"]]
    prediction = model.predict(current)[0]
    return {"student_id": student_id, "predicted_score": round(float(prediction), 2)}


def cluster_students(db: Session) -> list[dict]:
    frame = build_training_frame(db)
    if len(frame) < 3:
        return []

    X = frame[["avg_marks", "avg_test_score", "avg_attendance"]]
    model = KMeans(n_clusters=3, random_state=42, n_init="auto")
    frame["cluster"] = model.fit_predict(X)
    return frame[["student_id", "cluster"]].to_dict("records")
