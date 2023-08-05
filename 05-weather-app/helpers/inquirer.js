require('colors');
const inquirer = require('inquirer');

const inquirerMenu = async () => {
  console.clear();
  console.log('==========='.magenta);
  console.log(' Select an option '.magenta);
  console.log('===========\n'.magenta);

  const questions = [
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        {
          value: 1,
          name: `${'1.'.magenta} Search city`,
        },
        {
          value: 2,
          name: `${'2.'.magenta} History`,
        },
        { value: 0, name: `${'0.'.magenta} Exit \n` },
      ],
    },
  ];

  const { option } = await inquirer.prompt(questions);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue`,
    },
  ];

  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Please enter a value';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    const index = `${i + 1}`.magenta;
    return { value: place.id, name: `${index} ${place.name}` };
  });

  // choices.unshift({ value: 0, name: '0.'.magenta + ' Cancel' });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  confirm,
  listPlaces,
};
