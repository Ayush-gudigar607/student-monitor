from datetime import date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(20), index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    assigned_classes: Mapped[list["TeacherClassMap"]] = relationship(back_populates="teacher")
    recorded_marks: Mapped[list["Score"]] = relationship(back_populates="created_by_user")


class SchoolClass(Base):
    __tablename__ = "classes"
    __table_args__ = (
        UniqueConstraint("name", "section", name="uq_class_name_section"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(50), index=True)
    section: Mapped[str] = mapped_column(String(10), index=True)
    academic_year: Mapped[str | None] = mapped_column(String(20), nullable=True)

    students: Mapped[list["Student"]] = relationship(back_populates="school_class")
    teacher_mappings: Mapped[list["TeacherClassMap"]] = relationship(back_populates="school_class")


class Student(Base):
    __tablename__ = "students"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    student_code: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), index=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"), index=True)
    roll_no: Mapped[str] = mapped_column(String(20), index=True)
    contact_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    contact_phone: Mapped[str | None] = mapped_column(String(20), nullable=True)
    enrollment_date: Mapped[date] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    school_class: Mapped["SchoolClass"] = relationship(back_populates="students")
    scores: Mapped[list["Score"]] = relationship(back_populates="student")
    attendance_records: Mapped[list["Attendance"]] = relationship(back_populates="student")


class Subject(Base):
    __tablename__ = "subjects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), unique=True, index=True)
    code: Mapped[str] = mapped_column(String(20), unique=True, index=True)

    scores: Mapped[list["Score"]] = relationship(back_populates="subject")


class Score(Base):
    __tablename__ = "scores"
    __table_args__ = (
        UniqueConstraint("student_id", "subject_id", "exam_date", name="uq_score_student_subject_date"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    subject_id: Mapped[int] = mapped_column(ForeignKey("subjects.id"), index=True)
    created_by: Mapped[int | None] = mapped_column(ForeignKey("users.id"), nullable=True)
    exam_date: Mapped[date] = mapped_column(Date, index=True)
    marks: Mapped[float] = mapped_column(Float)
    test_score: Mapped[float] = mapped_column(Float)
    max_marks: Mapped[float] = mapped_column(Float, default=100)
    remarks: Mapped[str | None] = mapped_column(String(255), nullable=True)

    student: Mapped["Student"] = relationship(back_populates="scores")
    subject: Mapped["Subject"] = relationship(back_populates="scores")
    created_by_user: Mapped["User | None"] = relationship(back_populates="recorded_marks")


class Attendance(Base):
    __tablename__ = "attendance"
    __table_args__ = (
        UniqueConstraint("student_id", "attendance_date", name="uq_attendance_student_date"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    student_id: Mapped[int] = mapped_column(ForeignKey("students.id"), index=True)
    attendance_date: Mapped[date] = mapped_column(Date, index=True)
    status: Mapped[str] = mapped_column(String(20), default="Present")
    attendance_percent: Mapped[float] = mapped_column(Float, default=100)

    student: Mapped["Student"] = relationship(back_populates="attendance_records")


class TeacherClassMap(Base):
    __tablename__ = "teacher_class_map"
    __table_args__ = (
        UniqueConstraint("teacher_id", "class_id", name="uq_teacher_class"),
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    teacher_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    class_id: Mapped[int] = mapped_column(ForeignKey("classes.id"), index=True)

    teacher: Mapped["User"] = relationship(back_populates="assigned_classes")
    school_class: Mapped["SchoolClass"] = relationship(back_populates="teacher_mappings")
