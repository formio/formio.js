import _ from 'lodash';

import SelectComponent from '../select/Select';
import Webform from '../../Webform';
import Formio from '../../Formio';

export default class ResourceComponent extends SelectComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'resource',
      label: 'Resource',
      key: 'resource',
      dataSrc: 'resource',
      resource: '',
      project: '',
      template: '<span>{{ item.data }}</span>'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Resource',
      group: 'advanced',
      icon: 'files-o',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#resource',
      schema: ResourceComponent.schema()
    };
  }

  init() {
    super.init();
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource
    };
  }

  get defaultSchema() {
    return ResourceComponent.schema();
  }

  /**
   * Creates a new button to add a resource instance
   * @returns {HTMLElement} - The "Add Resource" button html element.
   */
  addButton() {
    const addButton = this.ce('button', {
      class: 'btn btn-primary'
    });
    const addIcon   = this.ce('i', {
      class: this.iconClass('plus')
    });
    addButton.appendChild(addIcon);
    addButton.appendChild(this.text(` ${this.component.addResourceLabel || 'Add Resource'}`));

    return addButton;
  }

  wrapElement(element) {
    if (this.component.addResource) {
      return this.renderTemplate('resourceAdd', {
        element
      });
    }
    else {
      return element;
    }
  }

  attach(element) {
    this.loadRefs(element, { addResource: 'single' });
    super.attach(element);

    if (this.refs.addResource) {
      this.addEventListener(this.refs.addResource, 'click', (event) => {
        event.preventDefault();
        const formioForm = this.ce('div');
        const dialog = this.createModal(formioForm);

        const form = new Webform(formioForm);
        form.on('submit', (submission) => {
          this.setValue(submission);
          dialog.close();
        });
        form.setSrc(`${_.get(this.root, 'formio.projectUrl', Formio.getBaseUrl())}/form/${this.component.resource}`)
          .then(() => form.build());
      });
    }
  }
}
