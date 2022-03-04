---
title: Submission View
layout: vtabs
section: examples
weight: 12
---
Not only can you view a submission as a disabled filled out webform, but you can also provide the **renderMode** option, to view
the submission as a HTML view.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9', {
  readOnly: true,
  renderMode: 'html'
});
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9', {
  readOnly: true,
  renderMode: 'html'
});
</script>
</div>
<br/>
<h3>Single Page Submission View</h3>
<p>You can also render the full form by first loading the form, and then changing the display to "form", and then setting the rendered form in "HTML" mode with the submission then set afterward as the following illustrates.</p>

```js
var formio = new Formio('https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9');
formio.loadForm().then(function(form) {
  form.display = 'form';
  Formio.createForm(document.getElementById('formio-full'), form, {
    readOnly: true,
    renderMode: 'html'
  }).then(function(instance) {
    formio.loadSubmission().then(function(submission) {
      instance.submission = submission;
    });
  });
});
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio-full"></div>
<script type="text/javascript">
var formio = new Formio('https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9');
formio.loadForm().then(function(form) {
  form.display = 'form';
  Formio.createForm(document.getElementById('formio-full'), form, {
    readOnly: true,
    renderMode: 'html'
  }).then(function(instance) {
    formio.loadSubmission().then(function(submission) {
      instance.submission = submission;
    });
  });
});
</script>
