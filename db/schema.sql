

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL  
);


CREATE TABLE roles (
    role_   id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER, 
  
    );



-- CREATE TABLE employees (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     roles_id INTEGER,
--     FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
--     manager_id INTEGER NULL,
   
-- );