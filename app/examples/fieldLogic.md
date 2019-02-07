---
title: Field Logic
layout: vtabs
section: examples
weight: 30
---
You can use field logic to dynamically change field component definitions based on many different triggers. For example, you can make a field required based on another field's value or change another fields value.

This can also be configured on our beta portal (https://beta.form.io) under the "Field Logic" tab.

```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<div id="formio"></formio>
```

```js
Formio.icons = 'fontawesome';
Formio.createForm(document.getElementById('formio'), {
 components: [
   {
     type: 'textfield',
     key: 'iAmATrigger',
     label: 'I am a trigger',
     placeholder: 'Enter joe or bob.',
     input: true,
   },
   {
     type: 'textfield',
     key: 'lastName',
     label: 'Last Name',
     placeholder: 'Enter your last name',
     input: true,
     tooltip: 'Enter your <strong>Last Name</strong>',
     description: 'Enter your <strong>Last Name</strong>',
     logic: [
       {
         name: 'Bob Logic',
         trigger: {
           type: 'simple',
           simple: {
             show: true,
             when: 'iAmATrigger',
             eq: 'bob'
           }
         },
         actions: [
           {
             name: 'Set to snob',
             type: 'value',
             value: 'value = \'snob\';'
           }
         ]
       },
       {
         name: 'Joe Logic',
         trigger: {
           type: 'simple',
           simple: {
             show: true,
             when: 'iAmATrigger',
             eq: 'joe'
           }
         },
         actions: [
           {
             name: 'Set schmoe',
             type: 'value',
             value: 'value = \'schmoe\';'
           }
         ]
       }
     ]
   },
 ]
});
```

<h3>Result</h3>
<div class="card card-body bg-light">
<div id="formio"></div>
<script type="text/javascript">
Formio.createForm(document.getElementById('formio'), {
 components: [
   {
     type: 'textfield',
     key: 'iAmATrigger',
     label: 'I am a trigger',
     placeholder: 'Enter joe or bob.',
     input: true,
   },
   {
     type: 'textfield',
     key: 'lastName',
     label: 'Last Name',
     placeholder: 'Enter your last name',
     input: true,
     tooltip: 'Enter your <strong>Last Name</strong>',
     description: 'Enter your <strong>Last Name</strong>',
     logic: [
       {
         name: 'Bob Logic',
         trigger: {
           type: 'simple',
           simple: {
             show: true,
             when: 'iAmATrigger',
             eq: 'bob'
           }
         },
         actions: [
           {
             name: 'Set to snob',
             type: 'value',
             value: 'value = \'snob\';'
           }
         ]
       },
       {
         name: 'Joe Logic',
         trigger: {
           type: 'simple',
           simple: {
             show: true,
             when: 'iAmATrigger',
             eq: 'joe'
           }
         },
         actions: [
           {
             name: 'Set schmoe',
             type: 'value',
             value: 'value = \'schmoe\';'
           }
         ]
       }
     ]
   },
 ]
}
);
</script>
</div>
