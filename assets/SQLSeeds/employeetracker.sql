DROP DATABASE IF EXISTS employee_tracker;

-- Create easy bay database --
CREATE DATABASE employee_tracker;

  -- Open greateby table
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
  -- Makes a string column called "item_name" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  -- Makes a string column called "category" which cannot contain null --
  salary  DECIMAL,
  -- Makes an numeric column called "starting_bid" --
  department_id  INT
)
  -- create table employee
CREATE TABLE employee
(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "item_name" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  -- Makes a string column called "category" which cannot contain null --
  last_name VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "starting_bid" --
  role_id INT,
  -- Makes an numeric column called "highest_bid" --
  manager_id  INT
)