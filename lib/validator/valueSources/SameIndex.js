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
import _ from 'lodash';
import { ValueSource } from './ValueSource';
var SameIndexValueSource = /** @class */ (function (_super) {
    __extends(SameIndexValueSource, _super);
    function SameIndexValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SameIndexValueSource, "name", {
        get: function () {
            return 'same';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SameIndexValueSource, "title", {
        get: function () {
            return 'Same As For This Component';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SameIndexValueSource, "weight", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    SameIndexValueSource.prototype.getValue = function () {
        var pathForRowIndex = this.options.pathForRowIndex;
        var indexes = this.targetComponentInstance.getRowIndexes();
        return _.get(indexes, pathForRowIndex, -1);
    };
    return SameIndexValueSource;
}(ValueSource));
export { SameIndexValueSource };
