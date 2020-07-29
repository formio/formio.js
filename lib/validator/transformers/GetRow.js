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
var GetRowTransformer = /** @class */ (function (_super) {
    __extends(GetRowTransformer, _super);
    function GetRowTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetRowTransformer, "title", {
        get: function () {
            return 'Get Row';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetRowTransformer, "name", {
        get: function () {
            return 'getRow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetRowTransformer, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Component',
                    dataSrc: 'custom',
                    data: {
                        custom: function (_a) {
                            var instance = _a.instance;
                            return instance.root.nestedDataComponents;
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
    GetRowTransformer.prototype.transform = function (value, args, opts) {
        var _a, _b;
        var component = opts.component;
        if (!component) {
            return (_a = value === null || value === void 0 ? void 0 : value.data) !== null && _a !== void 0 ? _a : null;
        }
        var current = value;
        while ((current === null || current === void 0 ? void 0 : current.parent) && (current.parent.path !== component)) {
            current = current.parent;
        }
        return (_b = current === null || current === void 0 ? void 0 : current.data) !== null && _b !== void 0 ? _b : null;
    };
    return GetRowTransformer;
}(Transformer));
export { GetRowTransformer };
