import ConditionOperator from './ConditionOperator';
import _ from 'lodash';
import { getItemTemplateKeys, isSelectResourceWithObjectValue } from '../utils';

export default class IsEqualTo extends ConditionOperator {
	static get operatorKey() {
		return 'isEqual';
	}

	static get displayedName() {
		return 'Is Equal To';
	}

	execute({ value, comparedValue, instance, conditionComponentPath }) {
		if (
			value &&
			comparedValue &&
			typeof value !== typeof comparedValue &&
			_.isString(comparedValue)
		) {
			try {
				comparedValue = JSON.parse(comparedValue);
			} catch (e) {
				// eslint-disable-next-line no-empty
			}
		}

		if (instance && instance.root) {
			const conditionTriggerComponent = instance.root.getComponent(
				conditionComponentPath,
			);

			if (
				conditionTriggerComponent &&
				isSelectResourceWithObjectValue(conditionTriggerComponent.component) &&
				conditionTriggerComponent.component?.template
			) {
				if (!value || !_.isPlainObject(value)) {
					return false;
				}

				const { template, valueProperty } = conditionTriggerComponent.component;

				if (valueProperty === 'data') {
					value = { data: value };
					comparedValue = { data: comparedValue };
				}

				return _.every(getItemTemplateKeys(template) || [], (k) =>
					_.isEqual(_.get(value, k), _.get(comparedValue, k)),
				);
			}
		}

		//special check for select boxes
		if (
			_.isObject(value) &&
			comparedValue &&
			_.isBoolean(value[comparedValue])
		) {
			return value[comparedValue];
		}

		return _.isEqual(value, comparedValue);
	}
}
