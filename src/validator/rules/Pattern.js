import Rule from './Rule';

export default class Pattern extends Rule {
  defaultMessage = '{{field}} does not match the pattern {{settings.pattern}}';

  check(value) {
    const { pattern } = this.settings;

    if (!pattern) {
      return true;
    }

    return (new RegExp(`^${pattern}$`)).test(value);
  }
}
