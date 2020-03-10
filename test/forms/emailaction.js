import assert from 'power-assert';

export default {
  title: 'Email Action Test',
  form: {
    "components": [
      {
        "type": "hidden",
        "input": true,
        "key": "priority"
      },
      {
        "type": "hidden",
        "input": true,
        "key": "name"
      },
      {
        "type": "textfield",
        "input": true,
        "label": "Title",
        "key": "title"
      },
      {
        "type": "fieldset",
        "input": false,
        "tree": true,
        "legend": "Action Settings",
        "components": [
          {
            "input": false,
            "type": "container",
            "key": "settings",
            "components": [
              {
                "type": "select",
                "input": true,
                "label": "Transport",
                "key": "transport",
                "placeholder": "Select the email transport.",
                "template": "<span>{{ item.title }}</span>",
                "defaultValue": "default",
                "dataSrc": "json",
                "data": {
                  "json": "[{\"transport\":\"default\",\"title\":\"Default (charges may apply)\"},{\"transport\":\"smtp\",\"title\":\"SMTP\"}]"
                },
                "valueProperty": "transport",
                "multiple": false,
                "validate": {
                  "required": true
                }
              },
              {
                "label": "From:",
                "key": "from",
                "inputType": "text",
                "defaultValue": "no-reply@form.io",
                "input": true,
                "placeholder": "Send the email from the following address",
                "type": "textfield",
                "multiple": false
              },
              {
                "label": "To: Email Address",
                "key": "emails",
                "inputType": "text",
                "defaultValue": "",
                "input": true,
                "placeholder": "Send to the following email",
                "type": "textfield",
                "multiple": true,
                "validate": {
                  "required": true
                }
              },
              {
                "label": "Send a separate email to each recipient",
                "key": "sendEach",
                "type": "checkbox",
                "input": true
              },
              {
                "label": "Cc: Email Address",
                "key": "cc",
                "inputType": "text",
                "defaultValue": "",
                "input": true,
                "placeholder": "Send copy of the email to the following email",
                "type": "textfield",
                "multiple": true
              },
              {
                "label": "Bcc: Email Address",
                "key": "bcc",
                "inputType": "text",
                "defaultValue": "",
                "input": true,
                "placeholder": "Send blink copy of the email to the following email (other recipients will not see this)",
                "type": "textfield",
                "multiple": true
              },
              {
                "label": "Subject",
                "key": "subject",
                "inputType": "text",
                "defaultValue": "New submission for {{ form.title }}.",
                "input": true,
                "placeholder": "Email subject",
                "type": "textfield",
                "multiple": false
              },
              {
                "label": "Email Template URL",
                "key": "template",
                "inputType": "text",
                "defaultValue": "https://pro.formview.io/assets/email.html",
                "placeholder": "Enter a URL for your external email template.",
                "type": "textfield",
                "multiple": false
              },
              {
                "label": "Message",
                "key": "message",
                "type": "textarea",
                "defaultValue": "{{ submission(data, form.components) }}",
                "multiple": false,
                "rows": 3,
                "placeholder": "Enter the message you would like to send.",
                "input": true
              },
              {
                "type": "checkbox",
                "input": true,
                "key": "attachFiles",
                "label": "Attach Submission Files",
                "tooltip": "Check this if you would like to attach submission files to the email."
              },
              {
                "type": "checkbox",
                "input": true,
                "key": "attachPDF",
                "label": "Attach Submission PDF",
                "tooltip": "Check this if you would like to attach a PDF of the submission to the email. This will count toward your PDF Submission count for every email sent."
              },
              {
                "type": "textfield",
                "input": true,
                "key": "pdfName",
                "label": "PDF File Name",
                "defaultValue": "{{ form.name }}-{{ submission._id }}",
                "tooltip": "Determines how the submission PDF is named when it is attached.",
                "customConditional": "show = !!data.settings.attachPDF;"
              }
            ]
          }
        ]
      },
      {
        "type": "fieldset",
        "input": false,
        "tree": false,
        "key": "conditions",
        "legend": "Action Execution",
        "components": [
          {
            "type": "select",
            "input": true,
            "key": "handler",
            "label": "Handler",
            "placeholder": "Select which handler(s) you would like to trigger",
            "dataSrc": "json",
            "data": {
              "json": "[{\"name\":\"before\",\"title\":\"Before\"},{\"name\":\"after\",\"title\":\"After\"}]"
            },
            "template": "<span>{{ item.title }}</span>",
            "valueProperty": "name",
            "multiple": true
          },
          {
            "type": "select",
            "input": true,
            "label": "Methods",
            "key": "method",
            "placeholder": "Trigger action on method(s)",
            "dataSrc": "json",
            "data": {
              "json": "[{\"name\":\"create\",\"title\":\"Create\"},{\"name\":\"update\",\"title\":\"Update\"},{\"name\":\"read\",\"title\":\"Read\"},{\"name\":\"delete\",\"title\":\"Delete\"},{\"name\":\"index\",\"title\":\"Index\"}]"
            },
            "template": "<span>{{ item.title }}</span>",
            "valueProperty": "name",
            "multiple": true
          }
        ]
      },
      {
        "key": "fieldset",
        "type": "fieldset",
        "input": false,
        "tree": false,
        "legend": "Action Conditions (optional)",
        "components": [
          {
            "type": "container",
            "key": "condition",
            "input": false,
            "tree": true,
            "components": [
              {
                "key": "columns",
                "type": "columns",
                "input": false,
                "columns": [
                  {
                    "components": [
                      {
                        "type": "select",
                        "input": true,
                        "label": "Trigger this action only if field",
                        "key": "field",
                        "placeholder": "Select the conditional field",
                        "template": "<span>{{ item.label || item.key }}</span>",
                        "dataSrc": "json",
                        "data": {
                          "json": "[{\"key\":\"\"},{\"label\":\"A\",\"labelPosition\":\"top\",\"placeholder\":\"\",\"description\":\"\",\"tooltip\":\"\",\"prefix\":\"\",\"suffix\":\"\",\"widget\":{\"type\":\"input\"},\"inputMask\":\"\",\"allowMultipleMasks\":false,\"customClass\":\"\",\"tabindex\":\"\",\"hidden\":false,\"hideLabel\":false,\"showWordCount\":false,\"showCharCount\":false,\"mask\":false,\"autofocus\":false,\"spellcheck\":true,\"disabled\":false,\"tableView\":true,\"modalEdit\":false,\"multiple\":false,\"persistent\":true,\"inputFormat\":\"plain\",\"protected\":false,\"dbIndex\":false,\"case\":\"\",\"encrypted\":false,\"redrawOn\":\"\",\"clearOnHide\":true,\"customDefaultValue\":\"\",\"calculateValue\":\"\",\"calculateServer\":false,\"allowCalculateOverride\":false,\"validateOn\":\"change\",\"validate\":{\"required\":false,\"pattern\":\"\",\"customMessage\":\"\",\"custom\":\"\",\"customPrivate\":false,\"json\":\"\",\"minLength\":\"\",\"maxLength\":\"\",\"strictDateValidation\":false,\"multiple\":false,\"unique\":false},\"unique\":false,\"errorLabel\":\"\",\"key\":\"a\",\"tags\":[],\"properties\":{},\"conditional\":{\"show\":null,\"when\":null,\"eq\":\"\",\"json\":\"\"},\"customConditional\":\"\",\"logic\":[],\"attributes\":{},\"overlay\":{\"style\":\"\",\"page\":\"\",\"left\":\"\",\"top\":\"\",\"width\":\"\",\"height\":\"\"},\"type\":\"textfield\",\"input\":true,\"refreshOn\":\"\",\"inputType\":\"text\",\"id\":\"exqblo\",\"defaultValue\":\"\"},{\"label\":\"B\",\"labelPosition\":\"top\",\"placeholder\":\"\",\"description\":\"\",\"tooltip\":\"\",\"prefix\":\"\",\"suffix\":\"\",\"widget\":{\"type\":\"input\"},\"inputMask\":\"\",\"allowMultipleMasks\":false,\"customClass\":\"\",\"tabindex\":\"\",\"hidden\":false,\"hideLabel\":false,\"showWordCount\":false,\"showCharCount\":false,\"mask\":false,\"autofocus\":false,\"spellcheck\":true,\"disabled\":false,\"tableView\":true,\"modalEdit\":false,\"multiple\":false,\"persistent\":true,\"inputFormat\":\"plain\",\"protected\":false,\"dbIndex\":false,\"case\":\"\",\"encrypted\":false,\"redrawOn\":\"\",\"clearOnHide\":true,\"customDefaultValue\":\"\",\"calculateValue\":\"\",\"calculateServer\":false,\"allowCalculateOverride\":false,\"validateOn\":\"change\",\"validate\":{\"required\":false,\"pattern\":\"\",\"customMessage\":\"\",\"custom\":\"\",\"customPrivate\":false,\"json\":\"\",\"minLength\":\"\",\"maxLength\":\"\",\"strictDateValidation\":false,\"multiple\":false,\"unique\":false},\"unique\":false,\"errorLabel\":\"\",\"key\":\"b\",\"tags\":[],\"properties\":{},\"conditional\":{\"show\":null,\"when\":null,\"eq\":\"\",\"json\":\"\"},\"customConditional\":\"\",\"logic\":[],\"attributes\":{},\"overlay\":{\"style\":\"\",\"page\":\"\",\"left\":\"\",\"top\":\"\",\"width\":\"\",\"height\":\"\"},\"type\":\"textfield\",\"input\":true,\"refreshOn\":\"\",\"inputType\":\"text\",\"id\":\"ehz47ok\",\"defaultValue\":\"\"},{\"type\":\"button\",\"label\":\"Submit\",\"key\":\"submit\",\"size\":\"md\",\"block\":false,\"action\":\"submit\",\"disableOnInvalid\":true,\"theme\":\"primary\",\"input\":true,\"placeholder\":\"\",\"prefix\":\"\",\"customClass\":\"\",\"suffix\":\"\",\"multiple\":false,\"defaultValue\":null,\"protected\":false,\"unique\":false,\"persistent\":false,\"hidden\":false,\"clearOnHide\":true,\"refreshOn\":\"\",\"redrawOn\":\"\",\"tableView\":false,\"modalEdit\":false,\"labelPosition\":\"top\",\"description\":\"\",\"errorLabel\":\"\",\"tooltip\":\"\",\"hideLabel\":false,\"tabindex\":\"\",\"disabled\":false,\"autofocus\":false,\"dbIndex\":false,\"customDefaultValue\":\"\",\"calculateValue\":\"\",\"widget\":{\"type\":\"input\"},\"attributes\":{},\"validateOn\":\"change\",\"validate\":{\"required\":false,\"custom\":\"\",\"customPrivate\":false,\"strictDateValidation\":false,\"multiple\":false,\"unique\":false},\"conditional\":{\"show\":null,\"when\":null,\"eq\":\"\"},\"overlay\":{\"style\":\"\",\"left\":\"\",\"top\":\"\",\"width\":\"\",\"height\":\"\"},\"allowCalculateOverride\":false,\"encrypted\":false,\"showCharCount\":false,\"showWordCount\":false,\"properties\":{},\"allowMultipleMasks\":false,\"leftIcon\":\"\",\"rightIcon\":\"\",\"dataGridLabel\":true,\"id\":\"e0fow3\"}]"
                        },
                        "valueProperty": "key",
                        "multiple": false
                      },
                      {
                        "type": "select",
                        "input": true,
                        "label": "",
                        "key": "eq",
                        "placeholder": "Select comparison",
                        "template": "<span>{{ item.label }}</span>",
                        "dataSrc": "values",
                        "data": {
                          "values": [
                            {
                              "value": "",
                              "label": ""
                            },
                            {
                              "value": "equals",
                              "label": "Equals"
                            },
                            {
                              "value": "notEqual",
                              "label": "Does Not Equal"
                            }
                          ],
                          "json": "",
                          "url": "",
                          "resource": ""
                        },
                        "valueProperty": "value",
                        "multiple": false
                      },
                      {
                        "input": true,
                        "type": "textfield",
                        "inputType": "text",
                        "label": "",
                        "key": "value",
                        "placeholder": "Enter value",
                        "multiple": false
                      }
                    ]
                  },
                  {
                    "components": [
                      {
                        "key": "well2",
                        "type": "well",
                        "input": false,
                        "components": [
                          {
                            "key": "html",
                            "type": "htmlelement",
                            "tag": "h4",
                            "input": false,
                            "content": "Or you can provide your own custom JavaScript or <a href=\"http://jsonlogic.com\" target=\"_blank\">JSON</a> condition logic here",
                            "className": ""
                          },
                          {
                            "label": "",
                            "type": "textarea",
                            "input": true,
                            "key": "custom",
                            "editorComponents": [
                              {
                                "label": "A",
                                "labelPosition": "top",
                                "placeholder": "",
                                "description": "",
                                "tooltip": "",
                                "prefix": "",
                                "suffix": "",
                                "widget": {
                                  "type": "input"
                                },
                                "inputMask": "",
                                "allowMultipleMasks": false,
                                "customClass": "",
                                "tabindex": "",
                                "hidden": false,
                                "hideLabel": false,
                                "showWordCount": false,
                                "showCharCount": false,
                                "mask": false,
                                "autofocus": false,
                                "spellcheck": true,
                                "disabled": false,
                                "tableView": true,
                                "modalEdit": false,
                                "multiple": false,
                                "persistent": true,
                                "inputFormat": "plain",
                                "protected": false,
                                "dbIndex": false,
                                "case": "",
                                "encrypted": false,
                                "redrawOn": "",
                                "clearOnHide": true,
                                "customDefaultValue": "",
                                "calculateValue": "",
                                "calculateServer": false,
                                "allowCalculateOverride": false,
                                "validateOn": "change",
                                "validate": {
                                  "required": false,
                                  "pattern": "",
                                  "customMessage": "",
                                  "custom": "",
                                  "customPrivate": false,
                                  "json": "",
                                  "minLength": "",
                                  "maxLength": "",
                                  "strictDateValidation": false,
                                  "multiple": false,
                                  "unique": false
                                },
                                "unique": false,
                                "errorLabel": "",
                                "key": "a",
                                "tags": [],
                                "properties": {},
                                "conditional": {
                                  "show": null,
                                  "when": null,
                                  "eq": "",
                                  "json": ""
                                },
                                "customConditional": "",
                                "logic": [],
                                "attributes": {},
                                "overlay": {
                                  "style": "",
                                  "page": "",
                                  "left": "",
                                  "top": "",
                                  "width": "",
                                  "height": ""
                                },
                                "type": "textfield",
                                "input": true,
                                "refreshOn": "",
                                "inputType": "text",
                                "id": "exqblo",
                                "defaultValue": ""
                              },
                              {
                                "label": "B",
                                "labelPosition": "top",
                                "placeholder": "",
                                "description": "",
                                "tooltip": "",
                                "prefix": "",
                                "suffix": "",
                                "widget": {
                                  "type": "input"
                                },
                                "inputMask": "",
                                "allowMultipleMasks": false,
                                "customClass": "",
                                "tabindex": "",
                                "hidden": false,
                                "hideLabel": false,
                                "showWordCount": false,
                                "showCharCount": false,
                                "mask": false,
                                "autofocus": false,
                                "spellcheck": true,
                                "disabled": false,
                                "tableView": true,
                                "modalEdit": false,
                                "multiple": false,
                                "persistent": true,
                                "inputFormat": "plain",
                                "protected": false,
                                "dbIndex": false,
                                "case": "",
                                "encrypted": false,
                                "redrawOn": "",
                                "clearOnHide": true,
                                "customDefaultValue": "",
                                "calculateValue": "",
                                "calculateServer": false,
                                "allowCalculateOverride": false,
                                "validateOn": "change",
                                "validate": {
                                  "required": false,
                                  "pattern": "",
                                  "customMessage": "",
                                  "custom": "",
                                  "customPrivate": false,
                                  "json": "",
                                  "minLength": "",
                                  "maxLength": "",
                                  "strictDateValidation": false,
                                  "multiple": false,
                                  "unique": false
                                },
                                "unique": false,
                                "errorLabel": "",
                                "key": "b",
                                "tags": [],
                                "properties": {},
                                "conditional": {
                                  "show": null,
                                  "when": null,
                                  "eq": "",
                                  "json": ""
                                },
                                "customConditional": "",
                                "logic": [],
                                "attributes": {},
                                "overlay": {
                                  "style": "",
                                  "page": "",
                                  "left": "",
                                  "top": "",
                                  "width": "",
                                  "height": ""
                                },
                                "type": "textfield",
                                "input": true,
                                "refreshOn": "",
                                "inputType": "text",
                                "id": "ehz47ok",
                                "defaultValue": ""
                              },
                              {
                                "type": "button",
                                "label": "Submit",
                                "key": "submit",
                                "size": "md",
                                "block": false,
                                "action": "submit",
                                "disableOnInvalid": true,
                                "theme": "primary",
                                "input": true,
                                "placeholder": "",
                                "prefix": "",
                                "customClass": "",
                                "suffix": "",
                                "multiple": false,
                                "defaultValue": null,
                                "protected": false,
                                "unique": false,
                                "persistent": false,
                                "hidden": false,
                                "clearOnHide": true,
                                "refreshOn": "",
                                "redrawOn": "",
                                "tableView": false,
                                "modalEdit": false,
                                "labelPosition": "top",
                                "description": "",
                                "errorLabel": "",
                                "tooltip": "",
                                "hideLabel": false,
                                "tabindex": "",
                                "disabled": false,
                                "autofocus": false,
                                "dbIndex": false,
                                "customDefaultValue": "",
                                "calculateValue": "",
                                "widget": {
                                  "type": "input"
                                },
                                "attributes": {},
                                "validateOn": "change",
                                "validate": {
                                  "required": false,
                                  "custom": "",
                                  "customPrivate": false,
                                  "strictDateValidation": false,
                                  "multiple": false,
                                  "unique": false
                                },
                                "conditional": {
                                  "show": null,
                                  "when": null,
                                  "eq": ""
                                },
                                "overlay": {
                                  "style": "",
                                  "left": "",
                                  "top": "",
                                  "width": "",
                                  "height": ""
                                },
                                "allowCalculateOverride": false,
                                "encrypted": false,
                                "showCharCount": false,
                                "showWordCount": false,
                                "properties": {},
                                "allowMultipleMasks": false,
                                "leftIcon": "",
                                "rightIcon": "",
                                "dataGridLabel": true,
                                "id": "e0fow3"
                              }
                            ],
                            "placeholder": "// Example: Only execute if submitted roles has 'authenticated'.\nJavaScript: execute = (data.roles.indexOf('authenticated') !== -1);\nJSON: { \"in\": [ \"authenticated\", { \"var\": \"data.roles\" } ] }"
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
        "key": "html2",
        "type": "htmlelement",
        "tag": "hr",
        "input": false,
        "content": "",
        "className": ""
      },
      {
        "type": "button",
        "input": true,
        "label": "Save Action",
        "key": "submit",
        "size": "md",
        "leftIcon": "",
        "rightIcon": "",
        "block": false,
        "action": "submit",
        "disableOnInvalid": true,
        "theme": "primary"
      }
    ],
    "action": "/project/59bbe2ec8c246100079191ae/form/5e62b0974d10775661492d07/action"
  },
  tests: {
    'Test initialize action with data'(form, done) {
      form.setSubmission({
        "data": {
          "settings": {},
          "condition": {},
          "handler": [
            "after"
          ],
          "method": [
            "create"
          ],
          "priority": 0,
          "name": "email",
          "title": "Email"
        }
      }).then(() => {
        form.setSubmission({
          "data": {
            "priority": 0,
            "name": "email",
            "title": "Email",
            "settings": {
              "transport": "default"
            },
            "handler": [
              "after"
            ],
            "method": [
              "create"
            ],
            "condition": {},
            "submit": false
          }
        }).then(() => {
          form.on('componentChange', function() {
            // Make sure it still applies all the default values of these components.
            assert.deepEqual(form.submission.data.settings, {
              sendEach: false,
              attachFiles: false,
              attachPDF: false,
              transport: 'default',
              from: 'no-reply@form.io',
              emails: ['travis@form.io'],
              cc: [''],
              bcc: [''],
              subject: 'New submission for {{ form.title }}.',
              template: 'https://pro.formview.io/assets/email.html',
              message: '{{ submission(data, form.components) }}'
            });
            done();
          });
          const toEmail = form.getComponent('emails');
          toEmail.updateValue(['travis@form.io']);
        })
      });
    }
  }
};
