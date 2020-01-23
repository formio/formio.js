import Component from '../component/Component';

export default class Field extends Component {
  render(element) {
    if (this.noField) {
      return super.render(element);
    }
    else {
      return super.render(this.renderTemplate('field', {
        labelMarkup: this.renderTemplate('label'),
        element: element,
      }));
    }
  }
}
