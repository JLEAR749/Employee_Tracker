const db = require ('./db')
const { prompt } = require ('inquirer')
const mysql = require('mysql2')
const cTable= require('console.table')

function Questions(){
  prompt(
    [
      {
        type: 'list',
        name: 'title',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all employees','add a department', 'add a role', 'add an employee', 'view roles','update an employee role','End']
      }
    ]
  )
.then((answer) => {

}
 console.log("RESPONSE: ", answers)
// viewAllEmployees()
})
}
Questions()


function viewAllEmployees(){
  db.findAllEmployee()
.then( function(answers){
  console.log("ANSWERS: ", answers)
}) 
}

