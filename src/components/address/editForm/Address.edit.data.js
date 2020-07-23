export default [
  {
    key: 'multiple',
    customConditional: ({ data }) => !data.enableManualMode,
  },
  {
    type: 'address',
    label: 'Default Value',
    key: 'defaultValue',
    weight: 5,
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true,
    customDefaultValue: ({ instance }) => (
      instance.manualModeEnabled
        ? {
          mode: 'autocomplete',
          address: {},
        }
        : {}
    ),
  },
];
