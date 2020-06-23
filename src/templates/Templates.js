import templates from './index';
import _ from 'lodash';
import Formio from '../module';

export default class Templates {
  static get templates() {
    if (!Templates._templates) {
      Templates._templates = templates;
    }
    return Templates._templates;
  }

  static addTemplate(name, template) {
    Templates.templates[name] = template;
  }

  static extendTemplate(name, template) {
    Templates.templates[name] = _.merge({}, Templates.templates[name], template);
  }

  static setTemplate(name, template) {
    Templates.addTemplate(name, template);
  }

  static set current(templates) {
    const defaultTemplates = Templates.current;
    Templates._current = _.merge({}, defaultTemplates, templates);
  }

  static get current() {
    if (Templates._current) {
      return Templates._current;
    }

    return Templates.defaultTemplates;
  }

  static get defaultTemplates() {
    return Templates.templates.bootstrap;
  }

  static set framework(framework) {
    if (Templates.templates.hasOwnProperty(framework)) {
      Templates._framework = framework;
      Templates._current = Templates.templates[framework];
    }
  }

  static get framework() {
    return Templates._framework;
  }
}

// Add a plugin type for templates.
Formio.addPluginType('templates', (plugin) => {
  const current = plugin.framework || Templates.framework || 'bootstrap';
  for (const framework of Object.keys(plugin.templates)) {
    Templates.extendTemplate(framework, plugin.templates[framework]);
  }
  if (plugin.templates[current]) {
    Templates.current = plugin.templates[current];
  }
});

Formio.addPluginType('framework', (plugin) => (Templates.framework = plugin.framework));
