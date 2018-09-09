---
title: Thank You Page
layout: vtabs
section: examples
weight: 14
---
You can respond to a submission event and change the page of the browser to a thank you page. This can be either another page of your website or can use your framework's routing system if you are using a framework.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example')
  .then(function(form) {
    // What to do when the submit begins.
    form.on('submitDone', function(submission) {
      window.location = '/app/thanks.html';
    });
  });
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example')
  .then(function(form) {
    // What to do when the submit begins.
    form.on('submitDone', function(submission) {
    console.log('done');
      window.location = '/app/thanks.html';
    });
  });
</script>
</div>
