import inquirer from 'inquirer';
const database = '[]';
const DB = (database) => {
    let data;
    if (typeof (database) === 'string') {
        data = JSON.parse(database);
    } else {
        data = database;
    }

    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the user\'s name. To cancel press ENTER:',
    }, {
        type: 'list',
        name: 'gender',
        message: 'Choose user\'s gender:',
        choices: ['male', 'female'],
        when: (answer) => answer.name
    },
    {
        type: 'input',
        name: 'age',
        message: 'Enter user\'s age:',
        when: (answer) => answer.name
    },
    {
        type: 'confirm',
        name: 'search',
        message: 'Would you to search values in DB:',
        when: (answer) => !answer.name
    }])
        .then(answers => {
            if (!answers.name) {
                if (answers.search) {
                    console.log(data)
                    serchinDB(data)
                } else {
                    database = JSON.stringify(data);
                    console.log('Bye bye!')
                    return;
                }
            } else {
                data.push(answers);
                DB(data)
            }
        })

}

function serchinDB(data) {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'enter user\'s name want to find in DB:'
        }
    ]).then(answers => {
        data.filter(user => {
            if ((user.name).toLowerCase() === (answers.name).toLowerCase()) {
                console.log(`User ${user.name} was found:` + '\n', user);
           
            } else {
                console.log(`User ${user.name} not found:`);
            }
        })
    })
}

DB(database);
