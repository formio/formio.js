---
title: Home
layout: default
section: home
---
<div class="jumbotron">
  <h2>JavaScript Powered Forms by <a href="https://form.io" target="_blank"><img height="25px;" style="display: inline;" alt="Form.io" src="https://help.form.io/assets/formio-logo.png"></a></h2>
  <p>This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.</p>
  <p>
    <ul>
      <li>Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)</li>
      <li>Renders a JSON schema as a webform and hooks up that form to the Form.io API's</li>
      <li>Nested components, layouts, Date/Time, Select, Input Masks, and many more included features</li>
      <li>Full JavaScript API SDK library on top of Form.io</li>
    </ul>
  </p>
</div>

### Simple Example
```html
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
    <script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
    <script type="text/javascript">
      window.onload = function() {
        Formio.icons = 'fontawesome';
        Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
      };
    </script>
  </head>
  <body>
    <div id="formio"></div>
  </body>
</html>
```

### Result
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
  window.onload = function() {
    Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
  };
</script>
</div>

### JSFiddle
To play around with this renderer, we recommend using JSFiddle. Here is an example you can fork and use as a sandbox.
<script async src="//jsfiddle.net/travistidwell/v38du9y1/3/embed/"></script>
