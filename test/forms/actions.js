import assert from 'power-assert';

export default {
  title: 'Actions Form Tests',
  form: {
    components: [
      {
        type: 'hidden',
        input: true,
        key: 'priority'
      },
      {
        type: 'hidden',
        input: true,
        key: 'name'
      },
      {
        type: 'textfield',
        input: true,
        label: 'Title',
        key: 'title'
      },
      {
        type: 'fieldset',
        input: false,
        tree: true,
        legend: 'Action Settings',
        components: [
          {
            input: false,
            type: 'container',
            key: 'settings',
            components: [
              {
                clearOnHide: false,
                label: 'Columns',
                input: false,
                key: 'columns',
                columns: [
                  {
                    components: [
                      {
                        input: true,
                        label: 'Request Method',
                        key: 'method',
                        placeholder: 'Match',
                        data: {
                          values: [
                            {
                              value: '',
                              label: 'Match'
                            },
                            {
                              value: 'get',
                              label: 'GET'
                            },
                            {
                              value: 'post',
                              label: 'POST'
                            },
                            {
                              value: 'put',
                              label: 'PUT'
                            },
                            {
                              value: 'delete',
                              label: 'DELETE'
                            },
                            {
                              value: 'patch',
                              label: 'PATCH'
                            }
                          ]
                        },
                        dataSrc: 'values',
                        valueProperty: 'value',
                        template: '<span>{{ item.label }}</span>',
                        persistent: true,
                        type: 'select',
                        description: 'If set to Match it will use the same Request Type as sent to the Form.io server.'
                      }
                    ],
                    width: 2,
                    offset: 0,
                    push: 0,
                    pull: 0
                  },
                  {
                    components: [
                      {
                        label: 'Request URL',
                        key: 'url',
                        inputType: 'text',
                        defaultValue: '',
                        input: true,
                        placeholder: 'http://myreceiver.com/something.php',
                        prefix: '',
                        suffix: '',
                        type: 'textfield',
                        multiple: false,
                        validate: {
                          required: true
                        },
                        description: ''
                      }
                    ],
                    width: 10,
                    offset: 0,
                    push: 0,
                    pull: 0
                  }
                ],
                type: 'columns'
              },
              {
                key: 'panel1',
                input: false,
                tableView: false,
                title: 'HTTP Headers',
                components: [
                  {
                    type: 'checkbox',
                    persistent: true,
                    protected: false,
                    defaultValue: false,
                    key: 'forwardHeaders',
                    label: 'Forward headers',
                    tooltip: 'Pass on any headers received by the form.io server.',
                    hideLabel: false,
                    inputType: 'checkbox',
                    input: true
                  },
                  {
                    key: 'fieldset',
                    input: false,
                    tableView: false,
                    legend: 'HTTP Basic Authentication (optional)',
                    components: [
                      {
                        label: 'Authorize User',
                        key: 'username',
                        inputType: 'text',
                        defaultValue: '',
                        input: true,
                        placeholder: 'User for Basic Authentication',
                        type: 'textfield',
                        multiple: false
                      },
                      {
                        label: 'Authorize Password',
                        key: 'password',
                        inputType: 'password',
                        defaultValue: '',
                        input: true,
                        placeholder: 'Password for Basic Authentication',
                        type: 'textfield',
                        multiple: false
                      }
                    ],
                    type: 'fieldset',
                    label: 'fieldset'
                  },
                  {
                    input: true,
                    tree: true,
                    components: [
                      {
                        input: true,
                        tableView: true,
                        inputType: 'text',
                        label: 'Header',
                        key: 'header',
                        protected: false,
                        persistent: true,
                        clearOnHide: true,
                        type: 'textfield',
                        inDataGrid: true
                      },
                      {
                        input: true,
                        tableView: true,
                        inputType: 'text',
                        label: 'Value',
                        key: 'value',
                        protected: false,
                        persistent: true,
                        clearOnHide: true,
                        type: 'textfield',
                        inDataGrid: true
                      }
                    ],
                    label: 'Additional Headers',
                    key: 'headers',
                    persistent: true,
                    type: 'datagrid',
                    addAnother: 'Add Header'
                  }
                ],
                type: 'panel',
                label: 'Panel'
              },
              {
                key: 'panel2',
                input: false,
                tableView: false,
                title: 'Request Payload',
                components: [
                  {
                    key: 'content',
                    input: false,
                    html: '<p>By default the request payload will contain an object with the following information:</p> <div style="background:#eeeeee;border:1px solid #cccccc;padding:5px 10px;">{<br /> &nbsp;&nbsp;request: request, // an object containing request body to the form.io server.<br /> &nbsp;&nbsp;response: response, // an object containing the server response from the form.io server.<br /> &nbsp;&nbsp;submission: submission, // an object containing the submission object from the request.<br /> &nbsp;&nbsp;params: params, // an object containing the params for the request such as query parameters or url parameters.<br /> }</div> <p>You can use the transform payload javascript to modify the contents of the payload that will be send in this webhook. The following variables are also available: headers</p>',
                    type: 'content',
                    label: 'content'
                  },
                  {
                    autofocus: false,
                    input: true,
                    tableView: true,
                    label: 'Transform Payload',
                    key: 'transform',
                    placeholder: '/** Example Code **/\npayload = payload.submission.data;',
                    rows: 8,
                    multiple: false,
                    defaultValue: '',
                    protected: false,
                    persistent: true,
                    hidden: false,
                    wysiwyg: false,
                    spellcheck: true,
                    type: 'textarea',
                    description: 'Available variables are payload, externalId, and headers.'
                  }
                ],
                type: 'panel',
                label: 'Panel'
              },
              {
                key: 'panel3',
                type: 'panel',
                title: 'Response Payload',
                input: false,
                components: [
                  {
                    type: 'checkbox',
                    persistent: true,
                    protected: false,
                    defaultValue: false,
                    key: 'block',
                    label: 'Wait for webhook response before continuing actions',
                    hideLabel: false,
                    inputType: 'checkbox',
                    input: true
                  },
                  {
                    key: 'content',
                    input: false,
                    html: '<p>When making a request to an external service, you may want to save an external Id in association with this submission so you can refer to the same external resource later. To do that, enter an external ID reference name and the path to the id in the response data object. This value will then be available as externalId in the Request URL and Transform Payload fields.</p>',
                    type: 'content',
                    label: 'content'
                  },
                  {
                    input: true,
                    inputType: 'text',
                    label: 'External Id Type',
                    key: 'externalIdType',
                    multiple: false,
                    protected: false,
                    unique: false,
                    persistent: true,
                    type: 'textfield',
                    description: 'The name to store and reference the external Id for this request'
                  },
                  {
                    input: true,
                    inputType: 'text',
                    label: 'External Id Path',
                    key: 'externalIdPath',
                    multiple: false,
                    protected: false,
                    clearOnHide: true,
                    type: 'textfield',
                    description: 'The path to the data in the webhook response object'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'fieldset',
        input: false,
        tree: false,
        key: 'conditions',
        legend: 'Action Execution',
        components: [
          {
            type: 'select',
            input: true,
            key: 'handler',
            label: 'Handler',
            placeholder: 'Select which handler(s) you would like to trigger',
            dataSrc: 'json',
            data: {
              json: '[{"name":"before","title":"Before"},{"name":"after","title":"After"}]'
            },
            template: '<span>{{ item.title }}</span>',
            valueProperty: 'name',
            multiple: true
          },
          {
            type: 'select',
            input: true,
            label: 'Methods',
            key: 'method',
            placeholder: 'Trigger action on method(s)',
            dataSrc: 'json',
            data: {
              json: '[{"name":"create","title":"Create"},{"name":"update","title":"Update"},{"name":"read","title":"Read"},{"name":"delete","title":"Delete"},{"name":"index","title:"Index"}]'
            },
            template: '<span>{{ item.title }}</span>',
            valueProperty: 'name',
            multiple: true
          }
        ]
      },
      {
        key: 'fieldset',
        type: 'fieldset',
        input: false,
        tree: false,
        legend: 'Action Conditions (optional)',
        components: [
          {
            type: 'container',
            key: 'condition',
            input: false,
            tree: true,
            components: [
              {
                key: 'columns',
                type: 'columns',
                input: false,
                columns: [
                  {
                    components: [
                      {
                        type: 'select',
                        input: true,
                        label: 'Trigger this action only if field',
                        key: 'field',
                        placeholder: 'Select the conditional field',
                        template: '<span>{{ item.label || item.key }}</span>',
                        dataSrc: 'json',
                        data: {
                          json: '[{"key":""},{"label":"A","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"inputMask":"","allowMultipleMasks":false,"customClass":"","tabindex":"","hidden":false,"hideLabel":false,"showWordCount":false,"showCharCount":false,"mask":false,"autofocus":false,"spellcheck":true,"disabled":false,"tableView":true,"modalEdit":false,"multiple":false,"persistent":true,"inputFormat":"plain","protected":false,"dbIndex":false,"case":"","encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"pattern":"","customMessage":"","custom":"","customPrivate":false,"json":"","minLength":"","maxLength":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","key":"a","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"textfield","input":true,"refreshOn":"","inputType":"text","id":"e2wbkzv","defaultValue":""},{"label":"B","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"inputMask":"","allowMultipleMasks":false,"customClass":"","tabindex":"","hidden":false,"hideLabel":false,"showWordCount":false,"showCharCount":false,"mask":false,"autofocus":false,"spellcheck":true,"disabled":false,"tableView":true,"modalEdit":false,"multiple":false,"persistent":true,"inputFormat":"plain","protected":false,"dbIndex":false,"case":"","encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"pattern":"","customMessage":"","custom":"","customPrivate":false,"json":"","minLength":"","maxLength":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","key":"b","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"textfield","input":true,"refreshOn":"","inputType":"text","id":"e8j79z","defaultValue":""},{"label":"C","labelPosition":"top","placeholder":"","description":"","tooltip":"","prefix":"","suffix":"","widget":{"type":"input"},"inputMask":"","allowMultipleMasks":false,"customClass":"","tabindex":"","hidden":false,"hideLabel":false,"showWordCount":false,"showCharCount":false,"mask":false,"autofocus":false,"spellcheck":true,"disabled":false,"tableView":true,"modalEdit":false,"multiple":false,"persistent":true,"inputFormat":"plain","protected":false,"dbIndex":false,"case":"","encrypted":false,"redrawOn":"","clearOnHide":true,"customDefaultValue":"","calculateValue":"","calculateServer":false,"allowCalculateOverride":false,"validateOn":"change","validate":{"required":false,"pattern":"","customMessage":"","custom":"","customPrivate":false,"json":"","minLength":"","maxLength":"","strictDateValidation":false,"multiple":false,"unique":false},"unique":false,"errorLabel":"","key":"c","tags":[],"properties":{},"conditional":{"show":null,"when":null,"eq":"","json":""},"customConditional":"","logic":[],"attributes":{},"overlay":{"style":"","page":"","left":"","top":"","width":"","height":""},"type":"textfield","input":true,"refreshOn":"","inputType":"text","id":"etrp7lb","defaultValue":""},{"type":"button","label":"Submit","key":"submit","size":"md","block":false,"action":"submit","disableOnInvalid":true,"theme":"primary","input":true,"placeholder":"","prefix":"","customClass":"","suffix":"","multiple":false,"defaultValue":null,"protected":false,"unique":false,"persistent":false,"hidden":false,"clearOnHide":true,"refreshOn":"","redrawOn":"","tableView":false,"modalEdit":false,"labelPosition":"top","description":"","errorLabel":"","tooltip":"","hideLabel":false,"tabindex":"","disabled":false,"autofocus":false,"dbIndex":false,"customDefaultValue":"","calculateValue":"","widget":{"type":"input"},"attributes":{},"validateOn":"change","validate":{"required":false,"custom":"","customPrivate":false,"strictDateValidation":false,"multiple":false,"unique":false},"conditional":{"show":null,"when":null,"eq":""},"overlay":{"style":"","left":"","top":"","width":"","height":""},"allowCalculateOverride":false,"encrypted":false,"showCharCount":false,"showWordCount":false,"properties":{},"allowMultipleMasks":false,"leftIcon":"","rightIcon":"","dataGridLabel":true,"id":"ew4sbvh"}]'
                        },
                        valueProperty: 'key',
                        multiple: false
                      },
                      {
                        type: 'select',
                        input: true,
                        label: '',
                        key: 'eq',
                        placeholder: 'Select comparison',
                        template: '<span>{{ item.label }}</span>',
                        dataSrc: 'values',
                        data: {
                          values: [
                            {
                              value: '',
                              label: ''
                            },
                            {
                              value: 'equals',
                              label: 'Equals'
                            },
                            {
                              value: 'notEqual',
                              label: 'Does Not Equal'
                            }
                          ],
                          json: '',
                          url: '',
                          resource: ''
                        },
                        valueProperty: 'value',
                        multiple: false
                      },
                      {
                        input: true,
                        type: 'textfield',
                        inputType: 'text',
                        label: '',
                        key: 'value',
                        placeholder: 'Enter value',
                        multiple: false
                      }
                    ]
                  },
                  {
                    components: [
                      {
                        key: 'well2',
                        type: 'well',
                        input: false,
                        components: [
                          {
                            key: 'html',
                            type: 'htmlelement',
                            tag: 'h4',
                            input: false,
                            content: 'Or you can provide your own custom JavaScript or <a href="http://jsonlogic.com" target="_blank">JSON</a> condition logic here',
                            className: ''
                          },
                          {
                            label: '',
                            type: 'textarea',
                            input: true,
                            key: 'custom',
                            editorComponents: [
                              {
                                label: 'A',
                                labelPosition: 'top',
                                placeholder: '',
                                description: '',
                                tooltip: '',
                                prefix: '',
                                suffix: '',
                                widget: {
                                  type: 'input'
                                },
                                inputMask: '',
                                allowMultipleMasks: false,
                                customClass: '',
                                tabindex: '',
                                hidden: false,
                                hideLabel: false,
                                showWordCount: false,
                                showCharCount: false,
                                mask: false,
                                autofocus: false,
                                spellcheck: true,
                                disabled: false,
                                tableView: true,
                                modalEdit: false,
                                multiple: false,
                                persistent: true,
                                inputFormat: 'plain',
                                protected: false,
                                dbIndex: false,
                                case: '',
                                encrypted: false,
                                redrawOn: '',
                                clearOnHide: true,
                                customDefaultValue: '',
                                calculateValue: '',
                                calculateServer: false,
                                allowCalculateOverride: false,
                                validateOn: 'change',
                                validate: {
                                  required: false,
                                  pattern: '',
                                  customMessage: '',
                                  custom: '',
                                  customPrivate: false,
                                  json: '',
                                  minLength: '',
                                  maxLength: '',
                                  strictDateValidation: false,
                                  multiple: false,
                                  unique: false
                                },
                                unique: false,
                                errorLabel: '',
                                key: 'a',
                                tags: [],
                                properties: {},
                                conditional: {
                                  show: null,
                                  when: null,
                                  eq: '',
                                  json: ''
                                },
                                customConditional: '',
                                logic: [],
                                attributes: {},
                                overlay: {
                                  style: '',
                                  page: '',
                                  left: '',
                                  top: '',
                                  width: '',
                                  height: ''
                                },
                                type: 'textfield',
                                input: true,
                                refreshOn: '',
                                inputType: 'text',
                                id: 'e2wbkzv',
                                defaultValue: ''
                              },
                              {
                                label: 'B',
                                labelPosition: 'top',
                                placeholder: '',
                                description: '',
                                tooltip: '',
                                prefix: '',
                                suffix: '',
                                widget: {
                                  type: 'input'
                                },
                                inputMask: '',
                                allowMultipleMasks: false,
                                customClass: '',
                                tabindex: '',
                                hidden: false,
                                hideLabel: false,
                                showWordCount: false,
                                showCharCount: false,
                                mask: false,
                                autofocus: false,
                                spellcheck: true,
                                disabled: false,
                                tableView: true,
                                modalEdit: false,
                                multiple: false,
                                persistent: true,
                                inputFormat: 'plain',
                                protected: false,
                                dbIndex: false,
                                case: '',
                                encrypted: false,
                                redrawOn: '',
                                clearOnHide: true,
                                customDefaultValue: '',
                                calculateValue: '',
                                calculateServer: false,
                                allowCalculateOverride: false,
                                validateOn: 'change',
                                validate: {
                                  required: false,
                                  pattern: '',
                                  customMessage: '',
                                  custom: '',
                                  customPrivate: false,
                                  json: '',
                                  minLength: '',
                                  maxLength: '',
                                  strictDateValidation: false,
                                  multiple: false,
                                  unique: false
                                },
                                unique: false,
                                errorLabel: '',
                                key: 'b',
                                tags: [],
                                properties: {},
                                conditional: {
                                  show: null,
                                  when: null,
                                  eq: '',
                                  json: ''
                                },
                                customConditional: '',
                                logic: [],
                                attributes: {},
                                overlay: {
                                  style: '',
                                  page: '',
                                  left: '',
                                  top: '',
                                  width: '',
                                  height: ''
                                },
                                type: 'textfield',
                                input: true,
                                refreshOn: '',
                                inputType: 'text',
                                id: 'e8j79z',
                                defaultValue: ''
                              },
                              {
                                label: 'C',
                                labelPosition: 'top',
                                placeholder: '',
                                description: '',
                                tooltip: '',
                                prefix: '',
                                suffix: '',
                                widget: {
                                  type: 'input'
                                },
                                inputMask: '',
                                allowMultipleMasks: false,
                                customClass: '',
                                tabindex: '',
                                hidden: false,
                                hideLabel: false,
                                showWordCount: false,
                                showCharCount: false,
                                mask: false,
                                autofocus: false,
                                spellcheck: true,
                                disabled: false,
                                tableView: true,
                                modalEdit: false,
                                multiple: false,
                                persistent: true,
                                inputFormat: 'plain',
                                protected: false,
                                dbIndex: false,
                                case: '',
                                encrypted: false,
                                redrawOn: '',
                                clearOnHide: true,
                                customDefaultValue: '',
                                calculateValue: '',
                                calculateServer: false,
                                allowCalculateOverride: false,
                                validateOn: 'change',
                                validate: {
                                  required: false,
                                  pattern: '',
                                  customMessage: '',
                                  custom: '',
                                  customPrivate: false,
                                  json: '',
                                  minLength: '',
                                  maxLength: '',
                                  strictDateValidation: false,
                                  multiple: false,
                                  unique: false
                                },
                                unique: false,
                                errorLabel: '',
                                key: 'c',
                                tags: [],
                                properties: {},
                                conditional: {
                                  show: null,
                                  when: null,
                                  eq: '',
                                  json: ''
                                },
                                customConditional: '',
                                logic: [],
                                attributes: {},
                                overlay: {
                                  style: '',
                                  page: '',
                                  left: '',
                                  top: '',
                                  width: '',
                                  height: ''
                                },
                                type: 'textfield',
                                input: true,
                                refreshOn: '',
                                inputType: 'text',
                                id: 'etrp7lb',
                                defaultValue: ''
                              },
                              {
                                type: 'button',
                                label: 'Submit',
                                key: 'submit',
                                size: 'md',
                                block: false,
                                action: 'submit',
                                disableOnInvalid: true,
                                theme: 'primary',
                                input: true,
                                placeholder: '',
                                prefix: '',
                                customClass: '',
                                suffix: '',
                                multiple: false,
                                defaultValue: null,
                                protected: false,
                                unique: false,
                                persistent: false,
                                hidden: false,
                                clearOnHide: true,
                                refreshOn: '',
                                redrawOn: '',
                                tableView: false,
                                modalEdit: false,
                                labelPosition: 'top',
                                description: '',
                                errorLabel: '',
                                tooltip: '',
                                hideLabel: false,
                                tabindex: '',
                                disabled: false,
                                autofocus: false,
                                dbIndex: false,
                                customDefaultValue: '',
                                calculateValue: '',
                                widget: {
                                  type: 'input'
                                },
                                attributes: {},
                                validateOn: 'change',
                                validate: {
                                  required: false,
                                  custom: '',
                                  customPrivate: false,
                                  strictDateValidation: false,
                                  multiple: false,
                                  unique: false
                                },
                                conditional: {
                                  show: null,
                                  when: null,
                                  eq: ''
                                },
                                overlay: {
                                  style: '',
                                  left: '',
                                  top: '',
                                  width: '',
                                  height: ''
                                },
                                allowCalculateOverride: false,
                                encrypted: false,
                                showCharCount: false,
                                showWordCount: false,
                                properties: {},
                                allowMultipleMasks: false,
                                leftIcon: '',
                                rightIcon: '',
                                dataGridLabel: true,
                                id: 'ew4sbvh'
                              }
                            ],
                            placeholder: '// Example: Only execute if submitted roles has authenticated".\nJavaScript: execute = (data.roles.indexOf("authenticated") !== -1);\nJSON: { "in": [ "authenticated", { "var: "data.roles" } ] }'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        key: 'html2',
        type: 'htmlelement',
        tag: 'hr',
        input: false,
        content: '',
        className: ''
      },
      {
        type: 'button',
        input: true,
        label: 'Save Action',
        key: 'submit',
        size: 'md',
        leftIcon: '',
        rightIcon: '',
        block: false,
        action: 'submit',
        disableOnInvalid: true,
        theme: 'primary'
      }
    ],
    action: '/project/5e447ffae9d4804078d70048/form/5e5f11d53a26d9d7682492f3/action'
  },
  tests: {
    'Test initialize action with data'(form, done) {
      form.setSubmission({
        data: {
          settings: {},
          condition: {},
          _id: '5e5f14a23a26d9d768249322',
          handler: [
            'after'
          ],
          method: [
            'create',
            'update'
          ],
          priority: 0,
          name: 'webhook',
          title: 'Webhook (Premium)',
          form: '5e5f11d53a26d9d7682492f3',
          machineName: 'ozvjjccvueotocl:webhooks:webhook'
        }
      }).then(() => {
        const formSubmission = {
          data:{
            ...form.submission.data,
            condition: {},
            settings: {}
          }
        }
        assert.deepEqual(formSubmission, {
          data: {
            priority: 0,
            name: 'webhook',
            title: 'Webhook (Premium)',
            settings: {},
            handler: [
              'after'
            ],
            method: [
              'create',
              'update'
            ],
            condition: {},
            submit: false,
            _id: '5e5f14a23a26d9d768249322',
            form: '5e5f11d53a26d9d7682492f3',
            machineName: 'ozvjjccvueotocl:webhooks:webhook'
          }
        });
        form.on('componentChange', function() {
          const formSubmissionAfterChange = {
            data:{
              ...form.submission.data,
              condition: {},
              settings: {
                url: form.submission.data.settings.url,
              }
            }
          };

          assert.deepEqual(formSubmissionAfterChange, {
            data: {
              priority: 0,
              name: 'webhook',
              title: 'Webhook (Premium)',
              settings: {
                url: 'https://google.com'
              },
              handler: [
                'after'
              ],
              method: [
                'create',
                'update'
              ],
              condition: {},
              submit: false,
              _id: '5e5f14a23a26d9d768249322',
              form: '5e5f11d53a26d9d7682492f3',
              machineName: 'ozvjjccvueotocl:webhooks:webhook'
            }
          });
     
          form.destroy();
          done();
        });

        const requestUrl = form.getComponent('url');
        requestUrl.updateValue('https://google.com');
      });
    }
  }
};
