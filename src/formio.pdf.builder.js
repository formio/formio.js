import { FormioFormBuilder } from "./formio.form.builder";
import FormioUtils from './utils';
import FormioPDF from './formio.pdf';

export class FormioPDFBuilder extends FormioFormBuilder {
  addDropZone() {
    if (this.dropZone) {
      this.removeDropZone();
    }
    let iframeRect = FormioUtils.getElementRect(this.pdfForm.element);
    this.dropZone = this.ce('div', {
      style: `position:absolute;width: 100%;height:${iframeRect.height}px;`
    });

    this.pdfForm.prepend(this.dropZone);
    this.addEventListener(this.dropZone, 'dragover', (event) => {
      event.preventDefault();
      return false;
    });
    this.addEventListener(this.dropZone, 'drop', (event) => {
      event.preventDefault();
      this.dragStop(event);
      return false;
    });
  }

  removeDropZone() {
    if (this.dropZone) {
      this.removeEventListener(this.dropZone, 'dragover');
      this.removeEventListener(this.dropZone, 'drop');
      this.pdfForm.removeChild(this.dropZone);
      this.dropZone = null;
    }
  }

  updateComponent(component) {
    super.updateComponent(component);
    this.pdfForm.postMessage({name: 'updateElement', data: component.component});
  }

  deleteComponent(component) {
    if (super.deleteComponent(component)) {
      this.pdfForm.postMessage({name: 'removeElement', data: component.component});
    }
  }

  dragStart(event, component) {
    event.dataTransfer.setData('text/plain', JSON.stringify(component.schema));
    this.addDropZone();
  }

  dragStop(event, prevX, prevY) {
    event.preventDefault();
    let dropData = event.dataTransfer.getData('text/plain');
    if (!dropData || (typeof dropData !== 'string')) {
      return false;
    }

    let schema = JSON.parse(dropData);
    if (!schema) {
      return false;
    }

    schema.id = FormioUtils.getRandomComponentId();
    schema.overlay = {
      top: event.offsetY,
      left: event.offsetX,
      width: 100,
      height: 20
    };

    let component = this.addComponent(
      schema,
      this.getContainer(),
      this.data
    );
    component.isNew = true;
    this.editComponent(component);
    this.pdfForm.postMessage({name: 'addElement', data: schema});
    this.removeDropZone();
    return false;
  }

  addBuilderComponent(component) {
    const builderComponent = super.addBuilderComponent(component);
    builderComponent.element.draggable = true;
    builderComponent.element.setAttribute('draggable', true);
    this.addEventListener(builderComponent.element, 'dragstart', (event) => this.dragStart(event, component));
  }

  refreshDraggable() {
    this.addSubmitButton();
    this.builderReadyResolve();
  }

  build() {
    this.element.noDrop = true;
    this.pdfForm = new FormioPDF(this.element, this.options);
    this.pdfForm.on('iframe-componentClick', schema => this.editComponent(this.getComponentById(schema.id)));
    this.pdfForm.on('iframe-componentUpdate', schema => this.updateComponent(this.getComponentById(schema.id)));
    this.updateDraggable();
    this.formReadyResolve();
  }

  set form(form) {
    super.form = form;
    this.ready.then(() => {
      this.pdfForm.form = form;
    });
  }
}
