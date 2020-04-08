import _ from 'lodash';

import { QuickRulesHelper, ValueSources } from '../../../../validator';
import Evaluator from '../../../../utils/Evaluator';

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
          if (!srcValue.hasOwnProperty(prop)) {
            srcValue[prop] = value;
          }
        });
        _.each(srcValue, (value, prop) => {
          if (!objValue.hasOwnProperty(prop)) {
            objValue[prop] = value;
          }
        });

        if (objValue.components) {
          srcValue.components = EditFormUtils.sortAndFilterComponents(
            _.unionWith(objValue.components, srcValue.components, EditFormUtils.unifyComponents)
          );
        }
        if (objValue.help) {
          srcValue.help = EditFormUtils.sortAndFilterComponents(
            _.unionWith(objValue.help, srcValue.help, EditFormUtils.unifyComponents)
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
      content: '<p>The following variables are available in all scripts.</p>' +
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
  logicSectionHandler: {
    js({
      commonName,
      property,
      example,
    }) {
      return {
        type: 'panel',
        title: 'JavaScript',
        collapsible: true,
        collapsed: false,
        style: { 'margin-bottom': '10px' },
        key: `${commonName}-js`,
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
            input: true,
          },
          {
            type: 'htmlelement',
            tag: 'div',
            content: `<p>Enter custom javascript code.</p>${example}`,
          },
        ],
      };
    },
    json({
      commonName,
      property,
      example,
    }) {
      return {
        type: 'panel',
        title: 'JSONLogic',
        collapsible: true,
        collapsed: true,
        key: `${commonName}-json`,
        components: [
          {
            type: 'htmlelement',
            tag: 'div',
            /* eslint-disable prefer-template */
            content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' +
              '<p>Full <a href="https://lodash.com/docs" target="_blank">Lodash</a> support is provided using an "_" before each operation, such as <code>{"_sum": {var: "data.a"}}</code></p>' +
               example,
            /* eslint-enable prefer-template */
          },
          {
            type: 'textarea',
            key: property,
            rows: 5,
            editor: 'ace',
            hideLabel: true,
            as: 'json',
            input: true,
          },
        ],
      };
    },
    variable({
      commonName,
      property,
    }) {
      return {
        type: 'panel',
        title: 'Variable',
        collapsible: true,
        collapsed: true,
        key: `${commonName}-variable`,
        components: [
          {
            ...EditFormUtils.variableSelector(),
            key: property,
          },
        ],
      };
    },
    condition({
      commonName,
      property,
    }) {
      return {
        type: 'panel',
        title: 'Condition',
        collapsible: true,
        collapsed: true,
        key: `${commonName}-condition`,
        components: [
          {
            ...EditFormUtils.conditionSelector(),
            key: property,
          },
        ],
      };
    },
  },
  javaScriptValue(title, property, weight, logicSections, additionalParams) {
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
        ...logicSections.map((logicSection) => this.logicSectionHandler[logicSection.type]({
          commonName: property,
          ...logicSection,
        })),
      ],
    };
  },
  valueDeclaration({
    excludeValueSources = [],
    excludeVariables = [],
    required = true,
  } = {}) {
    const valueSources = _
      .chain(ValueSources.getValueSources())
      .values()
      .reject(({ name }) => excludeValueSources.includes(name))
      .sortBy('weight')
      .value();

    return [
      {
        label: 'Value Source',
        data: {
          values: valueSources.map((valueSource) => ({
            label: valueSource.title,
            value: valueSource.name,
          })),
        },
        validate: {
          required,
        },
        key: 'valueSource',
        type: 'select',
        input: true,
      },
      ...valueSources
        .map((valueSource) => {
          const editForm = valueSource.getInputEditForm({
            editFormUtils: EditFormUtils,
            excludeValueSources,
            excludeVariables,
          });

          return editForm
            ? {
              ...editForm,
              key: `${valueSource.name}Input`,
              conditional: {
                json: {
                  '===': [
                    {
                      'var': 'row.valueSource',
                    },
                    valueSource.name,
                  ],
                },
              },
            }
            : null;
        })
        .filter(_.identity),
    ];
  },
  variableSelector({
    exclude = [],
  } = {}) {
    return {
      type: 'select',
      input: true,
      key: 'variable',
      label: 'Variable',
      dataSrc: 'custom',
      data: {
        custom(args) {
          const { data, options } = args;
          const { editForm = {} } = options;
          return _
            .chain(editForm.variables || [])
            .concat(data.variables || [])
            .map(({
              name,
              key,
            }) => ({
              name,
              key,
            }))
            .reject(({ key }) => exclude.some((excludeVariable) => (
              _.isFunction(excludeVariable)
                ? excludeVariable(exclude, args)
                : (key !== excludeVariable)
            )))
            .value();
        },
      },
      valueProperty: 'key',
      template: '<span>{{ item.name || item.key }} ({{ item.key }})</span>',
    };
  },
  conditionSelector({
    exclude = [],
  } = {}) {
    return {
      type: 'select',
      input: true,
      key: 'condition',
      label: 'Condition',
      dataSrc: 'custom',
      data: {
        custom(args) {
          const { data, options } = args;
          const { editForm = {} } = options;
          return _
            .chain(editForm.conditions || [])
            .concat(data.conditions || [])
            .map(({
              name,
              key,
            }) => ({
              name,
              key,
            }))
            .reject(({ key }) => exclude.some((excludeCondition) => (
              _.isFunction(excludeCondition)
                ? excludeCondition(exclude, args)
                : (key !== excludeCondition)
            )))
            .value();
        },
      },
      valueProperty: 'key',
      template: '<span>{{ item.name || item.key }} ({{ item.key }})</span>',
    };
  },
  getArgument({
    name,
    key,
    required = false,
  }, {
    excludeValueSources = [],
    excludeVariables = [],
  } = {}) {
    return {
      label: name,
      hideLabel: false,
      key,
      type: 'container',
      input: true,
      components: EditFormUtils.valueDeclaration({
        excludeValueSources: [
          'conditionalAssignment',
          ...excludeValueSources,
        ],
        excludeVariables,
        required,
      }),
    };
  },
  addQuickRule(QuickRule) {
    const {
      name,
      title,
      weight,
    } = QuickRule;
    const editForm = QuickRule.getEditForm() || [];

    return {
      type: 'panel',
      title,
      key: `${name}Title`,
      input: false,
      collapsible: true,
      collapsed: true,
      components: [
        {
          type: 'container',
          key: name,
          label: title,
          input: true,
          weight,
          components: editForm.concat({
            type: 'button',
            key: `${name}Apply`,
            label: 'Add',
            input: true,
            action: 'custom',
            custom({ form, instance }) {
              const helper = new QuickRulesHelper(form.componentEditForm, {});
              const quickRuleInstance = new QuickRule({});
              const inputContainer = form.getComponent(name);
              const input = inputContainer.dataValue;

              quickRuleInstance.addRule(helper, input);
              instance.parent.resetValue();
            },
          }),
        },
      ],
    };
  },
};

export default EditFormUtils;
