const fs = require('fs');

const file = './db/data.json';

const saveDB = (data) => {
  try {
    fs.writeFileSync(file, data);
  } catch (error) {
    console.log('🚀 ~ file: saveFile.js:8 ~ saveDB ~ error:', error);
  }
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, { encoding: 'utf-8' });
  const data = JSON.parse(info);
  return data;
};

module.exports = {
  saveDB,
  readDB,
};
