INSERT INTO department(name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");
        

INSERT INTO role (title, salary, department_id)
VALUES  ("Software Engineer", 35000.00, 1),
        ("Lead Engineer", 60000.00, 1),
        ("Salesperson", 25000.00, 2),
        ("Sales Lead", 45000.00, 2),
        ("Account Manager", 50000.00, 3),
        ("Accountant", 30000.00, 3),
        ("Lawyer", 75000.00, 4),
        ("Legal Team Lead", 100000.00, 4);


INSERT INTO employee(first_name, last_name, role_id,manager_id )
VALUES  ("Bradley","Cooper",2,NULL),
        ("Rory","Lee",1,1),
        ("Aisha","Ray",4,NULL),
        ("Mohammad","Ali",3,3),
        ("Amy","Jordan",3,3);






