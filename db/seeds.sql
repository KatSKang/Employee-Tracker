INSERT INTO department (name)
VALUES
    ('Research'),
    ('Finance'),
    ('Engineering'),
    ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lead Engineer', 200000, 3),
        ('Accounting Manager', 180000, 2),
        ('Sales Manager', 150000, 4),
        ('Senior Researcher', 200000, 1),
        ('Accountant', 100000, 2),
        ('Software Developer', 120000, 3),   
        ('Customer Service', 75000, 4),
        ('Associate Researcher', 85000, 1);

        
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Andrew', 'Frost', 1, NULL),
        ('Hwa', 'Lew', 2, NULL),
        ('Victor', 'Yang', 3, NULL),
        ('Vincent', 'Tzong', 4, NULL),
        ('Carlton', 'Henry', 5, 2),
        ('Alexander', 'Kang', 6, 1),
        ('Angela', 'Rogers', 7, 3),
        ('Hubert', 'Chon', 8, 4);
        