import _ from 'lodash';

export default [
  {
    key: 'previewHeading',
    type: 'htmlelement',
    input: false,
    tag: 'h4',
    content: 'Preview',
  },
  (schema) => ({
    ..._.omit(schema, [
      'hidden',
      'conditional',
      'calculateValue',
      'logic',
      'autofocus',
      'customConditional',
    ]),
    key: 'preview',
  }),
];
