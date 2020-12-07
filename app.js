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
let addMore = false;

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
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
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is this manager's office phone number?",
    when: (answers) => answers.role === "Manager",
  },
  {
    type: "input",
    name: "school",
    message: "What school is this intern attending?",
    when: (answers) => answers.role === "Intern",
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

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
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

const checkDir = (dir) => {
  // check if dir exists and create if it doesn't
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const writeHTML = (html) => {
  checkDir(OUTPUT_DIR);
  fs.writeFile(outputPath, html, (error) => {
    error ? console.log(error.message) : console.log(`File succesfully writen to '${outputPath}'`);
  });
};

addEmployee();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
