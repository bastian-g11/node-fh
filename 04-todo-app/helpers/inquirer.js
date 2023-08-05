const inquirer = require('inquirer');
require('colors');

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
          value: '1',
          name: `${'1.'.magenta} Create a task`,
        },
        {
          value: '2',
          name: `${'2.'.magenta} List all tasks`,
        },
        { value: '3', name: `${'3.'.magenta} List done tasks` },
        { value: '4', name: `${'4.'.magenta} List pending tasks` },
        { value: '5', name: `${'5.'.magenta} Check task(s)` },
        { value: '6', name: `${'6.'.magenta} Delete task` },
        { value: '0', name: `${'0.'.magenta} Exit \n` },
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

const listDeleteTasks = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.magenta;
    return { value: task.id, name: `${index} ${task.description}` };
  });

  choices.unshift({ value: '0', name: '0.'.green + ' Cancel' });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete',
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}`.magenta;
    return {
      value: task.id,
      name: `${index} ${task.description}`,
      checked: task.completed ? true : false,
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
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

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTasks,
  confirm,
  showCheckList,
};
