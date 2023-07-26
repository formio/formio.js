export default [
  {
    key: 'customComponentDescription',
    label: 'Custom component description',
    input: false,
    tag: 'p',
    content: 'Custom components can be used to render special fields or widgets inside your app. ' +
      'For information on how to display in an app, see ' +
      '<a href="http://help.form.io/userguide/#custom" target="_blank" rel="noopener noreferrer">' +
      'custom component documentation' +
      '</a>.',
    type: 'htmlelement',
    weight: 5
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 10,
    input: true,
    key: 'componentJson',
    label: 'Custom Element JSON',
    tooltip: 'Enter the JSON for this custom element.'
  }
];
