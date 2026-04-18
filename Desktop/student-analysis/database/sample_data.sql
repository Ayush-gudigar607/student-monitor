USE student_analysis;

INSERT INTO users (id, name, email, password_hash, role, is_active) VALUES
(1, 'School Admin', 'admin@school.edu', '$2b$12$F8jUPm1WUL1t4dM1fI8Q4.ZBRM7tQ8K4qvNn1Hd7t1pu0YhclbZEm', 'admin', TRUE),
(2, 'Anita Teacher', 'teacher1@school.edu', '$2b$12$F8jUPm1WUL1t4dM1fI8Q4.ZBRM7tQ8K4qvNn1Hd7t1pu0YhclbZEm', 'teacher', TRUE),
(3, 'Rahul Teacher', 'teacher2@school.edu', '$2b$12$F8jUPm1WUL1t4dM1fI8Q4.ZBRM7tQ8K4qvNn1Hd7t1pu0YhclbZEm', 'teacher', TRUE)
ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role);

INSERT INTO classes (id, name, section, academic_year) VALUES
(1, '1', 'A', '2025-2026'),
(2, '2', 'A', '2025-2026'),
(3, '3', 'A', '2025-2026'),
(4, '4', 'A', '2025-2026'),
(5, '5', 'A', '2025-2026'),
(6, '6', 'A', '2025-2026'),
(7, '7', 'A', '2025-2026'),
(8, '8', 'A', '2025-2026'),
(9, '9', 'A', '2025-2026'),
(10, '10', 'A', '2025-2026'),
(11, '10', 'B', '2025-2026')
ON DUPLICATE KEY UPDATE name = VALUES(name), section = VALUES(section);

INSERT INTO subjects (id, name, code) VALUES
(1, 'Mathematics', 'MATH'),
(2, 'Science', 'SCI'),
(3, 'English', 'ENG'),
(4, 'History', 'HIS'),
(5, 'Computer Science', 'CS')
ON DUPLICATE KEY UPDATE name = VALUES(name), code = VALUES(code);

INSERT INTO teacher_class_map (teacher_id, class_id) VALUES
(2, 10),
(3, 11)
ON DUPLICATE KEY UPDATE class_id = VALUES(class_id);

INSERT INTO students (id, student_code, full_name, class_id, roll_no, contact_email, contact_phone, enrollment_date) VALUES
(1, 'STU001', 'Aarav Sharma', 10, '10A-01', 'aarav.parent@example.com', '9876543210', '2024-04-01'),
(2, 'STU002', 'Diya Patel', 10, '10A-02', 'diya.parent@example.com', '9876543211', '2024-04-01'),
(3, 'STU003', 'Kabir Singh', 10, '10A-03', 'kabir.parent@example.com', '9876543212', '2024-04-01'),
(4, 'STU004', 'Meera Nair', 11, '10B-01', 'meera.parent@example.com', '9876543213', '2024-04-01'),
(5, 'STU005', 'Rohan Gupta', 11, '10B-02', 'rohan.parent@example.com', '9876543214', '2024-04-01')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), class_id = VALUES(class_id);

INSERT INTO scores (student_id, subject_id, created_by, exam_date, marks, test_score, max_marks, remarks) VALUES
(1, 1, 2, '2025-01-15', 88, 90, 100, 'Strong algebra'),
(1, 2, 2, '2025-01-15', 82, 84, 100, 'Consistent'),
(1, 3, 2, '2025-01-15', 79, 80, 100, NULL),
(1, 1, 2, '2025-02-15', 91, 92, 100, 'Improved'),
(1, 2, 2, '2025-02-15', 84, 86, 100, NULL),
(1, 3, 2, '2025-02-15', 81, 83, 100, NULL),
(2, 1, 2, '2025-01-15', 73, 75, 100, NULL),
(2, 2, 2, '2025-01-15', 77, 78, 100, NULL),
(2, 3, 2, '2025-01-15', 85, 86, 100, 'Excellent writing'),
(2, 1, 2, '2025-02-15', 76, 78, 100, NULL),
(2, 2, 2, '2025-02-15', 74, 76, 100, NULL),
(2, 3, 2, '2025-02-15', 87, 88, 100, NULL),
(3, 1, 2, '2025-01-15', 58, 60, 100, 'Needs practice'),
(3, 2, 2, '2025-01-15', 64, 65, 100, NULL),
(3, 3, 2, '2025-01-15', 61, 63, 100, NULL),
(3, 1, 2, '2025-02-15', 35, 37, 100, 'Declining'),
(3, 2, 2, '2025-02-15', 39, 41, 100, NULL),
(3, 3, 2, '2025-02-15', 36, 38, 100, NULL),
(4, 1, 3, '2025-01-15', 92, 94, 100, 'Top performer'),
(4, 2, 3, '2025-01-15', 89, 91, 100, NULL),
(4, 3, 3, '2025-01-15', 90, 90, 100, NULL),
(4, 1, 3, '2025-02-15', 94, 95, 100, NULL),
(4, 2, 3, '2025-02-15', 91, 92, 100, NULL),
(4, 3, 3, '2025-02-15', 92, 93, 100, NULL),
(5, 1, 3, '2025-01-15', 66, 67, 100, NULL),
(5, 2, 3, '2025-01-15', 69, 70, 100, NULL),
(5, 3, 3, '2025-01-15', 72, 73, 100, NULL),
(5, 1, 3, '2025-02-15', 68, 69, 100, NULL),
(5, 2, 3, '2025-02-15', 71, 72, 100, NULL),
(5, 3, 3, '2025-02-15', 74, 75, 100, NULL)
ON DUPLICATE KEY UPDATE marks = VALUES(marks), test_score = VALUES(test_score);

INSERT INTO attendance (student_id, attendance_date, status, attendance_percent) VALUES
(1, '2025-01-15', 'Present', 96),
(1, '2025-02-15', 'Present', 97),
(2, '2025-01-15', 'Present', 94),
(2, '2025-02-15', 'Present', 95),
(3, '2025-01-15', 'Present', 82),
(3, '2025-02-15', 'Late', 80),
(4, '2025-01-15', 'Present', 99),
(4, '2025-02-15', 'Present', 99),
(5, '2025-01-15', 'Present', 88),
(5, '2025-02-15', 'Present', 90)
ON DUPLICATE KEY UPDATE attendance_percent = VALUES(attendance_percent), status = VALUES(status);
