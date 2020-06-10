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
import SelectComponent from '../select/Select';
var ResourceComponent = /** @class */ (function (_super) {
    __extends(ResourceComponent, _super);
    function ResourceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return SelectComponent.schema.apply(SelectComponent, __spreadArrays([{
                type: 'resource',
                label: 'Resource',
                key: 'resource',
                dataSrc: 'resource',
                resource: '',
                project: '',
                template: '<span>{{ item.data }}</span>',
            }], extend));
    };
    Object.defineProperty(ResourceComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Resource',
                group: 'premium',
                icon: 'files-o',
                weight: 90,
                documentation: 'http://help.form.io/userguide/#resource',
                schema: ResourceComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    ResourceComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.component.dataSrc = 'resource';
        this.component.data = {
            resource: this.component.resource,
        };
    };
    Object.defineProperty(ResourceComponent.prototype, "defaultSchema", {
        get: function () {
            return ResourceComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    return ResourceComponent;
}(SelectComponent));
export default ResourceComponent;
