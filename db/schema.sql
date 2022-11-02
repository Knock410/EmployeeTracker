-- Creates tables for the employee database

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL  
);


CREATE TABLE roles (
    role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    salary VARCHAR(255) NOT NULL,
    department_id INTEGER 
    );



CREATE TABLE employees ( 
    roles_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(225) NOT NULL,
    last_name VARCHAR(225) NOT NULL,
    manager VARCHAR(225) NOT NULL
);