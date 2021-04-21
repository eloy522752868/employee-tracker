DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE  employee_tracker;

  -- create table department
CREATE TABLE department
(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id  INT  NOT NULL AUTO_INCREMENT PRIMARY KEY
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
)
  -- create table role
CREATE TABLE role
(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id  INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(30) NOT NULL,

  salary  DECIMAL,

  department_id  INT
)
  -- create table employee
CREATE TABLE employee
(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,

  role_id INT,

  manager_id  INT
)