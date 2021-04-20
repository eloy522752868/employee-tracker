const mysql = require('mysql');
const inquirer = require('inquirer');

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
        'Add department',
        'Add role',
        'Add an Employee',   
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add department':
          adddepartment();
          //artistSearch();
          break;
        case 'Add role':
          addrole();
          //artistSearch();
          break;
          case 'Add an Employee':
            addemployee();
            //artistSearch();
            break;
        case 'Exit':
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const artistSearch = () => {
  inquirer
    .prompt({
      name: 'artist',
      type: 'input',
      message: 'What artist would you like to search for?',
    })
    .then((answer) => {
      const query = 'SELECT position, song, year FROM top5000 WHERE ?';
      connection.query(query, { artist: answer.artist }, (err, res) => {
        res.forEach(({ position, song, year }) => {
          console.log(
            `Position: ${position} || Song: ${song} || Year: ${year}`
          );
        });
        runSearch();
      });
    });
};


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
          });

      });
  });
};


const addemployee= () => {
  const query1 = 'SELECT id,title FROM employee_tracker.role  ORDER BY name  ASC';
  connection.query(query1,  "", (err, res) => {
    const role = res.map((role) => {
      return {
        name: role.title,
        value: role.id,
      }
    }); 

    const query2 = 'SELECT id, first_name, last_name FROM employee_tracker.employee ORDER BY first_name  ASC';
    connection.query(query2,  "", (err, res) => {
      const emp = res.map((employee) => {
        return {
          name: employee.title,
          value: employee.id,
        }
      }); 
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
          connection.query(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
           console.log("Role as been added!");
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


const multiSearch = () => {
  const query =
    'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
  connection.query(query, (err, res) => {
    res.forEach(({ artist }) => console.log(artist));
    runSearch();
  });
};

const rangeSearch = () => {
  inquirer
    .prompt([
      {
        name: 'start',
        type: 'input',
        message: 'Enter starting position: ',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'end',
        type: 'input',
        message: 'Enter ending position: ',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      const query =
        'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
      connection.query(query, [answer.start, answer.end], (err, res) => {
        res.forEach(({ position, song, artist, year }) => {
          console.log(
            `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
          );
        });
        runSearch();
      });
    });
};

const songSearch = () => {
  inquirer
    .prompt({
      name: 'song',
      type: 'input',
      message: 'What song would you like to look for?',
    })
    .then((answer) => {
      console.log(answer.song);
      connection.query(
        'SELECT * FROM top5000 WHERE ?',
        { song: answer.song },
        (err, res) => {
          if (res[0]) {
            console.log(
              `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
            );
          } else {
            console.error(`No results for ${answer.song}`);
          }
          runSearch();
        }
      );
    });
};

const songAndAlbumSearch = () => {
  inquirer
    .prompt({
      name: 'artist',
      type: 'input',
      message: 'What artist would you like to search for?',
    })
    .then((answer) => {
      let query =
        'SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ';
      query +=
        'FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ';
      query +=
        '= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position';

      connection.query(query, [answer.artist, answer.artist], (err, res) => {
        console.log(`${res.length} matches found!`);
        res.forEach(({ year, position, artist, song, album }, i) => {
          const num = i + 1;
          console.log(
            `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
          );
        });

        runSearch();
      });
    });
};

