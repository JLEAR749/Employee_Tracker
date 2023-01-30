const db = require('./db')
const { prompt, default: inquirer } = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')
const department = require('./routes/Department')
const { connection } = require('./db')
const Connection = require('mysql2/typings/mysql/lib/Connection')
const { listenerCount } = require('./db/connection')
const { getDepartment, newDepartment, departmentArrFill, roleArrFill, updateRole, getEmployees } = require

connection.connect((err) => {
  if (err) throw err;
  promptUser()
});

afterConnection = () => {
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
        'update an employee role',
        'update an employee manager',
        'view employees by department',
        'delete a department',
        'delete a role',
        'delete an employee',
        'view deparment budgets',
        'exit']
    }
  ]}

  showDepartments = () => {
    console.log('All Departments')
    const sql = 'SELECT department.id AS id, department.name AS departmnet from department';

    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      promptUser();
    });
  };

  showRoles = () => {
    console.log('All roles');

    const sql = 'SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id';

    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      promptUser();
    })
  };

  showEmployees = () => {
    console.log('All Employees');
    const sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, '',manager.last_name)AS manager from employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department.id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';

    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      promptUser();
    });
  };

  addDepartent = () => {
    inquirer.prompt(
      {
        type: 'input',
        name: 'addDepartment',
        message: 'What department do you want to add?',
      })
.then(answer => {
    const sql = `INSERT INTO department (name)VALUES (?)`;
    connection.query(sql, answer.addDepartment, (er,result)=> {
      if (err) throw err;
      console.log ('Added' + answer.addDepartment+ 'to departments!');
      showDepartments
    });
  });
};

addRole = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'role',
      message: 'What role do you want to add?',
    })
    {
      type:'input',
      name:'salary',
      message: 'What is the salary for this role?',

    }
.then((answer) => {
  const params = [answer.role, answer.salary];

connection.promise().query(roleSql, (err,data)=> {
  
})
addEmployee = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'addEmployee',
      message: 'What employee do you want to add?',
    })
.then((answer) => {
  connection.query(`INSERT INTO employee VALUE ?`,
  {
    employee_name: answer.addEmployee,
  },
  (err) => {
    if (err) throw err;
    console.log('Added employee successful!');
    showEmployee();
  }
  );
});
};

updateRole = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'updateRole',
      message: 'What role do you want to update?',
    })
.then((answer) => {
  connection.query(`INSERT INTO employee VALUE ?`,
  {
    role_name: answer.updateRole,
  },
  (err) => {
    if (err) throw err;
    console.log('Updated employee role successful!');
    showupdateRole();
  }
  );
});
};

updateManager = () => {
  const employeeSql = `SELECT * FROM employee`;
  
  connection. promise().query(employeeSql, (err, data)=> {
    if (err) throw err;

  const employee = data.map(({ id, first_name, last_name})=> ({name: first_name + ''+ last_name, value:id}));
  
  inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Which employees would you like to update?',
      choices: employees
    }
  ])
.then((empChoice) => {
  const employee = empChoice.name;
  const params = [];
  params.push(employee);

  const managersql = `SELECT FROM employee`;

  connection.query(managerSql, (err, date)=> {
    if (err) throw err;

  const managers = data.map(({id, first_name, last_name})=> ({name:first_name+''+last_name, value:id}));

  inquirer.prompt([
    {
    type:'list',
    name: 'manager',
    message: 'Who is the employees manager?',
    choices: managers
    }
  ])
  .then(managerChoice => {
    const manager =managerChoice.manager;
    params.push(manager);
    
    const employee =params[0]
    params[0]= manager
    params[1] = employee

    const sql =  `UPDATE employee SET manager_id = ? WHERE id =?`;

    connection.query(sql, params, (err, result)=> {
      if (err) throw err;
      console.log('Employee has been updated!');
      showEmployees();

    });
  });
});
}); 
});
};   

employeeDepartment = () => {
  console.log('Employee by department');
const sql =`SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id=department.id`;

connection.promise().query(sql, (err, rows)=> {
  if (err) throw err;
  promptUser();
});
};

deleteDepartment = () => {
  const deparmentSql = `SELECT * FROM department`;
  
  connection. promise().query(deparmentSql, (err, data)=> {
    if (err) throw err;

  const role = data.map(({ name, id})=> ({name: name, value:id}));
  
  inquirer.prompt([
    {
      type: 'list',
      name: 'department',
      message: 'What department would you like to delete?',
      choices: dept
    }
  ])
.then((deptChoice) => {
  const dept = deptChoice.dept;

  const sql = `DELETE FROM dept where id =?`;

  connection.query(sql, dept, (err, result)=> {
    if (err) throw err;
    console.log('Successfully deleted department!');
    showDepartments();
  });
});
});
};

deleleRole = () => {
  const roleSql = `SELECT * FROM role`;
  
  connection. promise().query(roleSql, (err, data)=> {
    if (err) throw err;

  const role = data.map(({ title, id})=> ({name: tite, value:id}));
  
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

  connection.query(sql, role, (err, result)=> {
    if (err) throw err;
    console.log('Successfully deleted role!');
    showRoles();
  });
});
});
};
  

deleteEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;
  
  connection. promise().query(employeeSql, (err, data)=> {
    if (err) throw err;

  const employees = data.map(({ id, first_name, last_name})=> ({name: first_name +"" +last_name, value:id}));
  
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

  connection.query(sql, employee, (err, result)=> {
    if (err) throw err;
    console.log('Successfully deleted employee!');
    showEmployees();
  });
});
});
};

viewBudget = () =>
  inquirer.prompt(
    {
      type: 'input',
      name: 'viewBudget',
      message: 'Showing budget by department?',
    })
.then((answer) => {
  const sql = `SELECT department_id AS id, department.name AS department, SUM(salary) AS budget FROM role JOIN department ON role.department_id= department.id GROUP BY department_id`;
 connection.promise().query(sql, (err, rows)=>{
  if (err) throw err;
  console.table(rows);

  promptUser();
 });
};