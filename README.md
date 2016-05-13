# formio.js
A common library for including Form.io in the browser.

### Usage
Creating an instance of Formio is simple, and takes only a path (URL String). The path can be different, depending on
the desired output. The Formio instance can also access higher level operations, depending on how granular of a path
you start with.

```javascript
var a = new Formio(<path>);
```

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
