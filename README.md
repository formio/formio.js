# JavaScript powered forms and SDK for Form.io
This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.

 - Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)
 - Renders a JSON schema as a webform and hooks up that form to the Form.io API's
 - Nested components, layouts, Date/Time, Select, Input Masks, and many more included features
 - Full JavaScript API SDK library on top of Form.io
 
## Installation
To install this SDK into your project, you can use the following command within your terminal.

```
npm install --save formiojs
```
 
## Simple Example
The following is a simple example on how to render a form within your HTML application.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@2.3.4/dist/formio.form.min.css'>
    <script src='https://unpkg.com/formiojs@2.3.4/dist/formio.form.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        var form = new FormioForm(document.getElementById('formio'));
        form.src = 'https://examples.form.io/example';
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

This will render the following form within your application.

![Alt text](https://monosnap.com/file/iOZ1yB0wPntJLWQwyhdt7ucToLHEfF.png)

You can also render JSON directly instead of referencing the embed URL from Form.io.

```js
var form = new FormioForm(document.getElementById('formio'));
form.form = {
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
};
```

This will render the JSON schema of the form within your application.

## Wizard Rendering
This library can also be used to render a form wizard within your application using the Wizard library.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://unpkg.com/formiojs@2.3.4/dist/formio.wizard.min.css'>
    <script src='https://unpkg.com/formiojs@2.3.4/dist/formio.form.min.js'></script>
    <script type='text/javascript'>
      window.onload = function() {
        var form = new FormioWizard(document.getElementById('formio'));
        form.src = 'https://examples.form.io/wizard';
      };
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

## Form Embedding
You can also use this library as a JavaScript embedding of the form using a single line of code. For example, to embed the https://examples.form.io/example form within your application you can simply use the following embed code.

```html
<script src="https://unpkg.com/formiojs@latest/dist/formio.embed.min.js?src=https://examples.form.io/example"></script>
```

For an example of how this looks and works, check out the following [Form.io Form Embedding CodePen](http://codepen.io/travist/pen/ggQOBa)

## Full Form Renderer Documentation
For a more complete documentation of how to utilize this library within your application go to the [Form Renderer](https://github.com/formio/formio.js/wiki/Form-Renderer) documentation within the [Wiki](https://github.com/formio/formio.js/wiki)

# JavaScript SDK
In addition to having a Form Renderer within this application, you can also use this library as a JavaScript SDK in your application. For example, to load a Form, and then submit that form you could do the following within your JavaScript.

```html
<html>
  <head>
    <script src='https://unpkg.com/formiojs@2.3.4/dist/formio.min.js'></script>
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
import Formio from 'formiojs';
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

## JavaScript SDK Documentation.
For more complete documentation over the JavaScript SDK, please take a look at the [JavaScript SDK](https://github.com/formio/formio.js/wiki/JavaScript-API) within the [wiki](https://github.com/formio/formio.js/wiki).

## Full Developer API Documentation
To view the full SDK Documentation, go to [Developer SDK Documentation](https://formio.github.io/formio.js/docs/)
