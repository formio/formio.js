import templates from './index';
import _ from 'lodash';

export default class Templates {
  static get templates() {
    if (!Templates._templates) {
      Templates._templates = templates;
    }
    return Templates._templates;
  }

  static set current(templates) {
    const defaultTemplates = Templates.current;
    Templates._current = _.merge(defaultTemplates, templates);
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
