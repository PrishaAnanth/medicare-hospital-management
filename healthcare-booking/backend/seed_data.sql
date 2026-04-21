
INSERT INTO users (username, password_hash, role) VALUES ('doc_smith', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'doctor');
INSERT INTO users (username, password_hash, role) VALUES ('doc_jones', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'doctor');
INSERT INTO users (username, password_hash, role) VALUES ('doc_drake', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'doctor');

INSERT INTO users (username, password_hash, role) VALUES ('patient_amy', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'patient');
INSERT INTO users (username, password_hash, role) VALUES ('patient_bob', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'patient');
INSERT INTO users (username, password_hash, role) VALUES ('patient_tim', '$2b$12$R.S/O2vG4vUqS.QpS1.Bte9t9eW9P.0qCgK//MpwB77C.hF1pLzG.', 'patient');

INSERT INTO doctors (id, name, specialization, start_hour, end_hour, user_id) VALUES (1, 'Dr. Smith', 'Cardiologist', 9, 17, 1);
INSERT INTO doctors (id, name, specialization, start_hour, end_hour, user_id) VALUES (2, 'Dr. Jones', 'Dermatologist', 10, 16, 2);
INSERT INTO doctors (id, name, specialization, start_hour, end_hour, user_id) VALUES (3, 'Dr. Drake', 'Neurologist', 8, 14, 3);

INSERT INTO appointments (doctor_id, patient_name, slot) VALUES (1, 'patient_amy', '2026-05-10 10:00:00');
INSERT INTO appointments (doctor_id, patient_name, slot) VALUES (1, 'patient_bob', '2026-05-10 11:00:00');
INSERT INTO appointments (doctor_id, patient_name, slot) VALUES (2, 'patient_tim', '2026-05-11 12:00:00');
INSERT INTO appointments (doctor_id, patient_name, slot) VALUES (2, 'patient_amy', '2026-05-11 14:00:00');
INSERT INTO appointments (doctor_id, patient_name, slot) VALUES (3, 'patient_amy', '2026-05-12 09:00:00');
