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
import Component from '../_classes/component/Component';
var UnknownComponent = /** @class */ (function (_super) {
    __extends(UnknownComponent, _super);
    function UnknownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnknownComponent.schema = function () {
        return {
            type: 'custom',
            key: 'custom',
            protected: false,
            persistent: true
        };
    };
    Object.defineProperty(UnknownComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Custom',
                icon: 'cubes',
                group: 'premium',
                documentation: 'https://help.form.io/userguide/form-components/#custom',
                weight: 120,
                schema: UnknownComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnknownComponent.prototype, "defaultSchema", {
        get: function () {
            return UnknownComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    return UnknownComponent;
}(Component));
export default UnknownComponent;
