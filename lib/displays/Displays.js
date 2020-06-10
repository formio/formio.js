import _ from 'lodash';
import pdf from './pdf/PDF';
import webform from './webform/Webform';
import wizard from './wizard/Wizard';
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
        pdf: pdf,
        webform: webform,
        wizard: wizard,
    };
    return Displays;
}());
export default Displays;
