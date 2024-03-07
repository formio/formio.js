import Rule from './Rule';

export default class MinLength extends Rule {
  defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';

  check(value) {
    const minLength = parseInt(this.settings.length, 10);
    if (!minLength || !value || !Object.prototype.hasOwnProperty.call(value, 'length') || this.component.isEmpty(value)) {
      return true;
    }
    return (value.length >= minLength);
  }
}
