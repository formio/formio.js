---
title: Form Builder
layout: vtabs
section: examples
weight: 30
lib: builder
---
<h3>Form Builder</h3>
<div id="builder"></div>
<h3>JSON Schema</h3>
<pre id="json"></pre>
<h3>Form Renderer</h3>
<div id="formio" class="well"></div>

<script type="text/javascript">
Formio.builder(document.getElementById("builder"), null, {
  baseUrl: 'https://sqpgeuzujwerjcu.form.io'
}).then(function(builder) {
  var jsonElement = document.getElementById('json');
  Formio.createForm(document.getElementById('formio'), {components: []}).then(function(form) {
    builder.on('saveComponent', function(event) {
      var schema = builder.schema;
      jsonElement.innerHTML = '';
      jsonElement.appendChild(document.createTextNode(JSON.stringify(schema, null, 4)));
      form.form = schema;
    });
  
    builder.on('editComponent', function(event) {
      console.log('editComponent', event);
    });
    
    builder.on('updateComponent', function(event) {
      console.log('updateComponent', event);
    });
    
    builder.on('deleteComponent', function(event) {
      console.log('deleteComponent', event);
    });
  });
});
</script>
