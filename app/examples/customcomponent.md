---
title: Custom Components
layout: vtabs
section: examples
weight: 19
lib: builder
---
The Form.io renderer allows for the creation of Custom components. These can be created by extending the base components within Form.io and then registering them within the core renderer. This can be done as follows.

For a full example of creating your own module that does this, please see the [Contributed Components](https://github.com/formio/contrib) repository. Here is an example of what a custom component looks like.

<a class="btn btn-primary" target="_blank" href="https://github.com/formio/contrib">Go to Contributed Components Repo</a>

```js
/**
 * This file shows how to create a custom component and register that within an Angular application.
 *
 * Get the base component class by referencing Formio.Components.components map.
 */
import { Components } from 'formiojs';
const FieldComponent = (Components as any).components.field;
import editForm from './CheckMatrix.form';

/**
 * Here we will derive from the base component which all Form.io form components derive from.
 *
 * @param component
 * @param options
 * @param data
 * @constructor
 */
export default class CheckMatrix extends (FieldComponent as any) {
  public checks: Array<Array<any>>;
  constructor(component, options, data) {
    super(component, options, data);
    this.checks = [];
  }

  static schema() {
    return FieldComponent.schema({
      type: 'checkmatrix',
      numRows: 3,
      numCols: 3
    });
  }

  public static editForm = editForm;

  static builderInfo = {
    title: 'Check Matrix',
    group: 'basic',
    icon: 'fa fa-table',
    weight: 70,
    documentation: 'http://help.form.io/userguide/#table',
    schema: CheckMatrix.schema()
  }

  get tableClass() {
    let tableClass = 'table ';
    ['striped', 'bordered', 'hover', 'condensed'].forEach((prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    return tableClass;
  }

  renderCell(row, col) {
    return this.renderTemplate('input', {
      input: {
        type: 'input',
        ref: `${this.component.key}-${row}`,
        attr: {
          id: `${this.component.key}-${row}-${col}`,
          class: 'form-control',
          type: 'checkbox',
        }
      }
    });
  }

  public render(children) {
    return super.render(this.renderTemplate('checkmatrix', {
      tableClass: this.tableClass,
      renderCell: this.renderCell.bind(this)
    }));
  }

  /**
   * After the html string has been mounted into the dom, the dom element is returned here. Use refs to find specific
   * elements to attach functionality to.
   *
   * @param element
   * @returns {Promise}
   */
  attach(element) {
    const refs = {};

    for (let i = 0; i < this.component.numRows; i++) {
      refs[`${this.component.key}-${i}`] = 'multiple';
    }

    this.loadRefs(element, refs);

    this.checks = [];
    for (let i = 0; i < this.component.numRows; i++) {
      this.checks[i] = Array.prototype.slice.call(this.refs[`${this.component.key}-${i}`], 0);

      // Attach click events to each input in the row
      this.checks[i].forEach(input => {
        this.addEventListener(input, 'click', () => this.updateValue())
      });
    }

    // Allow basic component functionality to attach like field logic and tooltips.
    return super.attach(element);
  }

  /**
   * Get the value of the component from the dom elements.
   *
   * @returns {Array}
   */
  getValue() {
    var value = [];
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      value[rowIndex] = [];
      for (var colIndex in row) {
        var col = row[colIndex];
        value[rowIndex][colIndex] = !!col.checked;
      }
    }
    return value;
  }

  /**
   * Set the value of the component into the dom elements.
   *
   * @param value
   * @returns {boolean}
   */
  setValue(value) {
    if (!value) {
      return;
    }
    for (var rowIndex in this.checks) {
      var row = this.checks[rowIndex];
      if (!value[rowIndex]) {
        break;
      }
      for (var colIndex in row) {
        var col = row[colIndex];
        if (!value[rowIndex][colIndex]) {
          return false;
        }
        let checked = value[rowIndex][colIndex] ? 1 : 0;
        col.value = checked;
        col.checked = checked;
      }
    }
  }
}
```

These modules will then be compiled into a Module file that can either be imported within your own application, or using ```<script>``` tags in the browser like the following.

```js
import { Formio } from 'formiojs';
import YourModule from './yourmodule';
Formio.use(YourModule);
```

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<script src="./contrib/YourModule.js"></script>
<script type="text/javascript">
    Formio.use(YourModule);
</script>
```

As an example, you can import the Contributed Components into your application using the following.

```html
<link rel="stylesheet" href="https://unpkg.com/formiojs@latest/dist/formio.full.min.css">
<script src="https://unpkg.com/formiojs@latest/dist/formio.full.min.js"></script>
<script src="https://unpkg.com/@formio/contrib@latest/dist/formio-contrib.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@formio/contrib@latest/dist/formio-contrib.css">
<script type="text/javascript">
    Formio.use(FormioContrib);
</script>
<div class="card card-body bg-light">
  <div id="builder"></div>
</div>
<h4>Rendered Form</h4>
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>
<h4>Submission Data</h4>
<div class="card card-body bg-light jsonviewer">
  <pre id="json"></pre>
</div>
<script type="text/javascript">
  Formio.builder(document.getElementById('builder'), {}, {
    builder: {
      basic: false,
      advanced: false,
      data: false,
      layout: false,
      customBasic: {
        title: 'Basic Components',
        default: true,
        weight: 0,
        components: {
          checkmatrix: true
        }
      }
    }
  }).then(function(builder) {
    Formio.createForm(document.getElementById('formio'), {}).then(function(instance) {
      var json = document.getElementById('json');
      instance.on('change', function() {
        json.innerHTML = '';
        json.appendChild(document.createTextNode(JSON.stringify(instance.submission, null, 4)));
      });
      builder.on('change', function(schema) {
        if (schema.components) {
          instance.form = schema;
        }
      });
    });
  });
</script>
```

<h3>Result</h3>
<script src="https://unpkg.com/@formio/contrib@latest/dist/formio-contrib.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@formio/contrib@latest/dist/formio-contrib.css">
<script type="text/javascript">
    Formio.use(FormioContrib);
</script>
<div class="card card-body bg-light">
  <div id="builder"></div>
</div>
<h4>Rendered Form</h4>
<div class="card card-body bg-light">
  <div id="formio"></div>
</div>
<h4>Submission Data</h4>
<div class="card card-body bg-light jsonviewer">
  <pre id="json"></pre>
</div>
<script type="text/javascript">
  Formio.builder(document.getElementById('builder'), {}, {
    builder: {
      basic: false,
      advanced: false,
      data: false,
      layout: false,
      customBasic: {
        title: 'Basic Components',
        default: true,
        weight: 0,
        components: {
          checkmatrix: true
        }
      }
    }
  }).then(function(builder) {
    Formio.createForm(document.getElementById('formio'), {...builder.form, components: [...builder.form.components]}).then(function(instance) {
      var json = document.getElementById('json');
      instance.on('change', function() {
        json.innerHTML = '';
        json.appendChild(document.createTextNode(JSON.stringify(instance.submission, null, 4)));
      });
      builder.on('change', function(schema) {
        if (schema.components) {
          instance.form = {...schema, components: [...schema.components]};
        }
      });
    });
  });
</script>
