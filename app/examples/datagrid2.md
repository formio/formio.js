---
title: Data Grid Panels
layout: vtabs
section: examples
weight: 222
---
### Data Grid Panels
In addition to data grid input, you can also place panels inside the data grid to provide dynamic "add another" sections.

```js
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'datagrid',
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
};
````

<h3>Result</h3>
<div class='well'>
<div id='formio'></div>
<script type='text/javascript'>
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'datagrid',
        input: true,
        components: [
          {
            type: 'panel',
            label: 'User Information',
            key: 'userinfo',
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
      }
    ]
};
</script>
</div>
