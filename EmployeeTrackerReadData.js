const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Welcome!11',
  database: 'employee_tracker',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add Department',
        'Add Role',
        'Add Employee',  
        'View all Departments',
        'View all Roles',
        'View all Employee', 
        'Update Employee Roles', 
        'Exit', 
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add Department':
          adddepartment();
          //artistSearch();
          break;
        case 'Add Role':
          addrole();

          break;
        case 'Add Employee':
          addemployee();
          break;
          case 'View all Departments':
            departmentViewSearch();
            break;  
        case 'View all Roles':
              roleViewSearch() ;
              break;   
        case 'View all Employee':
                employeeViewSearch() ;
                break; 
        case 'Update Employee Roles':
                updateEmployee() ;
                break; 
             
        case 'Exit':
          connection.end();
          break;
      }
    });
};



const departmentViewSearch = () => {
  const query = 'SELECT id, name FROM department';
  console.log(" ");
  connection.query(query, "", (err, res) => {
    console.table(res);
    runSearch();
  });

}

const roleViewSearch = () => {
  const query = 'SELECT id , title, salary FROM role';
  console.log(" ");
  connection.query(query, "", (err, res) => {
  console.table(res);
    runSearch();
  });

}


const employeeViewSearch = () => {
  const query = 'SELECT id , first_name, last_name FROM employee';
  console.log(" ");
  connection.query(query, "", (err, res) => {
  console.table(res);
    runSearch();
  });

}

const addrole= () => {
  const query = 'SELECT id,name FROM employee_tracker.department  ORDER BY name  ASC';
  connection.query(query,  "", (err, res) => {
    const dep = res.map((department) => {
      return {
        name: department.name,
        value: department.id,
      }
    }); 
  inquirer
    .prompt([
    {
      name: 'addtitle',
      type: 'input',
      message: 'What title would you like to enter?',
    },
    {
      name: 'addsalary',
      type: 'input',
      message: 'What salary would you like to enter?',
    },
    
    {
      name: 'adddep',
      type: 'list',
      message: 'What would you like to do?',
      choices: dep ,
    },
    ])
    .then((answer) => {  
        const query = 'INSERT INTO role(title, salary,department_id) VALUES (?,?,?)';
          connection.query(query, [answer.addtitle, answer.addsalary, answer.adddep], (err, res) => {
           console.log("Role as been added!");
           runSearch();
          });
         
      });
  });

};



const updateEmployee= () => {
  const query1 = 'SELECT id,title FROM employee_tracker.role  ORDER BY title  ASC';
  connection.query(query1,  "", (err, res) => {
    const role = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      }
    }); 

    const query2 = 'SELECT id, first_name, last_name FROM employee_tracker.employee ORDER BY first_name  ASC';
    connection.query(query2,  "", (err, res1) => {
      const emp = res1.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name} `,
          value: employee.id,
        }
      }); 

  inquirer
    .prompt([   
    {
      name: 'selectemp',
      type: 'list',
      message: 'Select Employee you like change role to?',
      choices:  emp ,
    },
    {
      name: 'updaterole',
      type: 'list',
      message: 'What role will like to change it to?',
      choices: role ,
    },
    ])
    .then((answer) => {  

        const query = `UPDATE employee SET role_id = '${answer.updaterole}' where id  = '${answer.selectemp}'`;
          connection.query(query, "" , (err, res) => {
           console.log("Role as been added!");
           runSearch();
          });
         
      });
    }); 
  });

};

  

const addemployee= () => {
  var emp2;
  const query1 = 'SELECT id,title FROM employee_tracker.role  ORDER BY title  ASC';
  connection.query(query1,  "", (err, res) => {
    const role = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      }
    }); 

    const query2 = 'SELECT id, first_name, last_name FROM employee_tracker.employee ORDER BY first_name  ASC';
    connection.query(query2,  "", (err, res1) => {
      const emp = res1.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name} `,
          value: employee.id,
        }
      }); 
  
  inquirer
    .prompt([
    {
      name: 'addfistname',
      type: 'input',
      message: 'Enter first name ?',
    },
    {
      name: 'addlastname',
      type: 'input',
      message: 'Enter last name?',
    },
    
    {
      name: 'addrole',
      type: 'list',
      message: 'Enter Role?',
      choices: role  ,
    },
    {
      name: 'addemp',
      type: 'list',
      message: 'Enter Employee?',
      choices: emp  ,
    },
    ])
    .then((answer) => {  
        const query = 'INSERT INTO employee(first_name, last_name,role_id,manager_id) VALUES (?,?,?,?)';
          connection.query(query, [answer.addfistname, answer.addlastname, answer.addrole, answer.addemp], (err, res) => {
          runSearch();
          console.log("Employee as been added!");
          });
      });
    }); 
   
  });
};



const adddepartment= () => {
  inquirer
    .prompt({
      name: 'adddepartment',
      type: 'input',
      message: 'What department would you like to enter?',
    })
    .then((answer) => {
      const query = 'INSERT INTO department(name) VALUES (?)';
      connection.query(query,  answer.adddepartment , (err, res) => {
      console.log("Department as been added!");
      runSearch();
      });
    });
};


