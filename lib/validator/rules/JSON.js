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
var Rule = require('./Rule');
module.exports = /** @class */ (function (_super) {
    __extends(JSON, _super);
    function JSON() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{error}}';
        return _this;
    }
    JSON.prototype.check = function (value, data, row, index) {
        var json = this.settings.json;
        if (!json) {
            return true;
        }
        var valid = this.component.evaluate(json, {
            data: data,
            row: row,
            rowIndex: index,
            input: value
        });
        if (valid === null) {
            return true;
        }
        return valid;
    };
    return JSON;
}(Rule));
