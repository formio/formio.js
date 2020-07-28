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
import { superGet } from '../../utils/utils';
import NestedComponent from '../_classes/nested/NestedComponent';
var TabsComponent = /** @class */ (function (_super) {
    __extends(TabsComponent, _super);
    function TabsComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.currentTab = 0;
        _this.noField = true;
        return _this;
    }
    TabsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Tabs',
                type: 'tabs',
                input: false,
                key: 'tabs',
                persistent: false,
                tableView: false,
                components: [
                    {
                        label: 'Tab 1',
                        key: 'tab1',
                        components: [],
                    },
                ],
            }], extend));
    };
    Object.defineProperty(TabsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Tabs',
                group: 'layout',
                icon: 'folder-o',
                weight: 50,
                documentation: 'http://help.form.io/userguide/#tabs',
                schema: TabsComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "defaultSchema", {
        get: function () {
            return TabsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "schema", {
        get: function () {
            var _this = this;
            var schema = superGet(NestedComponent, 'schema', this);
            // We need to clone this because the builder uses the "components" reference and this would reset that reference.
            var components = _.cloneDeep(this.component.components);
            schema.components = components.map(function (tab, index) {
                tab.components = _this.tabs[index].map(function (component) { return component.schema; });
                return tab;
            });
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabKey", {
        get: function () {
            return "tab-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabLikey", {
        get: function () {
            return "tabLi-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabLinkKey", {
        get: function () {
            return "tabLink-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    TabsComponent.prototype.init = function () {
        var _this = this;
        this.components = [];
        this.tabs = [];
        _.each(this.component.components, function (tab, index) {
            _this.tabs[index] = [];
            // Initialize empty tabs.
            tab.components = tab.components || [];
            _.each(tab.components, function (comp) {
                var component = _this.createComponent(comp);
                component.tab = index;
                _this.tabs[index].push(component);
            });
        });
    };
    TabsComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('tab', {
            tabKey: this.tabKey,
            tabLikey: this.tabLikey,
            tabLinkKey: this.tabLinkKey,
            currentTab: this.currentTab,
            tabComponents: this.tabs.map(function (tab) { return _this.renderComponents(tab); })
        }, (this.options.flatten || this.options.pdf ? 'flat' : null)));
    };
    TabsComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {}, _a[this.tabLinkKey] = 'multiple', _a[this.tabKey] = 'multiple', _a[this.tabLikey] = 'multiple', _a));
        var superAttach = _super.prototype.attach.call(this, element);
        this.refs[this.tabLinkKey].forEach(function (tabLink, index) {
            _this.addEventListener(tabLink, 'click', function (event) {
                event.preventDefault();
                _this.setTab(index);
            });
        });
        this.refs[this.tabKey].forEach(function (tab, index) {
            _this.attachComponents(tab, _this.tabs[index], _this.component.components[index].components);
        });
        return superAttach;
    };
    TabsComponent.prototype.detach = function (all) {
        _super.prototype.detach.call(this, all);
    };
    /**
     * Set the current tab.
     *
     * @param index
     */
    TabsComponent.prototype.setTab = function (index) {
        var _this = this;
        if (!this.tabs ||
            !this.tabs[index] ||
            !this.refs[this.tabKey] ||
            !this.refs[this.tabKey][index]) {
            return;
        }
        this.currentTab = index;
        _.each(this.refs[this.tabKey], function (tab) {
            _this.removeClass(tab, 'formio-tab-panel-active');
            tab.style.display = 'none';
        });
        this.addClass(this.refs[this.tabKey][index], 'formio-tab-panel-active');
        this.refs[this.tabKey][index].style.display = 'block';
        _.each(this.refs[this.tabLinkKey], function (tabLink, tabIndex) {
            if (_this.refs[_this.tabLinkKey][tabIndex]) {
                _this.removeClass(tabLink, 'formio-tab-link-active');
            }
            if (_this.refs[_this.tabLikey][tabIndex]) {
                _this.removeClass(_this.refs[_this.tabLikey][tabIndex], 'formio-tab-link-container-active');
            }
        });
        if (this.refs[this.tabLikey][index]) {
            this.addClass(this.refs[this.tabLikey][index], 'formio-tab-link-container-active');
        }
        if (this.refs[this.tabLinkKey][index]) {
            this.addClass(this.refs[this.tabLinkKey][index], 'formio-tab-link-active');
        }
        this.triggerChange();
    };
    TabsComponent.prototype.beforeFocus = function (component) {
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        var tabIndex = this.tabs.findIndex(function (tab) {
            return tab.some(function (comp) { return comp === component; });
        });
        if (tabIndex !== -1) {
            this.setTab(tabIndex);
        }
    };
    return TabsComponent;
}(NestedComponent));
export default TabsComponent;
