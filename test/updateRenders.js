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
const componentDir = './lib/components';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const fixComponent = (instance, index = 0) => {
  instance.id = instance.key;
  index++;
  if (instance.everyComponent) {
    instance.everyComponent((component) => fixComponent(component, index));
    if (instance.hasOwnProperty('subForm') && instance.subForm) {
      instance.subForm.id = instance.key;
    }
  }
};

const renderForm = (form, options) => {
  return new Form(form, options).ready.then(instance => {
    fixComponent(instance);
    return pretty(instance.render(), { ocd: true });
  });
};

const renderComponent = (Type, definition, options, value) => {
  const instance = new Type(definition, options);
  if (value !== undefined) {
    instance.dataValue = value;
  }
  fixComponent(instance);
  return pretty(instance.render(), { ocd: true });
};

const renderAsString = (Type, definition, options, value) => {
  const instance = new Type(definition, options);
  return instance.getValueAsString(value);
};

Object.keys(templates).forEach(framework => {
  // Render forms
  Object.keys(forms).forEach(form => {
    renderForm(forms[form], { template: framework }).then(html => {
      fs.writeFileSync(`${dir}/form-${framework}-${form}.html`, html);
    }).catch(err => console.log(err));
  });
  // Object.keys(formtests).forEach(form => {
  //   fs.writeFileSync(`${dir}/form-${framework}-${form}.html`, renderForm(formtests[form].form, {}));
  // });

  // Render components
  Object.keys(AllComponents).forEach(component => {
    // Basic
    fs.writeFileSync(`${dir}/component-${framework}-${component}.html`, renderComponent(AllComponents[component], {}, { template: framework }));

    // Required
    fs.writeFileSync(`${dir}/component-${framework}-${component}-required.html`, renderComponent(AllComponents[component], {
      validate: {
        required: true
      }
    }, {
      template: framework,
    }));

    // Multiple
    fs.writeFileSync(`${dir}/component-${framework}-${component}-multiple.html`, renderComponent(AllComponents[component], {
      multiple: true
    }, {
      template: framework,
    }));

    // Values
    if (fs.existsSync(`${componentDir}/${component}/fixtures/values.js`)) {
      const values = require(`../${componentDir}/${component}/fixtures/values.js`).default.slice(0);

      values.unshift(undefined);

      values.forEach((value, index) => {
        fs.writeFileSync(`${dir}/component-${framework}-${component}-html-value${index}.html`, renderComponent(AllComponents[component], {}, {
          template: framework,
          flatten: true,
          renderMode: 'html',
        }, value));

        fs.writeFileSync(`${dir}/component-${framework}-${component}-string-value${index}.html`, renderAsString(AllComponents[component], {}, {
          template: framework,
          flatten: true,
          renderMode: 'html',
        }, value));
      });
    }
  });
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
