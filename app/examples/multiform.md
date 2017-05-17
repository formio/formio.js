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
      key: 'pageA',
      title: 'A',
      nextPage: {"var": "data.a.data.nextPage"},
      components: [
        {
          type: 'form',
          key: 'a',
          src: 'https://examples.form.io/a',
          submit: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageB',
      title: 'B',
      nextPage: {"var": "data.b.data.nextPage"},
      components: [
        {
          type: 'form',
          key: 'b',
          src: 'https://examples.form.io/b',
          submit: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageC',
      title: 'C',
      nextPage: {"var": "data.c.data.nextPage"},
      components: [
        {
          type: 'form',
          key: 'c',
          src: 'https://examples.form.io/c',
          submit: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageD',
      title: 'D',
      nextPage: {"var": "data.d.data.nextPage"},
      components: [
        {
          type: 'form',
          key: 'd',
          src: 'https://examples.form.io/d',
          submit: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'pageE',
      title: 'E',
      nextPage: {"var": "data.e.data.nextPage"},
      components: [
        {
          type: 'form',
          key: 'e',
          src: 'https://examples.form.io/e',
          submit: true
        }
      ]
    },
    {
      type: 'panel',
      key: 'done',
      title: 'E',
      components: [
        {
          input: false,
          html: `<h2>Are you sure you wish to submit?</h3>
          <ul>
            <li><strong>Page A</strong> - \{\{ data.a._id \}\}</li>
            <li><strong>Page B</strong> - \{\{ data.b._id \}\}</li>
            <li><strong>Page C</strong> - \{\{ data.c._id \}\}</li>
            <li><strong>Page D</strong> - \{\{ data.d._id \}\}</li>
            <li><strong>Page E</strong> - \{\{ data.e._id \}\}</li>
          </ul>`,
          type: 'content',
          key: 'areyousure'
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
