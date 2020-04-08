import _ from 'lodash';

import { Transformers } from '../../../../validator';

import EditFormUtils from './utils';

const getTransformer = ({
  title,
  name,
  arguments: transformerArguments,
}) => (
  (transformerArguments && transformerArguments.length)
  ? (
    [
      {
        label: `${title} Transform Arguments`,
        key: `${name}Arguments`,
        conditional: {
          json: {
            '===': [
              {
                var: 'row.name',
              },
              name,
            ],
          },
        },
        type: 'container',
        input: true,
        components: transformerArguments.map((argumentDescription) => EditFormUtils.getArgument(argumentDescription), {
          excludeVariables: [
            (key, { instance }) => (key === instance.parent.data.key),
          ],
        }),
      },
    ]
  )
  : []
);

export default [
  {
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
            <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
            <button class="btn btn-danger btn-sm removeRow">Delete</button>
          </div>
        </div>`
      ),
    },
    addAnother: 'Add Variable',
    saveRow: 'Save Variable',
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
        excludeVariables: [
          (key, { row }) => (key === row.key),
        ],
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
            ..._.flatMap(Transformers.getTransformers(), getTransformer),
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
  },
];
