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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import NativePromise from 'native-promise-only';
import _ from 'lodash';
import { Webform } from '../webform/Webform';
import { Formio } from '../../Formio';
import { fastCloneDeep, checkCondition, firstNonNil, uniqueKey } from '../../utils/utils';
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    /**
     * Constructor for wizard based forms
     * @param element Dom element to place this wizard.
     * @param {Object} options Options object, supported options are:
     *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
     *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
     */
    function Wizard() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        _this = _super.call(this, element, options) || this;
        _this.pages = [];
        _this.prefixComps = [];
        _this.suffixComps = [];
        _this.components = [];
        _this.originalComponents = [];
        _this.page = 0;
        _this.currentPanel = null;
        _this.currentNextPage = 0;
        _this._seenPages = [0];
        return _this;
    }
    Wizard.prototype.isLastPage = function () {
        var next = this.getNextPage();
        if (_.isNumber(next)) {
            return 0 < next && next >= this.pages.length;
        }
        return _.isNull(next);
    };
    Wizard.prototype.getPages = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var _a = args.all, all = _a === void 0 ? false : _a;
        var pages = this.pages
            .filter(all ? _.identity : function (p, index) { return _this._seenPages.includes(index); });
        return pages;
    };
    Wizard.prototype.getComponents = function () {
        return this.submitting
            ? this.getPages({ all: this.isLastPage() })
            : _super.prototype.getComponents.call(this);
    };
    Wizard.prototype.resetValue = function () {
        this.getPages({ all: true }).forEach(function (page) { return page.resetValue(); });
        this.setPristine(true);
    };
    Wizard.prototype.init = function () {
        // Check for and initlize button settings object
        this.options.buttonSettings = _.defaults(this.options.buttonSettings, {
            showPrevious: true,
            showNext: true,
            showSubmit: true,
            showCancel: !this.options.readOnly
        });
        this.options.breadcrumbSettings = _.defaults(this.options.breadcrumbSettings, {
            clickable: true
        });
        this.page = 0;
        var onReady = _super.prototype.init.call(this);
        this.setComponentSchema();
        return onReady;
    };
    Object.defineProperty(Wizard.prototype, "wizardKey", {
        get: function () {
            return "wizard-" + this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "form", {
        get: function () {
            return this.wizard;
        },
        set: function (value) {
            _super.prototype.form = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "buttons", {
        get: function () {
            var _this = this;
            var buttons = {};
            [
                { name: 'cancel', method: 'cancel' },
                { name: 'previous', method: 'prevPage' },
                { name: 'next', method: 'nextPage' },
                { name: 'submit', method: 'submit' }
            ].forEach(function (button) {
                if (_this.hasButton(button.name)) {
                    buttons[button.name] = button;
                }
            });
            return buttons;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "renderContext", {
        get: function () {
            return {
                wizardKey: this.wizardKey,
                isBreadcrumbClickable: this.isBreadcrumbClickable(),
                panels: this.pages.map(function (page) { return page.component; }),
                buttons: this.buttons,
                currentPage: this.page,
            };
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.prepareNavigationSettings = function (ctx) {
        var currentPanel = this.currentPanel;
        if (currentPanel && currentPanel.buttonSettings) {
            Object.keys(currentPanel.buttonSettings).forEach(function () {
                Object.keys(ctx.buttons).forEach(function (key) {
                    if (typeof currentPanel.buttonSettings[key] !== 'undefined' && !currentPanel.buttonSettings[key]) {
                        ctx.buttons[key] = null;
                    }
                });
            });
        }
        return this.renderTemplate('wizardNav', ctx);
    };
    Wizard.prototype.prepareHeaderSettings = function (ctx) {
        if (this.currentPanel && this.currentPanel.breadcrumb === 'none') {
            return null;
        }
        return this.renderTemplate('wizardHeader', ctx);
    };
    Wizard.prototype.render = function () {
        var _this = this;
        var ctx = this.renderContext;
        if (this.component.key) {
            ctx.panels.map(function (panel) {
                if (panel.key === _this.component.key) {
                    _this.currentPanel = panel;
                }
            });
        }
        var wizardNav = this.prepareNavigationSettings(ctx);
        var wizardHeader = this.prepareHeaderSettings(ctx);
        return this.renderTemplate('wizard', __assign(__assign({}, ctx), { className: _super.prototype.getClassName.call(this), wizardHeader: wizardHeader,
            wizardNav: wizardNav, components: this.renderComponents(__spreadArrays(this.prefixComps, this.currentPage.components, this.suffixComps)) }), this.builderMode ? 'builder' : 'form');
    };
    Wizard.prototype.redrawNavigation = function () {
        var _a;
        if (this.element) {
            var navElement = this.element.querySelector("#" + this.wizardKey + "-nav");
            if (navElement) {
                this.detachNav();
                navElement.outerHTML = this.renderTemplate('wizardNav', this.renderContext);
                navElement = this.element.querySelector("#" + this.wizardKey + "-nav");
                this.loadRefs(navElement, (_a = {},
                    _a[this.wizardKey + "-cancel"] = 'single',
                    _a[this.wizardKey + "-previous"] = 'single',
                    _a[this.wizardKey + "-next"] = 'single',
                    _a[this.wizardKey + "-submit"] = 'single',
                    _a));
                this.attachNav();
            }
        }
    };
    Wizard.prototype.redrawHeader = function () {
        var _a;
        if (this.element) {
            var headerElement = this.element.querySelector("#" + this.wizardKey + "-header");
            if (headerElement) {
                this.detachHeader();
                headerElement.outerHTML = this.renderTemplate('wizardHeader', this.renderContext);
                headerElement = this.element.querySelector("#" + this.wizardKey + "-header");
                this.loadRefs(headerElement, (_a = {},
                    _a[this.wizardKey + "-link"] = 'multiple',
                    _a));
                this.attachHeader();
            }
        }
    };
    Wizard.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.element = element;
        this.loadRefs(element, (_a = {},
            _a[this.wizardKey] = 'single',
            _a[this.wizardKey + "-cancel"] = 'single',
            _a[this.wizardKey + "-previous"] = 'single',
            _a[this.wizardKey + "-next"] = 'single',
            _a[this.wizardKey + "-submit"] = 'single',
            _a[this.wizardKey + "-link"] = 'multiple',
            _a));
        this.hook('attachWebform', element, this);
        var promises = this.attachComponents(this.refs[this.wizardKey], __spreadArrays(this.prefixComps, this.currentPage.components, this.suffixComps));
        this.attachNav();
        this.attachHeader();
        return promises.then(function () { return _this.emit('render', { component: _this.currentPage, page: _this.page }); });
    };
    Wizard.prototype.isBreadcrumbClickable = function () {
        var _this = this;
        var currentPage = null;
        this.pages.map(function (page) {
            if (_.isEqual(_this.currentPage.component, page.component)) {
                currentPage = page;
            }
        });
        return _.get(currentPage.component, 'breadcrumbClickable', true);
    };
    Wizard.prototype.attachNav = function () {
        var _this = this;
        _.each(this.buttons, function (button) {
            var buttonElement = _this.refs[_this.wizardKey + "-" + button.name];
            _this.addEventListener(buttonElement, 'click', function (event) {
                event.preventDefault();
                // Disable the button until done.
                buttonElement.setAttribute('disabled', 'disabled');
                _this.setLoading(buttonElement, true);
                // Call the button method, then re-enable the button.
                _this[button.method]().then(function () {
                    buttonElement.removeAttribute('disabled');
                    _this.setLoading(buttonElement, false);
                }).catch(function () {
                    buttonElement.removeAttribute('disabled');
                    _this.setLoading(buttonElement, false);
                });
            });
        });
    };
    Wizard.prototype.attachHeader = function () {
        var _this = this;
        if (this.isBreadcrumbClickable()) {
            this.refs[this.wizardKey + "-link"].forEach(function (link, index) {
                _this.addEventListener(link, 'click', function (event) {
                    _this.emit('wizardNavigationClicked', _this.pages[index]);
                    event.preventDefault();
                    return _this.setPage(index).then(function () {
                        _this.emit('wizardPageSelected', _this.pages[index], index);
                    });
                });
            });
        }
    };
    Wizard.prototype.detachNav = function () {
        var _this = this;
        _.each(this.buttons, function (button) {
            _this.removeEventListener(_this.refs[_this.wizardKey + "-" + button.name], 'click');
        });
    };
    Wizard.prototype.detachHeader = function () {
        var _this = this;
        this.refs[this.wizardKey + "-link"].forEach(function (link) {
            _this.removeEventListener(link, 'click');
        });
    };
    Wizard.prototype.establishPages = function () {
        var _this = this;
        this.pages = [];
        this.prefixComps = [];
        this.suffixComps = [];
        var visible = [];
        var currentPages = {};
        var pageOptions = _.clone(this.options);
        if (this.components && this.components.length) {
            this.components.map(function (page) {
                if (page.component.type === 'panel') {
                    currentPages[page.component.key || page.component.title] = page;
                }
            });
        }
        if (this.originalComponents) {
            this.originalComponents.forEach(function (item) {
                if (item.type === 'panel') {
                    if (!item.key) {
                        item.key = item.title;
                    }
                    var page = currentPages[item.key];
                    var isVisible = checkCondition(item, _this.data, _this.data, _this.component, _this);
                    if (isVisible) {
                        visible.push(item);
                        if (page) {
                            _this.pages.push(page);
                        }
                    }
                    if (!page && isVisible) {
                        page = _this.createComponent(item, pageOptions);
                        _this.pages.push(page);
                        page.eachComponent(function (component) {
                            component.page = (_this.pages.length - 1);
                        });
                    }
                    else if (page && !isVisible) {
                        _this.removeComponent(page);
                    }
                }
                else if (item.type !== 'button') {
                    if (!_this.pages.length) {
                        _this.prefixComps.push(_this.createComponent(item, pageOptions));
                    }
                    else {
                        _this.suffixComps.push(_this.createComponent(item, pageOptions));
                    }
                }
            });
        }
        return visible;
    };
    Wizard.prototype.addComponents = function () {
        this.establishPages();
    };
    Wizard.prototype.setPage = function (num) {
        var _this = this;
        if (num === this.page) {
            return NativePromise.resolve();
        }
        if (!this.wizard.full && num >= 0 && num < this.pages.length) {
            this.page = num;
            this.pageFieldLogic(num);
            this.getNextPage();
            if (!this._seenPages.includes(num)) {
                this._seenPages = this._seenPages.concat(num);
            }
            this.redraw().then(function () {
                if (!_this.options.readOnly) {
                    _this.checkValidity(_this.submission.data, false, _this.submission.data, true);
                }
            });
            return NativePromise.resolve();
        }
        else if (this.wizard.full || !this.pages.length) {
            this.redraw();
            return NativePromise.resolve();
        }
        return NativePromise.reject('Page not found');
    };
    Wizard.prototype.pageFieldLogic = function (page) {
        // Handle field logic on pages.
        this.component = this.pages[page].component;
        this.originalComponent = fastCloneDeep(this.component);
        this.fieldLogic(this.data);
        // If disabled changed, be sure to distribute the setting.
        this.disabled = this.shouldDisabled;
    };
    Object.defineProperty(Wizard.prototype, "currentPage", {
        get: function () {
            return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.getNextPage = function () {
        var data = this.submission.data;
        var form = this.pages[this.page].component;
        // Check conditional nextPage
        if (form) {
            var page = this.pages.length > (this.page + 1) ? this.page + 1 : -1;
            if (form.nextPage) {
                var next = this.evaluate(form.nextPage, {
                    next: page,
                    data: data,
                    page: page,
                    form: form
                }, 'next');
                if (next === null) {
                    this.currentNextPage = null;
                    return null;
                }
                var pageNum = parseInt(next, 10);
                if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
                    this.currentNextPage = pageNum;
                    return pageNum;
                }
                this.currentNextPage = this.getPageIndexByKey(next);
                return this.currentNextPage;
            }
            this.currentNextPage = page;
            return page;
        }
        this.currentNextPage = null;
        return null;
    };
    Wizard.prototype.getPreviousPage = function () {
        return this.page - 1;
    };
    Wizard.prototype.beforeSubmit = function () {
        return NativePromise.all(this.getPages().map(function (page) {
            page.options.beforeSubmit = true;
            return page.beforeSubmit();
        }));
    };
    Wizard.prototype.beforePage = function (next) {
        var _this = this;
        return new NativePromise(function (resolve, reject) {
            _this.hook(next ? 'beforeNext' : 'beforePrev', _this.currentPage, _this.submission, function (err) {
                if (err) {
                    _this.showErrors(err, true);
                    reject(err);
                }
                var form = _this.currentPage;
                if (form) {
                    form.beforePage(next).then(resolve).catch(reject);
                }
                else {
                    resolve();
                }
            });
        });
    };
    Wizard.prototype.nextPage = function () {
        var _this = this;
        // Read-only forms should not worry about validation before going to next page, nor should they submit.
        if (this.options.readOnly) {
            return this.setPage(this.getNextPage()).then(function () {
                _this.emit('nextPage', { page: _this.page, submission: _this.submission });
            });
        }
        // Validate the form, before go to the next page
        if (this.checkValidity(this.submission.data, true, this.submission.data, true)) {
            this.checkData(this.submission.data);
            return this.beforePage(true).then(function () {
                return _this.setPage(_this.getNextPage()).then(function () {
                    _this.emit('nextPage', { page: _this.page, submission: _this.submission });
                });
            });
        }
        else {
            this.currentPage.components.forEach(function (comp) { return comp.setPristine(false); });
            return NativePromise.reject(this.showErrors([], true));
        }
    };
    Wizard.prototype.prevPage = function () {
        var _this = this;
        return this.beforePage().then(function () {
            return _this.setPage(_this.getPreviousPage()).then(function () {
                _this.emit('prevPage', { page: _this.page, submission: _this.submission });
            });
        });
    };
    Wizard.prototype.cancel = function (noconfirm) {
        var _this = this;
        if (_super.prototype.cancel.call(this, noconfirm)) {
            this.setPristine(true);
            return this.setPage(0).then(function () {
                _this.redraw();
                return _this.page;
            });
        }
        return NativePromise.resolve();
    };
    Wizard.prototype.getPageIndexByKey = function (key) {
        var pageIndex = this.page;
        this.pages.forEach(function (page, index) {
            if (page.component.key === key) {
                pageIndex = index;
                return false;
            }
        });
        return pageIndex;
    };
    Object.defineProperty(Wizard.prototype, "schema", {
        get: function () {
            return this.wizard;
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.setComponentSchema = function () {
        var _this = this;
        var pageKeys = {};
        this.originalComponents = [];
        this.component.components.map(function (item) {
            if (item.type === 'panel') {
                item.key = uniqueKey(pageKeys, (item.key || 'panel'));
                pageKeys[item.key] = true;
            }
            _this.originalComponents.push(_.clone(item));
        });
        if (!Object.keys(pageKeys).length) {
            var newPage = {
                type: 'panel',
                title: 'Page 1',
                label: 'Page 1',
                key: 'page1',
                components: this.component.components
            };
            this.component.components = [newPage];
            this.originalComponents.push(_.clone(newPage));
        }
    };
    Wizard.prototype.setForm = function (form) {
        if (!form) {
            return;
        }
        this.wizard = form;
        this.component.components = form.components || [];
        this.setComponentSchema();
        return _super.prototype.setForm.call(this, form);
    };
    Wizard.prototype.setValue = function (submission, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, submission, flags);
        this.pageFieldLogic(this.page);
        return changed;
    };
    Wizard.prototype.isClickable = function (page, index) {
        return this.page !== index && firstNonNil([
            _.get(page, 'breadcrumbClickable'),
            this.options.breadcrumbSettings.clickable
        ]);
    };
    Wizard.prototype.hasButton = function (name, nextPage) {
        var currentPage = this.currentPage;
        if (name === 'previous') {
            var show = firstNonNil([
                _.get(currentPage, 'buttonSettings.previous'),
                this.options.buttonSettings.showPrevious
            ]);
            return (this.getPreviousPage() > -1) && show;
        }
        nextPage = (nextPage === undefined) ? this.getNextPage() : nextPage;
        if (name === 'next') {
            var show = firstNonNil([
                _.get(currentPage, 'buttonSettings.next'),
                this.options.buttonSettings.showNext
            ]);
            return (nextPage !== null) && (nextPage !== -1) && show;
        }
        if (name === 'cancel') {
            return firstNonNil([
                _.get(currentPage, 'buttonSettings.cancel'),
                this.options.buttonSettings.showCancel
            ]);
        }
        if (name === 'submit') {
            var show = firstNonNil([
                _.get(currentPage, 'buttonSettings.submit'),
                this.options.buttonSettings.showSubmit
            ]);
            return show && !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
        }
        return true;
    };
    Wizard.prototype.pageId = function (page) {
        if (page.key) {
            // Some panels have the same key....
            return page.key + "-" + page.title;
        }
        else if (page.components &&
            page.components.length > 0) {
            return this.pageId(page.components[0]);
        }
        else {
            return page.title;
        }
    };
    Wizard.prototype.onChange = function (flags, changed, modified) {
        _super.prototype.onChange.call(this, flags, changed, modified);
        if (this.alert && !this.submitted) {
            this.checkValidity(this.submission.data, false, this.submission.data, true);
            this.showErrors([], true);
        }
        // If the pages change, need to redraw the header.
        var currentPanels = this.pages.map(function (page) { return page.component.key; });
        var panels = this.establishPages().map(function (panel) { return panel.key; });
        var currentNextPage = this.currentNextPage;
        if (!_.isEqual(panels, currentPanels)) {
            this.redrawHeader();
        }
        // If the next page changes, then make sure to redraw navigation.
        if (currentNextPage !== this.getNextPage()) {
            this.redrawNavigation();
        }
    };
    Wizard.prototype.checkValidity = function (data, dirty, row, currentPageOnly) {
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        var components = !currentPageOnly || this.isLastPage()
            ? this.getComponents()
            : this.currentPage.components;
        return components.reduce(function (check, comp) { return comp.checkValidity(data, dirty, row) && check; }, true);
    };
    Object.defineProperty(Wizard.prototype, "errors", {
        get: function () {
            if (!this.isLastPage()) {
                return this.currentPage.errors;
            }
            return _super.prototype.errors;
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.focusOnComponent = function (key) {
        var _this = this;
        var pageIndex = 0;
        var page = this.pages.filter(function (page, index) {
            if (page.getComponent(key)) {
                pageIndex = index;
                return true;
            }
            return false;
        })[0];
        if (page && page !== this.currentPage) {
            return this.setPage(pageIndex).then(function () {
                _this.checkValidity(_this.submission.data, true, _this.submission.data);
                _this.showErrors();
                _super.prototype.focusOnComponent.call(_this, key);
            });
        }
        return _super.prototype.focusOnComponent.call(this, key);
    };
    return Wizard;
}(Webform));
export { Wizard };
Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
