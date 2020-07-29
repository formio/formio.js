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
var ThisComponentValueSource = /** @class */ (function (_super) {
    __extends(ThisComponentValueSource, _super);
    function ThisComponentValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ThisComponentValueSource, "name", {
        get: function () {
            return 'thisComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThisComponentValueSource, "title", {
        get: function () {
            return 'This Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ThisComponentValueSource, "weight", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    ThisComponentValueSource.prototype.getValue = function () {
        return this.targetComponentInstance;
    };
    return ThisComponentValueSource;
}(ValueSource));
export { ThisComponentValueSource };
