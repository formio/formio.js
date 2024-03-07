import Rule from './Rule';

export default class MaxLength extends Rule {
	defaultMessage =
		'{{field}} must have no more than {{- settings.length}} characters.';

	check(value) {
		const maxLength = parseInt(this.settings.length, 10);
		if (
			!value ||
			!maxLength ||
			!Object.prototype.hasOwnProperty.call(value, 'length')
		) {
			return true;
		}
		return value.length <= maxLength;
	}
}
