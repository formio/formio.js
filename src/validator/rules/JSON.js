import Rule from './Rule';

export default class JSON extends Rule {
	defaultMessage = '{{error}}';

	check(value, data, row, index) {
		const { json } = this.settings;

		if (!json) {
			return true;
		}

		const valid = this.component.evaluate(json, {
			data,
			row,
			rowIndex: index,
			input: value,
		});

		if (valid === null) {
			return true;
		}

		return valid;
	}
}
