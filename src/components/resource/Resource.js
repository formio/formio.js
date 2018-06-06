import SelectComponent from '../select/Select';
import Webform from '../../Webform';

export default class ResourceComponent extends SelectComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'resource',
      label: 'Resource',
      key: 'resource',
      dataSrc: 'resource',
      resource: '',
      template: '<span>{{ item.data }}</span>'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Resource',
      group: 'advanced',
      icon: 'fa fa-files-o',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#resource',
      schema: ResourceComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
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

    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();

      const dialog = this.createModal(this.component.addResourceLabel || 'Add Resource');
      const formioForm = this.ce('div');
      dialog.body.appendChild(formioForm);

      const form = new Webform(formioForm);
      form.src = this.resourceUrl;
      form.on('submit', (submission) => {
        this.setValue(submission);
        dialog.close();
      });
    });

    return addButton;
  }

  addInput(input, container) {
    // Add Resource button
    if (this.component.addResource) {
      const selectContainer = this.ce('td', {id: `${this.id}-select`});
      const buttonContainer = this.ce('td', {id: `${this.id}-button`});
      const table = this.ce('table', {class: 'table table-bordered'},
        this.ce('tbody', null, [
          this.ce('tr', null, selectContainer),
          this.ce('tr', null, buttonContainer)
      ]));

      container.appendChild(table);
      buttonContainer.appendChild(this.addButton());
      super.addInput(input, selectContainer);
    }
    else {
      super.addInput(input, container);
    }
  }
}
