global.Headers = [];
const fs = require('fs');
const pretty = require('pretty');
// Fake a browser environment
require('browser-env')();

const Form = require('../lib/Form').default;
const AllComponents = require('../lib/components').default;
const Components = require('../lib/components/Components').default;
const templates = require('../lib/templates').default;
const forms = require('./formtest');
// const formtests = require('./forms').default;

Components.setComponents(AllComponents);

const dir = './test/renders';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const fixComponent = (instance, index = 0) => {
  instance.id = instance.key;
  index++;
  if (instance.type === 'form') {
    instance.everyComponent(component => fixComponent(component, index));
    if (instance.hasOwnProperty('subForm')) {
      instance.subForm.id = instance.key;
    }
  }
};

const renderForm = (form) => {
  const instance = new Form(form)
  fixComponent(instance);
  return pretty(instance.render());
};

const renderComponent = (Type, definition) => {
  const instance = new Type(definition);
  fixComponent(instance);
  return pretty(instance.render());
};

const renders = [];

Object.keys(templates).forEach(framework => {
  // Render forms
  Object.keys(forms).forEach(form => {
    renders.push(`form-${framework}-${form}`);
    fs.writeFileSync(`${dir}/form-${framework}-${form}.html`, renderForm(forms[form], {}));
  });
  // Object.keys(formtests).forEach(form => {
  //   renders.push(`form-${framework}-${form}`);
  //   fs.writeFileSync(`${dir}/form-${framework}-${form}.html`, renderForm(formtests[form].form, {}));
  // });

  // Render components
  Object.keys(AllComponents).forEach(component => {
    // Basic
    renders.push(`component-${framework}-${component}`);
    fs.writeFileSync(`${dir}/component-${framework}-${component}.html`, renderComponent(AllComponents[component], {}));

    // Required
    renders.push(`component-${framework}-${component}-required`);
    fs.writeFileSync(`${dir}/component-${framework}-${component}-required.html`, renderComponent(AllComponents[component], {
      validate: {
        required: true
      }
    }));

    // Multiple
    renders.push(`component-${framework}-${component}-multiple`);
    fs.writeFileSync(`${dir}/component-${framework}-${component}-multiple.html`, renderComponent(AllComponents[component], {
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
