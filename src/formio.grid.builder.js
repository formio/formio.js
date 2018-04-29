import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import i18next from 'i18next';
import Formio from './formio';
import Handsontable from 'handsontable-pro';
import Promise from 'native-promise-only';
import {FormioComponents} from './components/Components';

const getOptions = function(options) {
  options = _.defaults(options, {
    submitOnEnter: false,
    i18next: i18next
  });
  if (!options.events) {
    options.events = new EventEmitter({
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
export default class GridBuilder extends FormioComponents{
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
  constructor(element, form, options) {
    super(null, getOptions(options));
    this.form = null;

    this.grid = null;
    this.query = {};

    this.formio = null;
    this.total = 0;
    this.page = 0;
    this.pages = 0;
    this.firstItem = 0;
    this.lastItem = 0;
    this.skip = 0;

    this.options = options || {
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
      manualRowMove: true,
    };
    if (!options || !options.hasOwnProperty('afterSelection')) {
      this.options.afterSelection = (r, c, r2, c2, preventScrolling, selectionLayerLevel) => this.onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel)
    }

    this.options.data = [];


    // Get Element
    this.element = element;
    // Get Form
    this.loadGrid(form);

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
    this.gridReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.gridReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.gridReadyReject = reject;
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
    this.submissionReady = new Promise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.submissionReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.submissionReadyReject = reject;
    });
  }

  onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel) {
    if (c === 0) {
      this.emit('gridSelectedRow',this.grid.getSourceDataAtRow(r, c))
    }
  }

  /**
   * Loads the submission if applicable.
   */
  loadSubmissions(query) {
    this.query = query || {};
    if (!this.query.hasOwnProperty('limit')) {
      this.query.limit = 10;
    }
    if (!this.query.hasOwnProperty('skip')) {
      this.query.skip = 0;
    }
    this.loading = true;
    if (this.formio.submissionsUrl) {
      this.onSubmission = this.formio.loadSubmissions({params:this.query}).then((submission) => {
        this.options.data = submission;
        this.createGrid();
        this.loading = false;
        this.setupColumns();
        this.submissionReadyResolve();
      } , (err) => err.catch((err) => err));
    }
  }

  /**
   * Called when both the form and submission have been loaded.
   *
   * @returns {Promise} - The promise to trigger when both form and submission have loaded.
   */
  get ready() {
    return this.gridReady.then(() => this.submissionReady);
  }

  /**
   * Sets a new alert to display in the error dialog of the form.
   *
   * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
   * @param {string} message - The message to show in the alert.
   */
  setAlert(type, message)
  {
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
        class: `alert alert-${type}`, role: 'alert'
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
  createGrid() {
    this.grid = new Handsontable(this.element, this.options);
    this.gridReadyResolve();
  }

  loadGrid(src) {
    // If no source is provided, then skip.
    if (!src) {
      return;
    }
    // Do not double load.
    if (this.formio && src === this.src) {
      return;
    }
    this.formio = new Formio(src, {formOnly: true});
    this.formio.loadForm().then((form) => {
      this.form = form;
      this.loadSubmissions();
      this.buildPagination(this.query);
      // Get Submission
      this.setPage(0);
    });
  }

  /**
   * Loads the submission if applicable.
   */
  refreshGrid(query) {
    this.query = query || {};
    if (!this.query.hasOwnProperty('limit')) {
      this.query.limit = 10;
    }
    if (!this.query.hasOwnProperty('skip')) {
      this.query.skip = 0;
    }
    this.loading = true;
    if (this.formio.submissionsUrl) {
      this.onSubmission = this.formio.loadSubmissions({params:this.query}).then((submission) => {
        this.total = submission.serverCount;
        this.firstItem = this.query.skip + 1;
        this.lastItem = this.firstItem + submission.length - 1;
        this.skip = Math.floor(submission.skip / this.query.limit) + 1;
        this.loading = false;
        this.submissionReadyResolve();
        this.options.data = submission;
        this.grid.loadData(this.options.data)
      } , (err) => err.catch((err) => err));
    }
  }

  nextPage() {
    if (this.page <= this.total ) {
      this.setPage(this.page + 1)
    }
    else {
      this.nextDisable = true;
    }
  }

  prevPage() {
    if(this.page >= 1 ) {
      this.setPage(this.page - 1)
    }
    else {
      this.prevDisable = true;
    }
  }

  setPage(num) {
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

  buildPagination(query) {
    this.pages = Math.floor(this.total/query.limit);
    this.element.appendChild(this.ce('div',{},
      [this.ce('ul',{class:'pagination'},[
        this.ce('li',{},[
          this.ce('a',{class:this.prevDisable?'disable':'', onClick:()=>this.prevPage()},'< Prev')
        ]),
        this.ce('li',{},[
          this.ce('span',{id: 'page'}, this.page)
        ]),
        this.ce('li',{},[
          this.ce('a',{class:this.nextDisable?'disable':'', onClick:()=>this.nextPage()},'Next >')
        ]),
      ])]
    ));
  }

  refreshPagination() {
    document.getElementById('page').innerText = this.page + 1;
  }

  pageChanged(page) {
    this.setPage(page.page - 1);
  }

  setupColumns() {
    FormioUtils.eachComponent(this.form.components, (component) => {
      if (component.input && component.tableView) {
        const coverRenderer = (instance, td, row, col, prop, value, cellProperties) => {
            const span = this.ce('span', {},'Complex data');
            td.appendChild(span);
          return td;
        };
        if(component.components) {
          this.options.columns.push({
            data: 'data.' + component.key,
            readOnly: true,
            renderer: coverRenderer
          });
        } else {
          this.options.columns.push({
            data: 'data.' + component.key,
            readOnly: true,
          });
        }
        this.options.colHeaders.push(component.label || component.placeholder ||component.key);
      }
    });
  }
}

GridBuilder.setBaseUrl = Formio.setBaseUrl;
GridBuilder.setApiUrl = Formio.setApiUrl;
GridBuilder.setAppUrl = Formio.setAppUrl;
