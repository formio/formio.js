---
title: No Eval
layout: vtabs
section: examples
weight: 221
---
By default, this renderer allows the compilation and execution of JavaScript (eval) through the following features.
 
 - Custom Conditionals
 - Custom Validation
 - Custom Templates (like with EditGrid)
 
For some implementations, the need to turn off "eval" is a requirement. This can be done, at the expense of the features outlined above, using the following code.

```js
FormioUtils.Evaluator.noeval = true;
```

This will force the builder to not show the configurations for these elements as well as render things that allow custom templates with the default templates, like the following.

```js
FormioUtils.Evaluator.noeval = true;
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'editgrid',
        input: true,
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
<div class='card card-body bg-light'>
<div id='formio'></div>
<script type='text/javascript'>
FormioUtils.Evaluator.noeval = true;
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'editgrid',
        input: true,
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
</script>
</div>
