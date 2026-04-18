from sqlalchemy import case, func, select
from sqlalchemy.orm import Session

from app.api.deps import ensure_teacher_has_class_access
from app.db.models import Attendance, SchoolClass, Score, Student, Subject, TeacherClassMap, User
from app.services.ranking import get_leaderboard


def get_classes_for_user(db: Session, user: User) -> list[dict]:
    topper_subquery = (
        select(
            Student.class_id.label("class_id"),
            Student.full_name.label("topper_name"),
            func.avg(Score.marks).label("avg_score"),
            func.row_number().over(
                partition_by=Student.class_id,
                order_by=func.avg(Score.marks).desc(),
            ).label("rank_order"),
        )
        .join(Score, Score.student_id == Student.id)
        .group_by(Student.class_id, Student.id, Student.full_name)
        .subquery()
    )

    query = (
        select(
            SchoolClass.id,
            SchoolClass.name,
            SchoolClass.section,
            func.count(func.distinct(Student.id)).label("total_students"),
            func.coalesce(func.avg(Score.marks), 0).label("average_score"),
            func.coalesce(topper_subquery.c.topper_name, "N/A").label("topper_name"),
        )
        .select_from(SchoolClass)
        .outerjoin(Student, Student.class_id == SchoolClass.id)
        .outerjoin(Score, Score.student_id == Student.id)
        .outerjoin(
            topper_subquery,
            (topper_subquery.c.class_id == SchoolClass.id) & (topper_subquery.c.rank_order == 1),
        )
        .group_by(SchoolClass.id, SchoolClass.name, SchoolClass.section, topper_subquery.c.topper_name)
        .order_by(SchoolClass.name.asc(), SchoolClass.section.asc())
    )

    if user.role == "teacher":
        query = query.join(TeacherClassMap, TeacherClassMap.class_id == SchoolClass.id).where(
            TeacherClassMap.teacher_id == user.id
        )

    rows = db.execute(query).all()
    return [
        {
            "id": row.id,
            "name": row.name,
            "section": row.section,
            "total_students": int(row.total_students or 0),
            "average_score": round(float(row.average_score or 0), 2),
            "topper_name": row.topper_name,
        }
        for row in rows
    ]


def get_class_students(db: Session, class_id: int, user: User) -> list[dict]:
    ensure_teacher_has_class_access(class_id, user, db)
    query = (
        select(
            Student.id,
            Student.full_name,
            Student.roll_no,
            func.coalesce(func.avg(Score.marks), 0).label("average_score"),
        )
        .outerjoin(Score, Score.student_id == Student.id)
        .where(Student.class_id == class_id)
        .group_by(Student.id, Student.full_name, Student.roll_no)
        .order_by(func.avg(Score.marks).desc().nullslast(), Student.full_name.asc())
    )
    rows = db.execute(query).all()
    return [
        {
            "id": row.id,
            "name": row.full_name,
            "roll_no": row.roll_no,
            "average_score": round(float(row.average_score or 0), 2),
            "rank": index,
        }
        for index, row in enumerate(rows, start=1)
    ]


def get_class_analytics(db: Session, class_id: int, user: User) -> dict:
    ensure_teacher_has_class_access(class_id, user, db)
    school_class = db.get(SchoolClass, class_id)
    if not school_class:
        raise ValueError("Class not found")

    overview_query = (
        select(
            func.count(func.distinct(Student.id)).label("total_students"),
            func.coalesce(func.avg(Score.marks), 0).label("class_average"),
        )
        .select_from(Student)
        .outerjoin(Score, Score.student_id == Student.id)
        .where(Student.class_id == class_id)
    )
    overview = db.execute(overview_query).one()

    subject_query = (
        select(
            Subject.name.label("subject"),
            func.coalesce(func.avg(Score.marks), 0).label("average_score"),
        )
        .join(Score, Score.subject_id == Subject.id)
        .join(Student, Student.id == Score.student_id)
        .where(Student.class_id == class_id)
        .group_by(Subject.id, Subject.name)
        .order_by(func.avg(Score.marks).asc())
    )
    subject_performance = [
        {"subject": row.subject, "value": round(float(row.average_score), 2)}
        for row in db.execute(subject_query).all()
    ]

    trend_query = (
        select(
            func.date_format(Score.exam_date, "%Y-%m").label("period"),
            func.coalesce(func.avg(Score.marks), 0).label("average_score"),
        )
        .join(Student, Student.id == Score.student_id)
        .where(Student.class_id == class_id)
        .group_by(func.date_format(Score.exam_date, "%Y-%m"))
        .order_by(func.min(Score.exam_date).asc())
    )
    trend = [
        {"period": row.period, "average_score": round(float(row.average_score), 2)}
        for row in db.execute(trend_query).all()
    ]

    weak_students_query = (
        select(
            Student.full_name.label("student_name"),
            Subject.name.label("subject"),
            func.avg(Score.marks).label("average_score"),
        )
        .join(Score, Score.student_id == Student.id)
        .join(Subject, Subject.id == Score.subject_id)
        .where(Student.class_id == class_id)
        .group_by(Student.id, Student.full_name, Subject.id, Subject.name)
        .having(func.avg(Score.marks) < 40)
        .order_by(func.avg(Score.marks).asc())
    )
    weak_students = [
        {
            "student_name": row.student_name,
            "subject": row.subject,
            "average_score": round(float(row.average_score), 2),
        }
        for row in db.execute(weak_students_query).all()
    ]

    leaderboard = get_leaderboard(db, class_id=class_id)
    weak_subject = subject_performance[0]["subject"] if subject_performance else "N/A"
    top_performer = leaderboard[0]["student_name"] if leaderboard else "N/A"

    return {
        "class_id": school_class.id,
        "class_name": f"{school_class.name}-{school_class.section}",
        "total_students": int(overview.total_students or 0),
        "class_average": round(float(overview.class_average or 0), 2),
        "top_performer": top_performer,
        "weak_subject": weak_subject,
        "weak_students": weak_students,
        "leaderboard": leaderboard,
        "subject_performance": subject_performance,
        "trend": trend,
    }
