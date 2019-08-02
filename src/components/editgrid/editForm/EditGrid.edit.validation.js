// import EditFormUtils from '../../_classes/component/editForm/utils';

export default [
  {
    weight: 110,
    key: 'validate.minLength',
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'number',
    tooltip: 'The minimum length requirement this field must meet.',
    input: true
  },
  {
    weight: 120,
    key: 'validate.maxLength',
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'number',
    tooltip: 'The maximum length requirement this field must meet.',
    input: true
  },
  // {
  //   type: 'panel',
  //   title: 'Row View Validation',
  //   collapsible: true,
  //   collapsed: true,
  //   style: { 'margin-bottom': '10px' },
  //   key: 'custom-validation-row',
  //   weight: 250,
  //   components: [
  //     EditFormUtils.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'),
  //     {
  //       type: 'textarea',
  //       key: 'validate.row',
  //       rows: 5,
  //       editor: 'ace',
  //       hideLabel: true,
  //       input: true
  //     },
  //     {
  //       type: 'htmlelement',
  //       tag: 'div',
  //       content: `
  //         <small>
  //           <p>Enter custom validation code.</p>
  //           <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>
  //           <h5>Example:</h5>
  //           <pre>valid = (row.myfield === 'Joe') ? true : 'Your name must be "Joe"';</pre>
  //         </small>`
  //     }
  //   ]
  // }
];
