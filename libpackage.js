const fs = require('fs');
const path = require('path');
fs.writeFileSync(
  path.join(__dirname, 'lib', 'cjs', 'package.json'),
  `{
    "type": "commonjs"
}`,
);
fs.writeFileSync(
  path.join(__dirname, 'lib', 'mjs', 'package.json'),
  `{
    "type": "module"
}`,
);
