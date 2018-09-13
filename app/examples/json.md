---
title: JSON Powered Forms
layout: vtabs
section: examples
weight: 30
---
All forms that are rendered within this framework are JSON powered forms.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```

<div class="row">
<div class="col col-sm-6">

<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true,
      validate: {
        required: true
      }
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      validate: {
        required: true
      }
    },
    {
      type: 'email',
      key: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      input: true,
      validateOn: 'blur'
    },
    {
      type: 'phoneNumber',
      key: 'phoneNumber',
      label: 'Phone',
      input: true,
      allowMultipleMasks: true,
      inputMasks: [
        {
          'label': 'US',
          'mask': '(999) 999-9999'
        },
        {
          'label': 'BY',
          'mask': '+999 (99) 999-99-99'
        }
      ]
    },
    {
      type: 'select',
      key: 'select',
      label: 'Favorite Color',
      placeholder: 'Select your favorite color',
      template: '<span>{% raw %}{{ item.label }}{% endraw %}</span>',
      multiple: true,
      dataSrc: 'values',
      input: true,
      valueProperty: '',
      defaultValue: '',
      filter: '',
      refreshOn: '',
      data: {
        custom: '',
        resource: '',
        url: '',
        json: '',
        values: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Green',
            value: 'green'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          },
          {
            label: 'Purple',
            value: 'purple'
          },
          {
            label: 'Orange',
            value: 'orange'
          },
          {
            label: 'Black',
            value: 'black'
          }
        ]
      }
    },
    {
      type: 'address',
      key: 'address',
      label: 'Address',
      placeholder: 'Enter your address',
      input: true,
      map: {
          region: '',
          key: ''
      }
    },
    {
      type: 'datetime', 
      key: 'dueDate', 
      label: 'Due Date', 
      placeholder: 'Enter Due Date',
      datepickerMode: 'day',
      enableDate: true,
      enableTime: true,
      format: 'yyyy-MM-dd hh:mm a"', 
      input: true, 
      tooltip: 'Enter date the item is <strong>due</strong>', 
      description: 'Enter <strong>Due Date</strong>',
      validate: {
        required: true
      }
    },
    {
      type: 'day',
      key: 'birthdate',
      label: 'Birthdate',
      input: true,
      dayFirst: false,
      fields: {
        year: {
          required: false,
          placeholder: '',
          type: 'text'
        },
        month: {
          required: false,
          placeholder: '',
          type: 'select'
        },
        day: {
          required: false,
          placeholder: '',
          type: 'text'
        }
      },
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    },
    {
      type: 'button',
      action: 'reset',
      label: 'Reset Form',
      theme: 'success'
    }
  ]
});
</pre>

</div>
<div class="col col-sm-6">
<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true,
      validate: {
        required: true
      }
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      validate: {
        required: true
      }
    },
    {
      type: 'email',
      key: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      input: true,
      validateOn: 'blur'
    },
    {
      type: 'phoneNumber',
      key: 'phoneNumber',
      label: 'Phone',
      input: true,
      allowMultipleMasks: true,
      inputMasks: [
        {
          'label': 'US',
          'mask': '(999) 999-9999'
        },
        {
          'label': 'BY',
          'mask': '+999 (99) 999-99-99'
        }
      ]
    },
    {
      type: 'select',
      key: 'select',
      label: 'Favorite Color',
      placeholder: 'Select your favorite color',
      template: '<span>{% raw %}{{ item.label }}{% endraw %}</span>',
      multiple: true,
      dataSrc: 'values',
      input: true,
      valueProperty: '',
      defaultValue: '',
      filter: '',
      refreshOn: '',
      data: {
        custom: '',
        resource: '',
        url: '',
        json: '',
        values: [
          {
            label: 'Red',
            value: 'red'
          },
          {
            label: 'Blue',
            value: 'blue'
          },
          {
            label: 'Green',
            value: 'green'
          },
          {
            label: 'Yellow',
            value: 'yellow'
          },
          {
            label: 'Purple',
            value: 'purple'
          },
          {
            label: 'Orange',
            value: 'orange'
          },
          {
            label: 'Black',
            value: 'black'
          }
        ]
      }
    },
    {
      type: 'address',
      key: 'address',
      label: 'Address',
      placeholder: 'Enter your address',
      input: true,
      map: {
          region: '',
          key: ''
      }
    },
    {
      type: 'datetime', 
      key: 'dueDate', 
      label: 'Due Date', 
      placeholder: 'Enter Due Date',
      datepickerMode: 'day',
      enableDate: true,
      enableTime: true,
      format: 'yyyy-MM-dd hh:mm a"', 
      input: true, 
      tooltip: 'Enter date the item is <strong>due</strong>', 
      description: 'Enter <strong>Due Date</strong>',
      validate: {
        required: true
      }
    },
    {
      type: 'day',
      key: 'birthdate',
      label: 'Birthdate',
      input: true,
      dayFirst: false,
      fields: {
        year: {
          required: false,
          placeholder: '',
          type: 'text'
        },
        month: {
          required: false,
          placeholder: '',
          type: 'select'
        },
        day: {
          required: false,
          placeholder: '',
          type: 'text'
        }
      },
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    },
     {
       type: 'button',
       action: 'reset',
       label: 'Reset Form',
       theme: 'success'
     }
  ]
}).then(function(form) {
  form.on('change', function(changed) {
    console.log('Changed!', changed);
  });
  
  form.on('submit', function(submission) {
    console.log('Submitted!', submission);
  });
});
</script>
</div>
</div>
</div>


