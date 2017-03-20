# JavaScript powered forms and SDK for Form.io
This library is a plain JavaScript form renderer and SDK for Form.io. This allows you to render the JSON schema forms produced by Form.io and render those within your application using plain JavaScript, as well as provides an interface SDK to communicate to the Form.io API's. The benefits of this library include.

 - Plain JavaScript implementation using ES6 and Modern practices (no jQuery, Angular, React, or any other framework dependency)
 - Renders a JSON schema as a webform and hooks up that form to the Form.io API's
 - Nested components, layouts, Date/Time, Select, Input Masks, and many more included features

### Usage
Creating an instance of Formio is simple, and takes only a path (URL String). The path can be different, depending on
the desired output. The Formio instance can also access higher level operations, depending on how granular of a path
you start with.

```javascript
var a = new Formio(<path>);
```

### Attach to HTML Form
This **Formio** library can also be used to attach an existing HTML Form to the Form.io API service using the ```Formio.form``` method. 
Let's suppose you have the following HTML form.

```
<form action='https://examples.form.io/example' id="myform">
  <label>First Name
  <input id="first-name" name="data[user][firstName]" type="text" placeholder="First name only" required="" autofocus="">
  <label>Last Name
  <input id="last-name" name="data[user][lastName]" type="text" placeholder="Last name only" required="" autofocus="">
  <label>Email
  <input id="email" name="data[user][email]" type="email" placeholder="example@domain.com" required="">
</form>
```

You can now attach this form to the Form.io API by calling the following.

```
var form = document.querySelector('form#myform');
Formio.form(form, function(err, submission) {
  console.log(submission);
});
```

This will now let the user fill out the form, and then when they press the submit button, will execute the API call into Form.io.

This also works with **jQuery** like so...

```
Formio.form($('form#myform'), function(err, submission) {
  console.log(submission);
});
```

### Providing success and danger alerts.
When using this library, you will need to provide the alerts and business logic once the submission is made. Using the form provided above,
you could create a simple alert system using the following logic below the form declaration.

```
<script type="text/javascript">
  var form = document.querySelector('form#myform');
  Formio.form(form, function(err) {
    var alert = document.createElement('div');
    if (err) {
      alert.setAttribute('class', 'formio-alert formio-danger');
      alert.appendChild(document.createTextNode(err));
    }
    else {
      alert.setAttribute('class', 'formio-alert formio-success');
      alert.appendChild(document.createTextNode('Submission Created'));
    }
    form.parentNode.insertBefore(alert, form);
  });
</script>
```

### Why is this different than a direct HTML form submit?
You can submit a form to Form.io with HTML directly using our API endpoint as the action, but those submissions will be made
anonymously. This code provides the authentication tokens which will allow you to do so using the authentication of the currently logged in user.

In addition, this library also provides plugin support to the submissions being made so that libraries like our Offline Mode can be utilized. 

## API

`Formio.loadProject()` - Loads the parent Project.
  - Available to any valid Form.io resource URL.

`Formio.saveProject()` - Saves the parent Project, using the given payload.
  - Available to any valid Form.io resource URL.

`Formio.deleteProject()` - Deletes the parent Project.
  - Available to any valid Form.io resource URL.

`Formio.loadForms()` - Loads all of the Forms.
  - Available to any valid Form.ui resource URL.

`Formio.loadForm()` - Loads the given Form.
  - Requires the initial path to be a specific Form URL.

`Formio.saveForm()` - Saves the given Form, using the given payload.
  - Requires the initial path to be a specific Form URL.

`Formio.deleteForm()` - Deletes the given Form.
  - Requires the initial path to be a specific Form URL.

`Formio.loadAction()` - Loads the given Action.
  - Requires the initial path to be a specific Action URL.

`Formio.saveAction()` - Saves the given Action.
  - Requires the initial path to be a specific Action URL.

`Formio.deleteAction()` - Deletes the given Action.
  - Requires the initial path to be a specific Action URL.

`Formio.loadActions()` - Loads all of the Actions for a given Form.
  - Requires the initial path to be a specific Form URL.

`Formio.availableActions()` - Loads all the Actions available for a given Form.
  - Requires the initial path to be a specific Form URL.

`Formio.availableInfo()` - Loads all the settings available for a given Action.
  - Requires the initial path to be a specific Form URL.

`Formio.loadSubmissions()` - Loads all of the Submissions for a given Form.
  - Requires the initial path to be a specific Form URL.

`Formio.loadSubmission()` - Loads the given Submission.
  - Requires the initial path to be a specific Submission URL.

`Formio.saveSubmission()` - Saves the given Submission, using the given payload.
  - Requires the initial path to be a specific Submission URL.

`Formio.deleteSubmission()` - Deletes the given Submission.
  - Requires the initial path to be a specific Submission URL.

## Examples

### Loading a Project
```javascript
var a = new Formio('myproject.form.io');
var myProject = a.loadProject();

// Since we started with a Project, we can also load its Forms.
var myForms = a.loadForms();
```

### Loading a Form
```javascript
var a = new Formio('myproject.form.io/myform');
var myForm = a.loadForm();

// Since we started with a specific Form, we can now access its Project.
var myProject = a.loadProject();
```

### Loading a Submission
```javascript
var a = new Formio('myproject.form.io/myform/submission/5736076036db24c3c679e778');
var mySubmission = a.loadSubmission();

// Since we started with a specific Submission, we can now access its Form and Project.
var myForm = a.loadForm();
var myProject = a.loadProject();
```

## New in Version 2!
Verson 2.x of this library introduces a few new major features. You can install this version using the following.

```
npm install --save formiojs@next
```

### Dynamic Form Rendering
We have introduced a core JavaScript renderer with this package. This can be used as follows.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="node_modules/formiojs/dist/formio.form.min.css" />
<script src="node_modules/formiojs/dist/formio.form.min.js"></script>
<div id="formio"></div>
<script type="text/javascript">
  var form = new FormioForm(document.getElementById('formio'));
  form.src = 'https://examples.form.io/example';
  form.on('change', function(submission) {
    console.log(submission);
  });
</script>
```

### JavaScript Embedding
With this library, you can also create a very simple JavaScript embed using the following code.

```html
<script src="node_modules/formiojs/dist/formio.embed.js?src=https://examples.form.io/example"></script>
```
