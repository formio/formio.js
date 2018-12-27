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
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
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
