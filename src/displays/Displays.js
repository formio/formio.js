import _ from 'lodash';
import pdf from './pdf/PDF';
import webform from './webform/Webform';
import wizard from './wizard/Wizard';

export class Displays {
  static displays = {
    pdf,
    webform,
    wizard,
  };

  static addDisplay(name, display) {
    Displays.displays[name] = display;
  }

  static addDisplays(displays) {
    Displays.displays = _.merge(Displays.displays, displays);
  }

  static getDisplay(name) {
    return Displays.displays[name];
  }

  static getDisplays() {
    return Displays.displays;
  }
}
