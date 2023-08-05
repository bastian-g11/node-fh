const { createFile } = require('./helpers/test');
const argv = require('yargs')
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw 'Base must be a number';
    }
    return true;
  }).argv;

console.clear();

// console.log(process.argv);
// console.log(argv);

// createFile('TESTING')
//   .then((file) => console.log(file))
//   .catch((err) => console.log(err));
