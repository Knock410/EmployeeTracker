const inquirer = require("inquirer");
const mysql = require('mysql2');

const MenuQuestions = [
    {
      type: "list",
      name: "answer",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
      ],
    },
];

const addDepartmentsPrompts = [
  {
    type: "input",
    name: "id",
    message: "Please input a department ID",
    
  },

  {
    type: "input",
    name: "department_name",
    message: "Please input a department name",
    
  }
  
];
function mainMenuPrompt() {
  inquirer.prompt(MenuQuestions).then(function(selection){
    console.log(selection.answer);
    const answer = selection.answer;
    if(answer === "View all departments"){
      listDepartments()
    }
    else if( answer === "Add a department"){
      promptAddDepartments()
    }
    
  });


 
  
}

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'password',
    database: 'employeetracker'
  },
  console.log(' Welcome to the employeetracker database.')
);
//adds to department table
function addDepartments(id, department_name) {
db.promise()
.query("INSERT INTO department (id, department_name) VALUES (?,?) ",[id,department_name] )
.then((newDepartments) => {
  console.log(newDepartments[0]);
  mainMenuPrompt()

})


}
//Prompt for adding new department
function promptAddDepartments(){
inquirer.prompt(addDepartmentsPrompts).then(function(inputs){
  console.log(inputs.id, inputs.department_name);
  const newDepartmentsId = inputs.id
  const newDepartmentNames = inputs.department_name
  addDepartments( newDepartmentsId, newDepartmentNames );
});

}
function listDepartments() {
    db.promise()
      .query("SELECT department.id, department.department_name FROM department;")
      .then((departments) => {
        console.table(departments[0]);
        mainMenuPrompt();
      });
  }
//add a department
// app.post('/api/departments', ({ body }, res) => {
//     const errors = inputCheck(body, 'id', 'department_name');
//     if (errors) {
//       res.status(400).json({ error: errors });
//       return;
//     }
//   });

  //link inquirer to view and create departments 
  //

  mainMenuPrompt()