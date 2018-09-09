---
title: Edit Grid
layout: vtabs
section: examples
weight: 221
---
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
            '<div class="row">' +
            '{% raw %}  {% util.eachComponent(components, function(component) { %} {% endraw %}' +
            '    <div class="col-sm-2">' +
            '{% raw %}      <strong>{{ component.label }}</strong>{% endraw %}' +
            '    </div>' +
            '{% raw %}  {% }) %}{% endraw %}' +
            '</div>',
          row: '' +
            '<div class="row">' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %}{% endraw %}' +
            '    <div class="col-sm-2">' +
            '{% raw %}      {{ row[component.key] }}{% endraw %}' +
            '    </div>' +
            '{% raw %}  {% }) %}{% endraw %}' +
            '  <div class="col-sm-2">' +
            '    <div class="btn-group pull-right">' +
            '      <div class="btn btn-default btn-sm editRow"><i class="fa fa-edit"></i></div>' +
            '      <div class="btn btn-danger btn-sm removeRow"><i class="fa fa-trash"></i></div>' +
            '    </div>' +
            '  </div>' +
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
<div class='card card-body bg-light'>
<div id='formio'></div>
<script type='text/javascript'>
Formio.createForm(document.getElementById('formio'), {
  components: [
      {
        label: 'Children',
        key: 'children',
        type: 'editgrid',
        input: true,
        removeRow: 'Cancel',
        templates: {
          header: '' +
            '<div class="row">' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %}{% endraw %}' +
            '    <div class="col-sm-2">' +
            '{% raw %}      <strong>{{ component.label }}</strong>{% endraw %}' +
            '    </div>' +
            '{% raw %}  {% }) %}{% endraw %}' +
            '</div>',
          row: '' +
            '<div class="row">' +
            '{% raw %}  {%util.eachComponent(components, function(component) { %}{% endraw %}' +
            '    <div class="col-sm-2">' +
            '{% raw %}      {{ row[component.key] }}{% endraw %}' +
            '    </div>' +
            '{% raw %}  {% }) %}{% endraw %}' +
            '  <div class="col-sm-2">' +
            '    <div class="btn-group pull-right">' +
            '      <div class="btn btn-default btn-sm editRow"><i class="fa fa-edit"></i></div>' +
            '      <div class="btn btn-danger btn-sm removeRow"><i class="fa fa-trash"></i></div>' +
            '    </div>' +
            '  </div>' +
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
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Submit',
        theme: 'primary',
        key: 'submit'
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
  
  form.on('submit', function(submission) {
    console.log(submission);
  });
});
</script>
</div>
