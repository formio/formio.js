import _ from 'lodash';
import { PDF } from './pdf/PDF';
import { Webform } from './webform/Webform';
import { Wizard } from './wizard/Wizard';
export class Displays {
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
Displays.displays = {
    pdf: PDF,
    webform: Webform,
    wizard: Wizard,
};
