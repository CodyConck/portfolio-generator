const profileDataArgs = process.argv.slice(2, process.argv.length);
//console.log(profileDataArgs);

//arrow function with only 1 parameter, doesn't need () around said parameter. profileDataArr being that parameter below
const printProfileData = profileDataArr => {
    //this
    for (let i = 0; i < profileDataArr.length; i++) {
        console.log(profileDataArr[i]);
    }

    console.log('============');

    //is the same as this
    profileDataArr.forEach(profileItem => console.log(profileItem));
    
};

printProfileData(profileDataArgs);