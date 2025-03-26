export default {
  type: 'form',
  components: [
    {
      label: 'Form',
      tableView: true,
      components: [
        {
          label: 'Survey',
          tableView: false,
          questions: [
            {
              label: 'Question',
              value: 'question',
              tooltip: ''
            }
          ],
          values: [
            {
              label: 'Yes',
              value: 'yes',
              tooltip: ''
            },
            {
              label: 'No',
              value: 'no',
              tooltip: ''
            }
          ],
          validateWhenHidden: false,
          key: 'survey',
          type: 'survey',
          input: true
        }
      ],
      key: 'form',
      type: 'form',
      input: true
    },
    {
      label: 'Form',
      tableView: true,
      components: [
        {
          label: 'Survey',
          tableView: false,
          questions: [
            {
              label: 'Question',
              value: 'question',
              tooltip: ''
            }
          ],
          values: [
            {
              label: 'Yes',
              value: 'yes',
              tooltip: ''
            },
            {
              label: 'No',
              value: 'no',
              tooltip: ''
            }
          ],
          validateWhenHidden: false,
          key: 'survey',
          type: 'survey',
          input: true
        }
      ],
      key: 'form1',
      type: 'form',
      input: true
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ]
}
