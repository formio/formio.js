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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import { boolValue, superGet, superSet } from '../../utils/utils';
import Field from '../_classes/field/Field';
var SurveyComponent = /** @class */ (function (_super) {
    __extends(SurveyComponent, _super);
    function SurveyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurveyComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
                type: 'survey',
                label: 'Survey',
                key: 'survey',
                questions: [],
                values: []
            }], extend));
    };
    Object.defineProperty(SurveyComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Survey',
                group: 'advanced',
                icon: 'list',
                weight: 110,
                documentation: 'http://help.form.io/userguide/#survey',
                schema: SurveyComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SurveyComponent.prototype, "defaultSchema", {
        get: function () {
            return SurveyComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('survey'));
    };
    SurveyComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { input: 'multiple' });
        var superAttach = _super.prototype.attach.call(this, element);
        this.refs.input.forEach(function (input) {
            if (_this.disabled) {
                input.setAttribute('disabled', 'disabled');
            }
            else {
                _this.addEventListener(input, 'change', function () { return _this.updateValue(null, {
                    modified: true
                }); });
            }
        });
        this.setValue(this.dataValue);
        return superAttach;
    };
    SurveyComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            return false;
        }
        _.each(this.component.questions, function (question) {
            _.each(_this.refs.input, function (input) {
                if (input.name === _this.getInputName(question)) {
                    input.checked = (input.value === value[question.value]);
                }
            });
        });
        return this.updateValue(value, flags);
    };
    Object.defineProperty(SurveyComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.getValue = function () {
        var _this = this;
        if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var value = {};
        _.each(this.component.questions, function (question) {
            _.each(_this.refs.input, function (input) {
                if (input.checked && (input.name === _this.getInputName(question))) {
                    value[question.value] = input.value;
                    return false;
                }
            });
        });
        return value;
    };
    Object.defineProperty(SurveyComponent.prototype, "disabled", {
        get: function () {
            return superGet(Field, 'disabled', this);
        },
        set: function (disabled) {
            superSet(Field, 'disabled', this, disabled);
            _.each(this.refs.input, function (input) {
                input.disabled = true;
            });
        },
        enumerable: false,
        configurable: true
    });
    SurveyComponent.prototype.validateRequired = function (setting, value) {
        if (!boolValue(setting)) {
            return true;
        }
        return this.component.questions.reduce(function (result, question) {
            return result && Boolean(value[question.value]);
        }, true);
    };
    SurveyComponent.prototype.getInputName = function (question) {
        return this.options.name + "[" + question.value + "]";
    };
    SurveyComponent.prototype.getValueAsString = function (value, options) {
        var _this = this;
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <thead>\n            <tr>\n              <th>Question</th>\n              <th>Value</th>\n            </tr>\n          </thead>\n          <tbody>\n      ");
            _.forIn(value, function (value, key) {
                var question = _.find(_this.component.questions, ['value', key]);
                var answer = _.find(_this.component.values, ['value', value]);
                if (!question || !answer) {
                    return;
                }
                result_1 += ("\n            <tr>\n              <td style=\"text-align:center;padding: 5px 10px;\">" + question.label + "</td>\n              <td style=\"text-align:center;padding: 5px 10px;\">" + answer.label + "</td>\n            </tr>\n          ");
            });
            result_1 += '</tbody></table>';
            return result_1;
        }
        return _super.prototype.getValueAsString.call(this, value, options);
    };
    return SurveyComponent;
}(Field));
export default SurveyComponent;
