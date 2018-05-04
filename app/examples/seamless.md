---
title: Seamless.js
layout: vtabs
section: examples
weight: 390
---
### [Seamless.js]('https://github.com/travist/seamless.js')

You can add seamless.js to your project to create injectable styles that pass into the iframe's created by Form.io PDF's. 
By default, signature blocks anchor themselves to the top of the PDF. In the example below we'll be anchoring the
signature modal to the bottom of the form. 

```html
  <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />
  <link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css' />
  <script type="text/javascript" src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
  <script type="text/javascript" src="https://unpkg.com/seamless@latest/build/seamless.parent.min.js"></script>
  <body>
    <div id="formio"></div>
  </body>
```

```js
var ParentForm = 'https://examples.form.io/pdf';
Formio.createForm(document.getElementById('formio'), ParentForm, {
  readOnly: false
}).then(function(form) {
  var pdfForm = document.getElementsByClassName("formio-iframe")[0];
  window.seamless(pdfForm);
  pdfForm.send({
    type: 'seamless_styles',
    data: ['.signature-modal { bottom: 50px !important; top:initial !important; }']
  });
});


```
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />
<link rel='stylesheet' href='https://unpkg.com/formiojs@latest/dist/formio.full.min.css' />
<script type="text/javascript" src='https://unpkg.com/formiojs@latest/dist/formio.full.min.js'></script>
<script type="text/javascript" src="https://unpkg.com/seamless@latest/build/seamless.parent.min.js"></script>
<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
var ParentForm = 'https://dddtwnskbfnpapr.form.io/pdfexample';
Formio.createForm(document.getElementById('formio'), ParentForm, {
  readOnly: false
}).then(function(form) {
  var pdfForm = document.getElementsByClassName("formio-iframe")[0];
  window.seamless(pdfForm);
  pdfForm.send({
    type: 'seamless_styles',
    data: ['.signature-modal { bottom: 50px !important; top:initial !important; }']
  });
});
</script>
</div>
