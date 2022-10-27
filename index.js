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

//list departments
function showDepartments() {
  db.promise()
    .query("SELECT department.id, department.department_name FROM department;")
    .then((departments) => {
      console.table(departments[0]);
      mainMenuPrompt();
    });
}

function showRoles() {
  db.promise()
  .query("SELECT role_id, title, salary, department_id FROM role;")
  .then((roles)=> {
    console.table(roles[0]);
   mainMenuPrompt();
  });
}

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

const addRolePrompts = [
  {
    type: "input",
    name: "role_id",
    message: "Please input a role ID",
    
  },

  {
    type: "input",
    name: "title",
    message: "Please input a job title",
    
  },

  {
    type: "input",
    name: "department_id",
    message: "Please input a department ID",
    
  },

  {
    type: "input",
    name: "salary",
    message: "Please input a salary",
    
  }
  
];

// "View all departments",
//         "View all roles",
//         "View all employees",
//         "Add a department",
//         "Add a role",
//         "Add an employee",
//         "Update an employee"

function mainMenuPrompt() {
  inquirer.prompt(MenuQuestions).then(function(selection){
    console.log(selection.answer);
    const answer = selection.answer;
    if(answer === "View all departments"){
      showDepartments()
    }
    else if( answer === "Add a department"){
      promptAddDepartments()
    }
    if( answer === "View all roles"){
      showRoles()
    }
    else if( answer === "Add a role"){
      promptAddRoles()
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

});
}

function addRoles(role_id, title, salary, department_id ){
  db.promise()
  .query("INSERT INTO roles (role_id, title, salary, department_id) VALUES (?,?,?.?) ",[role_id, title, salary, department_id] )
  .then((newRoles) => {
    console.log(newRoles[0]);
    mainMenuPrompt()
  });
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
//Prompt for adding a new role 
function promptAddRoles(){
  inquirer.prompt(addRolePrompts).then(function(inputs){
    console.log(inputs.roles_id, inputs.title, inputs.salary, inputs.department_id);
    const newRoleId = inputs.roles_id
    const newRoleTitle = inputs.title
    const newRoleSalary = inputs.salary
    const newRDepartmentId = inputs.deparment_id
    addRoles( newRoleId, newRoleTitle,newRoleSalary, newRDepartmentId  );
  });
  
  }


  mainMenuPrompt()