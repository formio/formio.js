import _ from 'lodash';
import testHelpers from './helpers/testBasicComponentSettings';

const {
  settings,
  form,
  tests
} = testHelpers;
const testedProperties = Object.keys(settings);

const baseHelpingComponent = {
  'label': 'basis',
  'tableView': true,
  'defaultValue': 'base value',
  'key': 'basis',
  'type': 'textfield',
  'input': true
};

const helpingActionBtn = {
  'label': 'Hide btn',
  'action': 'event',
  'showValidations': false,
  'tableView': false,
  'key': 'hideBtn',
  'type': 'button',
  'input': true,
  'event': 'hide'
};

export default _.map(testedProperties, (property) => {
  const title = `Test basic component settings: ${property}`;
  const testedForm = _.cloneDeep(form);

  testedForm.components = testedForm.components
    .filter(comp => {
      if (_.get(settings, property).hasOwnProperty(comp.key)) {
        return true;
      }
    })
    .map(comp => {
      if (property === 'placeholder' && comp.type === 'day') {
        _.each(comp.fields, (fieldValue, fieldName) => {
          fieldValue[property] = _.get(settings, property)[comp.key][fieldName] || '';
        });
      }
      else {
        //if we have expected value in property settings
        if (['customDefaultValue', 'calculateValue'].includes(property)) {
          _.set(comp, property, _.get(settings, property)[comp.key].js);
        }
        else {
          _.set(comp, property, _.get(settings, property)[comp.key]);
        }
      }
      if (['redrawOn'].includes(property)) {
        comp.label = `${comp.label} {{data.${ _.get(settings, property)[comp.key]}}}`;
      }
      return comp;
    });

  if (['customDefaultValue', 'calculateValue', 'conditional', 'customConditional', 'logic'].includes(property)) {
    testedForm.components.unshift(baseHelpingComponent);

    if (['logic'].includes(property)) {
      testedForm.components.push(helpingActionBtn);
    }
  }

  const propertyTests = _.get(tests, property, {});

  return {
    title: title,
    form: testedForm,
    tests: propertyTests || {},
    useDone: true,
    formOptions: {
      language: 'en'
    }
  };
});
