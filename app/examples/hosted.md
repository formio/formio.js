---
title: Hosted
layout: vtabs
section: examples
weight: 10
---
### Hosted Forms

Every form within Form.io within [Form.io](https://form.io) can be rendered within this library using the Embed URL of that form. You can then provide the ```src``` parameter of the Form renderer to show the form within your page.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then((form) => {

  // Default the submission.
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  };
});
```

<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then((form) => {
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  };
  
  form.on('render', function() {
    console.log('Rendered!');
  });

  form.on('change', function(value) {
      console.log(value);
  });

  form.on('submit', function(submission) {
    console.log(submission);
  });
});
</script>
</div>
