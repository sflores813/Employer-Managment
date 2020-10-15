DROP DATABASE IF EXISTS employee_databaseDB;
CREATE DATABASE employee_databaseDB;
USE employee_databaseDB;

CREATE TABLE department
(
    id INT
    AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR
    (30)
);

    CREATE TABLE role
    (
        id INT
        AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR
        (30),
    salary DECIMAL
        (10,2),
    department_id INT
);


        CREATE TABLE employee
        (
            id INT
            AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR
            (30),
    last_name VARCHAR
            (30),
    role_id INT,
    manager_id INT NULL
);