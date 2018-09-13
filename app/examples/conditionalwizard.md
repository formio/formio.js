---
title: Conditional Wizards
layout: vtabs
section: examples
weight: 20
---
Not only can you build multi-page forms, but you can also create conditional wizards where the pages are determined by 
conditional logic that is executed as the person is filling out the form.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="wizard"></div>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('wizard'), 'https://examples.form.io/conditionalwizard');
```

This wizard will render conditionally based on the data input from the first page.

<h3>Result</h3>
<label><input type="checkbox" id="showfull" /> Show full wizard</label>
<div class="card card-body bg-light">
  <div id="wizard"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('wizard'), 'https://examples.form.io/conditionalwizard').then(function(wizard) {
    document.getElementById('showfull').addEventListener('click', function(event) {
      wizard.wizard.full = event.target.checked;
      wizard.setForm(wizard.wizard);
    });
  });
  </script>
</div>
