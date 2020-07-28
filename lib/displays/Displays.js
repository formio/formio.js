import _ from 'lodash';
import { PDF } from './pdf/PDF';
import { Webform } from './webform/Webform';
import { Wizard } from './wizard/Wizard';
var Displays = /** @class */ (function () {
    function Displays() {
    }
    Displays.addDisplay = function (name, display) {
        Displays.displays[name] = display;
    };
    Displays.addDisplays = function (displays) {
        Displays.displays = _.merge(Displays.displays, displays);
    };
    Displays.getDisplay = function (name) {
        return Displays.displays[name];
    };
    Displays.getDisplays = function () {
        return Displays.displays;
    };
    Displays.displays = {
        pdf: PDF,
        webform: Webform,
        wizard: Wizard,
    };
    return Displays;
}());
export { Displays };
