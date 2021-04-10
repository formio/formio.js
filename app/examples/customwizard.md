---
title: Custom Wizards
layout: vtabs
section: examples
weight: 20
---
Custom wizards can be implemented using a combination of custom buttons within each page, and then hiding some buttons that you wish to not show. This can be used to create a "Review" or "Thank you" page at the end of your wizard.

This can be achieved by first building a form that includes all the buttons you wish to have within your wizard as follow, that will trigger custom events. You can then listen for those events and then manually go to the next and previous pages in the wizard based on this. Here is an example JSON schema of what a simple version of this looks like.

```
https://examples.form.io/customwizard
```

This can be imported into your project using the Import form tool.

You can then use the following code to hook up the custom events.

```js
Formio.createForm(document.getElementById('wizard'), 'https://examples.form.io/customwizard', {
  buttonSettings: {
    showCancel: false,
    showPrevious: false,
    showNext: false,
    showSubmit: false
  }
}).then(function(wizard) {
  wizard.on('gotoNextPage', function() {
    wizard.nextPage();
  });
  wizard.on('gotoPreviousPage', function() {
    wizard.prevPage();
  });
  wizard.on('wizardSave', function() {
    wizard.submit().then(function() {
      wizard.onChange();
      wizard.nextPage();
    });
  });
});
```

### Result
<div class="card card-body bg-light">
<div id="wizard"></div>
<script type="text/javascript">
Formio.createForm(
  document.getElementById('wizard'),
  'https://examples.form.io/customwizard',
  {
    buttonSettings: {
      showCancel: false,
      showPrevious: false,
      showNext: false,
      showSubmit: false
    }
  })
  .then(function(wizard) {
    wizard.on('gotoNextPage', function() {
      wizard.nextPage();
    });
    wizard.on('gotoPreviousPage', function() {
      wizard.prevPage();
    });
    wizard.on('wizardSave', function() {
      wizard.submit().then(function() {
        wizard.onChange();
        wizard.nextPage();
      });
    });
  });
</script>
</div>
