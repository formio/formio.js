import AllComponents from './components';
import Builders from './builders/Builders';
import Components from './components/Components';
import Displays from './displays/Displays';
import Templates from './templates/Templates';
import Providers from './providers';
import Rules from './validator/Rules';
import Widgets from './widgets';
import Formio from './Formio';
import Form from './Form';
import Utils from './utils';
Components.setComponents(AllComponents);
const registerPlugin = (plugin) => {
  // Sanity check.
  if (typeof plugin !== 'object') {
    return;
  }
  for (const key of Object.keys(plugin)) {
    const current = plugin.framework || Templates.framework || 'bootstrap';
    switch (key) {
      case 'options':
        Formio.options = plugin.options;
        break;
      case 'templates':
        for (const framework of Object.keys(plugin.templates)) {
          Templates.extendTemplate(framework, plugin.templates[framework]);
        }
        if (plugin.templates[current]) {
          Templates.current = plugin.templates[current];
        }
        break;
      case 'components':
        Components.setComponents(plugin.components);
        break;
      case 'framework':
        Templates.framework = plugin.framework;
        break;
      case 'fetch':
        for (const name of Object.keys(plugin.fetch)) {
          Formio.registerPlugin(plugin.fetch[name], name);
        }
        break;
      case 'providers':
        for (const type of Object.keys(plugin.providers)) {
          Providers.addProviders(type, plugin.providers[type]);
        }
        break;
      case 'displays':
        Displays.addDisplays(plugin.displays);
        break;
      case 'builders':
        Builders.addBuilders(plugin.builders);
        break;
      case 'rules':
        Rules.addRules(plugin.rules);
        break;
      default:
        console.log('Unknown plugin option', key);
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

// This is needed to maintain correct imports using the "dist" file.
Formio.Components = Components;
Formio.Templates = Templates;
Formio.Builders = Builders;
Formio.Utils = Utils;
Formio.Form = Form;
Formio.Displays = Displays;
Formio.Providers = Providers;
Formio.Rules = Rules;
Formio.Widgets = Widgets;

// This is strange, but is needed for "premium" components to import correctly.
Formio.Formio = Formio;

// Export the components.
export { Builders, Components, Displays, Providers, Rules, Widgets, Templates, Utils, Form, Formio };
