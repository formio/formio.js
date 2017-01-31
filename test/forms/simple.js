window.formTests = window.formTests || [];
window.formTests.push({
  title: 'Simple Components Form Test',
  form: {
    "components": [
      {
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "First Name",
        "key": "firstName",
        "placeholder": "Enter your first name",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": true,
          "minLength": 2,
          "maxLength": 20,
          "pattern": "",
          "custom": "",
          "customPrivate": false
        },
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "type": "textfield",
        "tags": [

        ]
      },
      {
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Last Name",
        "key": "lastName",
        "placeholder": "Enter your last name",
        "prefix": "",
        "suffix": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": true,
          "minLength": 2,
          "maxLength": 20,
          "pattern": "",
          "custom": "",
          "customPrivate": false
        },
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "type": "textfield",
        "tags": [

        ]
      },
      {
        "input": true,
        "label": "Submit",
        "tableView": false,
        "key": "submit",
        "size": "md",
        "leftIcon": "",
        "rightIcon": "",
        "block": false,
        "action": "submit",
        "disableOnInvalid": false,
        "theme": "primary",
        "type": "button"
      }
    ]
  },
  test: function(form, assert, done) {
    assert.equal(true, true);
    // Test Invalid submission.
    form.submission = {data: {
      firstName: 'a',
      lastName: 'b'
    }};
    var firstName = document.getElementsByName('data[firstName]');
    assert.equal(firstName.length, 1);
    var lastName = document.getElementsByName('data[lastName]');
    assert.equal(lastName.length, 1);
    done();
  }
});
