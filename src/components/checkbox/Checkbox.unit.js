import CheckBoxComponent from './Checkbox';
import assert from 'assert';
describe('Checkbox Unit Tests', () => {
  it('Should create a new Checkbox component', () => {
    const checkbox = new CheckBoxComponent();

    assert.equal(checkbox.defaultSchema.input, true);
    assert.equal(checkbox.defaultSchema.key, 'checkbox');
    assert.equal(checkbox.defaultSchema.type, 'checkbox');
    assert.equal(checkbox.defaultSchema.inputType, 'checkbox');
  });
  it('Checking default value', () => {
    const checkbox = new CheckBoxComponent();
    assert.equal(checkbox.defaultValue, false);
  });
  it('Change the label of the checkbox',() => {
  const checkbox = new CheckBoxComponent({
checkbox: [
  {
    components: [
      {
        'label': 'Testing Checkbox Label Change',
        'shortcut': '',
        'mask': false,
        'tableView': true,
        'alwaysEnabled': false,
        'type': 'checkbox',
        'input': true,
        'key': 'testingCheckboxLabelChange'
      }
    ]

  }
  ]
  }
  );
  });

  it('Checkbox is prechecked', () => {
    const checkbox = new CheckBoxComponent({
        checkbox: [
          {
            components: [
              {
                'label': 'Checkbox',
                'shortcut': '',
                'mask': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'checkbox',
                'input': true,
                'key': 'checkbox',
                'defaultValue': true,
                'encrypted': false
              }

            ]
          }
        ]

      }
    );
  });
});
