---
title: Submission View
layout: vtabs
section: examples
weight: 12
---
### Submission View

Not only can you view a submission as a disabled filled out webform, but you can also provide the **viewAsHtml** option, to view
the submission as a HTML view.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9', {
  readOnly: true,
  viewAsHtml: true
});
```

<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9', {
  readOnly: true,
  viewAsHtml: true
});
</script>
</div>
