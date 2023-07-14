import _ from 'lodash';
import pdf from '../PDFBuilder';
import webform from '../WebformBuilder';
import wizard from '../WizardBuilder';

export default class Builders {
  static builders = {
    pdf,
    webform,
    wizard,
  };

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
