import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import i18next from 'i18next';
import Formio from './formio';
import Handsontable from 'handsontable-pro';
import Promise from 'native-promise-only';
import {FormioComponents} from './components/Components';

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
    super(null, null);
    this.form = null;

    this.grid = null;

    this.formio = null;

    this.data = [];

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
    this.emit('gridSelectRow', this.grid.getSourceDataAtRow(r, c));
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
        } , (err) => err.catch((err) => err));
    }
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
    });
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
    });
    this.setPage(0);
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

// Used to trigger a resize.
Formio.onResize = (scale) => _.each(Formio.forms, (instance) => instance.onResize(scale));
Formio.triggerResize = _.debounce(Formio.onResize, 200);
if ('addEventListener' in window) {
  window.addEventListener('resize', () => Formio.triggerResize(), false);
}
else if ('attachEvent' in window) {
  window.attachEvent('onresize', () => Formio.triggerResize());
}

FormioGrid.setBaseUrl = Formio.setBaseUrl;
FormioGrid.setApiUrl = Formio.setApiUrl;
FormioGrid.setAppUrl = Formio.setAppUrl;
