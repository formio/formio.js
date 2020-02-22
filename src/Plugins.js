/**
 * @module Plugins
 */
import NativePromise from 'native-promise-only';
import { isNil } from 'lodash';

export function noop() {}
export function identity(value) {
  return value;
}

let plugins = [];
export function getPlugins() {
  return plugins;
}

/**
 * @memberof Plugins
 */
export function deregisterPlugin(Formio, plugin) {
  const beforeLength = plugins.length;
  plugins = plugins.filter((p) => {
    if (p !== plugin && p.__name !== plugin) {
      return true;
    }

    (p.deregister || noop).call(plugin, Formio);
    return false;
  });
  return beforeLength !== plugins.length;
}

/**
 * Registers a plugin with Formio.js. An optional name parameter can be provided to be used with {@link Formio.getPlugin}.
 *
 * @memberof Plugins
 */
export function registerPlugin(Formio, plugin, name) {
  plugins.push(plugin);
  plugins.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  plugin.__name = name;
  (plugin.init || noop).call(plugin, Formio);
}

/**
 * @memberof Plugins
 */
export function getPlugin(name) {
  for (const plugin of plugins) {
    if (plugin.__name === name) {
      return plugin;
    }
  }

  return null;
}

/**
 * @memberof Plugins
 */
export function pluginWait(pluginFn, ...args) {
  return NativePromise.all(plugins.map((plugin) =>
    (plugin[pluginFn] || noop).call(plugin, ...args)));
}

/**
 * @memberof Plugins
 */
export function pluginGet(pluginFn, ...args) {
  const callPlugin = (index) => {
    const plugin = plugins[index];

    if (!plugin) {
      return NativePromise.resolve(null);
    }

    return NativePromise.resolve((plugin[pluginFn] || noop).call(plugin, ...args))
      .then((result) => {
        if (!isNil(result)) {
          return result;
        }

        return callPlugin(index + 1);
      });
  };
  return callPlugin(0);
}

/**
 * @memberof Plugins
 */
export function pluginAlter(pluginFn, value, ...args) {
  return plugins.reduce((value, plugin) =>
    (plugin[pluginFn] || identity)(value, ...args), value);
}
