import {SelectComponent} from '../select/Select';
import dialogPolyfill from 'dialog-polyfill';
export class ResourceComponent extends SelectComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource
    };
  }

  /**
   * Creates a new button to add a resource instance
   * @returns {HTMLElement} - The "Add Resource" button html element.
   */
  addButton() {
    const addButton = this.ce('a', {
      class: 'btn btn-primary'
    });
    const addIcon   = this.ce('i', {
      class: this.iconClass('plus')
    });
    addButton.appendChild(addIcon);
    addButton.appendChild(this.text(` ${this.component.addResourceLabel || 'Add Resource'}`));

    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();

      // HTML for dialog
      const template = `${'<div class="row">' +
                       '<div class="col-sm-12">' +
                         '<b id="close" class="formio-dialog-close pull-right">X</b>' +
                       '</div>' +
                     '</div>' +
                     '<div class="row">' +
                       '<div class="col-sm-12">' +
                         '<div class="panel panel-default">' +
                           '<div class="panel-heading">' +
                             '<h3 class="panel-title">'}${this.component.addResourceLabel || 'Add Resource'}</h3>` +
                           '</div>' +
                           '<div class="panel-body">' +
                             '<div id="formio"></div>' +
                           '</div>' +
                         '</div>' +
                       '</div>' +
                     '</div>';

      this.dialog = this.ce('dialog', {
        class: 'formio-dialog'
      });
      this.dialog.innerHTML = template;
      addButton.ownerDocument.body.appendChild(this.dialog);
      dialogPolyfill.registerDialog(this.dialog);

      const self  = this;
      const close = this.dialog.querySelector('#close');
      const form  = new FormioForm(this.dialog.querySelector('#formio'));

      close.onclick = function() {
        self.dialog.close();
      };

      form.on('submit', (submission) => {
        self.setValue(submission);
        self.dialog.close();
      });
      form.src = `${Formio.getBaseUrl()}/form/${self.component.resource}`;

      this.dialog.onclose = function() {
        self.removeChildFrom(self.dialog, self.dialog.parentElement);
      };

      this.dialog.showModal();
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
