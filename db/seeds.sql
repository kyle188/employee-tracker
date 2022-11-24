USE employees_db;

INSERT INTO department (name)
VALUES 
('Engineering'),
('Finance'),
('Legal'),
('Human Resources'),
('Design'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 110000, 1),
('Accountant', 70000, 2),
('Lawyer', 150000, 3),
('HR Rep', 70000, 4),
('Web Designer', 90000, 5),
('Sales Rep', 70000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kyle', 'Keller', 1, 7),
('Felix', 'Ferrel', 2, 15),
('Amber', 'Andrews', 3, 35),
('Lisa', 'Lopez', 4, 77),
('Mark', 'Meadows', 5, 81),
('Travis', 'Taylor', 6, 88);
