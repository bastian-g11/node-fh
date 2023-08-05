require('colors');

const showMenu = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Please select an option: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${'ENTER'.green} to continue\n`, () => {
      readline.close();
      resolve();
    });
  });
};

module.exports = { showMenu, pause };
