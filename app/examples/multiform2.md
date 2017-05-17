---
title: Multi-Form Workflows
layout: vtabs
section: examples
weight: 21
---
### Multi-form Workflows
This demonstration illustrates how the **Form Component** can be used to create multi-form wizard
workflows. Each page within the workflow can decide how to navigate to the next form based upon the
user input within the workflow.

```js
var workflow = new FormioWizard(document.getElementById('workflow'));
workflow.src = 'https://examples.form.io/multiform';
```

<h3>Result</h3>
<div class="well">
  <div id="workflow"></div>
  <script type="text/javascript">
  var workflow = new FormioWizard(document.getElementById('workflow'));
  workflow.src = 'https://examples.form.io/multiform';
  </script>
</div>
