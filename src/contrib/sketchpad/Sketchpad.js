import Field from './../../components/_classes/field/Field';
import _ from 'lodash';

export default class Sketchpad extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'sketchpad',
      label: 'Sketchpad',
      key: 'sketchpad',
      defaultZoom: 100
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Sketchpad',
      group: 'advanced',
      icon: 'image',
      weight: 110,
      documentation: 'http://help.form.io/userguide/', //TODO add documentation link
      schema: Sketchpad.schema()
    };
  }

  get templateName() {
    return 'sketchpad';
  }
}
