const fs = require('fs');
const path = require('path');
const packageJSON = require('./package.json');

fs.writeFileSync(path.join(__dirname, 'lib', 'cjs', 'package.json'), `{
    "type": "commonjs",
    "version": "${packageJSON.version}"
}`);
fs.writeFileSync(path.join(__dirname, 'lib', 'mjs', 'package.json'), `{
    "type": "module",
    "version": "${packageJSON.version}"
    
}`);