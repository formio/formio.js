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
import { Webform } from '../../displays/webform/Webform';
import BuilderUtils from '../../utils/builder';
import WebformBuilder from '../webform/WebformBuilder';
var WizardBuilder = /** @class */ (function (_super) {
    __extends(WizardBuilder, _super);
    function WizardBuilder() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        // Reset skipInit in case PDFBuilder has set it.
        options.skipInit = false;
        _this = _super.call(this, element, options) || this;
        _this._form = {
            components: [
                _this.getPageConfig(1),
            ],
        };
        _this.page = 0;
        _this.options.hooks.attachPanel = function (element, component) {
            if (component.refs.removeComponent) {
                _this.addEventListener(component.refs.removeComponent, 'click', function () {
                    var pageIndex = _this.pages.findIndex(function (page) { return page.key === component.key; });
                    var componentIndex = _this._form.components.findIndex(function (comp) { return comp.key === component.key; });
                    if (pageIndex !== -1) {
                        _this.removePage(pageIndex, componentIndex);
                    }
                });
            }
        };
        var originalRenderComponentsHook = _this.options.hooks.renderComponents;
        _this.options.hooks.renderComponents = function (html, _a) {
            var components = _a.components, self = _a.self;
            if (self.type === 'form' && !self.root) {
                return html;
            }
            else {
                return originalRenderComponentsHook(html, { components: components, self: self });
            }
        };
        var originalAttachComponentsHook = _this.options.hooks.attachComponents;
        _this.options.hooks.attachComponents = function (element, components, container, component) {
            if (component.type === 'form' && !component.root) {
                return element;
            }
            return originalAttachComponentsHook(element, components, container, component);
        };
        // Wizard pages don't replace themselves in the right array. Do that here.
        _this.on('saveComponent', function (component, originalComponent) {
            var webformComponents = _this.webform.components.map(function (_a) {
                var component = _a.component;
                return component;
            });
            if (_this._form.components.includes(originalComponent)) {
                _this._form.components[_this._form.components.indexOf(originalComponent)] = component;
                _this.rebuild();
            }
            else if (webformComponents.includes(originalComponent)) {
                _this._form.components.push(component);
                _this.rebuild();
            }
            else {
                // Fallback to look for panel based on key.
                var formComponentIndex = _this._form.components.findIndex(function (comp) { return originalComponent.key === comp.key; });
                if (formComponentIndex !== -1) {
                    _this._form.components[formComponentIndex] = component;
                    _this.rebuild();
                }
            }
        }, true);
        return _this;
    }
    WizardBuilder.prototype.allowDrop = function (element) {
        return (this.webform && this.webform.refs && this.webform.refs.webform === element) ? false : true;
    };
    Object.defineProperty(WizardBuilder.prototype, "pages", {
        get: function () {
            return _.filter(this._form.components, { type: 'panel' });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "currentPage", {
        get: function () {
            var pages = this.pages;
            return (pages && (pages.length >= this.page)) ? pages[this.page] : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (value) {
            this._form = value;
            if (!this._form.components || !Array.isArray(this._form.components)) {
                this._form.components = [];
            }
            if (this.pages.length === 0) {
                var components = this._form.components.filter(function (component) { return component.type !== 'button'; });
                this._form.components = [this.getPageConfig(1, components)];
            }
            this.rebuild();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "schema", {
        get: function () {
            _.assign(this.currentPage, this.webform._form.components[0]);
            var webform = new Webform(this.options);
            webform.setForm(this._form, { noEmit: true });
            return webform.schema;
        },
        enumerable: false,
        configurable: true
    });
    WizardBuilder.prototype.render = function () {
        var _this = this;
        return this.renderTemplate('builderWizard', {
            sidebar: this.renderTemplate('builderSidebar', {
                scrollEnabled: this.sideBarScroll,
                groupOrder: this.groupOrder,
                groupId: "builder-sidebar-" + this.id,
                groups: this.groupOrder.map(function (groupKey) { return _this.renderTemplate('builderSidebarGroup', {
                    group: _this.groups[groupKey],
                    groupKey: groupKey,
                    groupId: "builder-sidebar-" + _this.id,
                    subgroups: _this.groups[groupKey].subgroups.map(function (group) { return _this.renderTemplate('builderSidebarGroup', {
                        group: group,
                        groupKey: group.key,
                        groupId: "builder-sidebar-" + groupKey,
                        subgroups: []
                    }); }),
                }); }),
            }),
            pages: this.pages,
            form: this.webform.render(),
        });
    };
    WizardBuilder.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, {
            addPage: 'multiple',
            gotoPage: 'multiple',
        });
        this.refs.addPage.forEach(function (link) {
            _this.addEventListener(link, 'click', function (event) {
                event.preventDefault();
                _this.addPage();
            });
        });
        this.refs.gotoPage.forEach(function (link, index) {
            _this.addEventListener(link, 'click', function (event) {
                event.preventDefault();
                _this.setPage(index);
            });
        });
        return _super.prototype.attach.call(this, element);
    };
    WizardBuilder.prototype.rebuild = function () {
        var _a;
        var page = this.currentPage;
        this.webform.form = {
            display: 'form',
            type: 'form',
            components: page ? [page] : [],
            settings: (_a = this.form.settings) !== null && _a !== void 0 ? _a : {},
        };
        return this.redraw();
    };
    WizardBuilder.prototype.addPage = function () {
        var pageNum = (this.pages.length + 1);
        var newPage = this.getPageConfig(pageNum);
        BuilderUtils.uniquify(this._form.components, newPage);
        this._form.components.push(newPage);
        this.emit('saveComponent', newPage, this._form.components);
        this.emit('change', this._form);
        return this.rebuild();
    };
    WizardBuilder.prototype.removePage = function (pageIndex, componentIndex) {
        this._form.components.splice(componentIndex, 1);
        this.emit('change', this._form);
        if (pageIndex === this.pages.length) {
            // If the last page is removed.
            if (pageIndex === 0) {
                this._form.components.push(this.getPageConfig(1));
                return this.rebuild();
            }
            else {
                return this.setPage(pageIndex - 1);
            }
        }
        else {
            return this.rebuild();
        }
    };
    WizardBuilder.prototype.setPage = function (index) {
        if (index === this.page) {
            return Promise.resolve();
        }
        this.page = index;
        return this.rebuild();
    };
    WizardBuilder.prototype.getPageConfig = function (index, components) {
        if (components === void 0) { components = []; }
        return {
            title: "Page " + index,
            label: "Page " + index,
            type: 'panel',
            key: "page" + index,
            components: components,
        };
    };
    WizardBuilder.prototype.pasteComponent = function (component) {
        if (component instanceof WizardBuilder) {
            return;
        }
        return _super.prototype.pasteComponent.call(this, component);
    };
    WizardBuilder.prototype.getComponents = function () {
        return this.pages;
    };
    return WizardBuilder;
}(WebformBuilder));
export default WizardBuilder;
