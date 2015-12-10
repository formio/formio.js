# Plugin API

Formio.js can register plugins that can hook into request calls in several ways.

## Plugin methods

### Formio.registerPlugin(plugin, [name])

Registers a plugin with Formio.js. An optional name parameter can be provided to be used with Formio.getPlugin().

A plugin must be an object, and can have any of the following optional properties:

 - `priority`: The priority of the plugin relative to other plugins that determines call order. Higher numbers have higher priority.
 - `init`: An initialization function called when registered with Formio. It will receive the global Formio object as its first parameter.

See [below](#plugin-hooks) on using hooks in your plugin.

### Formio.getPlugin(name)

Returns the plugin registered with the given name.

### Formio.events

This is an [EventEmitter](https://nodejs.org/api/events.html) that you may use as an event publish/subscribe system in your plugins.

## Plugin hooks

Plugins can provide hooks that are invoked at different points in the library. To use a particular hook below, add a function to your plugin with the same name as the hook.

The following are the currently available hooks.

### preRequest(requestArgs)

Called before a request. If you return a promise, Formio.js will wait for it to resolve before starting the request.

`requestArgs` is an object that contains the following properties:

 - `formio`: The Formio instance calling the request.
 - `type`: The type of resource being requested (ex: form, forms, submission).
 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.
 - `opts`: Any opts given to the request

### request(requestArgs)

Called before a request, and gives plugins a chance fulfill the request before it is sent. If you return a non-null, non-undefined value (or a promise that resolves to one), that will be used as the results of the request instead of making the default network request.

Only the first highest priority that returns a value will replace the contents. Your plugin's hook will not be called if a higher priority plugin returns a value.

`requestArgs` is an object that contains the following properties:

 - `formio`: The Formio instance calling the request.
 - `type`: The type of resource being requested (ex: form, forms, submission).
 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.
 - `opts`: Any opts given to the request

### wrapRequestPromise(promise, requestArgs)

Called when a request is made and gives plugins access to the promise that is returned when a user makes a request. The promise that is returned from this hook will be returned to the user. You may wrap the original promise or extend the promise chain with this hook. (You must return a promise that uses the original promise, or the promise returned to users will not resolve as expected).

`promise` is the promise of the request.

`requestArgs` is an object that contains the following properties:

 - `formio`: The Formio instance calling the request.
 - `type`: The type of resource being requested (ex: form, forms, submission).
 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.
 - `opts`: Any opts given to the request

### preStaticRequest(requestArgs)

Same as `preRequest` hook but used for requests that use the global Formio object instead of a Formio instance. This includes functions like `Formio.loadProjects()`, `Formio.availableActions()`, `Formio.currentUser()`.

`requestArgs` is an object that contains the following properties:

 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.

### staticRequest(requestArgs)

Same as `request` hook but used for requests that use the global Formio object instead of a Formio instance. This includes functions like `Formio.loadProjects()`, `Formio.availableActions()`, `Formio.currentUser()`.

`requestArgs` is an object that contains the following properties:

 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.

### wrapStaticRequestPromise(promise, requestArgs)

Same as `wrapRequestPromise` hook but used for requests that use the global Formio object instead of a Formio instance. This includes functions like `Formio.loadProjects()`, `Formio.availableActions()`, `Formio.currentUser()`.

`promise` is the promise of the request.

`requestArgs` is an object that contains the following properties:

 - `url`: The url being requested.
 - `method`: The HTTP request method.
 - `data`: The HTTP request body, if any.

## Example Plugin

This example plugin will delay all requests by 5 seconds

```javascript
var DelayPlugin = {
  priority: 0,
  preRequest: function(requestArgs) {
    return new Promise(function(resolve, reject){
      setTimeout(resolve, 5000);
    })
  }
}

Formio.registerPlugin(DelayPlugin, 'delay');
// Can later access with
// Formio.getPlugin('delay')
```
