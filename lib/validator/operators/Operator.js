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
import { BaseCalculatableEntity } from '../BaseCalculatableEntity';
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Operator, "hasComplementaryOperator", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operator, "complementaryOperatorName", {
        get: function () {
            if (!this.hasComplementaryOperator) {
                throw new Error('Complemenraty operator is not allowed.');
            }
            return "not" + _.upperFirst(this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operator, "complementaryOperatorTitle", {
        get: function () {
            if (!this.hasComplementaryOperator) {
                throw new Error('Complemenraty operator is not allowed.');
            }
            return "Not " + this.title;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operator, "complementaryOperator", {
        get: function () {
            if (!this.hasComplementaryOperator) {
                throw new Error('Complemenraty operator is not allowed.');
            }
            var ParentClass = this;
            if (!ParentClass._complementaryOperator) {
                ParentClass._complementaryOperator = /** @class */ (function (_super) {
                    __extends(_complementaryOperator, _super);
                    function _complementaryOperator() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    Object.defineProperty(_complementaryOperator, "name", {
                        get: function () {
                            return ParentClass.complementaryOperatorName;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(_complementaryOperator, "title", {
                        get: function () {
                            return ParentClass.complementaryOperatorTitle;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(_complementaryOperator, "complementaryOperatorName", {
                        get: function () {
                            return ParentClass.name;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(_complementaryOperator, "complementaryOperatorTitle", {
                        get: function () {
                            return ParentClass.title;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    Object.defineProperty(_complementaryOperator, "complementaryOperator", {
                        get: function () {
                            return ParentClass;
                        },
                        enumerable: false,
                        configurable: true
                    });
                    _complementaryOperator.prototype.execute = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return !_super.prototype.execute.apply(this, args);
                    };
                    return _complementaryOperator;
                }(ParentClass));
            }
            return ParentClass._complementaryOperator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Operator, "lazyArgsEvaluation", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line no-unused-vars
    Operator.prototype.execute = function (args, opts) {
        throw new Error('Method #transform() is abstract.');
    };
    return Operator;
}(BaseCalculatableEntity));
export { Operator };
