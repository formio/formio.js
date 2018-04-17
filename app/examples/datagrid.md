---
title: Data Grid Input
layout: vtabs
section: examples
weight: 220
---
### Data Grid Input
Data Grids allow you to collect an array of object values.

```js
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'datagrid',
        input: true,
        validate: {
          minLength: 3,
          maxLength: 6
        },
        components: [
          {
            label: 'First Name',
            key: 'firstName',
            type: 'textfield',
            input: true
          },
          {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield',
            input: true
          },
          {
            label: 'Gender',
            key: 'gender',
            type: 'select',
            input: true,
            data: {
              values: [
                {
                  value: 'male',
                  label: 'Male'
                },
                {
                  value: 'female',
                  label: 'Female'
                },
                {
                  value: 'other',
                  label: 'Other'
                }
              ]
            },
            dataSrc: 'values',
            template: '<span>{% raw %}{{ item.label }}{% endraw %}</span>'
          },
          {
            type: 'checkbox',
            label: 'Dependant',
            key: 'dependant',
            inputType: 'checkbox',
            input: true
          },
          {
            label: 'Birthdate',
            key: 'birthdate',
            type: 'datetime',
            input: true,
            format: 'yyyy-MM-dd hh:mm a',
            enableDate: true,
            enableTime: true,
            defaultDate: '',
            datepickerMode: 'day',
            datePicker: {
              showWeeks: true,
              startingDay: 0,
              initDate: '',
              minMode: 'day',
              maxMode: 'year',
              yearRows: 4,
              yearColumns: 5,
              datepickerMode: 'day'
            },
            timePicker: {
              hourStep: 1,
              minuteStep: 1,
              showMeridian: true,
              readonlyInput: false,
              mousewheel: true,
              arrowkeys: true
            },
            "conditional": {
              "eq": "true",
              "when": "dependant",
              "show": "true"
            }
          }
        ]
      }
    ]
}).then(function(form) {
  // Provide a default submission.
  form.submission = {
    data: {
      children: [
        {
          firstName: 'Joe',
          lastName: 'Smith',
          gender: 'male',
          dependant: true,
          birthdate: '1982-05-18'
        },
        {
          firstName: 'Mary',
          lastName: 'Smith',
          gender: 'female',
          dependant: false,
          birthdate: '1979-02-17'
        }
      ]
    }
  };
});
````

<h3>Result</h3>
<div class='well'>
<div id='formio'></div>
<script type='text/javascript'>
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'datagrid',
        input: true,
        validate: {
          minLength: 3,
          maxLength: 6
        },
        components: [
          {
            label: 'First Name',
            key: 'firstName',
            type: 'textfield',
            input: true
          },
          {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield',
            input: true
          },
          {
            label: 'Gender',
            key: 'gender',
            type: 'select',
            input: true,
            data: {
              values: [
                {
                  value: 'male',
                  label: 'Male'
                },
                {
                  value: 'female',
                  label: 'Female'
                },
                {
                  value: 'other',
                  label: 'Other'
                }
              ]
            },
            dataSrc: 'values',
            template: '<span>{% raw %}{{ item.label }}{% endraw %}</span>'
          },
          {
            type: 'checkbox',
            label: 'Dependant',
            key: 'dependant',
            inputType: 'checkbox',
            input: true
          },
          {
            label: 'Birthdate',
            key: 'birthdate',
            type: 'datetime',
            input: true,
            format: 'yyyy-MM-dd hh:mm a',
            enableDate: true,
            enableTime: true,
            defaultDate: '',
            datepickerMode: 'day',
            datePicker: {
              showWeeks: true,
              startingDay: 0,
              initDate: '',
              minMode: 'day',
              maxMode: 'year',
              yearRows: 4,
              yearColumns: 5,
              datepickerMode: 'day'
            },
            timePicker: {
              hourStep: 1,
              minuteStep: 1,
              showMeridian: true,
              readonlyInput: false,
              mousewheel: true,
              arrowkeys: true
            },
            "conditional": {
              "eq": "true",
              "when": "dependant",
              "show": "true"
            }
          }
        ]
      }
    ]
}).then(function(form) {
  // Provide a default submission.
  form.submission = {
    data: {
      children: [
        {
          firstName: 'Joe',
          lastName: 'Smith',
          gender: 'male',
          dependant: true,
          birthdate: '1982-05-18'
        },
        {
          firstName: 'Mary',
          lastName: 'Smith',
          gender: 'female',
          dependant: false,
          birthdate: '1979-02-17'
        }
      ]
    }
  };
  
  form.on('change', function() {
    console.log(form.submission);
  });
});
</script>
</div>
