import _ from 'lodash';
import pdf from './pdf/PDFBuilder';
import webform from './webform/WebformBuilder';
import wizard from './wizard/WizardBuilder';
var Builders = /** @class */ (function () {
    function Builders() {
    }
    Builders.addBuilder = function (name, builder) {
        Builders.builders[name] = builder;
    };
    Builders.addBuilders = function (builders) {
        Builders.builders = _.merge(Builders.builders, builders);
    };
    Builders.getBuilder = function (name) {
        return Builders.builders[name];
    };
    Builders.getBuilders = function () {
        return Builders.builders;
    };
    Builders.builders = {
        pdf: pdf,
        webform: webform,
        wizard: wizard,
    };
    return Builders;
}());
export default Builders;
