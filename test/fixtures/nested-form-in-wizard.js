export default {
  type: 'form',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: []
    },
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      components: [
        {
          label: 'Form',
          display: 'form',
          components: [
            {
              label: 'Radio',
              optionsLabelPosition: 'right',
              inline: false,
              tableView: false,
              values: [
                {
                  label: 'Yes',
                  value: 'true',
                  shortcut: ''
                },
                {
                  label: 'No',
                  value: 'false',
                  shortcut: ''
                }
              ],
              key: 'radio',
              type: 'radio',
              input: true
            }
          ],
          useOriginalRevision: false,
          reference: false,
          clearOnHide: true,
          key: 'form',
          type: 'form',
          persistent: true,
        }
      ],
      input: false,
    }
  ],
  title: 'FIO-1133',
  display: 'wizard',
};
