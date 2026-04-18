CREATE DATABASE IF NOT EXISTS student_analysis;
USE student_analysis;

CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher') NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_users_role (role),
  INDEX idx_users_email (email)
);

CREATE TABLE IF NOT EXISTS classes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  section VARCHAR(10) NOT NULL,
  academic_year VARCHAR(20) NULL,
  CONSTRAINT uq_class_name_section UNIQUE (name, section),
  INDEX idx_classes_name_section (name, section)
);

CREATE TABLE IF NOT EXISTS students (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_code VARCHAR(32) NOT NULL UNIQUE,
  full_name VARCHAR(120) NOT NULL,
  class_id INT NOT NULL,
  roll_no VARCHAR(20) NOT NULL,
  contact_email VARCHAR(255) NULL,
  contact_phone VARCHAR(20) NULL,
  enrollment_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id),
  INDEX idx_students_class_id (class_id),
  INDEX idx_students_roll_no (roll_no)
);

CREATE TABLE IF NOT EXISTS subjects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL UNIQUE,
  code VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS teacher_class_map (
  id INT PRIMARY KEY AUTO_INCREMENT,
  teacher_id INT NOT NULL,
  class_id INT NOT NULL,
  CONSTRAINT fk_teacher_class_user FOREIGN KEY (teacher_id) REFERENCES users(id),
  CONSTRAINT fk_teacher_class_class FOREIGN KEY (class_id) REFERENCES classes(id),
  CONSTRAINT uq_teacher_class UNIQUE (teacher_id, class_id),
  INDEX idx_teacher_class_lookup (teacher_id, class_id)
);

CREATE TABLE IF NOT EXISTS scores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  created_by INT NULL,
  exam_date DATE NOT NULL,
  marks DECIMAL(5,2) NOT NULL,
  test_score DECIMAL(5,2) NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  remarks VARCHAR(255) NULL,
  CONSTRAINT fk_scores_student FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT fk_scores_subject FOREIGN KEY (subject_id) REFERENCES subjects(id),
  CONSTRAINT fk_scores_user FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT uq_score_student_subject_date UNIQUE (student_id, subject_id, exam_date),
  INDEX idx_scores_student_date (student_id, exam_date),
  INDEX idx_scores_subject_date (subject_id, exam_date)
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  student_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  status ENUM('Present', 'Absent', 'Late', 'Excused') NOT NULL DEFAULT 'Present',
  attendance_percent DECIMAL(5,2) NOT NULL DEFAULT 100.00,
  CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT uq_attendance_student_date UNIQUE (student_id, attendance_date),
  INDEX idx_attendance_student_date (student_id, attendance_date)
);
