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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { EventEmitter2 } from 'eventemitter2';
import * as utils from './utils/utils';
var EventEmitter = /** @class */ (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter(conf) {
        if (conf === void 0) { conf = {}; }
        var _this = this;
        var _a = conf.loadLimit, loadLimit = _a === void 0 ? 1000 : _a, _b = conf.eventsSafeInterval, eventsSafeInterval = _b === void 0 ? 300 : _b, ee2conf = __rest(conf, ["loadLimit", "eventsSafeInterval"]);
        _this = _super.call(this, ee2conf) || this;
        var overloadHandler = function () {
            console.warn("There were more than " + loadLimit + " events emitted in " + eventsSafeInterval + " ms. It might be caused by events' infinite loop", _this.id);
        };
        var dispatch = utils.observeOverload(overloadHandler, {
            limit: loadLimit,
            delay: eventsSafeInterval
        });
        _this.emit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.emit.apply(_this, args);
            dispatch();
        };
        return _this;
    }
    return EventEmitter;
}(EventEmitter2));
export default EventEmitter;
