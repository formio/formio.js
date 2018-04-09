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
export default class FormioGrid extends FormioComponents{
  /**
   * Creates a new FormioForm instance.
   *
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {string} form - The DOM element you wish to render this form within.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.colHeaders - Set this grid to Headers.
   * @param {boolean} options.columns - Set columns to the grid.
   *
   * @example
   * import FormioGrid from 'formiojs/grid';
   * let form = new FormioForm(document.getElementById('formio'), 'https://examples.form.io/example');
   *
   */
  constructor(element, form, options) {
    super(null, getOptions(options));
    this.form = null;

    this.grid = null;

    this.formio = null;
    this.total = 0;
    this.page = 0;
    this.pages = 1;
    this.firstItem = 0;
    this.lastItem = 0;
    this.skip = 0;

    this.options = options || {
      colHeaders: [],
      columns: [],
      sortIndicator: true,
      columnSorting: true,
      afterSelection: (r, c, r2, c2, preventScrolling, selectionLayerLevel) => this.onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel)
    };


    // Get Element
    this.element = element;
    // Get Form
    this.loadForm(form);

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

  /**
   * Load Form
   */
  loadForm(form) {
    this.formio = new Formio(form, {formOnly: true});
    this.formio.loadForm().then((form) => {
      this.form = form;
      this.setupColumns();
      // Get Submission
      this.loadSubmissions(form);
    });
  }
  onSelect(r, c, r2, c2, preventScrolling, selectionLayerLevel) {
    if (c === 0) {
      console.log(c);
      this.emit('gridSelectedRow',this.grid.getSourceDataAtRow(r, c))
    }
  }
  /**
   * Loads the submission if applicable.
   */
  loadSubmissions() {
    console.log(this.formio);
    if (this.formio.submissionsUrl) {
      this.onSubmission = this.formio.loadSubmissions().then((submission) => {
        console.log(submission); this.data = submission;
        this.createGrid();
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
    this.grid = new Handsontable(this.element, {
      data: this.data,
      colHeaders: this.options.colHeaders,
      columns: this.options.columns,
      sortIndicator: this.options.sortIndicator,
      columnSorting: this.options.columnSorting,
      afterSelection: this.options.afterSelection,
    })
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
    this.formio = new Formio(this.src, {formOnly: true});
    this.formio.loadForm().then((form) => {
      this.form = form;
      this.setupColumns();
      this.refreshGrid()
    });
    this.setPage(0);
  }

  refreshGrid(query) {
    query = query || {};
    query = _.assign(query, this.options.query);
    if (!query.hasOwnProperty('limit')) {
      query.limit = 10;
    }
    if (!query.hasOwnProperty('skip')) {
      query.skip = 0;
    }
    this.loading = true;
    this.formio
      .loadSubmissions({ params: query })
      .then(
        (submissions) => {
          this.firstItem = this.options.this.query.skip + 1;
          this.lastItem = this.firstItem + submissions.length - 1;
          this.total = submissions.serverCount;
          this.skip = Math.floor(submissions.skip / query.limit) + 1;
          this.data = [];
          console.log(submissions);
          _.each(submissions, (submission) => {
            this.data.push(submission);
          });
          this.buildPagination();
          this.loading = false;
        },
        (err) => (err)
      )
      .catch((err) => (err));
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
    this.refreshGrid();
  }

  buildPagination() {
    this.pages = this.data.length/this.query.limit;
    console.log(this.pages);
  }

  pageChanged(page) {
    this.setPage(page.page - 1);
  }

  setupColumns() {
    let i = 0;
    FormioUtils.eachComponent(this.form.components, (component) => {
      if (component.input && component.tableView) {
        this.options.columns.push({
          data: 'data.' + component.key,
          readOnly: true
        });
        this.options.colHeaders.push(component.label || component.placeholder ||component.key)
        i++;
      }
    });
  }
}

FormioGrid.setBaseUrl = Formio.setBaseUrl;
FormioGrid.setApiUrl = Formio.setApiUrl;
FormioGrid.setAppUrl = Formio.setAppUrl;
