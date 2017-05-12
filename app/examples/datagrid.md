---
title: Data Grid Input
layout: vtabs
section: examples
weight: 220
---
### Data Grid Input
Data Grids allow you to collect an array of object values.

```js
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'datagrid',
        components: [
          {
            label: 'First Name',
            key: 'firstName',
            type: 'textfield'
          },
          {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield'
          },
          {
            label: 'Birthdate',
            key: 'birthdate',
            type: 'datetime',
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
            }
          },
          {
            label: 'Gender',
            key: 'gender',
            type: 'select',
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
            template: '<span>\{\{ item.label \}\}</span>'
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
        components: [
          {
            label: 'First Name',
            key: 'firstName',
            type: 'textfield'
          },
          {
            label: 'Last Name',
            key: 'lastName',
            type: 'textfield'
          },
          {
            label: 'Birthdate',
            key: 'birthdate',
            type: 'datetime',
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
            }
          },
          {
            label: 'Gender',
            key: 'gender',
            type: 'select',
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
            template: '<span>\{\{ item.label \}\}</span>'
          }
        ]
      }
    ]
};
</script>
</div>
