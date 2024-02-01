---
title: Floating Labels
layout: vtabs
section: examples
formioFull: true
weight: 31
---
With the default template of Bootstrap 5, it is now possible to have Floating Labels feature where the labels are placeholders until the user clicks into component. The label, will then move to above the cursor improving the UI/UX of the form experience. To enable floating labels, you must first use the "default" Bootstrap 5 template, and then provide the following when embedding your form.

```js
Formio.createForm(document.getElementById('formio'), {...}, {
  floatingLabels: true
});
```

Here is an example.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
<script src="https://cdn.form.io/js/formio.embed.js"></script>
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
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}, {
  floatingLabels: true
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
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}, {
  floatingLabels: true
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


