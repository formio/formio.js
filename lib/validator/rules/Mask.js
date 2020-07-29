var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { getInputMask, matchInputMask } from '../../utils/utils';
import { Rule } from './Rule';
var Mask = /** @class */ (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} does not match the mask.';
        return _this;
    }
    Mask.prototype.check = function (value) {
        var inputMask;
        if (this.component.isMultipleMasksField) {
            var maskName = value ? value.maskName : undefined;
            var formioInputMask = this.component.getMaskByName(maskName);
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
    };
    return Mask;
}(Rule));
export { Mask };
