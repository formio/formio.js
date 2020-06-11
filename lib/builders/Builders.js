import _ from 'lodash';
import pdf from './pdf/PDFBuilder';
import webform from './webform/WebformBuilder';
import wizard from './wizard/WizardBuilder';
export class Builders {
    static addBuilder(name, builder) {
        Builders.builders[name] = builder;
    }
    static addBuilders(builders) {
        Builders.builders = _.merge(Builders.builders, builders);
    }
    static getBuilder(name) {
        return Builders.builders[name];
    }
    static getBuilders() {
        return Builders.builders;
    }
}
Builders.builders = {
    pdf,
    webform,
    wizard,
};
