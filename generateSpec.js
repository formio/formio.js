// Define a few global noop placeholder shims and import the component classes
global.Text              = class {};
global.HTMLElement       = class {};
global.HTMLCanvasElement = class {};
global.navigator         = {userAgent: ''};
global.document          = {
  createElement: () => ({}),
  cookie: '',
  getElementsByTagName: () => [],
  documentElement: {style: []}
};
global.window            = {addEventListener: () => {}, Event: {}, navigator: global.navigator};

const _ = require('lodash');
const docs = require('./tutorials/index.json');
const Formio = require('./lib/index.js');
const components = Formio.Components.components;

docs.schema = {
  form: {
    title: 'Form Specification',
    children: []
  }
};

_.each(components, (component) => {
  let componentSpec = '## JSON Specification';
  if (component.editForm) {
    const defaultSchema = component.schema();
    const editForm = component.editForm();
    console.log(defaultSchema);
  }
});

console.log(Formio);
