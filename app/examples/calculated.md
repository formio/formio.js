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
      type: 'textfield',
      label: 'A',
      key: 'a',
      input: true,
      inputType: 'text',
      defaultValue: '10'
    },
    {
      type: 'textfield',
      label: 'B',
      key: 'b',
      input: true,
      inputType: 'text',
      customDefaultValue: 'value = 20;'
    },
    {
      type: 'textfield',
      label: 'Multiple',
      key: 'multiple',
      input: true,
      inputType: 'text',
      customDefaultValue: {
        "+": [
          {var: 'data.a'},
          {var: 'data.b'}
        ]
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
          {
            "+": [
              {var: 'data.a'},
              {var: 'data.b'}
            ]
          },
          {var: 'data.multiple'}
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
        type: 'textfield',
        label: 'A',
        key: 'a',
        input: true,
        inputType: 'text',
        defaultValue: '10'
      },
      {
        type: 'textfield',
        label: 'B',
        key: 'b',
        input: true,
        inputType: 'text',
        customDefaultValue: 'value = 20;'
      },
      {
        type: 'textfield',
        label: 'Multiplier',
        key: 'multiplier',
        input: true,
        inputType: 'text',
        customDefaultValue: {
          "+": [
            {var: 'data.a'},
            {var: 'data.b'}
          ]
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
            {
              "+": [
                {var: 'data.a'},
                {var: 'data.b'}
              ]
            },
            {var: 'data.multiplier'}
          ]
        }
      }
    ]
  });
  </script>
  </div>
  </div>
</div>

