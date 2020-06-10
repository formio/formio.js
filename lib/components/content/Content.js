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
import Component from '../_classes/component/Component';
import _ from 'lodash';
var ContentComponent = /** @class */ (function (_super) {
    __extends(ContentComponent, _super);
    function ContentComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component.schema.apply(Component, __spreadArrays([{
                label: 'Content',
                type: 'content',
                key: 'content',
                input: false,
                html: ''
            }], extend));
    };
    Object.defineProperty(ContentComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Content',
                group: 'layout',
                icon: 'html5',
                preview: false,
                documentation: 'http://help.form.io/userguide/#content-component',
                weight: 5,
                schema: ContentComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "defaultSchema", {
        get: function () {
            return ContentComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "content", {
        get: function () {
            if (this.builderMode) {
                return this.component.html;
            }
            var submission = _.get(this.root, 'submission', {});
            return this.component.html ? this.interpolate(this.component.html, {
                metadata: submission.metadata || {},
                submission: submission,
                data: this.rootValue,
                row: this.data
            }) : '';
        },
        enumerable: false,
        configurable: true
    });
    ContentComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('html', {
            tag: 'div',
            attrs: [],
            content: this.content,
        }));
    };
    ContentComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { html: 'single' });
        if (this.component.refreshOnChange) {
            this.on('change', function () {
                if (_this.refs.html) {
                    _this.setContent(_this.refs.html, _this.content);
                }
            }, true);
        }
        return _super.prototype.attach.call(this, element);
    };
    Object.defineProperty(ContentComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    return ContentComponent;
}(Component));
export default ContentComponent;
