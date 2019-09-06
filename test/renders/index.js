const fs = require('fs');
const files = {};
const fileNames = fs.readdirSync(__dirname);

fileNames.forEach(function(fileName) {
  if (fileName.endsWith('.html')) {
    const name = fileName.substring(0, fileName.length - 5);
    files[name] = fs.readFileSync(`${__dirname}/${fileName}`).toString();
  }
});

module.exports = files;
