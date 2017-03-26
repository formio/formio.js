---
title: Simple
layout: vtabs
section: examples
weight: 0
---
### Simple Embedding

You can create a form with the simple JSON schema as follows.

```js
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
};
```
```html
<div id="formio"></formio>
```

<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
var form = new FormioForm(document.getElementById('formio'));
form.form = {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
};
</script>
</div>
