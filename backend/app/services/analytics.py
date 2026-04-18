from __future__ import annotations

import pandas as pd
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db.models import Attendance, Score, Student, Subject


def get_dashboard_overview(db: Session) -> dict:
    total_students = db.scalar(select(func.count(Student.id))) or 0
    average_score = db.scalar(select(func.avg(Score.marks))) or 0

    topper_query = (
        select(Student.full_name, func.avg(Score.marks).label("avg_score"))
        .join(Score, Score.student_id == Student.id)
        .group_by(Student.id, Student.full_name)
        .order_by(func.avg(Score.marks).desc())
        .limit(1)
    )
    topper = db.execute(topper_query).first()

    weak_subject_query = (
        select(Subject.name, func.avg(Score.marks).label("avg_score"))
        .join(Score, Score.subject_id == Subject.id)
        .group_by(Subject.id, Subject.name)
        .order_by(func.avg(Score.marks).asc())
        .limit(1)
    )
    weak_subject = db.execute(weak_subject_query).first()

    return {
        "total_students": total_students,
        "average_score": round(float(average_score), 2),
        "top_performer": topper[0] if topper else "N/A",
        "weakest_subject": weak_subject[0] if weak_subject else "N/A",
    }


def get_student_dataframe(db: Session, student_id: int) -> pd.DataFrame:
    query = (
        select(
            Student.id.label("student_id"),
            Student.full_name,
            Subject.name.label("subject"),
            Score.exam_date,
            Score.marks,
            Score.test_score,
            Attendance.attendance_percent,
        )
        .join(Score, Score.student_id == Student.id)
        .join(Subject, Subject.id == Score.subject_id)
        .outerjoin(
            Attendance,
            (Attendance.student_id == Student.id) & (Attendance.attendance_date == Score.exam_date),
        )
        .where(Student.id == student_id)
        .order_by(Score.exam_date.asc())
    )
    rows = db.execute(query).mappings().all()
    return pd.DataFrame(rows)


def get_student_subject_insights(df: pd.DataFrame) -> list[dict]:
    if df.empty:
        return []

    summary = df.groupby("subject", as_index=False)["marks"].mean()
    insights = []
    for row in summary.to_dict("records"):
        score = round(float(row["marks"]), 2)
        if score >= 80:
            status = "Strength"
        elif score >= 60:
            status = "Average"
        else:
            status = "Needs Attention"
        insights.append({"subject": row["subject"], "average_score": score, "status": status})
    return insights


def get_student_trend(df: pd.DataFrame) -> list[dict]:
    if df.empty:
        return []

    frame = df.copy()
    frame["period"] = pd.to_datetime(frame["exam_date"]).dt.strftime("%Y-%m")
    trend = frame.groupby("period", as_index=False)["marks"].mean()
    return [
        {"period": row["period"], "average_score": round(float(row["marks"]), 2)}
        for row in trend.to_dict("records")
    ]


def get_improvement_status(df: pd.DataFrame) -> str:
    if len(df) < 2:
        return "Insufficient Data"

    ordered = df.sort_values("exam_date")
    first_avg = float(ordered.head(max(1, len(ordered) // 3))["marks"].mean())
    last_avg = float(ordered.tail(max(1, len(ordered) // 3))["marks"].mean())

    if last_avg - first_avg >= 5:
        return "Improving"
    if first_avg - last_avg >= 5:
        return "Declining"
    return "Stable"
