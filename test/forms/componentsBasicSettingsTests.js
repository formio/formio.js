import _ from 'lodash';
import testHelpers from './helpers/testBasicComponentSettings';

const { settings, form, tests } = testHelpers;
const testedProperties = Object.keys(settings);

const baseHelpingComponent = { 'label':'basis','tableView': true,'defaultValue':'base value','key':'basis','type':'textfield','input':true };

export default _.map(testedProperties, (property) => {
  const title = `Test basic component settings: ${property}`;
  const testedForm = _.cloneDeep(form);

  testedForm.components = testedForm.components
    .filter(comp => {
      if (settings[property].hasOwnProperty(comp.key)) {
        return true;
      }
    })
    .map(comp => {
      if (property === 'placeholder' && comp.type === 'day') {
        _.each(comp.fields, (fieldValue, fieldName) => {
          fieldValue[property] = settings[property][comp.key][fieldName] || '';
        })
      } 
      else {
        //if we have expected value in property settings
        if (['customDefaultValue', 'calculateValue'].includes(property)) {
          comp[property] = settings[property][comp.key].js;
        }
        else {
          comp[property] = settings[property][comp.key];
        }
      }
      if (['redrawOn'].includes(property)) {
        comp.label = `${comp.label} {{data.${settings[property][comp.key]}}}`;
      }
      return comp;
    });
  
  if(['customDefaultValue', 'calculateValue'].includes(property)) {
    testedForm.components.unshift(baseHelpingComponent);
  }

  const propertyTests = tests[property];

  return {
    title: title,
    form: testedForm,
    tests: propertyTests || {},
    useDone: true,
    formOptions: { language: 'en' }
  }
});

