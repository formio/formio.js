import _ from 'lodash';
var BaseEntity = /** @class */ (function () {
    function BaseEntity(context) {
        if (context === void 0) { context = {}; }
        this.context = context;
    }
    Object.defineProperty(BaseEntity, "name", {
        get: function () {
            throw new Error('Getter #name() is abstract.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity, "title", {
        get: function () {
            throw new Error('Getter #title() is abstract.');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "options", {
        get: function () {
            var _a;
            return (_a = this.context.options) !== null && _a !== void 0 ? _a : {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "engineOptions", {
        get: function () {
            var _a;
            return (_a = this.context.engineOptions) !== null && _a !== void 0 ? _a : {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "targetComponentInstance", {
        get: function () {
            return this.getRequiredOption('targetComponentInstance');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "sourceComponentInstance", {
        get: function () {
            return this.getRequiredOption('sourceComponentInstance');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseEntity.prototype, "formInstance", {
        get: function () {
            return this.getRequiredOption('formInstance');
        },
        enumerable: false,
        configurable: true
    });
    BaseEntity.prototype.getOption = function (name) {
        var _a;
        return (_a = this.options[name]) !== null && _a !== void 0 ? _a : null;
    };
    BaseEntity.prototype.getRequiredOption = function (name) {
        var _a = this.options, _b = name, option = _a[_b];
        if (_.isNil(option)) {
            throw new Error("'" + name + "' is not defined.");
        }
        return option;
    };
    return BaseEntity;
}());
export { BaseEntity };
