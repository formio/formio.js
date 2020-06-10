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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Component from '../component/Component';
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function (element) {
        if (this.noField) {
            return _super.prototype.render.call(this, element);
        }
        else if (this.isAdvancedLabel) {
            return _super.prototype.render.call(this, this.renderTemplate('field', __assign(__assign({}, this.getLabelInfo()), { labelMarkup: this.renderTemplate('label'), element: element }), 'align'));
        }
        else {
            return _super.prototype.render.call(this, this.renderTemplate('field', {
                labelMarkup: this.renderTemplate('label'),
                element: element,
            }));
        }
    };
    return Field;
}(Component));
export default Field;
