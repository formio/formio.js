---
title: Select Dropdowns
layout: vtabs
section: examples
weight: 200
---
### Select Dropdowns

Form.io incorporates the amazing [Choices.js](https://github.com/jshjohnson/Choices) library to be used as a Select control,
but also has the ability to render raw HTML select dropdowns. Below are some examples of different configurations for 
Select dropdowns.

<script type="text/javascript">
var createSelectForm = function(element, select) {
  return Formio.createForm(document.getElementById(element), {
    components: [
      select
    ]
  }).then(function(form) {
    form.on('change', function(event) {
      console.log(event);
      console.log(form.submission);
    });
    return form;
  });
};
</script>

<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Code</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>Single Select</strong>   
{% highlight js %} 
Formio.createForm(document.getElementById('single-select'), {
  components: [
    {
      type: "select",
      label: "Single Select",
      key: "single",
      placeholder: "Select one",
      data: {
        values: [
          {value: 'apple', label: 'Apple'},
          {value: 'banana', label: 'Banana'},
          {value: 'pear', label: 'Pear'},
          {value: 'orange', label: 'Orange'}
        ]
      },
      dataSrc: "values",
      defaultValue: 'banana',
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      input: true
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="single-select"></div>
        <script type="text/javascript">
          createSelectForm('single-select', {
            type: "select",
            label: "Single Select",
            key: "single",
            placeholder: "Select one",
            data: {
              values: [
                {value: 'apple', label: 'Apple'},
                {value: 'banana', label: 'Banana'},
                {value: 'pear', label: 'Pear'},
                {value: 'orange', label: 'Orange'}
              ]
            },
            dataSrc: "values",
            defaultValue: 'banana',
            template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
            input: true
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>JSON Values</strong>   
{% highlight js %} 
Formio.createForm(document.getElementById('json-values'), {
  components: [
    {
      type: "select",
      label: "Select JSON",
      key: "selectjson",
      placeholder: "Select one",
      data: {
        json: '[{"value":"a","label":"A"},{"value":"b","label":"B"},{"value":"c","label":"C"},{"value":"d","label":"D"}]'
      },
      dataSrc: "json",
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      input: true
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="json-values"></div>
        <script type="text/javascript">
          createSelectForm('json-values', {
            type: "select",
            label: "Select JSON",
            key: "selectjson",
            placeholder: "Select one",
            data: {
              json: '[{"value":"a","label":"A"},{"value":"b","label":"B"},{"value":"c","label":"C"},{"value":"d","label":"D"}]'
            },
            dataSrc: "json",
            template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
            input: true
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Multi-Select</strong>   
{% highlight js %} 
Formio.createForm(document.getElementById('multi-select'), {
  components: [
    {
      type: "select",
      label: "Favorite Things",
      key: "favoriteThings",
      placeholder: "These are a few of your favorite things...",
      data: {
        values: [
          {
            value: "raindropsOnRoses",
            label: "Raindrops on roses"
          },
          {
            value: "whiskersOnKittens",
            label: "Whiskers on Kittens"
          },
          {
            value: "brightCopperKettles",
            label: "Bright Copper Kettles"
          },
          {
            value: "warmWoolenMittens",
            label: "Warm Woolen Mittens"
          }
        ]
      },
      dataSrc: "values",
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      multiple: true,
      input: true
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="multi-select"></div>
        <script type="text/javascript">
          createSelectForm('multi-select', {
            type: "select",
            label: "Favorite Things",
            key: "favoriteThings",
            placeholder: "These are a few of your favorite things...",
            data: {
              values: [
                {
                  value: "raindropsOnRoses",
                  label: "Raindrops on roses"
                },
                {
                  value: "whiskersOnKittens",
                  label: "Whiskers on Kittens"
                },
                {
                  value: "brightCopperKettles",
                  label: "Bright Copper Kettles"
                },
                {
                  value: "warmWoolenMittens",
                  label: "Warm Woolen Mittens"
                }
              ]
            },
            dataSrc: "values",
            template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
            multiple: true,
            input: true
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>External Source</strong>   
{% highlight js %} 
Formio.createForm(document.getElementById('url-select'), {
  components: [
    {
      type: 'select',
      label: 'Model',
      key: 'model',
      placeholder: 'Select your model',
      dataSrc: 'url',
      defaultValue: 'Pilot',
      data: {
        url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json'
      },
      valueProperty: 'Model_Name',
      template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
      selectValues: 'Results'
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="url-select"></div>
        <script type="text/javascript">
          createSelectForm('url-select', {
            type: 'select',
            label: 'Model',
            key: 'model',
            placeholder: 'Select your model',
            dataSrc: 'url',
            defaultValue: 'Pilot',
            data: {
              url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json'
            },
            valueProperty: 'Model_Name',
            template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
            selectValues: 'Results'
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Lazy Loading</strong>  
        <p>Using the <strong>lazyLoad</strong> parameter, you can tell a remote select dropdown to only load the choices 
        when someone clicks on it. This is great for forms that have many select dropdowns that refer to external url's
        where you do not wish to load all of the select dropdowns upfront.</p> 
{% highlight js %} 
Formio.createForm(document.getElementById('lazy-load'), {
  components: [
    {
      type: 'select',
      label: 'Model',
      key: 'model',
      placeholder: 'Select your model',
      dataSrc: 'url',
      defaultValue: 'Pilot',
      data: {
        url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json'
      },
      valueProperty: 'Model_Name',
      lazyLoad: true,
      template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
      selectValues: 'Results'
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="lazy-load"></div>
        <script type="text/javascript">
          createSelectForm('lazy-load', {
            type: 'select',
            label: 'Model',
            key: 'model',
            placeholder: 'Select your model',
            dataSrc: 'url',
            defaultValue: 'Pilot',
            data: {
              url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/honda?format=json'
            },
            valueProperty: 'Model_Name',
            lazyLoad: true,
            template: '<span>{% raw %}{{ item.Model_Name }}{% endraw %}</span>',
            selectValues: 'Results'
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>Lazy Loading Default</strong>  
        <p>When using Lazy Loading, you can also provide a <strong>Search Query Name</strong> to your form. Whenever a value is provided to the component, it will fire off an API call with the Search Query Name provided (which should only return a single record). This will allow you to populate the correct label of the item that is selected without loading all the items. Then when they click on the control, all options are loaded dynamically.</p> 
{% highlight js %} 
Formio.createForm(document.getElementById('lazy-load'), {
  components: [
    {
      type: 'select',
      label: 'Customer',
      key: 'customer',
      placeholder: 'Select a customer',
      dataSrc: 'url',
      data: {
        url: 'https://examples.form.io/customer/submission'
      },
      valueProperty: 'data.email',
      searchField: 'data.email',
      lazyLoad: true,
      template: '<span>{% raw %}{{ item.data.firstName }} {{ item.data.lastName }}{% endraw %}</span>'
    }
  ]
}).then(function(form) {
  form.submission = {
    data: {
      customer: 'joe@example.com'
    }
  };
});
{% endhighlight %}
      </td>
      <td>
        <div id="lazy-load2"></div>
        <script type="text/javascript">
          createSelectForm('lazy-load2', {
            type: 'select',
            label: 'Customer',
            key: 'customer',
            placeholder: 'Select a customer',
            dataSrc: 'url',
            data: {
              url: 'https://examples.form.io/customer/submission'
            },
            valueProperty: 'data.email',
            searchField: 'data.email',
            lazyLoad: true,
            template: '<span>{% raw %}{{ item.data.firstName }} {{ item.data.lastName }}{% endraw %}</span>'
          }).then(function(form) {
            form.submission = {
              data: {
                customer: 'joe@example.com'
              }
            };
          });
        </script>
      </td>
    </tr>
    <tr>
      <td>
        <strong>HTML5 Widget</strong>
        <p>Using the <strong>widget</strong> parameter, you can use the regular HTML5 select widget over the Choices.js widget.</p> 
{% highlight js %} 
Formio.createForm(document.getElementById('html5-select'), {
  components: [
    {
      type: "select",
      label: "Single Select",
      key: "html5select",
      placeholder: "Select one",
      data: {
        values: [
          {value: 'apple', label: 'Apple'},
          {value: 'banana', label: 'Banana'},
          {value: 'pear', label: 'Pear'},
          {value: 'orange', label: 'Orange'}
        ]
      },
      dataSrc: "values",
      defaultValue: 'banana',
      widget: 'html5',
      template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
      input: true
    }
  ]
});
{% endhighlight %}
      </td>
      <td>
        <div id="html5-select"></div>
        <script type="text/javascript">
          createSelectForm('html5-select', {
            type: "select",
            label: "Single Select",
            key: "html5select",
            placeholder: "Select one",
            data: {
              values: [
                {value: 'apple', label: 'Apple'},
                {value: 'banana', label: 'Banana'},
                {value: 'pear', label: 'Pear'},
                {value: 'orange', label: 'Orange'}
              ]
            },
            dataSrc: "values",
            defaultValue: 'banana',
            widget: 'html5',
            template: "<span>{% raw %}{{ item.label }}{% endraw %}</span>",
            input: true
          });
        </script>
      </td>
    </tr>
  </tbody>
</table>
