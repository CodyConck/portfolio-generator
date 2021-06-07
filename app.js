const fs = require('fs');
const generatePage = require('./src/page-template.js');
const profileDataArgs = process.argv.slice(2);
const [name, github] = profileDataArgs;
//above line is the same as:
//const name = profileDataArgs[0]; const github = profileDataArgs[1];

//console.log(profileDataArgs);

//arrow function with only 1 parameter, doesn't need () around said parameter. profileDataArr being that parameter below
// const printProfileData = profileDataArr => {
//     //this
//     for (let i = 0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('============');

//     //is the same as this
//     profileDataArr.forEach(profileItem => console.log(profileItem));
    
// };

// printProfileData(profileDataArgs);


//3 args passed in the writeFile function below: 
//1) name(index.html) 
//2) data being written (HTML string from above generatePage function) 
//3) callback function to handle errors and successful message
fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to see the output!');
});