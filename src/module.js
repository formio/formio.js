import Formio from './Formio';

Formio.pluginTypes = {};
Formio.addPluginType = (key, register) => {
  Formio.pluginTypes[key] = register;
};

const registerPlugin = (plugin) => {
  // Sanity check.
  if (typeof plugin !== 'object') {
    return;
  }
  for (const key of Object.keys(plugin)) {
    if (Formio.pluginTypes.hasOwnProperty(key)) {
      Formio.pluginTypes[key](plugin);
    }
  }
};
/**
 * Allows passing in plugins as multiple arguments or an array of plugins.
 *
 * Formio.plugins(plugin1, plugin2, etc);
 * Formio.plugins([plugin1, plugin2, etc]);
 */
Formio.use = (...plugins) => {
  plugins.forEach((plugin) => {
    if (Array.isArray(plugin)) {
      plugin.forEach(p => registerPlugin(p));
    }
    else {
      registerPlugin(plugin);
    }
  });
};

Formio.loadModules = (path = `${Formio.getApiUrl()  }/externalModules.js`, name = 'externalModules') => {
  Formio.requireLibrary(name, name, path, true)
    .then((modules) => {
      Formio.use(modules);
    });
};

// Add the options plugin.
Formio.addPluginType('options', (plugin) => (Formio.options = plugin.options));

// Add the fetch plugin type.
Formio.addPluginType('fetch', (plugin) => {
  for (const name of Object.keys(plugin.fetch)) {
    Formio.registerPlugin(plugin.fetch[name], name);
  }
});

export default Formio;
