import templates from './index';

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

  static set framework(framework) {
    if (Templates.templates.hasOwnProperty(framework)) {
      Templates._framework = framework;
      Templates._current = Templates.templates[framework];
      return true;
    }
    return false;
  }

  static get framework() {
    return Templates._framework;
  }
}
