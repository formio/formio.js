---
title: Home
layout: default
section: home
---

<div class="p-3 mb-4 bg-light rounded-3 shadow">
  <div class="p-2 bg-light rounded-3">
    <div class="container-fluid py-3">
      <h2 class="align-middle">JavaScript Powered Forms by <a href="https://form.io" target="_blank"><svg width="200px" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 324 115.2"><defs><style>.cls-1{fill:#373a36;}.cls-2{fill:#69b342;}</style></defs><polygon class="cls-1" points="95.53 37.72 127.07 37.72 127.07 45.67 105.07 45.67 105.07 56.68 125.68 56.68 125.68 64.64 105.07 64.64 105.07 82.62 95.53 82.62 95.53 37.72"/><path class="cls-1" d="M139.14,65.76c0,6.49,2.81,10.34,7.34,10.34s7.15-3.85,7.15-10.28c0-7-2.6-10.39-7.29-10.39-4.35,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.14,17.7-16.89,17.7-10.52,0-16.67-7.46-16.67-17.52,0-10.4,6.34-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><path class="cls-1" d="M167,58.06c0-3.35,0-6.33-.07-9.15h9.22c.12.75.24,4.1.24,5.92,1.5-3.85,5.12-6.67,10.89-6.7V57c-6.82-.18-10.89,1.64-10.89,10.88v14.7H167Z"/><path class="cls-1" d="M192.81,57.6c0-2.92,0-5.8-.06-8.69h9c.12.82.31,2.7.36,4a10.6,10.6,0,0,1,9.43-4.8c4.88,0,7.56,2.51,8.76,5.13,2-2.76,4.91-5.13,10.45-5.13,5.92,0,10.76,3.61,10.76,12.38V82.62h-9.17v-21c0-3-1.11-6-4.95-6-4,0-5.56,2.56-5.56,7.73V82.62H212.6V62c0-3.49-.87-6.31-4.88-6.31-3.81,0-5.63,2.33-5.63,8.11V82.62h-9.28Z"/><rect class="cls-1" x="247.55" y="71.18" width="10.09" height="11.44"/><path class="cls-1" d="M263.73,48.91h9.39V82.62h-9.39Zm0-13.83h9.39V43.4h-9.39Z"/><path class="cls-1" d="M289.11,65.76c0,6.49,2.8,10.34,7.33,10.34s7.16-3.85,7.16-10.28c0-7-2.61-10.39-7.29-10.39-4.36,0-7.2,3.21-7.2,10.33m24-.06c0,10.2-6.15,17.7-16.89,17.7-10.53,0-16.67-7.46-16.67-17.52,0-10.4,6.33-17.75,17.11-17.75,10,0,16.45,7,16.45,17.57"/><polygon class="cls-1" points="45.38 65.99 54.91 56.55 46.72 48.42 37.2 57.85 45.38 65.99"/><polygon class="cls-1" points="10.87 57.41 46.43 92.97 54.38 85.01 26.7 57.32 53.92 30.1 46.05 22.23 10.87 57.41"/><polygon class="cls-2" points="59.37 35.48 51.42 43.43 65.73 57.75 51.45 72.03 59.37 80.03 81.63 57.76 81.6 57.73 81.61 57.71 59.37 35.48"/></svg></a></h2>
      <p class="px-3 fs-4">This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.</p>
      <p class="px-3 fs-4">
        <ul>
          <li>Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)</li>
          <li>Renders a JSON schema as a webform and hooks up that form to the Form.io API's</li>
          <li>Nested components, layouts, Date/Time, Select, Input Masks, and many more included features</li>
          <li>Full JavaScript API SDK library on top of Form.io</li>
        </ul>
      </p>
    </div>
  </div>
</div>

### Simple Example

```html
<html>
  <head>
    <meta charset="utf-8" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css"
    />
    <script src="https://cdn.form.io/js/formio.embed.js"></script>
  </head>
  <body>
    <div id="formio"></div>
    <script type="text/javascript">
      Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
    </script>
  </body>
</html>
```

### Application Import

Or you can import this within your own application as follows.

```
npm install --save @formio/js
```

```js
import { Formio } from '@formio/js';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
```

### Result

<div class="card card-body mb-4">
<div id="formio"></div>
<script type="text/javascript">
  window.onload = function() {
    Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
  };
</script>
</div>

### JSFiddle

To play around with this renderer, we recommend using JSFiddle. Here is an example you can fork and use as a sandbox.

<script async src="//jsfiddle.net/travistidwell/z63jvwkp/embed/"></script>
