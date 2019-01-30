---
title: reCAPTCHA component
layout: vtabs
section: examples
weight: 410
---

Please read <a href="https://help.form.io/userguide/form-components/#recaptcha" target="_blank">Help Docs</a> to learn details of how reCAPTCHA component works.

Example below shows how both Form Load and Button Click reCAPTCHA components work, together with how to render form with reCAPTCHA from JSON

To test this example, click the 'Submit' button and you will see Submission JSON including response from Google for Form Load action under 'reCaptcha2' field. Click 'Test' button and then 'Submit' button and you will see Submission JSON including response from Google for Button Click action under 'reCaptcha' field.

### Code

```js
Formio.setProjectUrl('https://examples.test-form.io');
const formJSON = {
  'components': [
    {
      'label': 'Test',
      'action': 'event',
      'type': 'button',
      'key': 'test',
      'event': 'test'
    },
    {
      'eventType': 'buttonClick',
      'type': 'recaptcha',
      'key': 'reCaptcha',
      'label': 'reCAPTCHA',
      'buttonKey': 'test'
    },
    {
      'eventType': 'formLoad',
      'type': 'recaptcha',
      'key': 'reCaptcha2',
      'label': 'reCAPTCHA'
    },
    {
      'type': 'button',
      'label': 'Submit',
      'key': 'submit',
      'action': 'submit'
    }
  ],
  'name': 'testRecaptchaForm',
  'settings': {
    'recaptcha': {
      'isEnabled': 'true',
      'siteKey': '6Ldc54MUAAAAAP4KjayrT1InduuvCnXvNZUpZpQj'
    }
  }
};
Formio.createForm(document.getElementById('formio'), formJSON).then(function(form) {
  // Provide a default submission.
  form.submission = {
    data: {
    }
  };
  form.on('submit', function(submission){
    console.log(submission);
    var jsonElement = document.getElementById('formio-submission-json');
    jsonElement.innerHTML = JSON.stringify(submission, null, 4);
  })
});
````

### Rendered form
<div class='card card-body bg-light'>
  <div id='formio'></div>
</div>

### Submission 
<div class='card card-body bg-light'>
  <pre id='formio-submission-json'></pre>
</div>
<script type='text/javascript'>
Formio.setProjectUrl('https://examples.test-form.io');
const formJSON = {
  'components': [
    {
      'label': 'Test',
      'action': 'event',
      'type': 'button',
      'key': 'test',
      'event': 'test'
    },
    {
      'eventType': 'buttonClick',
      'type': 'recaptcha',
      'key': 'reCaptcha',
      'label': 'reCAPTCHA',
      'buttonKey': 'test'
    },
    {
      'eventType': 'formLoad',
      'type': 'recaptcha',
      'key': 'reCaptcha2',
      'label': 'reCAPTCHA'
    },
    {
      'type': 'button',
      'label': 'Submit',
      'key': 'submit',
      'action': 'submit'
    }
  ],
  'name': 'testRecaptchaForm',
  'settings': {
    'recaptcha': {
      'isEnabled': 'true',
      'siteKey': '6Ldc54MUAAAAAP4KjayrT1InduuvCnXvNZUpZpQj'
    }
  }
};
Formio.createForm(document.getElementById('formio'), formJSON).then(function(form) {
  // Provide a default submission.
  form.submission = {
    data: {
    }
  };
  form.on('submit', function(submission){
    console.log(submission);
    var jsonElement = document.getElementById('formio-submission-json');
    jsonElement.innerHTML = JSON.stringify(submission, null, 4);
  })
});
</script>
