const inquirer = require('inquirer')
const mysql = require('mysql2');
const { beginTransaction, query } = require('./db/connection');
const Connection = require('./db/connection')
const util = require('util');
const fs = require('fs');

// const departments = require('');
// const role = require('')
// const employees = require('')

const departments = [];
const roles = [];
const employees = [];

const options = [
  'Add department',
  'Add role',
  'Add employee',
  'View departments',
  'View roles',
  'View employees by manager',
  'View employees',
  'View the budget',
  'Update roles',
  'Update employee manager',
  'Delete department',
  'Delete role',
  'Delete employee',
  'Exit',
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

var con = mysql.createConnection({
  host: 'localhost',
  port:3001,
  user: 'YOUR USER ID',
  password: '',
  database: 'employee_tracker_db',
  multipleStatements: true,
});

con.connect((err) => {
if (err) {
  throw err;
}
console.log('Connected');

const sql =
  'SELECT * FROM department; SELECT * FROM role; SELECT * FROM employee';
con.query(sql, (err, row) => {
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
      if (answer.action == 'View employees') {
        const sql = 'SELECT * FROM employee;';
        connection.query(sql, (err, row) => {
          if (err) throw err;
          console.table(row);
          start();
        });
      }
      if (answer.action == 'View employees by manager') {
        viewByManager();
      }
      if (answer.action == 'View the budget') {
        totalBudget();
      }
      if (answer.action == 'Update roles') {
        updateEmpRole();
      }
      if (answer.action == 'Update employee manager') {
        updateEmpManager();
      }
      if (answer.action == 'Delete deparment') {
        deleteDepartments();
      }
      if (answer.action == 'Delete roles') {
        deleleRole();
      }
      if (answer.action == 'Delete employee ') {
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
  for (dep of departments) {
    deps.push(dep.getName());
  }
  inquirer.prompt(roleQuestions).then((answer) => {
    const tite = answer.role_title;
    const salary = answer.role_salary;

    inquirer.prompt({
      type: 'list',
      name: 'department',
      message: 'Select department',
      choices: deps,
    })
      .then((input) => {
        const index = deps.indexOf(input.department);
        const id = department[index].getID();
        const sql = `INSERT INTO role (department_id, title, salary) VALUES('${id}', '${title}', '${salary}');`;
        con.query(sql, (err, row) => {
          if (err) throw err;
          const temp = new Role(row.insertId, title, salary, id);
          roles.push(temp);
          console.log('role added');
          start();
        });
      });
  });
};
const addEmployee = () => {
  const role=[];
  for (rol of roles) {
    role.push(rol.getTitle());
  }
  const employee=[];
  for (emp of employees) {
    employee.push(emp.getFirstName() + '' + emp.getLastName());
  }
  inquirer.prompt(employeeQuestions).then((answer)=>{
    const firstName = answer.first_name;
    const lastName = answer.last_name;

    inquirer.prompt({
      type: 'list',
      name:'rol',
      message: 'Select role',
      choices: role,
    })
    .then((input)=> {
      const index = role.indexOf(input.rol);
      const role_id = roles[index].getID();
      inquirer.prompt({
        type: 'list',
        name: 'manager',
        message: 'Select manager',
        choices: employee,
      })
      .then ((input) => {
        const index = employee.indexOf(input.manager);
        const manager_id = employees[index].getID();
        const sql = `INSERT INTO employee (role_id, first_name, last_name, manager_id) VALUES ('${role_id}', '${firstName}', '${lastName}','${manager_id}');`;
        if (index === employee.length - 1) {
          sql =`INSERT INTO employee (role_id, first_name, last_name) VALUES ('${role_id}', '${firstName}', '${lastName}');`; 
        }
        con.query(sql,(err,row)=>{
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

const updateEmpRole = () => {
  const role =[];
  for (role of roles) {
    role.push(rol.getTitle());
  }
  const employeeNames =[];
  for (emp of employees) {
    employeeNames.push(emp.getFirstName()+ '' + emp.getFirstName());
  }
  inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Select employee',
    choices: employeeNames,
  })
  .then((input)=> {
    const index = role.indexOf(input.role);
    const role_id = roles[index].getID();
    const sql = ` UPDATE employee SET role_id=${role_id} WHERE id=${id};`;

    con.query(sql, (err, row)=>{
      if (err) throw err;
      employee[indexEMP].setRoleId(role_id);
      console.log('Role updated');
      start();
      });
    });
  };

const viewByManager = () => {
  const employee = [];
  for (emp of employees) {
    employee.push(emp.getFirstName()+ '' + emp.getLastName());
  }
  inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Select employee',
    choices: employee,
  })
  .then((input)=>{
    const index = employee.indexOf(input.nme);
    const man_id = employees[index].getID();
    const sql2 = `SELECT * FROM employee WHERE manager_id='${man_id}'`;
    con.query(sql2, (err, row)=>{
      if (err) throw err;
      console.table(row);
      start();
    });
  });
};

const updateEmpManager = () => {
  const employe = [];
  for (emp of employees) {
    employee.push(emp.getFirstName() + '' + employe.getLastName());
  }
  inquirer.prompt({
    type: 'list',
    name: 'name',
    message: 'Select employee',
    choices: employe,
  })
  .then((input)=> {
    const indexEMP = employe.indexOf(input.name);
    const id = employees[indexEMP].getID();
    inquirer.prompt({
      type: 'list',
      name: 'manager',
      message:'Select manager',
      choices: employee,
    })
    .then((input)=>{
      const index = employee.indexOf(input.manager);
      const emp_id = employees[index].getID();
      const sql = `UPDATE employee SET manager_id=${emp_id};`;
      con.query(sql, (err, row)=>{
        if (err) thorw err;
        employees[indexEMP].setRoleId(emp_id);
        start();
      });
    });
  });
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

  const totalBudget = () =>
const department = [];
  for (dep of departments) {
    department.push(dep.getName());
  }
  inquirer.prompt({
      type: 'list',
      name: 'department',
      message: 'Select department to view budget?',
      choices: department,
    })
    .then((input) => {
      const sql = `CREATE TABLE sumSalary (SELECT employee.first_name, role.salary FROM employee INNER JOIN role ON employee.role_id= role.id INNER JOIN department ON department.id = role.department_id AND department.name = "${input.department}"); SELECT SUM(salary) total FROM sumSalary; DROP TABLE sumSalary`;
      con.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(row[1]);
        start();
      });
    });
  };

const employeeDepartment = () => {
  console.log('Employee by department');
  const sql = `SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id=department.id`;

  connection.promise().query(sql, (err, rows) => {
    if (err) throw err;
    promptUser();
  });
};

const deleteDepartment = () => {
  const departmentDel = [];
  for (dep of departments) {
    departmentDel.push(dep.getName());
  }
  inquirer.prompt({
      type: 'list',
      name: 'department',
      message: 'Select a department to delete',
      choices: departmentDel,
    })
    .then((input) => {
      const sql = `DELETE FROM department WHERE name='${input.department}"`;
      con.query(sql, (err, row) => {
        if (err) throw err;
        console.log('Successfully deleted department!');
        start();
      });
    });
};

const deleleRole = () => {
  const role = [];
  for (rol of roles){
    role.push(rol.getTitle());
  }
    inquirer.prompt([
      {
        type: 'list',
        name: 'role',
        message: 'Select role',
        choices: role,
      }
    ])
      .then((input) => {
        const index = role.indexOf(input.role);
        const role_id = roles[index].getID();
        const sql = `DELETE FROM role WHERE id='${role_id}'`;
        con.query(sql,(err, row) => {
          if (err) throw err;
          console.log('Successfully deleted role!');
          showRoles();
        });
      });
};

const deleteEmployee = () => {
  const role = [];
  for (emp of employees) {
    employee.push(emp.getFirstName() + '' + emp.getLastName());
  }
  inquirer.prompt({
        type: 'list',
        name: 'name',
        message: 'Select employee',
        choices: employee,
      })
      .then((input) => {
        const index = employee.indexOf(input.name);
        const id = employee[index].getID();
        const sql = `DELETE FROM employee WHERE id='${id}'`; 
        con.query(sql, (err) => {
          if (err) throw err;
          console.log('Successfully deleted employee!');
          start();
        });
      });
};

