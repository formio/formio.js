import Component from '../component/Component';

export default class Field extends Component {
  render(element) {
    if (this.noField) {
      return super.render(element);
    }
    else {
      return super.render(this.renderTemplate('field', {
        label: this.labelInfo,
        element: element
      }));
    }
  }
}
