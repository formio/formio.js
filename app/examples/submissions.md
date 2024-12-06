---
title: Submission Hosting
layout: vtabs
section: examples
weight: 11
---

Not only is Form.io capable of hosting forms, it can also host submissions of those forms. These submissions can be accessed using the Submission API, which
simply appends a "/submission/[SUBMISSION_ID]" to the end of the Form API like the following.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" />
<script src="https://cdn.form.io/js/formio.embed.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(
  document.getElementById('formio'),
  'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9',
  {
    readOnly: true,
  },
);
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard/submission/5a542c9e2a40bf0001e0f8a9', {
  readOnly: true
});
</script>
</div>
