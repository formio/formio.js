import _ from 'lodash';
import Evaluator from '../../../../utils/Evaluator';
import { getContextComponents, getConditionValueComponentRequiredProperties } from '../../../../utils/utils';

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
            _.unionWith(
              objValue.components,
              srcValue.components,
              EditFormUtils.unifyComponents
            )
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
    return {
      type: 'htmlelement',
      tag: 'div',
      /* eslint-disable prefer-template */
      content:
        '<p>The following variables are available in all scripts.</p>' +
        '<table class="table table-bordered table-condensed table-striped">' +
        additional +
        '<tr><th>form</th><td>The complete form JSON object</td></tr>' +
        '<tr><th>submission</th><td>The complete submission object.</td></tr>' +
        '<tr><th>data</th><td>The complete submission data object.</td></tr>' +
        '<tr><th>row</th><td>Contextual "row" data, used within DataGrid, EditGrid, and Container components</td></tr>' +
        '<tr><th>component</th><td>The current component JSON</td></tr>' +
        '<tr><th>instance</th><td>The current component instance.</td></tr>' +
        '<tr><th>value</th><td>The current value of the component.</td></tr>' +
        '<tr><th>moment</th><td>The moment.js library for date manipulation.</td></tr>' +
        '<tr><th>_</th><td>An instance of <a href="https://lodash.com/docs/" target="_blank">Lodash</a>.</td></tr>' +
        '<tr><th>utils</th><td>An instance of the <a href="http://formio.github.io/formio.js/docs/identifiers.html#utils" target="_blank">FormioUtils</a> object.</td></tr>' +
        '<tr><th>util</th><td>An alias for "utils".</td></tr>' +
        '</table><br/>',
      /* eslint-enable prefer-template */
    };
  },
  javaScriptValue(
    title,
    property,
    propertyJSON,
    weight,
    exampleHTML,
    exampleJSON,
    additionalParams = '',
    excludeJSONLogic
  ) {
    const components = [
      this.logicVariablesTable(additionalParams),
      {
        type: 'panel',
        title: 'JavaScript',
        collapsible: true,
        collapsed: false,
        style: {
          'margin-bottom': '10px',
        },
        key: `${property}-js`,
        customConditional() {
          return !Evaluator.noeval || Evaluator.protectedEval;
        },
        components: [
          {
            type: 'textarea',
            key: property,
            rows: 5,
            editor: 'ace',
            hideLabel: true,
            as: 'javascript',
            input: true,
          },
          {
            type: 'htmlelement',
            tag: 'div',
            content: `<p>Enter custom javascript code.</p>${exampleHTML}`,
          },
        ],
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
            content:
              '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' +
              '<p>Full <a href="https://lodash.com/docs" target="_blank">Lodash</a> support is provided using an "_" before each operation, such as <code>{"_sum": {var: "data.a"}}</code></p>' +
              exampleJSON,
            /* eslint-enable prefer-template */
          },
          {
            type: 'textarea',
            key: propertyJSON,
            rows: 5,
            editor: 'ace',
            hideLabel: true,
            as: 'json',
            input: true,
          },
        ],
      },
    ];

    if (excludeJSONLogic) {
      components.splice(2, 1);
    }

    return {
      type: 'panel',
      title: title,
      theme: 'default',
      collapsible: true,
      collapsed: true,
      key: `${property}Panel`,
      weight: weight,
      components,
    };
  },
  simpleConditionalComponents(inLogic) {
    return [
      {
        label: 'Show or Hide this field',
        widget: 'choicesjs',
        tableView: true,
        dataType: 'boolean',
        data: {
          values: [
            {
              label: 'Show This Field',
              value: true,
            },
            {
              label: 'Hide This Field',
              value: false,
            },
          ],
        },
        key: `${inLogic ? '' : 'conditional.'}show`,
        type: 'select',
        input: true,
        ...(inLogic
          ? {
              type: 'hidden',
              defaultValue: true,
            }
          : {}),
      },
      {
        label: 'When',
        widget: 'choicesjs',
        tableView: true,
        data: {
          values: [
            {
              label: 'When all conditions are met',
              value: 'all',
            },
            {
              label: 'When any condition is met',
              value: 'any',
            },
          ],
        },
        key: `${inLogic ? '' : 'conditional.'}conjunction`,
        type: 'select',
        input: true,
      },
      {
        label: 'Conditions',
        addAnotherPosition: 'bottom',
        key: `${inLogic ? '' : 'conditional.'}conditions`,
        type: 'editgrid',
        initEmpty: true,
        addAnother: 'Add Condition',
        templates: {
          header:
            "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class=\"col-sm-{{_.includes(['component'], component.key) ? '4' : '3'}}\">{{ t(component.label) }}</div>\n        {% } %}\n      {% }) %}\n    </div>",
          row: '<div class="row">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class="formio-builder-condition-text col-sm-{{_.includes([\'component\'], component.key) ? \'4\' : \'3\'}}">\n            {{ isVisibleInRow(component) ? getView(component, row[component.key]) : \'\'}}\n          </div>\n        {% } %}\n      {% }) %}\n      {% if (!instance.options.readOnly && !instance.disabled) { %}\n        <div class="col-sm-2">\n          <div class="btn-group pull-right">\n            <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass(\'edit\') }}"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass(\'trash\') }}"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>',
        },
        input: true,
        components: [
          {
            label: 'Component',
            widget: 'choicesjs',
            tableView: true,
            dataSrc: 'custom',
            valueProperty: 'value',
            placeholder: 'Select Form Component',
            tooltip:
              'Select the form component which value determines the visibility of this component.',
            lazyLoad: false,
            data: {
              custom(context) {
                return getContextComponents(context, true, [
                  'form',
                  'datasource',
                  'button',
                ]);
              },
            },
            key: 'component',
            type: 'select',
            input: true,
          },
          {
            label: 'Operator',
            widget: 'choicesjs',
            tableView: true,
            dataSrc: 'custom',
            lazyLoad: false,
            placeholder: 'Select Comparison Operator',
            tooltip:
              'Select the way the actual value of the form component, which determines the visibility of this component, should be related to the compared value or to itself.',
            refreshOn: `${ inLogic ? 'logic.trigger.simple.' : 'conditional.' }conditions.component`,
            clearOnRefresh: true,
            valueProperty: 'value',
            data: {
              custom: `
                    var conditionComponent= utils.getComponent(instance.options.editForm.components, row.component);
                    var componentType = conditionComponent ? conditionComponent.type : 'base';
    
                    values = utils.getConditionOperatorOptions(Formio.Components.components[componentType].simpleConditionSettings.operators);
                  `,
            },
            key: 'operator',
            type: 'select',
            input: true,
          },
          {
            type: 'textfield',
            inputFormat: 'plain',
            ...getConditionValueComponentRequiredProperties()
          },
        ],
      },
    ];
  },
};

export default EditFormUtils;
