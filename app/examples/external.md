---
title: External Sources & Conditional Selects
layout: vtabs
section: examples
weight: 230
---
The Select component allows you to connect to external data sources as well as perform look ahead searching within that data source.

### Conditional Selects
In addition, you can also make each of the selects conditional based on the values provided from previous select lists. For example, you could set up a Make + Model select dropdown selection, where the Model is dependent on the Make selection. This can be done with the following JSON configurations.

```js
Formio.createForm(document.getElementById('formio'), {
  components: [{
    type: 'editgrid',
    label: 'Cars',
    key: 'cars',
    defaultOpen: true,
    removeRow: 'Cancel',
    components: [
      {
        type: 'select',
        label: 'Make',
        key: 'make',
        placeholder: 'Select your make',
        dataSrc: 'values',
        validate: {
          required: true
        },
        data: {
          values: [
            {
              label: 'Chevy',
              value: 'chevrolet'
            },
            {
              value: 'honda',
              label: 'Honda'
            },
            {
              label: 'Ford',
              value: 'ford'
            },
            {
              label: 'Toyota',
              value: 'toyota'
            }
          ]
        }
      },
      {
        type: 'select',
        label: 'Model',
        key: 'model',
        placeholder: 'Select your model',
        dataSrc: 'url',
        data: {
          url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{% raw %}{{ row.make }}{% endraw %}?format=json'
        },
        valueProperty: 'Model_Name',
        template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
        refreshOn: 'make',
        clearOnRefresh: true,
        selectValues: 'Results',
        validate: {
          required: true
        }
      }
    ]
  }]
});
```

<h3>Result</h3>
<div class='card card-body bg-light'>
<div id='formio'></div>
<script type='text/javascript'>
Formio.createForm(document.getElementById('formio'), {
  components: [{
    type: 'editgrid',
    label: 'Cars',
    key: 'cars',
    defaultOpen: true,
    removeRow: 'Cancel',
    components: [
      {
        type: 'select',
        label: 'Make',
        key: 'make',
        placeholder: 'Select your make',
        dataSrc: 'values',
        validate: {
          required: true
        },
        data: {
          values: [
            {
              label: 'Chevy',
              value: 'chevrolet'
            },
            {
              value: 'honda',
              label: 'Honda'
            },
            {
              label: 'Ford',
              value: 'ford'
            },
            {
              label: 'Toyota',
              value: 'toyota'
            }
          ]
        }
      },
      {
        type: 'select',
        label: 'Model',
        key: 'model',
        placeholder: 'Select your model',
        dataSrc: 'url',
        data: {
          url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{% raw %}{{ row.make }}{% endraw %}?format=json'
        },
        valueProperty: 'Model_Name',
        template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
        refreshOn: 'make',
        clearOnRefresh: true,
        selectValues: 'Results',
        validate: {
          required: true
        }
      }
    ]
  }, {
    type: 'button',
    action: 'submit',
    label: 'Submit',
    theme: 'primary',
    key: 'submit'
  }]
});
</script>
</div>
