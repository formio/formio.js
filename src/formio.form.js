// Keep lodash off the global scope.
import _ from 'lodash';
_.noConflict();

import AllComponents from './components';
import Components from './components/Components';
import Formio from './Formio';
Components.setComponents(AllComponents);

const registerPlugin = (plugin) => {
  // Sanity check.
  if (typeof plugin !== 'object') {
    return;
  }
  for (const key of Object.keys(plugin)) {
    switch (key) {
      case 'options':
        Formio.options = _.merge(Formio.options, plugin.options);
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

Formio.Components = Components;
export Form from './Form';
export Utils from './utils';
export { Components, Formio };
