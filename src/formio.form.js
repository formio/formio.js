import _ from 'lodash';
import { Formio } from './Formio';
import AllComponents from './components';
import Components from './components/Components';
import Displays from './displays/Displays';
import Templates from './templates/Templates';
import Providers from './providers';
import Widgets from './widgets';
import Form from './Form';
import Utils from './utils';
import Evaluator from './utils/Evaluator';
import Licenses from './licenses';
import EventEmitter from './EventEmitter';
import Webform from './Webform';

Formio.loadModules = (path = `${Formio.getApiUrl()  }/externalModules.js`, name = 'externalModules') => {
  Formio.requireLibrary(name, name, path, true)
    .then((modules) => {
      Formio.use(modules);
    });
};

// This is needed to maintain correct imports using the "dist" file.
Formio.isRenderer = true;
Formio.Components = Components;
Formio.Templates = Templates;
Formio.Utils = Utils;
Formio.Form = Form;
Formio.Displays = Displays;
Formio.Providers = Providers;
Formio.Widgets = Widgets;
Formio.Evaluator = Evaluator;
Formio.AllComponents = AllComponents;
Formio.Licenses = Licenses;

// This is strange, but is needed for "premium" components to import correctly.
Formio.Formio = Formio;

Formio.Components.setComponents(AllComponents);

/**
 * Register a module
 * @param {any} mod - The module object to register. This can also be a function which accepts Formio as an argument.
 * @param {Function|null} [defaultFn] - The default function to call if the module does not have a known key.
 * @param {any} options - Options for the module.
 * @returns {void}
 */
export function registerModule(mod, defaultFn = null, options = {}) {
  if (typeof mod === 'function') {
    return registerModule(mod(Formio), defaultFn, options);
  }
  if (typeof mod !== 'object') {
    return;
  }
  for (const key of Object.keys(mod)) {
    const current = mod.framework || Formio.Templates.framework || 'bootstrap';
    switch (key) {
      case 'options':
        Formio.options = _.merge(Formio.options, mod.options);
        break;
      case 'templates':
        for (const framework of Object.keys(mod.templates)) {
          Formio.Templates.extendTemplate(framework, mod.templates[framework]);
        }
        if (mod.templates[current]) {
          Formio.Templates.current = mod.templates[current];
        }
        break;
      case 'components':
        Formio.Components.setComponents(mod.components);
        break;
      case 'framework':
        Formio.Templates.framework = mod.framework;
        break;
      case 'fetch':
        for (const name of Object.keys(mod.fetch)) {
          Formio.registerPlugin(mod.fetch[name], name);
        }
        break;
      case 'providers':
        for (const type of Object.keys(mod.providers)) {
          Formio.Providers.addProviders(type, mod.providers[type]);
        }
        break;
      case 'displays':
        Formio.Displays.addDisplays(mod.displays);
        break;
      case 'evaluator':
        Formio.Evaluator.registerEvaluator(mod.evaluator);
        break;
      case 'library':
        options.license
          ? Formio.Licenses.addLicense(mod.library, options.license)
          : Formio.Licenses.removeLicense(mod.library);
        break;
      default:
        if (defaultFn) {
          if (!defaultFn(key, mod)) {
            console.warn('Unknown module option', key);
          }
          break;
        }
        console.log('Unknown module option', key);
    }
  }
}

/**
 * @param {Function|null} defaultFn - The default function to call if the module does not have a known key.
 * @returns {void}
 */
export function useModule(defaultFn = null) {
  return (plugins, options = {}) => {
    plugins = _.isArray(plugins) ? plugins : [plugins];

    plugins.forEach((plugin) => {
      if (Array.isArray(plugin)) {
        plugin.forEach(p => registerModule(p, defaultFn, options));
      }
      else {
        registerModule(plugin, defaultFn, options);
      }
    });
  };
}

/**
 * Allows passing in plugins as an array of plugins or a single plugin.
 *
 * Formio.plugins(plugin1, options);
 * Formio.plugins([plugin1, plugin2, etc], options);
 */
Formio.use = useModule();

// Export the components.
export { Components, Displays, Providers, Widgets, Templates, Utils, Form, Formio, Licenses, EventEmitter, Webform };
