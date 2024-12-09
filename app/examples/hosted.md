---
title: Hosted Forms
layout: vtabs
section: examples
weight: 10
---

Every form within [Form.io](https://form.io) can be rendered within this library using the Embed URL of that form. You can then provide the `src` parameter of the Form renderer to show the form within your page.

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
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then(
  function (form) {
    // Default the submission.
    form.submission = {
      data: {
        firstName: 'Joe',
        lastName: 'Smith',
      },
    };
  },
);
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then(function(form) {
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
