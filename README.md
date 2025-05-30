# JavaScript powered forms and SDK for Form.io
This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.

 - Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)
 - Renders a JSON schema as a webform and hooks up that form to the Form.io API's
 - Complete Form Builder which creates the JSON schema used to render the forms.
 - Nested components, layouts, Date/Time, Select, Input Masks, and many more included features
 - Full JavaScript API SDK library on top of Form.io

## Important Updates

### Namespace Change

Starting with version 5.x, this library has moved to a new namespace. Please update your npm install command as follows:

`npm install --save @formio/js`

If you are upgrading from version 4.x, please ensure you update your imports and dependencies to use the new namespace @formio/js.

### CDN update

Our cdn endpoints also reflect the changes to the new namespace when retrieving versions >4.x:

Example: 
- https://cdn.form.io/js/formio.full.min.js
- https://cdn.form.io/js/5.0.0/formio.full.min.js

### Maintenance Mode for Version 4.x

Version 4.x of this library is now in maintenance mode. This means:

 - No new features will be added to version 4.x.
 - Only bug fixes and security updates will be provided.

For the latest features and improvements, we strongly recommend upgrading to version 5.x.

## Examples and Demonstration
To find out more about this library as well as see a demonstration of what you can do with this library, go to the Examples and Demo site @ [https://formio.github.io/formio.js](https://formio.github.io/formio.js)
 
## Installation
To install this SDK into your project, you can use the following command within your terminal.

```
npm install --save @formio/js
```
 
## Form Building
This library has a very powerful JSON form builder, and can be used like the following.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.form.io/js/formio.full.min.css">
    <script src='https://cdn.form.io/js/formio.full.min.js'></script>
  </head>
  <body>
    <div id='builder'></div>
    <script type='text/javascript'>
      Formio.builder(document.getElementById('builder'), {}, {});
    </script>
  </body>
</html>
```

This will create a robust Form builder embedded right within your own application. See [Our Demo Page](https://formio.github.io/formio.js/app/builder) for an example.
 
### Form Builder Documentation
Go to the [Form Builder Documentation](https://help.form.io/developers/form-builder) for a full documentation on how the open source form builder works. 
 
## Form Rendering
The following is a simple example on how to render a form within your HTML application.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <script src="https://cdn.form.io/js/formio.embed.js"></script>
  </head>
  <body>
    <div id='formio'></div>
    <script type='text/javascript'>
      Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
    </script>
  </body>
</html>
```

This will render the following form within your application.

![Alt text](https://monosnap.com/file/iOZ1yB0wPntJLWQwyhdt7ucToLHEfF.png)

You can also render JSON directly instead of referencing the embed URL from Form.io.

```js
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      placeholder: 'Enter your first name.',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      placeholder: 'Enter your last name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
});
```

This will render the JSON schema of the form within your application.

### JSFiddle Example
A great way to play around with this renderer is to use JSFiddle, which serves as a good sandbox environment. Here is an example that you can fork and make your own!

http://jsfiddle.net/travistidwell/z63jvwkp/

### Form Renderer Documentation
For a more complete documentation of how to utilize this library within your application go to the [Form Renderer](https://help.form.io/developers/form-renderer) documentation.

## Wizard Rendering
This library can also be used to render a form wizard within your application using the same method as rendering a form.
The determiniation on whether it should render as a wizard or not is based on the **display** property of the form schema 
being set to ```wizard```.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <script src="https://cdn.form.io/js/formio.embed.js"></script>
  </head>
  <body>
    <div id='formio'></div>
    <script type='text/javascript'>
      Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/wizard');
    </script>
  </body>
</html>
```

## Form Embedding
You can also use this library as a JavaScript embedding of the form using a single line of code. For example, to embed the https://examples.form.io/example form within your application you can simply use the following embed code.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
<script src="https://cdn.form.io/js/formio.embed.min.js?src=https://examples.form.io/example&libs=true"></script>
```

For an example of how this looks and works, check out the following [Form.io Inline Embedding](https://jsfiddle.net/travistidwell/uys26qpf/)

## Form Embedding Documentation
For a more complete documentation of how to embed forms, go to the [Form Embedding Documentation](https://help.form.io/developers/rendering).

## JavaScript SDK
In addition to having a Form Renderer within this application, you can also use this library as a JavaScript SDK in your application. For example, to load a Form, and then submit that form you could do the following within your JavaScript.

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <script src='https://cdn.form.io/js/formio.min.js'></script>
    <script type='text/javascript'>
      var formio = new Formio('https://examples.form.io/example');
      formio.loadForm().then(function(form) {
      
        // Log the form schema.
        console.log(form);
        
        formio.saveSubmission({data: {
          firstName: 'Joe',
          lastName: 'Smith',
          email: 'joe@example.com'
        }}).then(function(submission) {
        
          // Log the full submission object.
          console.log(submission);
        });
      });
    </script>
  </head>
</html>
```

You can also use this within an ES6 application as follows.

```js
import { Formio } from '@formio/js/sdk';
let formio = new Formio('https://examples.form.io/example');
formio.loadForm((form) => {
  console.log(form);
  formio.saveSubmission({data: {
    firstName: 'Joe',
    lastName: 'Smith',
    email: 'joe@example.com'
  }}).then((submission) => {
    console.log(submission);
  });
});
```

### JavaScript SDK Documentation.
For more complete documentation over the JavaScript SDK, please take a look at the [JavaScript SDK Documentation](https://help.form.io/developers/javascript-sdk).

### Full Developer API Documentation
To view the full SDK Documentation, go to [Developer SDK Documentation](https://formio.github.io/formio.js/docs/)

test update 1 
