const fs = require('fs');

const createFile = async (text) => {
  try {
    fs.writeFileSync('test.txt', text);
    return 'Working as expected';
  } catch (error) {
    throw error;
  }
};

module.exports = { createFile };
