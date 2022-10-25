const inquirer = require("inquirer");


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

function listDepartments() {
    db.promise()
      .query("SELECT departments.id, departments.department_name FROM departments;")
      .then((departments) => {
        console.table(departments[0]);
        menuQuestion();
      });
  }
//add a department
app.post('/api/departments', ({ body }, res) => {
    const errors = inputCheck(body, 'id', 'department_name');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  });

  //link inquirer to view and create departments 
  //