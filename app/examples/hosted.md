---
title: Hosted
layout: vtabs
section: examples
weight: 10
---
### Hosted Forms

Every form within Form.io within [Form.io](https://form.io) can be rendered within this library using the Embed URL of that form. You can then provide the ```src``` parameter of the Form renderer to show the form within your page.

```js
var form = new FormioForm(document.getElementById('formio'));
form.src = 'https://examples.form.io/example';
```

```html
<div id="formio"></div>
```

<h3>Result</h3>
<div class="well">
<div id="formio"></div>
<script type="text/javascript">
var form = new FormioForm(document.getElementById('formio'));
form.src = 'https://examples.form.io/example';
</script>
</div>
