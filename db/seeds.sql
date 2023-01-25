INSERT INTO department(name)
VALUES 
        ("Sales"), 
        ("Customer Service"), 
        ("Marketing"), 
        ("Engineering");

INSERT INTO ROLES (title, salary, department_id)
VALUES  ("Sales Manager", 60000,1),
        ("Sales Person", 45000,1),
        ("Head Engineer", 85000,2),
        ("Testing Engineer",65000,2),
        ("Software Engineer", 90000,2),
        ("Customer Service Rep", 40000,3),
        ("Marketing Manager",45000, 4),
        ("Marking Intern",35000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Bret", "Johnson", 1, null),
        ("Diane", "Larson", 2, 1),
        ("Karen", "Smith", 3, null),
        ("Brenda", "Johnson", 4, 3),
        ("Kari", "Weiss", 5, 3),
        ("Andy", "Grayson", 6, 3),
        ("Johnny", "Baker", 7,null),
        ("Robert", "Petersen", 8, 7);