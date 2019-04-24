import WebformBuilder from './WebformBuilder';
import _ from 'lodash';

export default class WizardBuilder extends WebformBuilder {
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    super(null, options);
    // this.element = element;

    this._form = {
      components: [
        {
          title: 'Page 1',
          label: 'Page 1',
          type: 'panel',
          key: 'page1'
        }
      ]
    };

    this.page = 0;
  }

  get pages() {
    return _.filter(this._form.components, { type: 'panel' });
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : null;
  }

  set form(value) {
    this._form = value;
    if (!this._form.components || !Array.isArray(this._form.components)) {
      this._form.components = [];
    }
    if (this._form.components.length === 0) {
      this._form.components.push(        {
        title: 'Page 1',
        label: 'Page 1',
        type: 'panel',
        key: 'page1'
      });
    }
    this.rebuild();
  }

  get form() {
    return this._form;
  }

  get schema() {
    return this._form;
  }

  render() {
    return this.renderTemplate('builderWizard', {
      sidebar: this.renderTemplate('builderSidebar', {
        groupOrder: this.groupOrder,
        groups: this.groups,
      }),
      pages: this.pages,
      form: this.webform.render(),
    });
  }

  attach(element) {
    this.loadRefs(element, {
      addPage: 'multiple',
      gotoPage: 'multiple',
    });

    this.refs.addPage.forEach(link => {
      this.addEventListener(link, 'click', (event) => {
        event.preventDefault();
        this.addPage();
      });
    });

    this.refs.gotoPage.forEach((link, index) => {
      this.addEventListener(link, 'click', (event) => {
        event.preventDefault();
        this.setPage(index);
      });
    });

    return super.attach(element);
  }

  rebuild() {
    const page = this.currentPage;
    this.webform.form = {
      display: 'form',
      type: 'form',
      components: page ? [page] : [],
    };
    this.redraw();
  }

  addPage() {
    const pageNum = (this.pages.length + 1);
    const newPage = {
      title: `Page ${pageNum}`,
      label: `Page ${pageNum}`,
      type: 'panel',
      key: `page${pageNum}`
    };
    this._form.components.push(newPage);
    this.emit('saveComponent', newPage);
    this.rebuild();
  }

  setPage(index) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.rebuild();
  }
}
