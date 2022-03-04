---
title: External Data Load
layout: vtabs
section: examples
weight: 15
---
You can load in data from an external API as a result of values entered in a form.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/customerload')
  .then(function(form) {
    // Triggered when they click the submit button.
    form.on('change', function(event) {
      if (event.changed && event.changed.component.key === 'customerNumber' && event.changed.value) {
        Formio.fetch('https://examples.form.io/customers/submission?data.number=' + event.changed.value, {
          headers: {
            'content-type': 'application/json'
          },
          mode: 'cors',
        })
        .then(function(response) {
          response.json().then(function(result) {
            if (Array.isArray(result) && result.length > 0) {
              var submission = { data: event.data };
              submission.data.name = result[0].data.name;
              submission.data.phoneNumber = result[0].data.phonenumber;
              form.submission = submission;
            }
          });
        });
      }
    });
  });
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/customerload')
  .then(function(form) {
    // Triggered when they click the submit button.
    form.on('change', function(event) {
      if (event.changed && event.changed.component.key === 'customerNumber' && event.changed.value) {
        Formio.fetch('https://examples.form.io/customers/submission?data.number=' + event.changed.value, {
          headers: {
            'content-type': 'application/json'
          },
          mode: 'cors',
        })
        .then(function(response) {
          response.json().then(function(result) {
            if (Array.isArray(result) && result.length > 0) {
              var submission = { data: event.data };
              submission.data.name = result[0].data.name;
              submission.data.phoneNumber = result[0].data.phonenumber;
              form.submission = submission;
            }
          });
        });
      }
    });
  });
</script>
</div>
