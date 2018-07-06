---
title: Thank You Page
layout: vtabs
section: examples
weight: 14
---
### Thank You Page

You can respond to a submission event and change the page of the browser to a thank you page. This can be either another page of your website or can use your framework's routing system if you are using a framework.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example')
  .then(function(form) {
    // What to do when the submit begins.
    form.on('submitDone', function(submission) {
      window.location = '/app/thanks.html';
    });
  });
```

<h3>Result</h3>
<div class="well">
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
