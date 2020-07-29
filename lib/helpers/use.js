import { Formio } from '../Formio';
import { Templates } from '../templates';
import { Components } from '../components';
import { Providers } from '../providers';
import { Displays } from '../displays';
import { Builders } from '../builders';
import { Conjunctions, Operators, QuickRules, Rules, Transformers, ValueSources } from '../validator';
var registerPlugin = function (plugin) {
    // Sanity check.
    if (typeof plugin !== 'object') {
        return;
    }
    for (var _i = 0, _a = Object.keys(plugin); _i < _a.length; _i++) {
        var key = _a[_i];
        var current = plugin.framework || Templates.framework || 'bootstrap';
        switch (key) {
            case 'options':
                Formio.options = plugin.options;
                break;
            case 'templates':
                for (var _b = 0, _c = Object.keys(plugin.templates); _b < _c.length; _b++) {
                    var framework = _c[_b];
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
                for (var _d = 0, _e = Object.keys(plugin.fetch); _d < _e.length; _d++) {
                    var name_1 = _e[_d];
                    Formio.registerPlugin(plugin.fetch[name_1], name_1);
                }
                break;
            case 'providers':
                for (var _f = 0, _g = Object.keys(plugin.providers); _f < _g.length; _f++) {
                    var type = _g[_f];
                    Providers.addProviders(type, plugin.providers[type]);
                }
                break;
            case 'displays':
                Displays.addDisplays(plugin.displays);
                break;
            case 'builders':
                Builders.addBuilders(plugin.builders);
                break;
            case 'conjunctions':
                Conjunctions.addConjunctions(plugin.conjunctions);
                break;
            case 'operators':
                Operators.addOperators(plugin.operators);
                break;
            case 'quickRules':
                QuickRules.addQuickRules(plugin.quickRules);
                break;
            case 'rules':
                Rules.addRules(plugin.rules);
                break;
            case 'transformers':
                Transformers.addTransformers(plugin.transformers);
                break;
            case 'valueSources':
                ValueSources.addValueSources(plugin.valueSources);
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
export default function () {
    var plugins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        plugins[_i] = arguments[_i];
    }
    plugins.forEach(function (plugin) {
        if (Array.isArray(plugin)) {
            plugin.forEach(function (p) { return registerPlugin(p); });
        }
        else {
            registerPlugin(plugin);
        }
    });
}
