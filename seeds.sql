INSERT INTO department(id, department_name)
VALUES 
        (1,"Sales"), --dept 1
        (2,"Customer Service"), -- dept 3
        (3,"Marketing"), --dep 4
        (4,"Engineering"); --dept 2

INSERT INTO role (id, title, salary, department_id)
VALUES  (7104, Sales Manager, 60000,1),
        (7100, Sales Person, 45000,1),
        (6102, Head Engineer, 85000,2),
        (6130,Testing Engineer,65000,2),
        (6144, Software Engineer, 90000,2),
        (8293, "Customer Service Rep", 40000,3),
        (5301,"Marketing Manager",4),
        (5369,"Marking Intern",4);

INSERT INTO EMPLOYEE(first_name, last_name, role_id, manager_id)
VALUES  ("Bret", "Johnson", 7104, null),
        ("Diane", "Larson", 7100, 7104),
        ("Karen", "Smith", 6102, null),
        ("Brenda", "Johnson", 6130,6102),
        ("Kari", "Weiss", 6144,6102),
        ("Andy", "Grayson", 829, null),
        ("Johnny", "Baker", 5301,null),
        ("Robert", "Petersen", 5369, 5301);
