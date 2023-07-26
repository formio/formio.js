import _ from 'lodash';
import { Formio } from './Formio';
import AllComponents from './components';
import Components from './components/Components';
import Displays from './displays/Displays';
import Templates from './templates/Templates';
import Providers from './providers';
import Rules from './validator/Rules';
import Conjunctions from './validator/conjunctions';
import Operators from './validator/operators';
import QuickRules from './validator/quickRules';
import Transformers from './validator/transformers';
import ValueSources from './validator/valueSources';
import Widgets from './widgets';
import Form from './Form';
import Utils from './utils';
import Evaluator from './utils/Evaluator';

Formio.loadModules = (path = `${Formio.getApiUrl()  }/externalModules.js`, name = 'externalModules') => {
  Formio.requireLibrary(name, name, path, true)
    .then((modules) => {
      Formio.use(modules);
    });
};

// This is needed to maintain correct imports using the "dist" file.
Formio.Components = Components;
Formio.Templates = Templates;
Formio.Utils = Utils;
Formio.Form = Form;
Formio.Displays = Displays;
Formio.Providers = Providers;
Formio.Rules = Rules;
Formio.Widgets = Widgets;
Formio.Evaluator = Evaluator;
Formio.Conjunctions = Conjunctions;
Formio.Operators = Operators;
Formio.QuickRules = QuickRules;
Formio.Transformers = Transformers;
Formio.ValueSources = ValueSources;
Formio.AllComponents = AllComponents;

// This is strange, but is needed for "premium" components to import correctly.
Formio.Formio = Formio;

Formio.Components.setComponents(AllComponents);

/**
 * Register a module
 * @param {*} plugin
 * @returns
 */
export function registerModule(mod, defaultFn = null) {
  // Sanity check.
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
      case 'rules':
        Formio.Rules.addRules(mod.rules);
        break;
      case 'evaluator':
        Formio.Evaluator.registerEvaluator(mod.evaluator);
        break;
      case 'conjunctions':
        Formio.Conjunctions.addConjunctions(mod.conjunctions);
        break;
      case 'operators':
        Formio.Operators.addOperators(mod.operators);
        break;
      case 'quickRules':
        Formio.QuickRules.addQuickRules(mod.quickRules);
        break;
      case 'transformers':
        Formio.Transformers.addTransformers(mod.transformers);
        break;
      case 'valueSources':
        Formio.ValueSources.addValueSources(mod.valueSources);
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

export function useModule(defaultFn = null) {
  return (...plugins) => {
    plugins.forEach((plugin) => {
      if (Array.isArray(plugin)) {
        plugin.forEach(p => registerModule(p, defaultFn));
      }
      else {
        registerModule(plugin, defaultFn);
      }
    });
  };
}

/**
 * Allows passing in plugins as multiple arguments or an array of plugins.
 *
 * Formio.plugins(plugin1, plugin2, etc);
 * Formio.plugins([plugin1, plugin2, etc]);
 */
Formio.use = useModule();

// Export the components.
export { Components, Displays, Providers, Rules, Widgets, Templates, Conjunctions, Operators, QuickRules, Transformers, ValueSources, Utils, Form, Formio };
