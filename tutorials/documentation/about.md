# About this library
This Form.io JavaScript SDK consists of four major components. These are as follows.

## Form Builder
The form builder allows you to embed a full featured form builder interface within your own application. A simple example of how to embed a form builder is as follows.

### Form Builder Usage
```html
<div id="builder"></div>
```

```javascript
import { Formio } from 'formiojs';
Formio.builder(document.getElementById('builder'));
```

which produces the following.

### Form Builder Example
<div class="card card-body bg-light">
    <div id="builder"></div>
</div>
<script type="text/javascript">
window.addEventListener('load', function() {
    var formio = new Formio('https://examples.form.io/example');
    formio.loadForm().then(function(example) {
        Formio.builder(document.getElementById('builder'), example).then(function(builder) {
            Formio.createForm(document.getElementById('formio'), builder.form).then(function(renderer) {
                builder.on('change', function() {
                    renderer.form = builder.form;
                });
            });
        });
    });
});
</script>

### Form Builder Documentation
For a complete documentation over the form builder, please go to the {@tutorial builder} documentation.

## Form Renderer
The form renderer is responsible for taking the JSON produced by the [Form Builder](#form-builder) and rendering it on the page.

### Form Renderer Usage
```html
<div id="formio"></div>
```

```javascript
import { Formio } from 'formiojs';
Formio.createForm(document.getElementById('formio'), builder.form);
```

### Form Renderer Example
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>

### Form Renderer Documentation
For complete documentation of the form renderer, please go to the {@tutorial renderer} documentation.

## JavaScript API
The JavaScript API allows you to easily communicate to the Form.io API's from within your JavaScript application, like so.

### JavaScript API Usage
```javascript
import { Formio } from 'formiojs';
const formio = new Formio('https://examples.form.io/example');
formio.loadForm().then((form) => {
  console.log(form);
});
```

### JavaScript API Reference
For the complete documentation of the JavaScript API, go to {@tutorial api} documentation.

## Form Utilities
The Form Utilities is a utilities class that offers some common utilities within your application.

### Form Utilities Usage
```javascript
import { Formio, Utils } from 'formiojs';
const formio = new Formio('https://examples.form.io/example');
formio.loadForm().then((form) => {
  Utils.eachComponent(form.components, (component) => {
    console.log(component);
  });
});
```

### Form Utilities Reference
For a full reference, go to {@tutorial utils} documentation.
