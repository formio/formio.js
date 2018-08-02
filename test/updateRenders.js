global.Headers = [];
const fs = require('fs');
const pretty = require('pretty');
// Fake a browser environment
require('browser-env')();

const AllComponents = require('../lib/components').default;
const templates = require('../lib/templates').default;

const dir = './test/renders';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const renderComponent = (Type, definition) => {
  const instance = new Type(definition);
  instance.init();
  instance.id = 'abc123';
  // jsdom does not support dnd but we don't want to render it that way.
  if (instance.hasOwnProperty('support')) {
    instance.support.dnd = true;
  }
  return pretty(instance.render());
};

const renders = [];
Object.keys(templates).forEach(framework => {
  Object.keys(AllComponents).forEach(component => {
    // Basic
    renders.push(`${framework}-${component}`);
    fs.writeFileSync(`${dir}/${framework}-${component}.html`, renderComponent(AllComponents[component], {}));

    // Required
    renders.push(`${framework}-${component}-required`);
    fs.writeFileSync(`${dir}/${framework}-${component}-required.html`, renderComponent(AllComponents[component], {
      validate: {
        required: true
      }
    }));

    // Multiple
    renders.push(`${framework}-${component}-multiple`);
    fs.writeFileSync(`${dir}/${framework}-${component}-multiple.html`, renderComponent(AllComponents[component], {
      multiple: true
    }));
  });
});

// Build index.js for loading all renders.
const index = fs.createWriteStream(`${dir}/index.js`);

renders.forEach(key => {
  index.write(`exports['${key}'] = require('./${key}.html');\n`);
});

index.end();
