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

<div class="well">
<div id="workflow"></div>
<script type="text/javascript">
var workflow = new FormioWizard(document.getElementById('workflow'));
workflow.form = {
  components: [
    {
      type: 'panel',
      key: 'page1',
      label: 'A',
      nextPage: {
        "if": [
          {"var": "data.a"},
          {"var": "data.a"},
          {"var": "page"}
        ]
      },
      components: [
        {
          type: 'form',
          key: 'a',
          src: 'https://examples.form.io/a',
          submitOnNext: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'page2',
      label: 'B',
      nextPage: {"var": "data.b"},
      components: [
        {
          type: 'form',
          key: 'b',
          src: 'https://examples.form.io/b',
          submitOnNext: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'page3',
      label: 'C',
      nextPage: {"var": "data.c"},
      components: [
        {
          type: 'form',
          key: 'c',
          src: 'https://examples.form.io/c',
          submitOnNext: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'page3',
      label: 'D',
      nextPage: {"var": "data.d"},
      components: [
        {
          type: 'form',
          key: 'd',
          src: 'https://examples.form.io/d',
          submitOnNext: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'page3',
      label: 'E',
      nextPage: {"var": "data.e"},
      components: [
        {
          type: 'form',
          key: 'e',
          src: 'https://examples.form.io/e',
          submitOnNext: true
        }
      ]
    },
    {
      type: 'button',
      action: 'submit',
      theme: 'primary',
      label: 'Submit'
    }
  ]
};
workflow.on('submit', function(submission) {
  console.log(submission);
});
</script>
</div>
