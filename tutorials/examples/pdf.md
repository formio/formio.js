```html
<link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css">
<script src="https://cdn.form.io/formiojs/formio.full.min.js"></script>
<div id="formio"></div>
```

```javascript
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/w4', {
  zoom: '-20'
});
```

<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
window.addEventListener('load', function() {
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/w4', {
  zoom: '-20'
});
});
</script>
</div>
