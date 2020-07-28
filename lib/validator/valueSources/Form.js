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
import { ValueSource } from './ValueSource';
var FormValueSource = /** @class */ (function (_super) {
    __extends(FormValueSource, _super);
    function FormValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(FormValueSource, "name", {
        get: function () {
            return 'form';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormValueSource, "title", {
        get: function () {
            return 'Form';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormValueSource, "weight", {
        get: function () {
            return 300;
        },
        enumerable: false,
        configurable: true
    });
    FormValueSource.prototype.getValue = function () {
        return this.formInstance;
    };
    return FormValueSource;
}(ValueSource));
export { FormValueSource };
