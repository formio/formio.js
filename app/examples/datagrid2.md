---
title: Data Grid Panels
layout: vtabs
section: examples
weight: 222
---
In addition to data grid input, you can also place panels inside the data grid to provide dynamic "add another" sections.

```js
Formio.createForm(document.getElementById('formio'), {
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
              label: "Gender",
              key: "gender",
              type: "radio",
              inputType: "radio",
              input: true,
              values: [
                {
                  label: "Male",
                  value: "male"
                },
                {
                  label: "Female",
                  value: "female"
                }
              ]
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
              conditional: {
                eq: "true",
                when: "dependant",
                show: "true"
              }
            }
          
          ]
        }
      ]
    }
  ]
});
````

<h3>Result</h3>
<div class='card card-body bg-light'>
<div id='formio'></div>
<script type='text/javascript'>
Formio.createForm(document.getElementById('formio'), {
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
                label: "Gender",
                key: "gender",
                type: "radio",
                inputType: "radio",
                input: true,
                values: [
                  {
                    label: "Male",
                    value: "male"
                  },
                  {
                    label: "Female",
                    value: "female"
                  }
                ]
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
                conditional: {
                  eq: "true",
                  when: "dependant",
                  show: "true"
                }
              }
            
            ]
          }
        ]
      }
    ]
}).then(function(form) {
  form.on('change', function() {
    console.log(form.getValue());
  });
});
</script>
</div>
