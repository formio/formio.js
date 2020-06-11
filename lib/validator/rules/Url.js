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
var Url = /** @class */ (function (_super) {
    __extends(Url, _super);
    function Url() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} must be a valid url.';
        return _this;
    }
    Url.prototype.check = function (value) {
        /* eslint-disable max-len */
        // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        var re = /(https?:\/\/(?:www\.|(?!www)))?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
        /* eslint-enable max-len */
        // Allow urls to be valid if the component is pristine and no value is provided.
        return !value || re.test(value);
    };
    return Url;
}(Rule));
export { Url };
;
