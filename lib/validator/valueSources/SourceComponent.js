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
var SourceComponentValueSource = /** @class */ (function (_super) {
    __extends(SourceComponentValueSource, _super);
    function SourceComponentValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SourceComponentValueSource, "name", {
        get: function () {
            return 'sourceComponent';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentValueSource, "title", {
        get: function () {
            return 'Source Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SourceComponentValueSource, "weight", {
        get: function () {
            return 200;
        },
        enumerable: false,
        configurable: true
    });
    SourceComponentValueSource.prototype.getValue = function () {
        return this.sourceComponentInstance;
    };
    return SourceComponentValueSource;
}(ValueSource));
export { SourceComponentValueSource };
