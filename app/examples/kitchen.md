---
title: Kitchen Sink
layout: vtabs
section: examples
weight: 400
---
Here is a large form which includes all fields with many different configurations (the kitchen sink).

<div class="card card-body bg-light">
  <div id="formio"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('formio'), {
    components: [
      {
          input: true,
          tree: true,
          components: [
              {
                  input: false,
                  columns: [
                      {
                          components: [
                              {
                                  input: true,
                                  tableView: true,
                                  inputType: 'text',
                                  inputMask: '',
                                  label: 'First Name',
                                  key: 'firstName',
                                  placeholder: 'Enter your first name',
                                  prefix: '',
                                  suffix: '',
                                  multiple: false,
                                  defaultValue: '',
                                  protected: false,
                                  unique: false,
                                  persistent: true,
                                  validate: {
                                      required: false,
                                      minLength: 6,
                                      maxLength: 10,
                                      pattern: '',
                                      custom: '',
                                      customPrivate: false
                                  },
                                  conditional: {
                                      show: '',
                                      when: null,
                                      eq: ''
                                  },
                                  type: 'textfield'
                              },
                              {
                                  type: 'email',
                                  persistent: true,
                                  unique: false,
                                  protected: false,
                                  defaultValue: '',
                                  suffix: '',
                                  prefix: '',
                                  placeholder: 'Enter your email address',
                                  key: 'email',
                                  label: 'Email',
                                  inputType: 'email',
                                  tableView: true,
                                  input: true
                              },
                              {
                                  input: true,
                                  inputType: 'checkbox',
                                  tableView: true,
                                  hideLabel: false,
                                  label: 'Do you have a phone number?',
                                  key: 'havePhoneNumber',
                                  defaultValue: false,
                                  protected: false,
                                  persistent: true,
                                  validate: {
                                      required: false
                                  },
                                  type: 'checkbox',
                                  conditional: {
                                      show: '',
                                      when: null,
                                      eq: ''
                                  },
                                  lockKey: true
                              },
                              {
                                  input: true,
                                  tableView: true,
                                  inputMask: '(999) 999-9999',
                                  label: 'Phone Number',
                                  key: 'phoneNumber',
                                  placeholder: '',
                                  prefix: '',
                                  suffix: '',
                                  multiple: false,
                                  protected: false,
                                  unique: false,
                                  persistent: true,
                                  defaultValue: '',
                                  validate: {
                                      required: false
                                  },
                                  type: 'phoneNumber',
                                  conditional: {
                                      show: 'true',
                                      when: 'havePhoneNumber',
                                      eq: 'true'
                                  }
                              }
                          ]
                      },
                      {
                          components: [
                              {
                                  input: true,
                                  tableView: true,
                                  inputType: 'text',
                                  inputMask: '',
                                  label: 'Last Name',
                                  key: 'lastName',
                                  placeholder: 'Enter your last name',
                                  prefix: '',
                                  suffix: '',
                                  multiple: false,
                                  defaultValue: '',
                                  protected: false,
                                  unique: false,
                                  persistent: true,
                                  validate: {
                                      required: false,
                                      minLength: 2,
                                      maxLength: 10,
                                      pattern: '',
                                      custom: '',
                                      customPrivate: false
                                  },
                                  conditional: {
                                      show: '',
                                      when: null,
                                      eq: ''
                                  },
                                  type: 'textfield'
                              },
                              {
                                  input: true,
                                  tableView: true,
                                  inputType: 'number',
                                  inputMask: '',
                                  label: 'Number',
                                  key: 'number',
                                  placeholder: 'Enter Number',
                                  prefix: '',
                                  suffix: '',
                                  multiple: false,
                                  defaultValue: 0,
                                  protected: false,
                                  unique: false,
                                  persistent: true,
                                  validate: {
                                      required: false,
                                      min: 10,
                                      max: 100,
                                      step: 5,
                                      custom: '',
                                      customPrivate: false
                                  },
                                  conditional: {
                                      show: '',
                                      when: null,
                                      eq: ''
                                  },
                                  type: 'number'
                              },
                              {
                                  input: true,
                                  tableView: false,
                                  inputType: 'password',
                                  label: 'Password',
                                  key: 'password',
                                  placeholder: 'Enter Your Password',
                                  prefix: '$',
                                  suffix: '@',
                                  defaultValue: '',
                                  protected: true,
                                  persistent: true,
                                  type: 'password',
                                  conditional: {
                                      show: null,
                                      when: null,
                                      eq: ''
                                  },
                                  validate: {
                                      required: false,
                                      minLength: 8,
                                      maxLength: 20,
                                      pattern: '',
                                      custom: '',
                                      customPrivate: false
                                  },
                                  unique: true
                              }
                          ]
                      }
                  ],
                  type: 'columns',
                  key: 'columns',
                  conditional: {
                      show: '',
                      when: null,
                      eq: ''
                  }
              },
              {
                  type: 'textfield',
                  conditional: {
                      eq: '',
                      when: null,
                      show: ''
                  },
                  validate: {
                      customPrivate: false,
                      custom: '',
                      pattern: '',
                      maxLength: '',
                      minLength: '',
                      required: false
                  },
                  persistent: true,
                  unique: false,
                  protected: false,
                  defaultValue: '',
                  multiple: true,
                  suffix: '',
                  prefix: '',
                  placeholder: 'Enter your kids names',
                  key: 'kids',
                  label: 'Kids',
                  inputMask: '',
                  inputType: 'text',
                  tableView: true,
                  input: true
              }
          ],
          tableView: true,
          label: '',
          key: 'user',
          protected: false,
          persistent: true,
          type: 'container',
          conditional: {
              show: '',
              when: null,
              eq: ''
          },
          lockKey: true
      },
      {
          input: true,
          tableView: true,
          label: 'Day',
          key: 'day',
          fields: {
              day: {
                  type: 'text',
                  placeholder: 'Enter day',
                  required: true
              },
              month: {
                  type: 'select',
                  placeholder: 'Select month',
                  required: true
              },
              year: {
                  type: 'text',
                  placeholder: 'Enter year',
                  required: true
              }
          },
          dayFirst: true,
          protected: false,
          persistent: true,
          validate: {
              custom: ''
          },
          type: 'day',
          tags: [],
          conditional: {
              show: '',
              when: null,
              eq: ''
          },
          customClass: 'dayCustomClass',
          tabindex: '5'
      },
      {
          input: true,
          tree: true,
          components: [{
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'Make',
              key: 'make',
              placeholder: 'Chevy, Ford, etc.',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: '',
                  maxLength: '',
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: '{"show": "", "when": null, "eq": ""}',
              type: 'textfield',
              hideLabel: true
          }, {
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'Model',
              key: 'model',
              placeholder: 'Tahoe, F-150, etc.',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: '',
                  maxLength: '',
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: '{"show": "", "when": null, "eq": ""}',
              type: 'textfield',
              hideLabel: true
          }, {
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'Year',
              key: 'year',
              placeholder: '2014, 2015, etc',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: '',
                  maxLength: '',
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: '{"show": "", "when": null, "eq": ""}',
              type: 'textfield',
              hideLabel: true
          }],
          tableView: true,
          label: 'Cars',
          key: 'cars',
          protected: false,
          persistent: true,
          type: 'datagrid',
          conditional: '{"show": "", "when": null, "eq": ""}',
          striped: true,
          bordered: true
      },
      {
          input: false,
          html: '<p><em><strong>Good Morning Guys!!!<br>This is Content component.</strong></em></p> ',
          type: 'content',
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          key: 'mycontent',
          lockKey: true
      },
      {
          input: false,
          numRows: 2,
          numCols: 2,
          rows: [
              [{
                  components: [{
                      input: true,
                      tableView: true,
                      inputType: 'text',
                      inputMask: '',
                      label: 'First Name',
                      key: 'firstName',
                      placeholder: 'Enter your first name',
                      prefix: '',
                      suffix: '',
                      multiple: false,
                      defaultValue: '',
                      protected: false,
                      unique: false,
                      persistent: true,
                      validate: {
                          required: false,
                          minLength: 6,
                          maxLength: 10,
                          pattern: '',
                          custom: '',
                          customPrivate: false
                      },
                      conditional: {
                          show: '',
                          when: null,
                          eq: ''
                      },
                      type: 'textfield'
                  }],
              }, {
                  components: [{
                      input: true,
                      tableView: true,
                      inputType: 'text',
                      inputMask: '',
                      label: 'Last Name',
                      key: 'lastName',
                      placeholder: 'Enter your last name',
                      prefix: '',
                      suffix: '',
                      multiple: false,
                      defaultValue: '',
                      protected: false,
                      unique: false,
                      persistent: true,
                      validate: {
                          required: false,
                          minLength: 6,
                          maxLength: 10,
                          pattern: '',
                          custom: '',
                          customPrivate: false
                      },
                      conditional: {
                          show: '',
                          when: null,
                          eq: ''
                      },
                      type: 'textfield'
                  }],
              }],
              [{
                  components: [{
                      type: 'email',
                      persistent: true,
                      unique: false,
                      protected: false,
                      defaultValue: '',
                      suffix: '',
                      prefix: '',
                      placeholder: 'Enter your email address',
                      key: 'email',
                      label: 'Email',
                      inputType: 'email',
                      tableView: true,
                      input: true
                  }],
              }, {
                  components: [{
                      input: true,
                      inputType: 'checkbox',
                      tableView: false,
                      hideLabel: false,
                      label: 'Checkbox',
                      key: 'checkbox',
                      defaultValue: true,
                      protected: false,
                      persistent: true,
                      validate: {
                          required: false
                      },
                      type: 'checkbox',
                      conditional: {
                          show: null,
                          when: null,
                          eq: ''
                      }
                  }],
              }]
          ],
          header: [],
          caption: '',
          striped: true,
          bordered: true,
          hover: true,
          condensed: false,
          type: 'table',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'Textarea',
          key: 'textarea1',
          placeholder: 'Enter Your Text Here',
          prefix: '$',
          suffix: '@',
          rows: 3,
          multiple: false,
          defaultValue: '',
          protected: false,
          persistent: true,
          validate: {
              required: false,
              minLength: 5,
              maxLength: 100,
              pattern: '',
              custom: ''
          },
          type: 'textarea',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: false,
          type: 'well',
          key: 'Well',
          lockKey: true,
          components: [{
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'Textfield',
              key: 'text',
              placeholder: 'Enter your text',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: 6,
                  maxLength: 10,
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: {
                  show: '',
                  when: null,
                  eq: ''
              },
              type: 'textfield'
          }, {
              input: true,
              tableView: true,
              label: 'Textarea',
              key: 'textarea2',
              placeholder: 'Enter Your Text Here',
              prefix: '',
              suffix: '',
              rows: 3,
              multiple: false,
              defaultValue: '',
              protected: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: 5,
                  maxLength: 100,
                  pattern: '',
                  custom: ''
              },
              type: 'textarea',
              conditional: {
                  show: null,
                  when: null,
                  eq: ''
              }
          }],
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          inputType: 'radio',
          label: 'Options',
          key: 'radio',
          values: [
              {
                  value: 'val1',
                  label: 'option1'
              },
              {
                  value: 'val2',
                  label: 'option2'
              },
              {
                  value: 'val3',
                  label: 'option3'
              }
          ],
          defaultValue: true,
          protected: false,
          persistent: true,
          validate: {
              required: false,
              custom: '',
              customPrivate: false
          },
          type: 'radio',
          inline: false,
          multiple: false,
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: false,
          tableView: true,
          legend: 'User Information',
          type: 'fieldset',
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          components: [{
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'FirstName',
              key: 'firstName',
              placeholder: 'Enter FirstName',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: '',
                  maxLength: '',
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: {
                  show: null,
                  when: null,
                  eq: ''
              },
              type: 'textfield'
          },
              {
                  input: true,
                  tableView: true,
                  inputType: 'text',
                  inputMask: '',
                  label: 'LastName',
                  key: 'lastName',
                  placeholder: 'Enter LastName',
                  prefix: '',
                  suffix: '',
                  multiple: false,
                  defaultValue: '',
                  protected: false,
                  unique: false,
                  persistent: true,
                  validate: {
                      required: false,
                      minLength: '',
                      maxLength: '',
                      pattern: '',
                      custom: '',
                      customPrivate: false
                  },
                  conditional: {
                      show: null,
                      when: null,
                      eq: ''
                  },
                  type: 'textfield'
              }]
      },
      {
          input: true,
          tableView: true,
          inputType: 'text',
          inputMask: '',
          customClass: 'customClass',
          multiple: true,
          label: 'Currency',
          key: 'currency',
          placeholder: 'currency',
          prefix: '$',
          suffix: '@',
          defaultValue: '',
          protected: false,
          persistent: true,
          validate: {
              required: false,
              multiple: '',
              custom: ''
          },
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          type: 'currency',
      },
      {
          input: true,
          inputType: 'checkbox',
          tableView: false,
          hideLabel: false,
          label: 'Checkbox 2',
          key: 'checkbox2',
          defaultValue: false,
          protected: false,
          persistent: true,
          validate: {
              required: false
          },
          type: 'checkbox',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'Select box',
          key: 'selectbox',
          values: [
              {
                  value: 'coffee',
                  label: 'Tea'
              },
              {
                  value: 'coffee',
                  label: 'Coffee'
              },
              {
                  value: 'chocolate',
                  label: 'Chocolate'
              },
              {
                  value: 'ice-cream',
                  label: 'Ice-Cream'
              }
          ],
          inline: true,
          protected: false,
          persistent: true,
          validate: {
              required: false
          },
          type: 'selectboxes',
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          customClass: 'myselect'
      },
      {
          input: false,
          title: 'Panel',
          theme: 'primary',
          components: [{
              input: true,
              tableView: true,
              inputType: 'text',
              inputMask: '',
              label: 'Name',
              key: 'name',
              placeholder: 'Enter your Name',
              prefix: '',
              suffix: '',
              multiple: false,
              defaultValue: '',
              protected: false,
              unique: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: 6,
                  maxLength: 10,
                  pattern: '',
                  custom: '',
                  customPrivate: false
              },
              conditional: {
                  show: '',
                  when: null,
                  eq: ''
              },
              type: 'textfield'
          }, {
              input: true,
              tableView: true,
              label: 'Textarea',
              key: 'textarea3',
              placeholder: 'Enter Your Text Here',
              prefix: '',
              suffix: '',
              rows: 3,
              multiple: false,
              defaultValue: '',
              protected: false,
              persistent: true,
              validate: {
                  required: false,
                  minLength: 5,
                  maxLength: 100,
                  pattern: '',
                  custom: ''
              },
              type: 'textarea',
              conditional: {
                  show: null,
                  when: null,
                  eq: ''
              }
          }],
          type: 'panel',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'Survey',
          key: 'survey',
          customClass: 'customClass',
          questions: [
              {
                  value: 'QueValue',
                  label: 'QueLabel',
              },
              {
                  value: 'QueValue1',
                  label: 'QueLabel1',
              },
              {
                  value: 'QueValue2',
                  label: 'QueLabel2',
              }
          ],
          values: [
              {
                  value: 'AnsValue',
                  label: 'AnsLabel',
              },
              {
                  value: 'AnsValue1',
                  label: 'AnsLabel1',
              },
              {
                  value: 'AnsValue2',
                  label: 'AnsLabel2',
              },
              {
                  value: 'AnsValue3',
                  label: 'AnsLabel3',
              }
          ],
          defaultValue: '',
          protected: false,
          persistent: true,
          validate: {
              required: false,
              custom: '',
              customPrivate: false
          },
          type: 'survey',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'DateTime',
          key: 'dateTime',
          placeholder: 'Select date and time',
          format: 'yyyy-MM-dd HH:mm',
          enableDate: true,
          enableTime: true,
          datepickerMode: 'day',
          datePicker: {
              showWeeks: true,
              startingDay: '0',
              initDate: '',
              minMode: 'day',
              maxMode: 'year',
              yearRange: '25',
              datepickerMode: 'day'
          },
          timePicker: {
              hourStep: 1,
              minuteStep: 1,
              showMeridian: true,
              readonlyInput: true,
              mousewheel: true,
              arrowkeys: false
          },
          protected: false,
          persistent: true,
          validate: {
              required: false,
              custom: ''
          },
          type: 'datetime',
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          minDate: '2016-07-01T18:30:00.000Z',
          maxDate: '2016-08-30T18:30:00.000Z'
      },
      {
          input: false,
          tag: 'p',
          key: 'pname',
          lockKey: true,
          attrs: [
              {
                  attr: 'src',
                  value: '/img'
              }
          ],
          className: 'customClass',
          content: 'Hello, Good Morning!!! This is Html Element.',
          type: 'htmlelement',
          tags: ['span'],
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'Fruits',
          key: 'fruits',
          placeholder: 'Select favourite',
          data: {
              values: [
                  {
                      value: 'opt1',
                      label: 'mango'
                  },
                  {
                      value: 'opt2',
                      label: 'apple'
                  },
                  {
                      value: 'opt3',
                      label: 'pineapple'
                  },
                  {
                      value: 'opt4',
                      label: 'grapes'
                  }],
              json: [
                  {
                      label: 'one',
                      test: 'opt1'
                  },
                  {
                      label: 'two',
                      test: 'opt2'
                  },
                  {
                      label: 'three',
                      test: 'opt3'
                  }],
              url: 'https://api.github.com/users/hadley/orgs',
              resource: 'manager'
          },
          dataSrc: 'values',
          valueProperty: '',
          defaultValue: '',
          refreshOn: '',
          filter: '',
          authenticate: false,
          template: '<span>\{\{ item.label \}\}</span>',
          multiple: false,
          protected: false,
          unique: false,
          persistent: true,
          validate: {
              required: false
          },
          type: 'select',
          conditional: {
              show: null,
              when: null,
              eq: ''
          }
      },
      {
          input: true,
          tableView: true,
          label: 'Address',
          key: 'address',
          placeholder: 'Enter Address',
          multiple: false,
          protected: false,
          unique: false,
          persistent: true,
          validate: {
              required: true
          },
          type: 'address',
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          customClass: 'myclass'
      },
      {
          customClass: 'myclass',
          conditional: {
              eq: '',
              when: null,
              show: ''
          },
          type: 'resource',
          defaultPermission: '',
          validate: '{"required": false}',
          persistent: true,
          protected: false,
          multiple: false,
          searchFields: ['data.fullName'],
          selectFields: 'data.fullName, data.email',
          template: '<span>\{\{ item.data \}\}</span>',
          defaultValue: [],
          resource: '5757ea1c6e37370100cb5bce',
          project: '5757ea1c6e37370100cb5bc8',
          placeholder: 'Select Resource',
          key: 'resource',
          label: 'Resource',
          tableView: true,
          input: true,
          tags: []
      },
      {
          input: true,
          tableView: true,
          label: 'Signature',
          key: 'signature',
          placeholder: 'Please Sign here...',
          footer: 'Sign above',
          width: '100%',
          height: '200px',
          penColor: 'green',
          backgroundColor: 'rgb(245,245,235)',
          minWidth: '0.5',
          maxWidth: '2.5',
          protected: false,
          persistent: true,
          validate: {
              required: false
          },
          type: 'signature',
          hideLabel: false,
          conditional: {
              show: null,
              when: null,
              eq: ''
          },
          customClass: 'myclass'
      },
      {
          input: true,
          tableView: true,
          key: 'nameHidden',
          label: 'Name',
          protected: false,
          unique: true,
          persistent: true,
          type: 'hidden',
          conditional: {
              show: true,
              when: '',
              eq: ''
          }
      },
      {
          input: true,
          label: 'Submit',
          tableView: false,
          key: 'submit',
          size: 'md',
          leftIcon: '',
          rightIcon: '',
          block: false,
          action: 'submit',
          disableOnInvalid: false,
          theme: 'primary',
          type: 'button'
      }
    ]
  });
</script>
</div>
