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
      project: '',
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
      let dialog = this.createModal(this.component.addResourceLabel || 'Add Resource');
      let formioForm = this.ce('div');
      dialog.body.appendChild(formioForm);
      const form = new Webform(formioForm);
      form.on('submit', (submission) => {
        this.setValue(submission);
        dialog.close();
      });
      form.src = Formio.getBaseUrl() + '/form/' + this.component.resource;
    });

    return addButton;
  }

  addInput(input, container) {
    // Add Resource button
    if (this.component.addResource) {
      const table    = this.ce('table', {
        class: 'table table-bordered'
      });
      const template = '<tbody>' +
                       '<tr>' +
                         '<td id="select">' +
                         '</td>' +
                       '</tr>' +
                       '<tr>' +
                         '<td id="button" colspan="2">' +
                         '</td>' +
                       '</tr>' +
                     '</tbody>';
      container.appendChild(table);
      table.innerHTML = template;
      table.querySelector('#button').appendChild(this.addButton());
      super.addInput(input, table.querySelector('#select'));
    }
    else {
      super.addInput(input, container);
    }
  }
}
