const { writeFile, copyFile } = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter your name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username (Required)',
            validate: userNameInput => {
                if (userNameInput) {
                    return true;
                } else {
                    console.log("Please enter your Username!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some info about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
}
//promptUser().then(answers => console.log(answers));

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);

    //if theres no 'projects' array, then create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your project? (Required)',
                validate: projectNameInput => {
                    if (projectNameInput) {
                        return true;
                    } else {
                        console.log("Please enter the name of your project!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description of the project (Required)',
                validate: descriptionInput => {
                    if (descriptionInput) {
                        return true;
                    } else {
                        console.log("Please enter a description of your project!");
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with? (Check all that apply)',
                choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Enter the GitHub link to your project. (Required)',
                validate: linkInput => {
                    if (linkInput) {
                        return true;
                    } else {
                        console.log("Please enter the link to your project!");
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'feature',
                message: 'Would you like to feature this project?',
                default: false
            },
            {
                type: 'confirm',
                name: 'confirmAddProject',
                message: 'Would you like to enter another project?',
                default: false
            }
        ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
          return generatePage(portfolioData);
        })
        .then(pageHTML => {
          return writeFile(pageHTML);
        })
        .then(writeFileResponse => {
          console.log(writeFileResponse);
          return copyFile();
        })
        .then(copyFileResponse => {
          console.log(copyFileResponse);
        })
        .catch(err => {
          console.log(err);
        });
      



// const pageHTML = generatePage(name, github);
// //above line is the same as:
// //const name = profileDataArgs[0]; const github = profileDataArgs[1];

// //console.log(profileDataArgs);

// //arrow function with only 1 parameter, doesn't need () around said parameter. profileDataArr being that parameter below
// // const printProfileData = profileDataArr => {
// //     //this
// //     for (let i = 0; i < profileDataArr.length; i++) {
// //         console.log(profileDataArr[i]);
// //     }

// //     console.log('============');

// //     //is the same as this
// //     profileDataArr.forEach(profileItem => console.log(profileItem));

// // };

// // printProfileData(profileDataArgs);


// //3 args passed in the writeFile function below: 
// //1) name(index.html) 
// //2) data being written (HTML string from above generatePage function) 
// //3) callback function to handle errors and successful message
// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });