// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs')
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project? (Required)',
    validate: titleInput => {
      if (titleInput) {
        return true;
      } else {
        console.log('Please enter your title.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'What is your Github username? (Required)',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please enter your Github username.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address? (Required)',
    validate: githubInput => {
      if (githubInput) {
        return true;
      } else {
        console.log('Please enter your email address.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'what',
    message: 'What is your project and what does it do? (Required)',
    validate: whatInput => {
      if (whatInput) {
        return true;
      } else {
        console.log('Please enter what your project does.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'why',
    message: 'Why did you build this project? (Required)',
    validate: whyInput => {
      if (whyInput) {
        return true;
      } else {
        console.log('Please enter why you built this project.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'how',
    message: 'How will someone use your project? (Required)',
    validate: howInput => {
      if (howInput) {
        return true;
      } else {
        console.log('Please enter what your project is and how it works.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide step-by-step installation process. (Required)',
    validate: installInput => {
      if (installInput) {
        return true;
      } else {
        console.log('Please enter your installation instructions.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please show how your project is used. (Required)',
    validate: usageInput => {
      if (usageInput) {
        return true;
      } else {
        console.log('Please enter instructions on how to use your project')
        return false;
      }
    }
  },
  {
    type: 'list',
    name: 'license',
    message: 'Which license will you use for your project?',
    choices: ['no license', 'MIT', 'GNU GPLv3', 'Apache License 2.0']
  },
  {
    type: 'confirm',
    name: 'confirmContributers',
    message: 'Would you like to allow other developers to contribute on your project?',
    default: true
  },
  {
    type: 'input',
    name: 'contribute',
    message: 'Please provide guidelines for contributing. (Required)',
    when: ({ allowContributers}) => {
      if (allowContributers) {
        return true;
      } else {
        return false;
      }
    },
    validate: contributerInput => {
      if (contributerInput) {
        return true;
      } else {
        console.log ('Please enter guidelines for contributing.')
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'test',
    message: 'Please provide instructions on how to test the application. (Required)',
    validate: testInput => {
      if (testInput) {
        return true;
      } else {
        console.log('Please enter your test instructions.');
        return false;
      }
    }
  }
];

// TODO: Create a function to write README file
const writeFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./build/sample-README.md', fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File has been created!'
      });
    });
  });
};

// TODO: Create a function to initialize app
const init = () => {

  return inquirer.prompt(questions)
    .then(readmeData => {
      return readmeData;
    })
}

// Function call to initialize app
init()
  .then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
  })
  .then(pageMD => {
    return writeFile(pageMD);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message);
  })
  .catch(err => {
    console.log(err);
  })