import _ from 'lodash';
const EditFormUtils = {
  sortAndFilterComponents: (components) => {
    return _.filter(_.sortBy(components, 'weight'), item => !item.ignore);
  },
  unifyComponents: (objValue, srcValue) => {
    if (objValue.key && srcValue.key) {
      if (objValue.key === srcValue.key) {
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
  logicVariablesTable: (additional) => {
    additional = additional || '';
    return {
      type: 'htmlelement',
      tag: 'div',
      content: '<p>The following variables are available in all scripts.</p>' +
      '<table class="table table-bordered table-condensed table-striped">' +
      additional +
      '<tr><th>form</th><td>The complete form JSON object</td></tr>' +
      '<tr><th>data</th><td>The complete submission data object.</td></tr>' +
      '<tr><th>row</th><td>Contextual "row" data, used within DataGrid, EditGrid, and Container components</td></tr>' +
      '<tr><th>component</th><td>The current component JSON</td></tr>' +
      '<tr><th>instance</th><td>The current component instance.</td></tr>' +
      '<tr><th>value</th><td>The current value of the component.</td></tr>' +
      '<tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr>' +
      '</table><br/>'
    };
  },
  javaScriptValue: (title, property, propertyJSON, weight, exampleHTML, exampleJSON) => {
    return {
      type: 'panel',
      title: title,
      theme: 'default',
      collapsible: true,
      collapsed: true,
      key: property + 'Panel',
      weight: weight,
      components: [
        EditFormUtils.logicVariablesTable(),
        {
          type: 'panel',
          title: 'JavaScript',
          collapsible: true,
          collapsed: false,
          style: {'margin-bottom': '10px'},
          key: property + '-js',
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
              content: '<p>Enter custom javascript code.</p>' + exampleHTML
            }
          ]
        },
        {
          type: 'panel',
          title: 'JSONLogic',
          collapsible: true,
          collapsed: true,
          key: property + '-json',
          components: [
            {
              type: 'htmlelement',
              tag: 'div',
              content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' +
                '<p>Full <a href="https://lodash.com/docs" target="_blank">Lodash</a> support is provided using an "_" before each operation, such as <code>{"_sum": {var: "data.a"}}</code></p>'
                + exampleJSON
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
