---
title: Simple Embedding
layout: vtabs
section: examples
weight: 0
---
You can create a form with the simple JSON schema as follows.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true,
      tooltip: 'Enter your <strong>First Name</strong>',
      description: 'Enter your <strong>First Name</strong>'
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      tooltip: 'Enter your <strong>Last Name</strong>',
      description: 'Enter your <strong>Last Name</strong>'
    },
    {
      type: "select",
      label: "Favorite Things",
      key: "favoriteThings",
      placeholder: "These are a few of your favorite things...",
      data: {
        values: [
          {
            value: "raindropsOnRoses",
            label: "Raindrops on roses"
          },
          {
            value: "whiskersOnKittens",
            label: "Whiskers on Kittens"
          },
          {
            value: "brightCopperKettles",
            label: "Bright Copper Kettles"
          },
          {
            value: "warmWoolenMittens",
            label: "Warm Woolen Mittens"
          }
        ]
      },
      dataSrc: "values",
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      multiple: true,
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}).then(function(form) {
  form.on('submit', function(submission) {
    console.log(submission);
  });
});
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true,
      tooltip: 'Enter your <strong>First Name</strong>',
      description: 'Enter your <strong>First Name</strong>'
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true,
      tooltip: 'Enter your <strong>Last Name</strong>',
      description: 'Enter your <strong>Last Name</strong>'
    },
    {
      type: "select",
      label: "Favorite Things",
      key: "favoriteThings",
      placeholder: "These are a few of your favorite things...",
      data: {
        values: [
          {
            value: "raindropsOnRoses",
            label: "Raindrops on roses"
          },
          {
            value: "whiskersOnKittens",
            label: "Whiskers on Kittens"
          },
          {
            value: "brightCopperKettles",
            label: "Bright Copper Kettles"
          },
          {
            value: "warmWoolenMittens",
            label: "Warm Woolen Mittens"
          }
        ]
      },
      dataSrc: "values",
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      multiple: true,
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
}).then(function(form) {
  form.on('submit', function(submission) {
    console.log(submission);
  });
});
</script>
</div>
