'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _eventemitter = require('eventemitter2');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _formio = require('./formio');

var _formio2 = _interopRequireDefault(_formio);

var _handsontablePro = require('handsontable-pro');

var _handsontablePro2 = _interopRequireDefault(_handsontablePro);

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _Components = require('./components/Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getOptions = function getOptions(options) {
  options = _lodash2.default.defaults(options, {
    submitOnEnter: false,
    i18next: _i18next2.default
  });
  if (!options.events) {
    options.events = new _eventemitter2.default({
      wildcard: false,
      maxListeners: 0
    });
  }
  return options;
};

/**
 * Renders a Form.io grid within the webpage.
 *
 * @example
 * import FormioGrid from 'formiojs/grid';
 * let form = new FormioForm(document.getElementById('formio'), 'https://examples.form.io/example');
 */

var GridBuilder = function (_FormioComponents) {
  _inherits(GridBuilder, _FormioComponents);

  /**
   * Creates a new GridBuilder instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {string} form - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.colHeaders - Set this grid to Headers.
   * @param {boolean} options.columns - Set columns to the grid.
   *
   * @example
   * import GridBuilder from 'formiojs/grid';
   * let form = new GridBuilder(document.getElementById('formio'), 'https://examples.form.io/example');
   *
   */
  function GridBuilder(element, form, options) {
    _classCallCheck(this, GridBuilder);

    var _this = _possibleConstructorReturn(this, (GridBuilder.__proto__ || Object.getPrototypeOf(GridBuilder)).call(this, null, getOptions(options)));

    _this.form = null;

    _this.grid = null;
    _this.query = {};

    _this.formio = null;
    _this.total = 0;
    _this.page = 0;
    _this.pages = 0;
    _this.firstItem = 0;
    _this.lastItem = 0;
    _this.skip = 0;

    _this.options = options || {
      colHeaders: [],
      columns: [],
      height: 456,
      width: '100%',
      colWidths: 105,
      rowHeaders: true,
      sortIndicator: true,
      columnSorting: true,
      contextMenu: true,
      autoRowSize: true,
      manualColumnMove: true,
      manualRowMove: true
    };
    if (!options || !options.hasOwnProperty('afterSelection')) {
      _this.options.afterSelection = function (r, c, r2, c2, preventScrolling, selectionLayerLevel) {
        return _this.onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel);
      };
    }

    _this.options.data = [];

    // Get Element
    _this.element = element;
    // Get Form
    _this.loadGrid(form);

    /**
     * Promise that executes when the form is ready and rendered.
     * @type {Promise}
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
    *   console.log('The form is ready!');
    * });
     * form.src = 'https://examples.form.io/example';
     */
    _this.gridReady = new _nativePromiseOnly2.default(function (resolve, reject) {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      _this.gridReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      _this.gridReadyReject = reject;
    });

    /**
     * Promise that executes when the submission is ready and rendered.
     * @type {Promise}
     *
     * @example
     * let form = new FormioForm(document.getElementById('formio'));
     * form.ready.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    _this.submissionReady = new _nativePromiseOnly2.default(function (resolve, reject) {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      _this.submissionReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      _this.submissionReadyReject = reject;
    });
    return _this;
  }

  _createClass(GridBuilder, [{
    key: 'onSelect',
    value: function onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel) {
      if (c === 0) {
        this.emit('gridSelectedRow', this.grid.getSourceDataAtRow(r, c));
      }
    }

    /**
     * Loads the submission if applicable.
     */

  }, {
    key: 'loadSubmissions',
    value: function loadSubmissions(query) {
      var _this2 = this;

      this.query = query || {};
      if (!this.query.hasOwnProperty('limit')) {
        this.query.limit = 10;
      }
      if (!this.query.hasOwnProperty('skip')) {
        this.query.skip = 0;
      }
      this.loading = true;
      if (this.formio.submissionsUrl) {
        this.onSubmission = this.formio.loadSubmissions({ params: this.query }).then(function (submission) {
          _this2.options.data = submission;
          _this2.createGrid();
          _this2.loading = false;
          _this2.setupColumns();
          _this2.submissionReadyResolve();
        }, function (err) {
          return err.catch(function (err) {
            return err;
          });
        });
      }
    }

    /**
     * Called when both the form and submission have been loaded.
     *
     * @returns {Promise} - The promise to trigger when both form and submission have loaded.
     */

  }, {
    key: 'setAlert',


    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     */
    value: function setAlert(type, message) {
      if (this.options.noAlerts) {
        if (!message) {
          this.emit('error', false);
        }
        return;
      }
      if (this.alert) {
        try {
          this.removeChild(this.alert);
          this.alert = null;
        } catch (err) {
          // ingore
        }
      }
      if (message) {
        this.alert = this.ce('div', {
          class: 'alert alert-' + type, role: 'alert'
        });
        this.alert.innerHTML = message;
      }
      if (!this.alert) {
        return;
      }
      this.prepend(this.alert);
    }

    /**
     * Create Grid
     */

  }, {
    key: 'createGrid',
    value: function createGrid() {
      this.grid = new _handsontablePro2.default(this.element, this.options);
      this.gridReadyResolve();
    }
  }, {
    key: 'loadGrid',
    value: function loadGrid(src) {
      var _this3 = this;

      // If no source is provided, then skip.
      if (!src) {
        return;
      }
      // Do not double load.
      if (this.formio && src === this.src) {
        return;
      }
      this.formio = new _formio2.default(src, { formOnly: true });
      this.formio.loadForm().then(function (form) {
        _this3.form = form;
        _this3.loadSubmissions();
        _this3.buildPagination(_this3.query);
        // Get Submission
        _this3.setPage(0);
      });
    }

    /**
     * Loads the submission if applicable.
     */

  }, {
    key: 'refreshGrid',
    value: function refreshGrid(query) {
      var _this4 = this;

      this.query = query || {};
      if (!this.query.hasOwnProperty('limit')) {
        this.query.limit = 10;
      }
      if (!this.query.hasOwnProperty('skip')) {
        this.query.skip = 0;
      }
      this.loading = true;
      if (this.formio.submissionsUrl) {
        this.onSubmission = this.formio.loadSubmissions({ params: this.query }).then(function (submission) {
          _this4.total = submission.serverCount;
          _this4.firstItem = _this4.query.skip + 1;
          _this4.lastItem = _this4.firstItem + submission.length - 1;
          _this4.skip = Math.floor(submission.skip / _this4.query.limit) + 1;
          _this4.loading = false;
          _this4.submissionReadyResolve();
          _this4.options.data = submission;
          _this4.grid.loadData(_this4.options.data);
        }, function (err) {
          return err.catch(function (err) {
            return err;
          });
        });
      }
    }
  }, {
    key: 'nextPage',
    value: function nextPage() {
      if (this.page <= this.total) {
        this.setPage(this.page + 1);
      } else {
        this.nextDisable = true;
      }
    }
  }, {
    key: 'prevPage',
    value: function prevPage() {
      if (this.page >= 1) {
        this.setPage(this.page - 1);
      } else {
        this.prevDisable = true;
      }
    }
  }, {
    key: 'setPage',
    value: function setPage(num) {
      if (this.isLoading) {
        return;
      }
      this.page = num !== -1 ? num : this.page;
      if (!this.query.hasOwnProperty('limit')) {
        this.query.limit = 10;
      }
      if (!this.query.hasOwnProperty('skip')) {
        this.query.skip = 0;
      }
      this.query.skip = this.page * this.query.limit;
      this.refreshPagination();
      this.refreshGrid(this.query);
    }
  }, {
    key: 'buildPagination',
    value: function buildPagination(query) {
      var _this5 = this;

      this.pages = Math.floor(this.total / query.limit);
      this.element.appendChild(this.ce('div', {}, [this.ce('ul', { class: 'pagination' }, [this.ce('li', {}, [this.ce('a', { class: this.prevDisable ? 'disable' : '', onClick: function onClick() {
          return _this5.prevPage();
        } }, '< Prev')]), this.ce('li', {}, [this.ce('span', { id: 'page' }, this.page)]), this.ce('li', {}, [this.ce('a', { class: this.nextDisable ? 'disable' : '', onClick: function onClick() {
          return _this5.nextPage();
        } }, 'Next >')])])]));
    }
  }, {
    key: 'refreshPagination',
    value: function refreshPagination() {
      document.getElementById('page').innerText = this.page + 1;
    }
  }, {
    key: 'pageChanged',
    value: function pageChanged(page) {
      this.setPage(page.page - 1);
    }
  }, {
    key: 'setupColumns',
    value: function setupColumns() {
      var _this6 = this;

      FormioUtils.eachComponent(this.form.components, function (component) {
        if (component.input && component.tableView) {
          var coverRenderer = function coverRenderer(instance, td, row, col, prop, value, cellProperties) {
            var span = _this6.ce('span', {}, 'Complex data');
            td.appendChild(span);
            return td;
          };
          if (component.components) {
            _this6.options.columns.push({
              data: 'data.' + component.key,
              readOnly: true,
              renderer: coverRenderer
            });
          } else {
            _this6.options.columns.push({
              data: 'data.' + component.key,
              readOnly: true
            });
          }
          _this6.options.colHeaders.push(component.label || component.placeholder || component.key);
        }
      });
    }
  }, {
    key: 'ready',
    get: function get() {
      var _this7 = this;

      return this.gridReady.then(function () {
        return _this7.submissionReady;
      });
    }
  }]);

  return GridBuilder;
}(_Components.FormioComponents);

exports.default = GridBuilder;


GridBuilder.setBaseUrl = _formio2.default.setBaseUrl;
GridBuilder.setApiUrl = _formio2.default.setApiUrl;
GridBuilder.setAppUrl = _formio2.default.setAppUrl;