This library includes a robust, plain JavaScript, form rendering engine that is capable of dynamically generating Webforms using a JSON schema. A very simple example of this, is as follows.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://cdn.form.io/formiojs/formio.full.min.css'>
    <script src='https://cdn.form.io/formiojs/formio.full.min.js'></script>
    <script type='text/javascript'>
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
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

It should be noted, that if you include the JavaScript library after the place where the form is embedded, you will need to wrap the renderer logic within the following code.

```js
window.addEventListener('load', function() {
  Formio.createForm(document.getElementById('formio'), {
    ...
  });
});
```

You can also use this renderer with Forms generated using Form.io using the ```src``` parameter. An example of this is as follows.

```html
<html>
  <head>
    <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'>
    <link rel='stylesheet' href='https://cdn.form.io/formiojs/formio.full.min.css'>
    <script src='https://cdn.form.io/formiojs/formio.full.min.js'></script>
    <script type='text/javascript'>
      Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
    </script>
  </head>
  <body>
    <div id='formio'></div>
  </body>
</html>
```

This will render the following form within your application.

![Alt text](https://monosnap.com/file/iOZ1yB0wPntJLWQwyhdt7ucToLHEfF.png)

## Formio.createForm
This method is a factory method that will create an instance of a ```Form``` class based on the display type of the form. For example, if you set your form to render as a wizard, then this factory will load the form, read the display property of the form, and then create an instance of either ```FormioForm```, ```FormioWizard```, or ```FormioPDF``` based on the display of the form.

## Form Embedding
You can also use this library as a JavaScript embedding of the form using a single line of code. For example, to embed the https://examples.form.io/example form within your application you can simply use the following embed code.

```html
<script src="https://cdn.form.io/formiojs/formio.embed.min.js?src=https://examples.form.io/example"></script>
```

For an example of how this looks and works, check out the following [Form.io Form Embedding CodePen](http://codepen.io/travist/pen/ggQOBa)

## Using the Form Renderer
The form renderer is utilized by creating an instance of the ```FormioForm``` class. This class can be created using the ```Formio.createForm``` method as follows.

```js
Formio.createForm([element], [src|form], [options]).then((form) => {

});
```

| Property | Description | Example |
|----------|-------------|---------|
| element | The HTML DOM element you would like to render the form within. | document.getElementById('formio') |
| src|form | Either the URL of the form, or the form JSON object |
| options | The options to alter behavior of the rendering. | See below |

### Options
The following options are available and can be provided to the renderer as follows.

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
});
```

| Option | Description | Default |
|--------|-------------|---------|
| readOnly | If the form should render as disabled (read only) | false |
| noAlerts | If the form should not render the alerts dialog on top of the form. Pass "true" to disable. | false |
| i18n | An instance the translation you would like to provide to the renderer. | See [this file](https://github.com/formio/formio.js/blob/master/src/locals/en.js) for an example. |
| template | Provides a way to hook into the generation of the rendering of each element. | See [templating section]() |
| hooks | An object that describes the hooks that are applied to the form. See hooks section below. |
| inputsOnly | If you wish to only show the inputs only and no labels, etc. | false |

The following options are available only on wizard based forms.

| Option | Description | Default |
|--------|-------------|---------|
| buttonSettings.showCancel | If the cancel button should be shown | true |
| buttonSettings.showNext| If the next button should be shown | true |
| buttonSettings.showPrevious | If the previous button should be shown | true |
| breadcrumbSettings.clickable | If the breadcrumb bar is clickable | true |

## Rendering a Form
These are two ways to render a form. By either providing the JSON schema to the form, or by providing the Form.io Embed URL to the object. Both of these work as follows.

### Render a JSON schema form
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

### Render a Form URL from [Form.io](https://form.io)
```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example');
```

## Setting the Submission
Once you have the form rendered, the next thing you can do is set the submission of the form. This can be done with the ```submission``` property of the form renderer like so.

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example').then(function(form) {
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    }
  };
});
```

You can also make this a "read-only" submission view by setting the ```readOnly``` property on the form renderer.

```js
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
}).then(function(form) {
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    }
  };
});
```

## Instance Methods
Once a form is created, it will create an instance of the ```FormioForm``` class. The following methods can then be used on that form.

| Method | Description | Example |
|--------|-------------|---------|
| setForm | Sets the form JSON | form.setForm({components:[....]}) |
| reset | Resets the submission object resetting all the fields to their defaults or empty. | form.reset() |
| render | Renders, or re-renders, the form | form.render() |
| setAlert | Adds a new alert to the form. Set to false to clear | form.setAlert('danger', 'This is an alert!') |
| showErrors | Shows all the errors of the form in the alert box. | form.showErrors() |
| on | Registers for an event triggered within the form renderer. | form.on('error', () => {}); |
| submit | Submits the form. | form.submit() |

## Events
Another major element of the Form renderer is to register for a triggered event within the Form renderer. For example, you may wish to register for the ```error``` event and handle that within your application. Or you may wish to know when the user submits the form so that you can handle the submission object within your application. This uses the event system to notify your application of certain events from happening. For example, you could handle the submission and errors of the form doing the following.

```ts
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  readOnly: true
}).then(function(form) {
  form.on('submit', (submission) => {
    console.log('The form was just submitted!!!');
  });
  form.on('error', (errors) => {
    console.log('We have errors!');
  })
});
```

The following events are available.

| Event | Description | Value |
|-------|-------------|-------|
| submit | The form was just submitted. If ```src``` is provided, then this will contain the saved submission, if ```form``` is provided, then this will just be the JSON submission object. | The value of the submission |
| error | An error event that occured. | An array of errors triggered in the form. |
| submitDone | Only triggered if it was a saved submission. | The value of the submission saved. |
| change | Triggered for every change that is made within the form. | The component and value of what was changed. |
| render | Triggered after the form is done rendering. | The form is rendered and ready to go. |
| prevPage | Triggered in the wizard when a previous page is navigated | The page information. |
| nextPage | Triggered in the wizard when the next page is navigated | The page information |

## Hooks
Hooks allow you to alter the behavior of the form and block the execution of certain functionalities in favor of providing your own logic. A good example of this is to provide a ```beforeSubmit``` hook where you can block the submission and alter the the submission or even perform your own validations. Each hook is provided using the options of the renderer like so.

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeSubmit: (submission, next) => {
      // Alter the submission
      submission.data.email = 'me@example.com';
      
      // Only call next when we are ready.
      next();
    }
  }
})
```

Here is a list of all available hooks within the renderer.

### beforeSubmit(submission, next)
Allows you to hook into the submit handler before the submission is being made to the server. Each parameter is described as follows.

| Param | Description |
|-------|-------------|
| submission | The submission data object that is going to be submitted to the server. This allows you to alter the submission data object in real time. |
| next | Called when the ```beforeSubmit``` handler is done executing. If you call this method without any arguments, like ```next()```, then this means that no errors should be added to the default form validation. If you wish to introduce your own custom errors, then you can call this method with either a single error object, or an array of errors like the example below. |

#### beforeSubmit: Custom Errors
It is a very common use case to provide your own custom errors to the submit handler. To achieve this, you can call the ```next``` callback with either a single error object, or an array of errors you wish to introduce to the error handler. Here is an example of how to introduce some custom errors.

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeSubmit: (submission, next) => {
      // Make a custom ajax call.
      $.ajax({
        url: 'https://myserver.com/validate',
        method: 'POST',
        data: submission,
        complete: (errors) => {
          let submitErrors = null;
          if (errors) {
            submitErrors = [];
            errors.forEach((error) => {
              submitErrors.push({
                message: error.toString()
              });
            });
          }
          next(submitErrors);
        }
      });
    }
  }
})
```

### beforeNext(currentPage, submission, next)
Allows you to hook into the submit handler before the switching to next page. Each parameter is described as follows.

| Param | Description |
|-------|-------------|
| currentPage | The current page data object. This allows you to use page data for your submissions on each page. |
| submission | The submission data object that is going to be submitted to the server. This allows you to alter the submission data object in real time. |
| next | Called when the ```beforeNext``` handler is done executing. If you call this method without any arguments, like ```next()```, then this means that no errors should be added to the default form validation. If you wish to introduce your own custom errors, then you can call this method with either a single error object, or an array of errors like the example below. |

#### beforeNext: Custom Errors
It is a very common use case to provide your own custom errors to the submit handler before user switching to next page. To achieve this, you can call the ```next``` callback with either a single error object, or an array of errors you wish to introduce to the error handler. Here is an example of how to introduce some custom errors.

```
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  hooks: {
    beforeNext: (currentPage, submission, next) => {
      // Make a custom ajax call.
      $.ajax({
        url: 'https://myserver.com/validate',
        method: 'POST',
        data: submission,
        complete: (errors) => {
          let submitErrors = null;
          if (errors) {
            submitErrors = [];
            errors.forEach((error) => {
              submitErrors.push({
                message: error.toString()
              });
            });
          }
          next(submitErrors);
        }
      });
    }
  }
})
```
