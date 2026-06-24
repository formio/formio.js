---
title: Lazy Loading
layout: vtabs
section: examples
noFormio: true
weight: 31
---

Using the formio.embed.js file, you can also lazy load the Javascript and CSS resources required for creating a form. This allows you to embed a form within your application without adding much size to the page load, and then once the page is loaded, a loader is shown where the form will be rendered while it is downloading the renderer resources needed to render the form. You can still use the `Formio.createForm` method, just like you do for the "formio.form.min.js" file, but instead you would just include the formio.embed.js file which will lazy load the form into place.

```html
<script src="https://cdn.form.io/js/formio.embed.js"></script>
<div id="formio"></div>
<script type="text/javascript">
  Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
</script>
```

You can also use this within your application build by importing the renderer from <code>@formio/js/embed</code> instead of <code>@formio/js</code> as follows.

```js
import { Formio } from '@formio/js/embed';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
```

<h3>Result</h3>
<div class="card card-body bg-light">
<script src="dist/formio.embed.js"></script>
<div id="formio"></div>
<script type="text/javascript">
    Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
</script>
</div>
