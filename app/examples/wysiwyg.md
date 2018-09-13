---
title: WYSIWYG Editor
layout: vtabs
section: examples
weight: 24
---
With this form renderer, you can also configure any Text area to render as a WYSIWYG editor using the amazing [Quill editor](https://quilljs.com).

<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      validate: {
        required: true
      },
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textarea',
      label: 'Content',
      wysiwyg: true,
      validate: {
        required: true
      },
      key: 'content',
      input: true,
      inputType: 'text'
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary',
      key: 'submit',
      disableOnInvalid: true
    }
  ]
});
</pre>
  <h3>Result</h3>
  <div class="card card-body bg-light">
  <div id="formio"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('formio'), {
    components: [
      {
        type: 'textfield',
        label: 'Title',
        placeholder: 'Enter the title.',
        validate: {
          required: true
        },
        key: 'title',
        input: true,
        inputType: 'text'
      },
      {
        type: 'textarea',
        label: 'Content',
        wysiwyg: true,
        validate: {
          required: true
        },
        key: 'content',
        input: true,
        inputType: 'text'
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Submit',
        theme: 'primary',
        key: 'submit',
        disableOnInvalid: true
      }
    ]
  }).then(function(form) {
    form.on('submit', function(submission) {
      console.log(submission);
    });
  });
  </script>
</div>

### Custom Configurations
It is also possible to provide your own custom configurations to the WYSIWYG editor found @ https://quilljs.com/docs/configuration. These configurations
can be provided instead of the "true" value of the wysiwyg attribute. Like so.

<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'textfield',
      label: 'Title',
      placeholder: 'Enter the title.',
      key: 'title',
      input: true,
      inputType: 'text'
    },
    {
      type: 'textarea',
      label: 'Content',
      wysiwyg: {
        theme: 'snow',
        modules: {
          toolbar: ['bold', 'italic', 'underline', 'strike']
        }
      },
      key: 'content',
      input: true,
      inputType: 'text'
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary',
      key: 'submit'
    }
  ]
});
</pre>
  <h3>Result</h3>
  <div class="card card-body bg-light">
  <div id="formio2"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('formio2'), {
    components: [
      {
        type: 'textfield',
        label: 'Title',
        placeholder: 'Enter the title.',
        key: 'title',
        input: true,
        inputType: 'text'
      },
      {
        type: 'textarea',
        label: 'Content',
        wysiwyg: {
          theme: 'snow',
          modules: {
            toolbar: ['bold', 'italic', 'underline', 'strike']
          }
        },
        key: 'content',
        input: true,
        inputType: 'text'
      },
      {
        type: 'button',
        action: 'submit',
        label: 'Submit',
        theme: 'primary',
        key: 'submit'
      }
    ]
  }).then(function(form) {
    form.on('submit', function(submission) {
      console.log(submission);
    });
  });
  </script>
</div>
