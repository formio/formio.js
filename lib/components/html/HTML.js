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
var HTMLComponent = /** @class */ (function (_super) {
    __extends(HTMLComponent, _super);
    function HTMLComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component.schema.apply(Component, __spreadArrays([{
                label: 'HTML',
                type: 'htmlelement',
                tag: 'p',
                attrs: [],
                content: '',
                input: false,
                persistent: false
            }], extend));
    };
    Object.defineProperty(HTMLComponent, "builderInfo", {
        get: function () {
            return {
                title: 'HTML Element',
                group: 'layout',
                icon: 'code',
                weight: 0,
                documentation: 'http://help.form.io/userguide/#html-element-component',
                schema: HTMLComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTMLComponent.prototype, "defaultSchema", {
        get: function () {
            return HTMLComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTMLComponent.prototype, "content", {
        get: function () {
            if (this.builderMode) {
                return this.component.content;
            }
            var submission = _.get(this.root, 'submission', {});
            return this.component.content ? this.interpolate(this.component.content, {
                metadata: submission.metadata || {},
                submission: submission,
                data: this.rootValue,
                row: this.data
            }) : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTMLComponent.prototype, "singleTags", {
        get: function () {
            return ['br', 'img', 'hr'];
        },
        enumerable: false,
        configurable: true
    });
    HTMLComponent.prototype.checkRefreshOn = function (changed) {
        _super.prototype.checkRefreshOn.call(this, changed);
        if (!this.builderMode && this.component.refreshOnChange && this.element &&
            this.conditionallyVisible(this.data, this.row)) {
            this.setContent(this.element, this.renderContent());
        }
    };
    HTMLComponent.prototype.renderContent = function () {
        var _this = this;
        var submission = _.get(this.root, 'submission', {});
        return this.renderTemplate('html', {
            component: this.component,
            tag: this.component.tag,
            attrs: (this.component.attrs || []).map(function (attr) {
                return {
                    attr: attr.attr,
                    value: _this.interpolate(attr.value, {
                        metadata: submission.metadata || {},
                        submission: submission,
                        data: _this.rootValue,
                        row: _this.data
                    })
                };
            }),
            content: this.content,
            singleTags: this.singleTags,
        });
    };
    HTMLComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderContent());
    };
    HTMLComponent.prototype.attach = function (element) {
        this.loadRefs(element, { html: 'single' });
        return _super.prototype.attach.call(this, element);
    };
    return HTMLComponent;
}(Component));
export default HTMLComponent;
