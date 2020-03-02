Form.io incorporates the amazing [Choices.js](https://github.com/jshjohnson/Choices) library to be used as a Select control,
but also has the ability to render raw HTML select dropdowns. Below are some examples of different configurations for 
Select dropdowns.

<script type="text/javascript">
var createSelectForm = function(element, select) {
  window.addEventListener('load', function() {
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
  });
};
</script>

## Single Select
Single Select allows you to select only a single item at a time.

<div class="row">
  <div class="col col-8">
  
```javascript
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
      template: "<span>{{ item.label }}</span>",
      input: true
    }
  ]
});
```  

  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="single-select"></div>
        </div>
    </div>
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
          template: "<span>{{ item.label }}</span>",
          input: true
        });
    </script>
    
  </div>
</div>

## JSON Values
This option provides a way to pass in JSON values to the select dropdown.

<div class="row">
  <div class="col col-8">
  
```javascript
Formio.createForm(document.getElementById('json-values'), {
  components: [
    {
      type: "select",
      label: "Select JSON",
      key: "selectjson",
      placeholder: "Select one",
      data: {
        json: `[
          {"value":"a","label":"A"},
          {"value":"b","label":"B"},
          {"value":"c","label":"C"},
          {"value":"d","label":"D"}
        ]`
      },
      dataSrc: "json",
      template: "<span>{{ item.label }}</span>",
      input: true
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="json-values"></div>
        </div>
    </div>
    <script type="text/javascript">
      createSelectForm('json-values', {
        type: "select",
        label: "Select JSON",
        key: "selectjson",
        placeholder: "Select one",
        data: {
          json: `[
            {"value":"a","label":"A"},
            {"value":"b","label":"B"},
            {"value":"c","label":"C"},
            {"value":"d","label":"D"}
          ]`
        },
        dataSrc: "json",
        template: "<span>{{ item.label }}</span>",
        input: true
      });
    </script>
  </div>
</div>

## Multi-Select
This option provides a way to select more than one item at a time, and provides a nice interface to visualize those selected and remove them if needed.

<div class="row">
  <div class="col col-8">
  
```javascript
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
      template: "<span>{{ item.label }}</span>",
      multiple: true,
      input: true
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="multi-select"></div>
        </div>
    </div>
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
        template: "<span>{{ item.label }}</span>",
        multiple: true,
        input: true
      });
    </script>
  </div>
</div>

## External Source
This option provides a way to attach a Select dropdown to an external API data source, and have those values populate the dropdowns that can be selected.

<div class="row">
  <div class="col col-8">
  
```javascript 
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
      template: '<span>{{ item.Model_Name }}</span>',
      selectValues: 'Results'
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="url-select"></div>
        </div>
    </div>
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
        template: '<span>{{ item.Model_Name }}</span>',
        selectValues: 'Results'
      });
    </script>
  </div>
</div>

## Infinite Scroll
When using the Resource or URL type of select fields, this option will automatically paginate the URL as they user is scrolling down the select list. this is commonly referred to as <strong>Infinite Scroll</strong>. When using the Resource component, this will automatically work, but for URL type of selects, you can add tokens {{ limit }}, {{ skip }}, or {{ page }} to pass to your URL.

<div class="row">
  <div class="col col-8">
  
```javascript
Formio.createForm(document.getElementById('lazy-load'), {
  components: [
    {
      type: 'select',
      label: 'Companies',
      key: 'companies',
      placeholder: 'Select a company',
      dataSrc: 'url',
      data: {
        url: 'https://example.form.io/company/submission?limit={{ limit }}&skip={{ skip }}'
      },
      limit: 10,
      valueProperty: 'data.name',
      searchField: 'data.name__regex',
      lazyLoad: true,
      template: '<span>{{ item.data.name }}</span>'
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="infinite-scroll"></div>
        </div>
    </div>
    <script type="text/javascript">
      createSelectForm('infinite-scroll', {
        type: 'select',
        label: 'Companies',
        key: 'companies',
        placeholder: 'Select a company',
        dataSrc: 'url',
        data: {
          url: 'https://example.form.io/company/submission?limit={{ limit }}&skip={{ skip }}'
        },
        limit: 10,
        valueProperty: 'data.name',
        searchField: 'data.name',
        lazyLoad: true,
        template: '<span>{{ item.data.name }}</span>'
      });
    </script>
  </div>
</div>

## Lazy Loading
Using the <strong>lazyLoad</strong> parameter, you can tell a remote select dropdown to only load the choices when someone clicks on it. This is great for forms that have many select dropdowns that refer to external url's where you do not wish to load all of the select dropdowns upfront.

<div class="row">
  <div class="col col-8">
  
```javascript
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
      template: '<span>{{ item.Model_Name }}</span>',
      selectValues: 'Results'
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="lazy-load"></div>
        </div>
    </div>
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
        template: '<span>{{ item.Model_Name }}</span>',
        selectValues: 'Results'
      });
    </script>
  </div>
</div>

## Lazy Loading Default
When using Lazy Loading, you can also provide a <strong>Search Query Name</strong> to your form. Whenever a value is provided to the component, it will fire off an API call with the Search Query Name provided (which should only return a single record). This will allow you to populate the correct label of the item that is selected without loading all the items. Then when they click on the control, all options are loaded dynamically.

<div class="row">
  <div class="col col-8">
  
```javascript
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
      searchField: 'data.email__regex',
      lazyLoad: true,
      template: '<span>{{ item.data.firstName }} {{ item.data.lastName }}</span>'
    }
  ]
}).then(function(form) {
  form.submission = {
    data: {
      customer: 'joe@example.com'
    }
  };
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="lazy-load2"></div>
        </div>
    </div>
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
        template: '<span>{{ item.data.firstName }} {{ item.data.lastName }}</span>'
      }).then(function(form) {
        form.submission = {
          data: {
            customer: 'joe@example.com'
          }
        };
      });
    </script>
  </div>
</div>

## HTML5 Widget
Using the <strong>widget</strong> parameter, you can use the regular HTML5 select widget over the Choices.js widget.

<div class="row">
  <div class="col col-8">
  
```javascript
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
      template: "<span>{{ item.label }}</span>",
      input: true
    }
  ]
});
```
  
  </div>
  <div class="col col-4">
    <div class="card">
        <div class="card-header">
            Example
        </div>
        <div class="card-body">
            <div id="html5-select"></div>
        </div>
    </div>
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
        template: "<span>{{ item.label }}</span>",
        input: true
      });
    </script>
  </div>
</div>
