import _ from 'lodash';

import {
  Conjunctions,
  Operators,
} from '../../../../validator';

import EditFormUtils from './utils';

const getOperator = ({
  title,
  name,
  arguments: operatorArguments,
  optionsEditForm,
}) => {
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
          components: operatorArguments.map((argumentDescription) => EditFormUtils.getArgument(argumentDescription)),
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
};

export default [
  {
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
            <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
            <button class="btn btn-danger btn-sm removeRow">Delete</button>
          </div>
        </div>`
      ),
    },
    addAnother: 'Add Condition',
    saveRow: 'Save Condition',
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
              ..._.flatMap(Operators.getOperators(), getOperator),
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
  },
];
