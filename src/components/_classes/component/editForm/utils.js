import _ from 'lodash';
import Evaluator from '../../../../utils/Evaluator';
import { translateHTMLTemplate } from '../../../../utils/utils';
const EditFormUtils = {
  sortAndFilterComponents(components) {
    return _.filter(_.sortBy(components, 'weight'), (item) => !item.ignore);
  },
  unifyComponents(objValue, srcValue) {
    if (objValue.key && srcValue.key) {
      if (objValue.skipMerge || srcValue.skipMerge) {
        return false;
      }
      if (objValue.key === srcValue.key) {
        // Create complete objects by including missing keys.
        _.each(objValue, (value, prop) => {
          if (objValue.overrideEditForm || !srcValue.hasOwnProperty(prop)) {
            srcValue[prop] = value;
          }
        });
        _.each(srcValue, (value, prop) => {
          if (srcValue.overrideEditForm || !objValue.hasOwnProperty(prop)) {
            objValue[prop] = value;
          }
        });

        if (objValue.components) {
          srcValue.components = EditFormUtils.sortAndFilterComponents(
            _.unionWith(objValue.components, srcValue.components, EditFormUtils.unifyComponents)
          );
        }
        return true;
      }
      else {
        return false;
      }
    }
    return _.isEqual(objValue, srcValue);
  },
  logicVariablesTable(additional) {
    additional = additional || '';
    const tableData = [
      { key: 'form', value: 'The complete form JSON object.' },
      { key: 'submission', value: 'The complete submission object.' },
      { key: 'data', value: 'The complete submission data object.' },
      { key: 'row', value: 'Contextual "row" data, used within DataGrid, EditGrid, and Container components.' },
      { key: 'component', value: 'The current component JSON.' },
      { key: 'instance', value: 'The current component instance.' },
      { key: 'value', value: 'The current value of the component.' },
      { key: 'moment', value: 'The moment.js library for date manipulation.' },
      { key: '_', value: 'An instance of <a href="https://lodash.com/docs/" target="_blank">Lodash</a>.' },
      { key: 'utils', value: 'An instance of the <a href="http://formio.github.io/formio.js/docs/identifiers.html#utils" target="_blank">FormioUtils</a> object.' },
      { key: 'util', value: 'An alias for "utils".' }
    ];
    return {
      type: 'htmlelement',
      tag: 'div',
      /* eslint-disable prefer-template */
      content: ({ instance }) => translateHTMLTemplate(
        '<p><translate>The following variables are available in all scripts.</translate></p>' +
        '<table class="table table-bordered table-condensed table-striped">' +
        additional + tableData.reduce((template, { key, value }) => template + `<tr><th>${key}</th><td><translate>${value}</translate></td></tr>`, '') +
        '</table><br/>',
        instance
      )
      /* eslint-enable prefer-template */
    };
  },
  javaScriptValue(title, property, propertyJSON, weight, exampleHTML, exampleJSON, additionalParams) {
    return {
      type: 'panel',
      title: title,
      theme: 'default',
      collapsible: true,
      collapsed: true,
      key: `${property}Panel`,
      weight: weight,
      components: [
        this.logicVariablesTable(additionalParams),
        {
          type: 'panel',
          title: 'JavaScript',
          collapsible: true,
          collapsed: false,
          style: { 'margin-bottom': '10px' },
          key: `${property}-js`,
          customConditional() {
            return !Evaluator.noeval;
          },
          components: [
            {
              type: 'textarea',
              key: property,
              rows: 5,
              editor: 'ace',
              hideLabel: true,
              input: true
            },
            {
              type: 'htmlelement',
              tag: 'div',
              content: ({ instance }) => translateHTMLTemplate(`<p><translate>Enter custom javascript code.</translate></p>${exampleHTML}`, instance)
            }
          ]
        },
        {
          type: 'panel',
          title: 'JSONLogic',
          collapsible: true,
          collapsed: true,
          key: `${property}-json`,
          components: [
            {
              type: 'htmlelement',
              tag: 'div',
              /* eslint-disable prefer-template */
              content: ({ instance }) => translateHTMLTemplate('<p><translate>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</translate></p>' +
              '<p><translate>Full <a href="https://lodash.com/docs" target="_blank">Lodash</a> support is provided using an "_" before each operation, such as </translate><code>{"_sum": {var: "data.a"}}</code></p>' +
               exampleJSON, instance)
              /* eslint-enable prefer-template */
            },
            {
              type: 'textarea',
              key: propertyJSON,
              rows: 5,
              editor: 'ace',
              hideLabel: true,
              as: 'json',
              input: true
            }
          ]
        }
      ]
    };
  }
};

export default EditFormUtils;
