export default {
  'title': 'wizardWithCheckbox',
  'name': 'wizardWithCheckbox',
  'type': 'form',
  'display': 'wizard',
  'components': [
    {
      'title': 'Page 1',
      'label': 'Page 1',
      'type': 'panel',
      'key': 'page1',
      'components': [
        {
          'label': 'Radio',
          'optionsLabelPosition': 'right',
          'inline': false,
          'tableView': false,
          'values': [
            {
              'label': 'a',
              'value': 'a',
              'shortcut': ''
            }
          ],
          'key': 'radio',
          'type': 'radio',
          'input': true,
          'inputType': 'checkbox'
        }
      ],
      'input': false,
      'tableView': false
    },
    {
      'title': 'Page 2',
      'label': 'Page 2',
      'type': 'panel',
      'key': 'page2',
      'input': false,
      'tableView': false,
      'components': []
    }
  ]
};
