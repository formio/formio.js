---
title: Save as Draft
layout: vtabs
section: examples
weight: 30
---
Within the Form.io renderer, you can also enable a Save as Draft feature which will save a submission in "draft" mode either periodically (every 5 seconds), or manually, as the user
is filling out the form. This system will also "restore" a draft submission if the user leaves the page, and then comes back in a later session. A common term used to describe this process is "save and return" capability.

This feature works along with our authentication system to attach a "draft" submission to a user who has been authenticated, to periodically store the draft of that submission as that user is using the form.

In order to enable this feature, you simply need to use the ```saveDraft``` parameter when you are rendering the form.

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  saveDraft: true
});
```

This will then trigger the drafts to start periodically every 5 seconds once a user is established through the use of common Form.io authentication modules, such as the [one provided within Angular](https://github.com/formio/angular-formio/wiki/User-Authentication).

It is not possible to have Anonymous draft submissions because the platform does not know whom to associate the "draft" against. There must be a user and  they must be authenticated.


```js
Formio.icons = 'fontawesome';

// Create a new form with saveDraft enabled.
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  saveDraft: true
});

// Set the "owner" field for the draft submissions to the following user.
Formio.setUser({
  _id: '123'
})
```

**Note:** This will only work if you do NOT explicitly set the form submission as follows.

```js
// This won't work....
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  saveDraft: true
}).then(function(form) {
  // Explicitly setting the form submission will stop the "draft" mode.
  form.submission = {
    data: {
      firstName: 'Joe',
      lastName: 'Smith'
    }
  };
});
```


#### Timing configuration
You can also configure how regular the "save draft" is triggered using the ```saveDraftThrottle``` parameter. This defaults to 5 seconds, and is defined in milliseconds.

```js
Formio.icons = 'fontawesome';

// Save a draft every 10 seconds.
Formio.createForm(document.getElementById('formio'), 'https://examples.form.io/example', {
  saveDraft: true,
  saveDraftThrottle: 10000
});
```

## Manual Draft Submissions
You can also enable draft submissions to occur manually through the use of our Button component, configured with the Action of "Save State" and the "State" option configured as "draft". Then when this button is pressed, it will save the submission in "draft" mode.

```js
// Create a manual form with a Draft button, and submit the data to a specific API.
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      key: 'firstName',
      label: 'First Name',
      input: true
    },
    {
      type: 'textfield',
      key: 'lastName',
      label: 'Last Name',
      input: true
    },
    {
      type: 'button',
      action: 'submit',
      key: 'submit',
      label: 'Save Submission'
    },
    {
      type: 'button',
      action: 'saveState',
      state: 'draft',
      key: 'saveDraft',
      label: 'Save as Draft'
    }
  ]
}).then(function(form) {
  // Set the url so that it knows where to submit the data to.
  form.url = 'https://examples.form.io/example';
  form.nosubmit = false;
});
```
