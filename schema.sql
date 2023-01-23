DROP DATABASE IF EXISTS employee_trackerdb;
CREATE DATABASE employee_trackerdb;

USE employee_trackerdb;

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id),
    REFERENCES (roles_id),
    FOREIGN KEY (manager_id),
    REFERENCES (employee_id)
);

CREATE TABLE ROLES (
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES (department_id)
);

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30)
);
