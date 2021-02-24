export default [
  {
    label: 'Strength Levels',
    reorder: false,
    addAnotherPosition: 'bottom',
    layoutFixed: false,
    enableRowGroups: false,
    initEmpty: false,
    tableView: false,
    defaultValue: [{}],
    key: 'levels',
    type: 'editgrid',
    input: true,
    components: [
      {
        label: 'Name',
        tableView: true,
        validate: {
          required: true
        },
        key: 'name',
        type: 'textfield',
        input: true
      },
      {
        label: 'Max Entropy',
        description: "Specifies the top boundary of the password's entropy(strength) which belongth to this level.\nCommon entropy values are:\n<ul>\n  <li>&lt; 28 bits = Very Weak;</li>\n  <li>28 - 35 bits = Weak; should keep out most people;</li>\n  <li>36 - 59 bits = Reasonable; fairly secure passwords for network and company passwords;</li>\n  <li>60 - 127 bits = Strong; can be good for guarding financial information;</li>\n  <li>&gt; 128 bits = Very Strong; often overkill;</li>\n</ul>\n",
        mask: false,
        spellcheck: true,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        validate: {
          required: true,
          min: 1,
          max: 128
        },
        key: 'maxEntropy',
        type: 'number',
        input: true
      },
      {
        label: 'Style',
        tooltip: 'Specifies the backgounf color style using bootstrap classes',
        tableView: true,
        data: {
          values: [
            {
              label: 'Danger',
              value: 'danger'
            },
            {
              label: 'Warning',
              value: 'warning'
            },
            {
              label: 'Info',
              value: 'info'
            },
            {
              label: 'Success',
              value: 'success'
            }
          ]
        },
        selectThreshold: 0.3,
        validate: {
          onlyAvailableItems: false
        },
        key: 'style',
        type: 'select',
        indexeddb: { filter: {} },
        input: true
      },
      {
        label: 'Color',
        placeholder: '#0079c0',
        tooltip: 'Specifies a color of the indicator element',
        tableView: true,
        key: 'color',
        type: 'textfield',
        input: true
      }
    ]
  },
  {
    label: 'Validations',
    tableView: false,
    rowDrafts: false,
    key: 'validations',
    type: 'editgrid',
    input: true,
    components: [
      {
        label: 'Name',
        tableView: true,
        validate: {
          required: true
        },
        key: 'name',
        type: 'textfield',
        input: true
      },
      {
        label: 'Message',
        tooltip: 'Message that will be shown if the check was not passed',
        tableView: true,
        key: 'message',
        type: 'textfield',
        input: true
      },
      {
        label: 'Increase Characters Pool Size',
        description: 'Set this to amount of characters that may be used in the password if there is a specific group of characters is used.\nE.g., if your validation checks if there is any numeric symbol in the password, then you should set it to 10 (there are 10 possible numbers).\n',
        mask: false,
        spellcheck: true,
        tableView: false,
        delimiter: false,
        requireDecimal: false,
        inputFormat: 'plain',
        key: 'increaseCharactersPoolSize',
        type: 'number',
        input: true
      },
      {
        label: 'Required',
        tooltip: 'Check if this check is required to proceed',
        tableView: false,
        key: 'required',
        type: 'checkbox',
        input: true,
        defaultValue: false
      }
    ]
  },
  {
    label: 'Required',
    description: "Check this if you don't want to allow submitting password which does not correspond to the minimal strength requirements.",
    tableView: false,
    key: 'required',
    type: 'checkbox',
    input: true,
    defaultValue: false
  },
  {
    label: 'Black List',
    tooltip: 'Add words to search in the password. If there are some words from that list were found, the entropy of the password will be recalculated.\n',
    tableView: true,
    multiple: true,
    key: 'blackList',
    type: 'textfield',
    input: true
  },
  {
    label: 'Disable Blacklisted Words',
    tooltip: 'Check if you want to disable submitting passwords containing words form the clack list',
    tableView: false,
    key: 'disableBlacklistedWords',
    type: 'checkbox',
    input: true,
    defaultValue: false
  },
  {
    label: 'Location',
    hideLabel: false,
    tableView: false,
    key: 'location',
    type: 'container',
    input: true,
    components: [
      {
        label: 'Insert',
        tooltip: 'Specifies where the indicator will be inserted: before or aftre an element',
        tableView: true,
        data: {
          values: [
            {
              label: 'Before',
              value: 'before'
            },
            {
              label: 'After',
              value: 'after'
            }
          ]
        },
        selectThreshold: 0.3,
        validate: {
          onlyAvailableItems: false
        },
        key: 'insert',
        type: 'select',
        indexeddb: { filter: {} },
        input: true
      },
      {
        label: 'Selector',
        placeholder: "[ref='element']",
        description: 'Specifies the selector of the element which will be used as a reference to insert the indicator template',
        tableView: true,
        key: 'selector',
        type: 'textfield',
        input: true
      }
    ]
  },
  {
    label: 'Template',
    editor: 'ace',
    tableView: true,
    key: 'template',
    type: 'textarea',
    input: true,
    defaultValue: " <div class=\"formio-security-indicator\">\r\n  {% if (!ctx.readOnly && !ctx.pristine) { %}\r\n    <div\r\n      title=\"{{ctx.t(ctx.tooltip)}}\"\r\n      class=\"security-{{ctx.level.name}} {{ ctx.level.style ? 'bg-' + ctx.level.style : ''}}\"\r\n      style=\"{{ctx.level.color ? 'background-color: ' + ctx.level.color + ';' : ''}}\"\r\n    ></div>\r\n  {% } %}\r\n</div>",
    as: 'html'
  },
];
