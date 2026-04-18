from sqlalchemy import case, func, select
from sqlalchemy.orm import Session

from app.db.models import Score, Student


def get_leaderboard(db: Session, class_id: int | None = None) -> list[dict]:
    query = (
        select(
            Student.id,
            Student.full_name,
            Student.class_id,
            func.avg(Score.marks).label("average_score"),
        )
        .join(Score, Score.student_id == Student.id)
        .group_by(Student.id, Student.full_name, Student.class_id)
        .order_by(func.avg(Score.marks).desc())
    )

    if class_id:
        query = query.where(Student.class_id == class_id)

    rows = db.execute(query).all()
    leaderboard = []
    for index, row in enumerate(rows, start=1):
        avg_score = round(float(row.average_score), 2)
        if avg_score >= 80:
            category = "Top Performer"
        elif avg_score >= 60:
            category = "Average"
        else:
            category = "Needs Improvement"

        leaderboard.append(
            {
                "rank": index,
                "student_id": row.id,
                "student_name": row.full_name,
                "class_id": row.class_id,
                "average_score": avg_score,
                "category": category,
            }
        )
    return leaderboard


def get_class_subject_summary(db: Session) -> list[dict]:
    from app.db.models import Subject

    query = (
        select(
            Subject.name.label("subject"),
            func.avg(Score.marks).label("class_average"),
            func.sum(case((Score.marks < 50, 1), else_=0)).label("weak_students"),
        )
        .join(Score, Score.subject_id == Subject.id)
        .group_by(Subject.id, Subject.name)
        .order_by(func.avg(Score.marks).asc())
    )
    return [
        {
            "subject": row.subject,
            "class_average": round(float(row.class_average), 2),
            "weak_students": int(row.weak_students),
        }
        for row in db.execute(query).all()
    ]
