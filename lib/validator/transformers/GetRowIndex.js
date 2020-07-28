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
import { Transformer } from './Transformer';
var GetRowIndexTransformer = /** @class */ (function (_super) {
    __extends(GetRowIndexTransformer, _super);
    function GetRowIndexTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetRowIndexTransformer, "name", {
        get: function () {
            return 'getRowIndex';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetRowIndexTransformer, "title", {
        get: function () {
            return 'Get Row Index';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetRowIndexTransformer, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Component',
                    dataSrc: 'custom',
                    data: {
                        custom: function (_a) {
                            var instance = _a.instance;
                            return instance.root.arrayDataComponents;
                        },
                    },
                    valueProperty: 'path',
                    dataType: 'string',
                    template: '<span>{{ item.component.label || item.component.key }} ({{ item.component.key }})</span>',
                    key: 'component',
                    type: 'select',
                    input: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    GetRowIndexTransformer.prototype.transform = function (value, args, opts) {
        var _a, _b, _c, _d;
        var component = opts.component;
        if (!component) {
            return (_a = value === null || value === void 0 ? void 0 : value.rowIndex) !== null && _a !== void 0 ? _a : null;
        }
        var rowIndexes = (_c = (_b = value === null || value === void 0 ? void 0 : value.getRowIndexes) === null || _b === void 0 ? void 0 : _b.call(value)) !== null && _c !== void 0 ? _c : {};
        return (_d = rowIndexes[component]) !== null && _d !== void 0 ? _d : null;
    };
    return GetRowIndexTransformer;
}(Transformer));
export { GetRowIndexTransformer };
