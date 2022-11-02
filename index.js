const e = require("express");
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
  .query("SELECT role_id, title, salary, department_id FROM roles;")
  .then((roles)=> {
    console.table(roles[0]);
   mainMenuPrompt();
  });
}

function showEmployees() {
  db.promise()
  .query("SELECT first_name, last_name, roles_id, manager FROM employees;")
  .then((employees)=> {
    console.table(employees[0]);
   mainMenuPrompt();
  });
}

//Questions to add a department 
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
//Questions to add a role 
const addRolePrompts = [
  {
    type: "input",
    name: "roles_id",
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
//Questions to add a employee
const addEmployeePrompts = [
  {
    type: "input",
    name: "first_name",
    message: "Please input a first name",
    
  },

  {
    type: "input",
    name: "last_name",
    message: "Please input a last name",
    
  },

  {
    type: "input",
    name: "role_id",
    message: "Please input a role id number" 
  },

  {
    type: "input",
    name: "manager",
    message: "Please input a manager",
    
  }
  
];


//Main menu prompt to run relevant functions depending on the choices of the user 
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
    if(answer === "View all employees"){
      showEmployees()
    }
    else if( answer === "Add an employee"){
      promptAddEmployees()
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
//adds to the role table 
function addRoles(role_id, title, salary, department_id ){
  db.promise()
  .query("INSERT INTO roles (role_id, title, salary, department_id) VALUES (?,?,?,?) ",[role_id, title, salary, department_id] )
  .then((newRoles) => {
    console.log(newRoles[0]);
    mainMenuPrompt()
  });
}
//adds to the employee table 
function AddEmployees(first_name, last_name, roles_id, manager){
  db.promise()
  .query("INSERT INTO employees (first_name, last_name, roles_id, manager) VALUES (?,?,?,?) ",[first_name, last_name, roles_id, manager] )
  .then((newEmployees) => {
    console.log(newEmployees[0]);
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
    const newRDepartmentId = inputs.department_id
    addRoles( newRoleId, newRoleTitle,newRoleSalary, newRDepartmentId  );
  });
  
  }
//Prompt forr adding a new employee
  function promptAddEmployees(){
    inquirer.prompt(addEmployeePrompts).then(function(inputs){
      console.log(inputs.first_name, inputs.last_name, inputs.role_id, inputs.manager);
      const newFirstName = inputs.first_name
      const newLastName = inputs.last_name
      const newRole = inputs.role_id
      const newManager = inputs.manager 
      AddEmployees( newFirstName, newLastName,newRole, newManager );
    });
    
    }
  

  mainMenuPrompt()
   
  //Things to fix 
  //Roles on department_id- intergers retun null 
  //Salary on roles-intergers is rounded up 