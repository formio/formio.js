# Form Utilities
## Usage
Here is how to use this library within your application

```js
import { Formio } from 'formiojs';
import FormioUtils from 'formiojs/utils';

let formio = new Formio('https://examples.form.io/example');
formio.loadForm().then((form) => {
  FormioUtils.eachComponent(form.components, (component) => {
    console.log(component);
  });
});
```

## Functions

### eachComponent(components, fn, includeAll, path)

Calls `fn(component)` for each component in `components`, accounting for nested layout components. (Does not call for layout components themselves, unless includeAll is true).

The current data path of the element. Example: data.user.firstName

```javascript
var utils = require('formiojs/utils');
utils.eachComponent(form.components, function(component) {
  // Do something...
})
```

### getComponent(components, key)

Returns the component with the given `key` or undefined if not found.

```javascript
var utils = require('formiojs/utils');
var component = utils.getComponent(form.components, 'myKey');
```

### findComponents(components, query)
Returns an array of components that match the find query criteria. This query is very similar to MongoDB where if you wish to find a nested query, you would provide the key as the path of the property using dot notation. Here is an example.

```javascript
// Find all textfields with a specific custom property.
var utils = require('formiojs/utils');
var comps = utils.findComponents(form.components, {
  'type': 'textfield',
  'properties.objectId': '2345'
});

// Should return all textfield components with 'properties.objectId' = '2345'.
console.log(comps);
```

### flattenComponents(components, includeAll)

Returns an key-value object where the keys are the keys for each component in `components` and each key points to the corresponding component. This includes nested components as well. Pass true for includeAll if you want to include layout components.

```javascript
var utils = require('formiojs/utils');
var flattened = utils.flattenComponents(form.components);
console.log(flattened['myNestedComponent']);
```

### isLayoutComponent(component)

Determine if a component is a layout component.

```javascript
var utils = require('formiojs/utils');
var layoutComponent = utils.isLayoutComponent(form.components[0]);
console.log(layoutComponent);
```

### getValue(submission, componentKey)

Get the value for a components API key, from the given submission. Recursively searches the submission for the key.

```javascript
var utils = require('formiojs/utils');
var value = utils.getValue(submission, 'myComponent'); // The value or undefined.
```

### parseFloat(value)

Extension of standard [parseFloat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseFloat) function, that also clears input string.
Useful for [Currency component](https://help.form.io/userguide/form-components/#currency).

```javascript
utils.parseFloat('12,345,678.90'); // -> 12345678.90
```

### formatAsCurrency(value)

Formats provided value in way how [Currency component](https://help.form.io/userguide/form-components/#currency) uses it.

```javascript
utils.formatAsCurrency(123.4); // -> '123.40'
utils.formatAsCurrency(12345678.9); // -> '12,345,678.90'
utils.formatAsCurrency(12345678.915); // -> '12,345,678.92'
utils.formatAsCurrency('12345678.915'); // -> '12,345,678.92'
```

### escapeRegExCharacters(value)

Escapes RegEx characters in provided String value.

```javascript
utils.escapeRegExCharacters('[form.io](https://form.io/)'); // -> '\[form\.io\]\(https:\/\/form\.io\)'
```
