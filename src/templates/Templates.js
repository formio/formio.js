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
    Templates._current = templates;
  }

  static get current() {
    if (Templates._current) {
      return Templates._current;
    }
    return Templates.templates.bootstrap;
  }

  static set templateName(template) {
    if (Templates.templates.hasOwnProperty(template)) {
      Templates._current = Templates.templates[template];
    }
  }
}
