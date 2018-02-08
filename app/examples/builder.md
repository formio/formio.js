---
title: Form Builder
layout: vtabs
section: examples
weight: 30
lib: builder
---
Form builder example

<div id="formio"></div>
<script type="text/javascript">
Formio.builder(document.getElementById("formio")).then(function(builder) {
  builder.on('saveComponent', function(event) {
    console.log('saveComponent', event);
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
</script>
