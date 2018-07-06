---
title: Calculated Values
layout: vtabs
section: examples
weight: 300
---
### Calculated Values
You can use [JSON Logic](http://jsonlogic.com) to create complex calculated values based on the values of other fields.

<div class="row">
  <div class="col col-sm-7">
<pre>
Formio.createForm(document.getElementById('formio'), {
  components: [
    {
      type: 'number',
      label: 'A',
      key: 'a',
      input: true,
      inputType: 'text',
      multiple: true,
      prefix: '+',
      validate: {
        min: 2,
        max: 100,
        step: 1
      }
    },
    {
      type: 'htmlelement',
      tag: 'p',
      className: 'text-center',
      content: '&mdash;&mdash;&mdash;&mdash; X &mdash;&mdash;&mdash;&mdash;'
    },
    {
      type: 'number',
      label: 'B',
      key: 'b',
      input: true,
      inputType: 'text',
      multiple: true,
      prefix: '+',
      validate: {
        min: 2,
        max: 100,
        step: 1
      }
    },
    {
      type: 'textfield',
      label: 'Total',
      key: 'total',
      input: true,
      inputType: 'text',
      disabled: true,
      calculateValue: {
        "*": [
          {"_sum": {var: 'data.a'}},
          {"_sum": {var: 'data.b'}}
        ]
      }
    }
  ]
});
</pre>
  </div>
  <div class="col col-sm-5">
  <h3>Result</h3>
  <div class="well">
  <div id="formio"></div>
  <script type="text/javascript">
  Formio.createForm(document.getElementById('formio'), {
    components: [
      {
        type: 'number',
        label: 'A',
        key: 'a',
        input: true,
        inputType: 'text',
        multiple: true,
        prefix: '+',
        validate: {
          min: 2,
          max: 100,
          step: 1
        }
      },
      {
        type: 'htmlelement',
        tag: 'p',
        className: 'text-center',
        content: '&mdash;&mdash;&mdash;&mdash; X &mdash;&mdash;&mdash;&mdash;'
      },
      {
        type: 'number',
        label: 'B',
        key: 'b',
        input: true,
        inputType: 'text',
        multiple: true,
        prefix: '+',
        validate: {
          min: 2,
          max: 100,
          step: 1
        }
      },
      {
        type: 'textfield',
        label: 'Total',
        key: 'total',
        input: true,
        inputType: 'text',
        disabled: true,
        calculateValue: {
          "*": [
            {"_sum": {var: 'data.a'}},
            {"_sum": {var: 'data.b'}}
          ]
        }
      }
    ]
  });
  </script>
  </div>
  </div>
</div>

