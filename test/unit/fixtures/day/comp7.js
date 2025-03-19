export default {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name',
      input: true
    }, {
      "label": "Day",
      "placeholder": "Day",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "day2",
      "type": "textfield",
      "input": true
    }, {
      "label": "Month",
      "placeholder": "Month",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "month2",
      "type": "textfield",
      "input": true
    }, {
      "label": "Year",
      "placeholder": "Year",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "year2",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Day",
      "hideInputLabels": false,
      "inputsLabelPosition": "top",
      "useLocaleSettings": false,
      "tableView": false,
      "fields": {
        "day": {
          "placeholder": "Day",
          "hide": false
        },
        "month": {
          "type": "number",
          "placeholder": "Month",
          "hide": false
        },
        "year": {
          "placeholder": "Year",
          "hide": false
        }
      },
      "key": "day",
      "type": "day",
      "input": true,
      "defaultValue": "00/00/0000"
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'survey',
      key: 'questions',
      label: 'Survey',
      values: [
        {
          label: 'Great',
          value: 'great'
        },
        {
          label: 'Good',
          value: 'good'
        },
        {
          label: 'Poor',
          value: 'poor'
        }
      ],
      questions: [
        {
          label: 'How would you rate the Form.io platform?',
          value: 'howWouldYouRateTheFormIoPlatform'
        },
        {
          label: 'How was Customer Support?',
          value: 'howWasCustomerSupport'
        },
        {
          label: 'Overall Experience?',
          value: 'overallExperience'
        }
      ]
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}
