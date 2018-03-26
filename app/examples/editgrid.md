---
title: Edit Grid
layout: vtabs
section: examples
weight: 221
---
### Edit Grid
The Edit Grid is very similar to the Data Grid, but allows you to view the whole form within for each new item, and then
constructs as table view as you add new rows.

```js
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'editgrid',
        input: true,
        templates: {
          header: '' +
            '<div class="row"> \n' +
            '{% raw %}  {% util.eachComponent(components, function(component) { %} \n{% endraw %}' +
            '    <div class="col-sm-2"> \n' +
            '{% raw %}      <strong>{{ component.label }}</strong> \n{% endraw %}' +
            '    </div> \n' +
            '{% raw %}  {% }) %} \n{% endraw %}' +
            '</div>',
          row: '' +
            '<div class="row"> \n' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %} \n{% endraw %}' +
            '    <div class="col-sm-2"> \n' +
            '{% raw %}      {{ row[component.key] }} \n{% endraw %}' +
            '    </div> \n' +
            '{% raw %}  {% }) %} \n{% endraw %}' +
            '  <div class="col-sm-2"> \n' +
            '    <div class="btn-group pull-right"> \n' +
            '      <div class="btn btn-default editRow">Edit</div> \n' +
            '      <div class="btn btn-danger removeRow">Delete</div> \n' +
            '    </div> \n' +
            '  </div> \n' +
            '</div>',
          footer: ''
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
        type: 'editgrid',
        input: true,
        templates: {
          header: '' +
            '<div class="row"> \n' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %} \n{% endraw %}' +
            '    <div class="col-sm-2"> \n' +
            '{% raw %}      <strong>{{ component.label }}</strong> \n{% endraw %}' +
            '    </div> \n' +
            '{% raw %}  {% }) %} \n{% endraw %}' +
            '</div>',
          row: '' +
            '<div class="row"> \n' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %} \n{% endraw %}' +
            '    <div class="col-sm-2"> \n' +
            '{% raw %}      {{ row[component.key] }} \n{% endraw %}' +
            '    </div> \n' +
            '{% raw %}  {% }) %} \n{% endraw %}' +
            '  <div class="col-sm-2"> \n' +
            '    <div class="btn-group pull-right"> \n' +
            '      <div class="btn btn-default editRow">Edit</div> \n' +
            '      <div class="btn btn-danger removeRow">Delete</div> \n' +
            '    </div> \n' +
            '  </div> \n' +
            '</div>',
          footer: ''
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
</script>
</div>
