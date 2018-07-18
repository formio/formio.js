import _ from 'lodash';

import WebformBuilder from './WebformBuilder';
import { getElementRect } from './utils/utils';
import PDF from './PDF';

export default class PDFBuilder extends WebformBuilder {
  get defaultComponents() {
    return {
      pdf: {
        title: 'PDF Fields',
        weight: 0,
        default: true,
        components: {
          textfield: true,
          number: true,
          password: true,
          email: true,
          phoneNumber: true,
          currency: true,
          checkbox: true,
          signature: true,
          select: true,
          textarea: true,
          datetime: true
        }
      },
      basic: false,
      advanced: false,
      layout: false,
      data: false,
      premium: false,
      resource: false
    };
  }

  addDropZone() {
    if (!this.dropZone) {
      this.dropZone = this.ce('div', {
        class: 'formio-drop-zone'
      });
      this.prepend(this.dropZone);
    }
    this.addEventListener(this.dropZone, 'dragover', (event) => {
      event.preventDefault();
      return false;
    });
    this.addEventListener(this.dropZone, 'drop', (event) => {
      event.preventDefault();
      this.dragStop(event);
      return false;
    });
    this.disableDropZone();
  }

  render() {
    return this.onElement.then(() => {
      this.clear();
      this.build();
      this.isBuilt = true;
      this.on('resetForm', () => this.resetValue());
      this.on('refreshData', () => this.updateValue());
      setTimeout(() => {
        this.onChange();
        this.emit('render');
      }, 1);
    });
  }

  enableDropZone() {
    if (this.dropZone) {
      const iframeRect = getElementRect(this.pdfForm.element);
      this.dropZone.style.height = iframeRect && iframeRect.height  ? `${iframeRect.height}px` : '1000px';
      this.dropZone.style.width = iframeRect && iframeRect.width ? `${iframeRect.width}px` : '100%';
      this.addClass(this.dropZone, 'enabled');
    }
  }

  disableDropZone() {
    if (this.dropZone) {
      this.removeClass(this.dropZone, 'enabled');
    }
  }

  addComponentTo(parent, schema, element, sibling) {
    const comp = super.addComponentTo(parent, schema, element, sibling);
    comp.isNew = true;
    if (this.pdfForm && schema.overlay) {
      this.pdfForm.postMessage({ name: 'addElement', data: schema });
    }
    return comp;
  }

  addComponent(component, element, data, before) {
    return super.addComponent(component, element, data, before, true);
  }

  updateComponent(component) {
    if (this.pdfForm && component.component) {
      this.pdfForm.postMessage({ name: 'updateElement', data: component.component });
    }
    return super.updateComponent(component);
  }

  deleteComponent(component) {
    if (this.pdfForm && component.component) {
      this.pdfForm.postMessage({ name: 'removeElement', data: component.component });
    }
    return super.deleteComponent(component);
  }

  dragStart(event, component) {
    event.stopPropagation();
    event.dataTransfer.setData('text/plain', 'true');
    this.currentComponent = component;
    this.enableDropZone();
  }

  removeEventListeners(all) {
    super.removeEventListeners(all);
    _.each(this.groups, (group) => {
      _.each(group.components, (builderComponent) => {
        this.removeEventListener(builderComponent, 'dragstart');
        this.removeEventListener(builderComponent, 'dragend');
      });
    });
  }

  clear() {
    this.destroy();
  }
  redraw() {
    if (this.pdfForm) {
      this.pdfForm.postMessage({ name: 'redraw' });
    }
  }

  dragStop(event) {
    const schema = this.currentComponent ? this.currentComponent.schema : null;
    if (!schema) {
      return false;
    }

    schema.overlay = {
      top: event.offsetY,
      left: event.offsetX,
      width: 100,
      height: 20
    };

    this.addComponentTo(this, schema, this.getContainer());
    this.disableDropZone();
    return false;
  }

  // Don't need to add a submit button here... the pdfForm will already do this.
  addSubmitButton() {}

  addBuilderComponent(component, group) {
    const builderComponent = super.addBuilderComponent(component, group);
    if (builderComponent) {
      builderComponent.element.draggable = true;
      builderComponent.element.setAttribute('draggable', true);
      this.addEventListener(builderComponent.element, 'dragstart', (event) => this.dragStart(event, component));
      this.addEventListener(builderComponent.element, 'dragend', () => this.disableDropZone());
    }
    return builderComponent;
  }

  refreshDraggable() {
    this.addSubmitButton();
    this.builderReadyResolve();
  }

  destroy() {
    this.removeEventListeners();
    this.destroyComponents();
  }

  build() {
    this.buildSidebar();
    if (!this.pdfForm) {
      this.element.noDrop = true;
      this.pdfForm = new PDF(this.element, this.options);
      this.addClass(this.pdfForm.element, 'formio-pdf-builder');
    }
    this.pdfForm.removeEventListeners(true);
    this.pdfForm.events.removeAllListeners();
    this.pdfForm.destroyComponents();
    this.pdfForm.on('iframe-elementUpdate', schema => {
      const component = this.getComponentById(schema.id);
      if (component && component.component) {
        component.component.overlay = {
          page: schema.page,
          left: schema.left,
          top: schema.top,
          height: schema.height,
          width: schema.width
        };
        this.editComponent(component);
        this.emit('updateComponent', component);
      }
      return component;
    });
    this.pdfForm.on('iframe-componentUpdate', schema => {
      const component = this.getComponentById(schema.id);
      if (component && component.component) {
        component.component.overlay = {
          page: schema.overlay.page,
          left: schema.overlay.left,
          top: schema.overlay.top,
          height: schema.overlay.height,
          width: schema.overlay.width
        };
        this.emit('updateComponent', component);
      }
      return component;
    });
    this.pdfForm.on('iframe-componentClick', schema => {
      const component = this.getComponentById(schema.id);
      if (component) {
        this.editComponent(component);
      }
    });
    this.addComponents();
    this.addDropZone();
    this.updateDraggable();
    this.formReadyResolve();
  }

  setForm(form) {
    return super.setForm(form).then(() => {
      return this.ready.then(() => {
        if (this.pdfForm) {
          this.pdfForm.postMessage({ name: 'form', data: form });
          return this.pdfForm.setForm(form);
        }
        return form;
      });
    });
  }
}
