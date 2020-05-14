---
title: Form Builder
layout: default
fluid: true
section: builder
weight: 30
lib: builder
---
<div class="row">
  <div class="col-sm-8">
    <h3 class="text-center text-muted">The <a href="https://github.com/formio/formio.js" target="_blank">Form Builder</a> allows you to build a <select class="form-control" id="form-select" style="display: inline-block; width: 150px;"><option value="form">Form</option><option value="wizard">Wizard</option><option value="pdf">PDF</option></select></h3>
    <div id="builder"></div>
  </div>
  <div class="col-sm-4">
    <h3 class="text-center text-muted">as JSON Schema</h3>
    <div class="card card-body bg-light jsonviewer">
      <pre id="json"></pre>
    </div>
  </div>
</div>
<div class="row mt-4">
  <div class="col-sm-8 offset-sm-2">
    <h3 class="text-center text-muted">which <a href="https://github.com/formio/ngFormio" target="_blank">Renders as a Form</a> in your Application</h3>
    <div id="formio" class="card card-body bg-light"></div>
  </div>
  <div class="clearfix"></div>
</div>
<div class="row mt-4">
  <div class="col-sm-8 offset-sm-2">
    <h3 class="text-center text-muted">which creates a Submission JSON</h3>
    <div class="card card-body bg-light jsonviewer">
      <pre id="subjson"></pre>
    </div>
  </div>
  <div class="clearfix"></div>
</div>
<div class="row mt-4">
  <div class="col-sm-10 offset-sm-1 text-center">
    <h3 class="text-center text-muted">which submits to our API Platform</h3>
    <p>hosted or on-premise</p>
    <a href="https://form.io" target="_blank"><img style="width:100%" src="https://help.form.io/assets/img/formioapi2.png" /></a>
  </div>
</div>
<div class="row" style="margin-top: 40px;">
  <div class="col-sm-12 text-center">
    <a href="https://form.io" target="_blank" class="btn btn-lg btn-success">Get Started</a>
  </div>
</div>
<div class="row card card-body bg-light mt-4">
  <div class="container">
    <div class="row">
      <div class="col-lg-12 text-center">
        <h2 class="section-heading">We are Open Source!</h2>
        <h3 class="section-subheading text-muted">We are proud to offer our core Form &amp; API platform as Open Source.</h3>
        <h3 class="section-subheading text-muted">Find us on GitHub @ <a href="https://github.com/formio/formio" target="_blank">https://github.com/formio/formio</a></h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4"><a href="https://github.com/formio/formio" target="_blank"><img style="width: 100%" class="img-responsive" src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"></a></div>
      <div class="col-md-8">
        <p>Getting started is as easy as...</p>
        <pre style="background-color: white;">git clone https://github.com/formio/formio.git
cd formio
npm install
node server</pre>
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
var jsonElement = document.getElementById('json');
var formElement = document.getElementById('formio');
var subJSON = document.getElementById('subjson');
var builder = new Formio.FormBuilder(document.getElementById("builder"), {
  display: 'form',
  components: [],
  settings: {
    pdf: {
      "id": "1ec0f8ee-6685-5d98-a847-26f67b67d6f0",
      "src": "https://files.form.io/pdf/5692b91fd1028f01000407e3/file/1ec0f8ee-6685-5d98-a847-26f67b67d6f0"
    }
  }
}, {
  baseUrl: 'https://examples.form.io'
});

var onForm = function(form) {
  form.on('change', function() {
    subJSON.innerHTML = '';
    subJSON.appendChild(document.createTextNode(JSON.stringify(form.submission, null, 4)));
  });
};

var onBuild = function(build) {
  jsonElement.innerHTML = '';
  formElement.innerHTML = '';
  jsonElement.appendChild(document.createTextNode(JSON.stringify(builder.instance.schema, null, 4)));
  Formio.createForm(formElement, builder.instance.form).then(onForm);
};

var onReady = function() {
  var jsonElement = document.getElementById('json');
  var formElement = document.getElementById('formio');
  builder.instance.on('change', onBuild);
};

var setDisplay = function(display) {
  builder.setDisplay(display).then(onReady);
};

// Handle the form selection.
var formSelect = document.getElementById('form-select');
formSelect.addEventListener("change", function() {
  setDisplay(this.value);
});

builder.instance.ready.then(onReady);
</script>
