---
title: Wizards
layout: vtabs
section: examples
weight: 20
---
### Wizards
In addition to rendering forms, this library can also be used to render complex wizard workflows. 

Wizards work by taking the root **Panel** components within a normal flat form, and turning those
panels into separate pages that can be added to a workflow. You can also provide conditional logic
on those panel components so that the pages are conditionally shown based on what is entered within
the wizard flow.

The determination on whether a form is a wizard or not is based on the **display** property on the form schema like so.
 
```js
{
  "title": "My Wizard",
  "type": "form",
  "display: "wizard",
  "components": [
    {
      "type": "panel",
      "title": "Page 1",
      "components": [
        ...
        ...
      ]
    },
    {
      "type": "panel",
      "title": "Page 2",
      "components": [
        ...
        ...
      ]
    }
  ]
}
```

You can create a new wizard just like you can a normal form.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="wizard"></div>
```

```js
Formio.createForm(document.getElementById('wizard'), 'https://examples.form.io/wizard')
  .then(function(wizard) {
    wizard.on('nextPage', function(page) {
      console.log(page);
    });
    wizard.on('submit', function(submission) {
      console.log(submission);
    });
  });
```

```html
<div id="wizard"></div>
```

### Result

<div class="well">
<div id="wizard"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('wizard'), 'https://examples.form.io/wizard')
  .then(function(wizard) {
    wizard.on('nextPage', function(page) {
      console.log(page);
    });
    wizard.on('submit', function(submission) {
      console.log(submission);
    });
  });
</script>
</div>

You can also add options when creating a form, the following options are supported:
   * breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   * buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not  

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="wizardWithOptions"></div>
```

```js
Formio.createForm(
  document.getElementById('wizardWithOptions'),
  'https://examples.form.io/wizard',
  {
    breadcrumbSettings: {clickable:false},
    buttonSettings: {showCancel: false}
  })
  .then(function(wizard) {
    wizard.on('nextPage', function(page) {
      console.log(page);
    });
    wizard.on('submit', function(submission) {
      console.log(submission);
    });
  });
```

```html
<div id="wizardWithOptions"></div>
```

### Result

<div class="well">
<div id="wizardWithOptions"></div>
<script type="text/javascript">
Formio.createForm(
  document.getElementById('wizardWithOptions'),
  'https://examples.form.io/wizard',
  {
    breadcrumbSettings: {clickable:false},
    buttonSettings: {showCancel: false}
  })
  .then(function(wizard) {
    wizard.on('nextPage', function(page) {
      console.log(page);
    });
    wizard.on('submit', function(submission) {
      console.log(submission);
    });
  });
</script>
</div>
