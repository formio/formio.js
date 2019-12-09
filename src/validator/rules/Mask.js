import { getInputMask, matchInputMask } from '../../utils/utils';

const Rule = require('./Rule');

module.exports = class Mask extends Rule {
  defaultMessage = '{{field}} does not match the mask.';

  check(value) {
    let inputMask;
    if (this.component.isMultipleMasksField) {
      const maskName = value ? value.maskName : undefined;
      const formioInputMask = this.component.getMaskByName(maskName);
      if (formioInputMask) {
        inputMask = getInputMask(formioInputMask);
      }
      value = value ? value.value : value;
    }
    else {
      inputMask = getInputMask(this.settings.mask);
    }
    if (value && inputMask) {
      return matchInputMask(value, inputMask);
    }
    return true;
  }
};
