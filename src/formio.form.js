import _ from 'lodash';
import Formio from './Formio';
import AllComponents from './components';
import Builders from './builders/Builders';
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
Formio.Builders = Builders;
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

// This is strange, but is needed for "premium" components to import correctly.
Formio.Formio = Formio;

Formio.Components.setComponents(AllComponents);
const registerPlugin = (plugin) => {
  // Sanity check.
  if (typeof plugin !== 'object') {
    return;
  }
  for (const key of Object.keys(plugin)) {
    const current = plugin.framework || Formio.Templates.framework || 'bootstrap';
    switch (key) {
      case 'options':
        Formio.options = _.merge(Formio.options, plugin.options);
        break;
      case 'templates':
        for (const framework of Object.keys(plugin.templates)) {
          Formio.Templates.extendTemplate(framework, plugin.templates[framework]);
        }
        if (plugin.templates[current]) {
          Formio.Templates.current = plugin.templates[current];
        }
        break;
      case 'components':
        Formio.Components.setComponents(plugin.components);
        break;
      case 'framework':
        Formio.Templates.framework = plugin.framework;
        break;
      case 'fetch':
        for (const name of Object.keys(plugin.fetch)) {
          Formio.registerPlugin(plugin.fetch[name], name);
        }
        break;
      case 'providers':
        for (const type of Object.keys(plugin.providers)) {
          Formio.Providers.addProviders(type, plugin.providers[type]);
        }
        break;
      case 'displays':
        Formio.Displays.addDisplays(plugin.displays);
        break;
      case 'builders':
        Formio.Builders.addBuilders(plugin.builders);
        break;
      case 'rules':
        Formio.Rules.addRules(plugin.rules);
        break;
      case 'evaluator':
        Formio.Evaluator.registerEvaluator(plugin.evaluator);
        break;
      case 'conjunctions':
        Formio.Conjunctions.addConjunctions(plugin.conjunctions);
        break;
      case 'operators':
        Formio.Operators.addOperators(plugin.operators);
        break;
      case 'quickRules':
        Formio.QuickRules.addQuickRules(plugin.quickRules);
        break;
      case 'transformers':
        Formio.Transformers.addTransformers(plugin.transformers);
        break;
      case 'valueSources':
        Formio.ValueSources.addValueSources(plugin.valueSources);
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

// Export the components.
export { Builders, Components, Displays, Providers, Rules, Widgets, Templates, Conjunctions, Operators, QuickRules, Transformers, ValueSources, Utils, Form, Formio };
