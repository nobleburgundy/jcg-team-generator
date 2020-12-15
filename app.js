const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeArray = [];

const questions = [
  {
    type: "input",
    name: "name",
    message: "Employee name: ",
    validate: (value) => {
      if (value) return true;
      return "Name is required.";
    },
  },
  {
    type: "input",
    name: "email",
    message: "Employee email: ",
    validate: (value) => {
      if (value) return true;
      return "Email is required.";
    },
  },
  {
    type: "input",
    name: "id",
    message: "Employee ID: ",
    validate: (value) => {
      if (value) return true;
      return "ID is required.";
    },
  },
  {
    type: "rawlist",
    name: "role",
    message: "Employee role: ",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "github",
    message: "What is this engineers GitHub username?",
    when: (answers) => answers.role === "Engineer",
    validate: (value) => {
      if (value) return true;
      return "Github username is required.";
    },
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is this manager's office phone number?",
    when: (answers) => answers.role === "Manager",
    validate: (value) => {
      if (value) return true;
      return "Phone # is required.";
    },
  },
  {
    type: "input",
    name: "school",
    message: "What school is this intern attending?",
    when: (answers) => answers.role === "Intern",
    validate: (value) => {
      if (value) return true;
      return "School is required.";
    },
  },
  {
    type: "confirm",
    name: "addMore",
    message: "Would you like to add another employee?",
    validate: (value) => {
      console.log(value);
      addMore = value;
    },
  },
];

const getEmployeeObject = (answers) => {
  switch (answers.role) {
    case "Manager":
      return new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    case "Engineer":
      return new Engineer(answers.name, answers.id, answers.email, answers.github);
    default:
      return new Intern(answers.name, answers.id, answers.email, answers.school);
  }
};

const addEmployee = () => {
  inquirer
    .prompt(questions)
    .then((answers) => {
      // add employee object to array
      employeeArray.push(getEmployeeObject(answers));

      // If .addMore is true, start over to add new employee
      if (answers.addMore) {
        addEmployee();
      } else {
        console.log(`DONE. ${employeeArray.length} employees added.`);
        let html = render(employeeArray);
        writeHTML(html);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// check if dir exists and create if it doesn't
const checkDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// write the HTML file
const writeHTML = (html) => {
  checkDir(OUTPUT_DIR);
  fs.writeFile(outputPath, html, (error) => {
    error ? console.log(error.message) : console.log(`File succesfully writen to '${outputPath}'`);
  });
};

addEmployee();
