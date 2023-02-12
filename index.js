const inquirer = require('inquirer')
const mysql = require('mysql2');
const { beginTransaction, query } = require('./db/connection');
const connection = require('./db/connection')
const util = require('util');
const fs = require('fs');

const Department = require('');
const Role = require('')
const employees = [];

const empChoices = [];

const options = ['add department',
  'add role',
  'add employee',
  'view departments',
  'view roles',
  'view employees by manager',
  'view employees',
  'view the budget',
  'update roles',
  'update employee manager',
  'delete department',
  'delete role',
  'delete employee',
  'exit',
];

const roleQuestions = [
  {
    name: 'role_title',
    type: 'input',
    message: 'Enter role title',
  },
  {
    name: 'role_salary',
    type: 'input',
    message: 'Enter role salary',
  },
];
const employeeQuestions = [
  {
    name: 'first_name',
    type: 'input',
    message: 'Enter employee first name',
  },
  {
    name: 'last_name',
    type: 'input',
    message: 'Enter employee last name',
  },
];

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'YOUR USER ID',
  passwor: '',
  database: 'employee_tracker_db',
  multipleStatements: true,
});

const sql =
  'SELECT * FROM department; SELECT * FROM role; SELECT * FROM employee';
connect.query(sql, (err, row) => {
  if (err) throw err;
  for (dep of row[0]) {
    const temp = new Department(dep.id, dep.name);
    department.push(temp);
  }
  for (role of row[1]) {
    const temp = new Role(role.id, role.title, role.salary, role.department_id);
    roles.push(temp);
  }
  for (emp of row[2]) {
    const temp = new Employee(
      emp.id,
      emp.first_name,
      emp.last_name,
      emp.role_id
    );
    if (emp.manager_id) {
      temp.setManagerId(emp.manager_id);
    }
    employees.push(temp);
  }

  start();
});

const start = () => {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: options,
  })
    .then((answer) => {
      if (answer.action == 'add department') {
        addDepartment();
      }
      if (answer.action == 'add role') {
        addRole();
      }
      if (answer.action == 'add employee'){
        addEmployee();
      }
      if (answer.action == 'view departments') {
        const sql = 'SELECT * FROM department;';
        connection.query(sql, (err, row) => {
          if (err) throw err;
          console.table(row);
          start();
        });
      }
      if (answer.action == 'view roles') {
        const sql = 'SELECT * FROM role;';
        connection.query(sql, (err, row) => {
          if (err) throw err;
          console.table(row);
          start();
        });
      }
      if (answer.action == 'view employees') {
        const sql = 'SELECT * FROM employee;';
        connection.query(sql, (err, row) => {
          if (err) throw err;
          console.table(row);
          start();
        });
      }
      if (answer.action == 'view employees by manager') {
        viewByManager();
      }
      if (answer.action == 'view the budget') {
        totalBudget();
      }
      if (answer.action == 'update roles') {
        updateEmpRole();
      }
      if (answer.action == 'update roles') {
        updateEmpRole();
      }
      if (answer.action == 'update roles') {
        deleteDepartment();
      }
      if (answer.action == 'delete roles') {
        deleleRole();
      }
      if (answer.action == 'delete employee ') {
        deleteEmployee();
      }
      if (answer.action == 'Exit') {
        process.exit();
      }
    });
};

const addDepartment = () => {
  inquirer.prompt({
    type: 'input',
    name: 'department_name',
    message: 'Enter department name',
  })
    .then((input) => {
      if (input) {
        const sql = `INSERT INTO department (name) VALUES ('${input.department_name}');`;
        connection.query(sql, (err, row) => {
          if (err) throw err;
          const temp = new Department(row.insertId, input.department_name);
          departments.push(temp);
          console.log('department added');
          start();
        });
      }
    });
};
const addRole = () => {
  const deps = [];
  for (dep of deparments) {
    deps.push(dep.getName());
  }
  inquirer.prompt(roleQuestions).then((answer) => {
    const tite = answer.role_title;
    const salary = answer.role_salary;

    inquirer.prompt({
      type: 'list',
      name: 'department',
      message: 'select department',
      choices: deps,
    })
      .then((input) => {
        const index = deps.indexOf(input.department);
        const id = department[index].getID();
        const sql = `INSERT INTO role (department_id, title, salary) VALUES('${id}', '${title}', '${salary}');`;
        connection.query(sql, (err, row) => {
          if (err) throw err;
          const temp = new Role(row.insertId, title, salary, id);
          roles.push(temp);
          console.log('role added');
          start();
        });
      });
  });
};

const afterConnection = () => {
  console.log('Welcome to the Employee Tracker!')
  promptUser();
};

const promptUser = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you want to do?',
      choices: ['view all departments',
        'view all roles',
        'view all employees',
        'add a department',
        'add a role',
        'add an employee',
        'update a role',
        'update an employee manager',
        'view employees by department',
        'delete a department',
        'delete a role',
        'delete an employee',
        'view deparment budgets',
        'exit']
    }
  ]).then((result) => {
    console.log(result)
    switch (result.options) {
      case 'view all departments':
        showDepartments();
        break
      case 'view all roles':
        showRoles();
        break
      case 'view all employees':
        showEmployees();
        break
      case 'add a department':
        addDepartment();
        break
      case 'add a role':
        addRole();
        break
      case 'add an employee':
        addEmployee();
        break
      case 'update a role':
        updateRole();
        break
      case 'updateEmployeeManager':
        updateManager();
        break
      case 'view employees by department':
        employeeDepartment();
        break
      case 'delete a department':
        deleteDepartment();
        break
      case 'delete a role':
        deleleRole();
        break
      case 'delete employee':
        deleteEmployee();
        break
      case 'view department budget':
        viewBudget();
        break
      case 'exit':
        exit();
        break
    }
  })
}

const showDepartments = () => {
  console.log('All Departments')
  const sql = 'SELECT department.id AS id, department.name AS departmnet from department';

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

const showRoles = () => {
  console.log('All roles');

  const sql = 'SELECT roles.id, roles.title, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id';

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  })
};

const showEmployees = () => {
  const sql = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, manager.last_name)AS manager from employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;'
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    promptUser();
  });
};

const retrieveEmp = () => {
  const sql = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, manager.last_name)AS manager from employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;'
  return connection.promise().query(sql)
};

const addDepartment = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'addDepartment',
      message: 'What department do you want to add?',
    })
    .then(answer => {
      const sql = `INSERT INTO department (name)VALUES (?)`;
      connection.query(sql, answer.addDepartment, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addDepartment + ' to departments!');
        showDepartments()
      });
    });
};

const addRole = () => {
  const deps = [];
  for (deps of departments) {
    deps.push(dep.getName());
  
  }
  inquirer.prompt(roleQuestions).then((answer)=> {
    const title = answer.role_title;
    const salary = answer.role_salary;
    inquirer.prompt({
      type: 'list',
      name: 'department',
      message: 'Select Department',
      choices: deps,
    })
    .then((input) => {
      const index = deps.indexOf(input.department);
      const id = department[index].getID();
      const sql = `INSERT INTO role (department_id, title, salary) VALUES ('${id}', '${title}', '${salary}');`;
      connection.query(sql, (err, row)=>{
        if (err) throw err;
        const temp = new Role(row.insertId, title, salary,id);
        roles.push(temp);
        console.log('Role added');
        start();
      });
    });
  });
};
const addEmployee = () => {
  const role = [];
  const (rol of roles) {
    role.push(rol.getTitle());
  }
  const employee = [];
  for (emp of employees) {
    employee.push(emp.getFirstName() + '' + emp.getLastName());
  }
  inquirer.prompt(employeeQuestions).then((answer)=>{
    const firstName = answer.first_name;
    const lastName = answer.last_name;
    inquirer.prompt({
      type: 'list',
      name: 'rol',
      message: 'Select Role',
      choices: role,
    })
    .then((input)=>{
      const index = role.indexOf(input.rol);
      const manager_id = employee{index}.getID();
      const sql = `INSERT INTO employee` (role_id, first_name, last_name, manager_id) VALUES ('${role_id}', '${firstName}', '${lastName}');`; 
      if (index === employe.lenght -1) {
        sql =  `INSERT INTO employee (role_id, firstName, last_name)`VALUES ('${role_id}', '${firstName}', '${lastName}');`; 
      }
      connection.query(sql, (err,row)=>{
        if (err) throw err;
        const temp = new Employee(
          row.insertId,
          firstName,
          lastName,
          role_id
        );
        if (manager_id){
          temp.setManagerId(manager_id);
        }
        employee.push(temp);
        console.log('Employee added');
        start();
      });
    });
  });
});
};
const updateEmpRole = () => {
  const role = [];
  for (role of roles) {
    role.push(rol.getTitle());
  }
  const employeeNames = [];
  for (emp of employees) {
    employeeNames.push(emp.getFirstName() + '' + emp.getLastName();)
  }
  inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Select employee',
    choices: employeeNames,
  })
  .then((input)=>{
    const 
  })
}
    {
      type: 'input',
      name: 'role',
      message: 'What role do you want to add?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',

    }])
    .then(answer => {
      const params = [answer.role, answer.salary];
      const roleSql = `SELECT name, id FROM department`;

      connection.query(roleSql, (err, data) => {
        if (err) throw err;

        const department = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'department',
            message: 'What department is this role in?',
            choices: department
          }
        ])
          .then(deptChoice => {
            const dept = deptChoice.department;
            params.push(dept);
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added ' + answer.role + ' to roles!');
              showRoles();
            });
          });
      });
    });
}
const addEmployee = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'addEmployee',
      message: 'What employee do you want to add?',
    })
    .then(answer => {
      const sql = `INSERT INTO employee (name)VALUES (?)`;
      connection.query(sql, answer, (err, result) => {
        if (err) throw err;
        console.log('Added ' + answer.addEmployee + ' to employees!');
        showEmployee();
      }
      );
    });
};

const updateRole = () => {
  retrieveEmp().then(([rows]) => {

    const choices = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
    inquirer.prompt(
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update?',
        choices: choices
      })

      .then(answer => {
        console.log(answer)
        // const sql = ` `
        connection.query(sql, answer, (err, emplRes) => {
          if (err) throw err;

          emplRes.forEach(({ first_name, last_name, id }) => {
            empChoice.push({
              name: first_name + '' + last_name,
              value: id
            });
          });
        })

      })

    const sql = ` `
    connection.query(sql, answer, (err, emplRes) => {
      if (err) throw err;

      const empChoice = [];
      emplRes.forEach(({ first_name, last_name, id }) => {
        empChoice.push({
          name: first_name + '' + last_name,
          value: id
        });
      });
    })
  })
}
const updateManager = () => {
  const employees []
  for (emp of employees) [
    employees.push(emp.getFirstName() + "" + emp.getLastName());
}
inquirer.prompt([
  {
    type: 'list',
    name: 'name',
    message: 'Which employees would you like to update?',
    choices: employees,
  }
])
  .then((empChoice) => {
    const indexEMP = employee.indexof(input.name);
    const id = employees[indexEMP].getID();
    inquirer.prompt({
      type: 'list',
      name: 'name',
      message: 'Select manager',
      choices: employees,
    })
      .then((input) => {
        const index = employee.indexof(input.manager);
        const emp_id = employees[index].getID();
        const sql = `UPDATE employee SET manager_id=${emp.id} WHERE ID = ${id};`;
        connection.promise().query(sql, (err, rows) => {
          if (err) throw err;
          employees[indexEMP].setRoleId(emp_id);
          console.log('Employee manager updated');
          start();
        });
      });
  });

const employeeDepartment = () => {
  console.log('Employee by department');
  const sql = `SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id=department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    promptUser();
  });
};

const deleteDepartment = () => {
  const dept = [];
  for (dep of departments) {
    dept.push(dep.getName());
  }
  inquirer.prompt(
    {
      type: 'list',
      name: 'department',
      message: 'What department would you like to delete?',
      choices: dept,
    })
    .then((deptChoice) => {
      const sql = `DELETE FROM department WHERE name='${input.department}"`;
      connection.query(sql, dept, (err, result) => {
        if (err) throw err;
        console.log('Successfully deleted department!');
        start();
      });
    });
};

const deleleRole = () => {
  const roleSql = `SELECT * FROM role`;

  connection.query(roleSql, (err, data) => {
    if (err) throw err;

    const role = data.map(({ title, id }) => ({ name: tite, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What roles would you like to delete?',
        choices: role
      }
    ])
      .then((roleChoice) => {
        const role = roleChoice.role;

        const sql = `DELETE FROM role where id =?`;

        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log('Successfully deleted role!');
          showRoles();
        });
      });
  });
};

const deleteEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;

  connection.query(employeeSql, (err, data) => {
    if (err) throw err;

    const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + "" + last_name, value: id }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'What employees manager do you want to delete?',
        choices: employees
      }
    ])
      .then((empChoice) => {
        const employee = empChoice.name;

        const sql = `DELETE FROM employee where id =?`;

        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log('Successfully deleted employee!');
          showEmployees();
        });
      });
  });
};

const viewBudget = () =>
  const department = [];
  for (dep of departments) {
    departments.push(dep.getName());
  }
  inquirer.prompt(
    {
      type: 'list',
      name: 'viewBudget',
      message: 'Select department to view budget?',
      choices: departments,
    })
    .then((input) => {
      const sql = `CREATE TABLE sumSalary (SELECT employee.first_name, role.salary FROM employee INNER JOIN role ON employee.role_id= role.id INNER JOIN department ON department.id = role.department_id AND department.name = "${input.department}"); SELECT SUM(salary) total FROM sumSalary; DROP TABLE sumSalary`;
      connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(row[1]);
        start();
      });
    });