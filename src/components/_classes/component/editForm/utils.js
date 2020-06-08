import _ from 'lodash';

import {
  Conjunctions,
  QuickRulesHelper,
  Operators,
  Transformers,
  ValueSources,
} from '../../../../validator';
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
        if (objValue.sidebar) {
          srcValue.sidebar = EditFormUtils.sortAndFilterComponents(
            _.unionWith(objValue.sidebar, srcValue.sidebar, EditFormUtils.unifyComponents)
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
    customConditions = null,
    customVariables = null,
    excludeConditions = [],
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
            customConditions,
            customVariables,
            editFormUtils: EditFormUtils,
            excludeConditions,
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
    customValues = null,
    exclude = [],
  } = {}) {
    return {
      type: 'select',
      input: true,
      key: 'variable',
      label: 'Variable',
      dataSrc: 'custom',
      groupProperty: 'group',
      data: {
        custom(args) {
          const { data, options } = args;
          const {
            editComponentParentInstance = null,
          } = options;

          const getDefaultVariables = () => {
            let result = (data.variables ?? []).map((variable) => ({
              ...variable,
              group: 'This Component',
            }));

            let current = editComponentParentInstance;
            while (current) {
              const variables = (current.variables ?? []).map((variable) => ({
                ...variable,
                group: current.parent ? current.label : 'Webform',
              }));
              result = result.concat(variables);
              current = current.parent;
            }

            return result;
          };

          const values = customValues ? customValues(args) : getDefaultVariables();

          return _
            .chain(values)
            .map(({
              name,
              key,
              group,
            }) => ({
              name,
              key,
              group,
            }))
            .reject(({ key }) => exclude.some((excludeVariable) => (
              _.isFunction(excludeVariable)
                ? excludeVariable(key, args)
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
    customValues = null,
    exclude = [],
  } = {}) {
    return {
      type: 'select',
      input: true,
      key: 'condition',
      label: 'Condition',
      dataSrc: 'custom',
      groupProperty: 'group',
      data: {
        custom(args) {
          const { data, options } = args;
          const {
            editComponentParentInstance = null,
          } = options;

          const getDefaultConditions = () => {
            let result = (data.conditions ?? []).map((condition) => ({
              ...condition,
              group: 'This Component',
            }));

            let current = editComponentParentInstance;
            while (current) {
              const conditions = (current.conditions ?? []).map((condition) => ({
                ...condition,
                group: current.parent ? current.label : 'Webform',
              }));
              result = result.concat(conditions);
              current = current.parent;
            }

            return result;
          };

          const values = customValues ? customValues(args) : getDefaultConditions();

          return _
            .chain(values)
            .map(({
              name,
              key,
              group,
            }) => ({
              name,
              key,
              group,
            }))
            .reject(({ key }) => exclude.some((excludeCondition) => (
              _.isFunction(excludeCondition)
                ? excludeCondition(key, args)
                : (key !== excludeCondition)
            )))
            .value();
        },
      },
      valueProperty: 'key',
      template: '<span>{{ item.name || item.key }} ({{ item.key }})</span>',
    };
  },
  getTransformer({
    title,
    name,
    arguments: transformerArguments,
    optionsEditForm,
  }, {
    customConditions = null,
    customVariables = null,
    excludeValueSources = [],
    excludeVariables = [],
  } = {}) {
    const conditional = {
      json: {
        '===': [
          {
            var: 'row.name',
          },
          name,
        ],
      },
    };

    return (
    (transformerArguments && transformerArguments.length)
      ? (
        [
          {
            label: `${title} Transform Arguments`,
            key: `${name}Arguments`,
            type: 'container',
            input: true,
            components: transformerArguments.map((argumentDescription) => EditFormUtils.getArgument(argumentDescription, {
              customConditions,
              customVariables,
              excludeValueSources,
              excludeVariables: [
                (key, { instance }) => (key === instance?.parent?.parent?.parent?.data?.key),
                (key, { instance }) => (key === instance?.parent?.parent?.parent?.parent?.data?.key),
                (key, { instance }) => (key === instance?.parent?.parent?.parent?.parent?.parent?.data?.key),
                ...excludeVariables,
              ],
            })),
            conditional,
          },
        ]
      )
      : []
    )
    .concat(
      (optionsEditForm && optionsEditForm.length)
        ? (
          {
            label: 'Options',
            key: `${name}Options`,
            type: 'container',
            input: true,
            components: [
              {
                key: `${name}OptionsPanel`,
                type: 'panel',
                title: 'Options',
                input: false,
                collapsible: true,
                collapsed: true,
                components: optionsEditForm,
              },
            ],
            conditional,
          }
        )
        : [],
    );
  },
  getOperator({
    title,
    name,
    arguments: operatorArguments,
    optionsEditForm,
  }, {
    customConditions = null,
    customVariables = null,
    excludeConditions = [],
    excludeValueSources = [],
  } = {}) {
    const conditional = {
      json: {
        '===': [
          {
            var: 'row.name',
          },
          name,
        ],
      },
    };

    return ([
      {
        label: title,
        key: `${name}Arguments`,
        type: 'container',
        input: true,
        components: [
          {
            key: `${name}ArgumentsPanel`,
            type: 'panel',
            title: 'Arguments',
            input: false,
            collapsible: true,
            collapsed: false,
            components: operatorArguments.map((argumentDescription) => EditFormUtils.getArgument(argumentDescription, {
              customConditions,
              customVariables,
              excludeConditions: [
                (key, { instance }) => (key === instance.parent.parent.parent.parent.parent.data.key),
                (key, { instance }) => (key === instance.parent.parent.parent.parent.parent.parent.data.key),
                ...excludeConditions,
              ],
              excludeValueSources,
            })),
          },
        ],
        conditional,
      },
    ]).concat(
      (optionsEditForm && optionsEditForm.length)
        ? (
          {
            label: 'Options',
            key: `${name}Options`,
            type: 'container',
            input: true,
            components: [
              {
                key: `${name}OptionsPanel`,
                type: 'panel',
                title: 'Options',
                input: false,
                collapsible: true,
                collapsed: true,
                components: optionsEditForm,
              },
            ],
            conditional,
          }
        )
        : [],
    );
  },
  getArgument({
    name,
    key,
    required = false,
  }, {
    customConditions = null,
    customVariables = null,
    excludeConditions = [],
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
        customConditions,
        customVariables,
        excludeConditions,
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
            custom({ form }) {
              const helper = new QuickRulesHelper(form.componentEditForm, {});
              const quickRuleInstance = new QuickRule({});
              const inputContainer = form.getComponent(name);
              const input = inputContainer.dataValue;

              quickRuleInstance.addRule(helper, input);
              form.resetValue();
            },
          }),
        },
      ],
    };
  },
  getVariablesEditForm({
    customConditions = null,
    customVariables = null,
    excludeValueSources = [],
  } = {}) {
    return {
      label: 'Variables',
      key: 'variables',
      input: true,
      type: 'editgrid',
      inlineEdit: true,
      templates: {
        header: (
          `<div class="row">
            <div class="col-sm-10">Name</div>
            <div class="col-sm-2">Actions</div>
          </div>`
        ),
        row: (
          `<div class="row">
            <div class="col-sm-10">{{ row.name ? row.name + " (" + row.key + ")" : row.key }}</div>
            <div class="col-sm-2">
              <button class="btn btn-default btn-light btn-sm cloneRow">Clone</button>
              <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
              <button class="btn btn-danger btn-sm removeRow">Delete</button>
            </div>
          </div>`
        ),
      },
      addAnother: 'Add Variable',
      saveRow: 'Save Variable',
      lazyComponentsInstantiation: true,
      components: [
        {
          type: 'textfield',
          input: true,
          key: 'name',
          label: 'Name',
          validate: {
            required: true,
          },
        },
        {
          type: 'textfield',
          input: true,
          key: 'key',
          label: 'Key',
          allowCalculateOverride: true,
          calculateValue: {
            _camelCase: [
              {
                var: 'row.name',
              },
            ],
          },
          validate: {
            required: true,
          },
        },
        ...EditFormUtils.valueDeclaration({
          customConditions,
          customVariables,
          excludeVariables: [
            (key, { row }) => (key === row.key),
            (key, { instance }) => (key === instance?.parent?.data?.key),
            (key, { instance }) => (key === instance?.parent?.parent?.data?.key),
            (key, { instance }) => (key === instance?.parent?.parent?.parent?.data?.key),
          ],
          excludeValueSources,
        }),
        {
          label: 'Transform',
          key: 'transform',
          input: true,
          type: 'container',
          components: [
              {
                label: 'Transform',
                dataSrc: 'values',
                defaultValue: 'identity',
                data: {
                  values: _.map(Transformers.getTransformers(), (transform) => ({
                    label: transform.title,
                    value: transform.name,
                  })),
                },
                dataType: 'string',
                validate: {
                  required: true,
                },
                key: 'name',
                type: 'select',
                input: true,
              },
              ..._.flatMap(Transformers.getTransformers(), (transformer) => EditFormUtils.getTransformer(transformer, {
                customConditions,
                customVariables,
                excludeValueSources,
              })),
          ],
          conditional: {
            json: {
              and: [
                {
                  '!!': {
                    var: 'row.valueSource',
                  },
                },
                {
                  '!==': [
                    {
                      var: 'row.valueSource',
                    },
                    'conditionalAssignment',
                  ],
                },
              ],
            },
          },
        },
      ],
    };
  },
  getConditionsEditForm({
    customConditions = null,
    customVariables = null,
    excludeValueSources = [],
  } = {}) {
    return {
      type: 'editgrid',
      input: true,
      label: 'Conditions',
      key: 'conditions',
      inlineEdit: true,
      templates: {
        header: (
          `<div class="row">
            <div class="col-sm-10">Name</div>
            <div class="col-sm-2">Actions</div>
          </div>`
        ),
        row: (
          `<div class="row">
            <div class="col-sm-10">{{ row.name ? row.name + " (" + row.key + ")" : row.key }}</div>
            <div class="col-sm-2">
              <button class="btn btn-default btn-light btn-sm cloneRow">Clone</button>
              <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
              <button class="btn btn-danger btn-sm removeRow">Delete</button>
            </div>
          </div>`
        ),
      },
      addAnother: 'Add Condition',
      saveRow: 'Save Condition',
      lazyComponentsInstantiation: true,
      components: [
        {
          type: 'textfield',
          input: true,
          key: 'name',
          label: 'Name',
          validate: {
            required: true,
          },
        },
        {
          type: 'textfield',
          input: true,
          key: 'key',
          label: 'Key',
          allowCalculateOverride: true,
          calculateValue: {
            _camelCase: [
              {
                var: 'row.name',
              },
            ],
          },
          validate: {
            required: true,
          },
        },
        {
          type: 'radio',
          input: true,
          key: 'conjunction',
          label: 'Conjunction',
          hideLabel: true,
          defaultValue: 'and',
          inline: true,
          values: _
            .chain(Conjunctions.getConjunctions())
            .sortBy('weight')
            .map((conjunction) => ({
              label: conjunction.title,
              value: conjunction.name,
            }))
            .value(),
          validate: {
            required: true,
          },
        },
        {
          type: 'editgrid',
          input: true,
          key: 'parts',
          label: 'Parts',
          hideLabel: true,
          inlineEdit: true,
          templates: {
            header: (
              `<div class="row">
                <div class="col-sm-2">Type</div>
                <div class="col-sm-8">Description</div>
                <div class="col-sm-2">Actions</div>
              </div>`
            ),
            row: (
              `<div class="row">
                <div class="col-sm-2">{{ flattenedComponents.type.getView(row.type) }}</div>
                <div class="col-sm-8">{{ (row.type === 'existing') ? flattenedComponents.condition.getView(row.condition) : (row.description || flattenedComponents.name.getView(row.operator.name)) }}</div>
                <div class="col-sm-2">
                  <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
                  <button class="btn btn-danger btn-sm removeRow">Delete</button>
                </div>
              </div>`
            ),
          },
          addAnother: 'Add Condition Part',
          saveRow: 'Save Condition Part',
          components: [
            {
              type: 'select',
              input: true,
              key: 'type',
              label: 'Type',
              dataSrc: 'values',
              data: {
                values: [
                  {
                    label: 'New Condition',
                    value: 'new',
                  },
                  {
                    label: 'Existing Condition',
                    value: 'existing',
                  },
                ],
              },
              validate: {
                required: true,
              },
            },
            {
              ...EditFormUtils.conditionSelector({
                customValues: customConditions,
                exclude: [
                  (key, { instance }) => (key === instance.parent.data.key),
                ],
              }),
              validate: {
                required: true,
              },
              conditional: {
                json: {
                  '===': [
                    {
                      var: 'row.type',
                    },
                    'existing',
                  ],
                },
              },
            },
            {
              type: 'textfield',
              input: true,
              key: 'description',
              label: 'Description',
              conditional: {
                json: {
                  '===': [
                    {
                      var: 'row.type',
                    },
                    'new',
                  ],
                },
              },
            },
            {
              type: 'container',
              input: true,
              label: 'Operator',
              key: 'operator',
              components: [
                {
                  type: 'select',
                  input: true,
                  key: 'name',
                  label: 'Operator',
                  dataSrc: 'values',
                  data: {
                    values: _.map(Operators.getOperators(), (operator) => ({
                      label: operator.title,
                      value: operator.name,
                    })),
                  },
                  validate: {
                    required: true,
                  },
                },
                ..._.flatMap(Operators.getOperators(), (operator) => EditFormUtils.getOperator(operator, {
                  customConditions,
                  customVariables,
                  excludeValueSources,
                })),
              ],
              conditional: {
                json: {
                  '===': [
                    {
                      var: 'row.type',
                    },
                    'new',
                  ],
                },
              },
            },
          ],
        },
      ],
    };
  },
  getWebformLogicEditFormSettings() {
    return {
      customConditions({ data }) {
        return (data.settings?.conditions ?? []).map((condition) => ({
          ...condition,
          group: 'Webform',
        }));
      },
      customVariables({ data }) {
        return (data.settings?.variables ?? []).map((variable) => ({
          ...variable,
          group: 'Webform',
        }));
      },
      excludeValueSources: [
        'thisComponent',
        'thisComponentRow',
        'thisComponentRowIndex',
        'thisComponentValue',
      ],
    };
  },
};

export default EditFormUtils;
