INSERT INTO department (name)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1), ("Salesperson", 80000.00, 1), ("Lead Engineer", 150000.00, 2), ("Software Engineer", 120000.00, 2), ("Account Manager", 140000.00, 3), ("Accountant", 125000.00, 3), ("Legal Team Lead", 250000.00, 4), ("Lawyer", 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Henry", "Blake", 1, null), ("Sherman", "Potter", 3, null), ("Margaret", "Houlihan", 5, null), ("Frank", "Burns", 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Walter", "O'Reiley", 2, 1), ("Maxwell", "Klinger", 4, 2), ("Benjamin", "Pierce", 6, 3), ("John", "McIntire", 8, 4);