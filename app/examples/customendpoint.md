---
title: Submission Custom Endpoint
layout: vtabs
section: examples
weight: 13
---
Sometimes you may want to submit the data to your own APIs or naviate to another page after the submission is complete. You can do this by listening to the submission events.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.icons = 'fontawesome';
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
        .then(response => {
          form.emit('submitDone', submission)
          response.json()
        })
    });
  });
```

<h3>Result</h3>
<div class="card card-body bg-light">
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
        .then(response => {
          form.emit('submitDone', submission)
          response.json()
        })
    });
  });
</script>
</div>
