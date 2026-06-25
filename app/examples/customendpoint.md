---
title: Submission Custom Endpoint
layout: vtabs
section: examples
weight: 13
---

Sometimes you may want to submit the data to your own APIs or navigate to another page after the submission is complete. You can do this by listening to the submission events.

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
    // Prevent the submission from going to the form.io server.
    form.nosubmit = true;

    // Triggered when they click the submit button.
    form.on('submit', function (submission) {
      console.log(submission);
      alert('Submission sent to custom endpoint. See developer console.');
      return Formio.fetch('https://hookb.in/ZrRRbJBe', {
        body: JSON.stringify(submission),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
      }).then(function (response) {
        form.emit('submitDone', submission);
        response.json();
      });
    });
  },
);
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
      return Formio.fetch('https://hookb.in/ZrRRbJBe', {
          body: JSON.stringify(submission),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
        })
        .then(function(response) {
          form.emit('submitDone', submission)
          response.json()
        })
        .catch(function() {})
    });

});
</script>

</div>
