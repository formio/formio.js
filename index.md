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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
    <script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
    <script type="text/javascript">
      window.onload = function() {
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
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
  window.onload = function() {
    Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
  };
</script>
</div>
