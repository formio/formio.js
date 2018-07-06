---
title: Submission Custom Endpoint
layout: vtabs
section: examples
weight: 13
---
### Submission Custom Endpoint

Sometimes you may want to submit the data to your own APIs or naviate to another page after the submission is complete. You can do this by listening to the submission events.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></div>
```

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example')
  .then(function(form) {
    // Prevent the submission from going to the form.io server.
    form.nosubmit = true;

    // Triggered when they click the submit button.
    form.on('submit', function(submission) {
      console.log(submission);
      alert('Submission sent to custom endpoint. See developer console.');
      return fetch('https://hookb.in/ZrRRbJBe', {
          body: JSON.stringify(submission),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        })
        .then(response => response.json())
    });
  });
```

<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example')
  .then(function(form) {
    // Prevent the submission from going to the form.io server.
    form.nosubmit = true;

    // Triggered when they click the submit button.
    form.on('submit', function(submission) {
      console.log(submission);
      alert('Submission sent to custom endpoint. See developer console.');
      return fetch('https://hookb.in/ZrRRbJBe', {
          body: JSON.stringify(submission),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        })
        .then(response => response.json())
    });
  });
</script>
</div>
