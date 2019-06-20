import _ from 'lodash';

import WebformBuilder from './WebformBuilder';
import { getElementRect } from './utils/utils';
import BuilderUtils from './utils/builder';
import PDF from './PDF';

export default class PDFBuilder extends WebformBuilder {
  constructor() {
    console.log('PDFBuilder - constructor');

    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }

    // Force superclass to skip the automatic init; we'll trigger it manually
    options.skipInit = true;

    if (element) {
      super(element, options);
    }
    else {
      super(options);
    }

    this.stateDebug = this.stateDebug || {
      initialized: false,
      rendered: false,
      attached: false
    };

    this.dragDropEnabled = false;
  }

  get defaultGroups() {
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

  // 888      d8b  .d888                                    888
  // 888      Y8P d88P"                                     888
  // 888          888                                       888
  // 888      888 888888 .d88b.   .d8888b 888  888  .d8888b 888  .d88b.
  // 888      888 888   d8P  Y8b d88P"    888  888 d88P"    888 d8P  Y8b
  // 888      888 888   88888888 888      888  888 888      888 88888888
  // 888      888 888   Y8b.     Y88b.    Y88b 888 Y88b.    888 Y8b.
  // 88888888 888 888    "Y8888   "Y8888P  "Y88888  "Y8888P 888  "Y8888
  //                                           888
  //                                      Y8b d88P
  //                                       "Y88P"

  init() {
    console.log(`${this.id} - PDFBuilder - init`);

    // const result = super.init()

    this.stateDebug = this.stateDebug || {
      initialized: false,
      rendered: false,
      attached: false
    };

    if (this.stateDebug.initialized) {
      console.log('WARNING - INITIALIZING ALREADY-INITIALIZED PDFBUILDER');
    }

    if (this.stateDebug.rendered) {
      console.log('WARNING - INITIALIZING RENDERED PDFBUILDER');
    }

    if (this.stateDebug.attached) {
      console.log('WARNING - INITIALIZING ATTACHED PDFBUILDER');
    }

    this.stateDebug.initialized = true;

    this.options.attachMode = 'builder';
    this.webform = this.webform || this.createForm(this.options);
    this.webform.init();

    // return result;
  }

  render() {
    console.log(`${this.id} - PDFBuilder - render`);

    if (!this.stateDebug.initialized) {
      console.log('WARNING - RENDERING UNINITIALIZED PDFBUILDER');
    }

    if (this.stateDebug.rendered) {
      console.log('WARNING - RENDERING ALREADY-RENDERED PDFBUILDER');
    }

    if (this.stateDebug.attached) {
      console.log('WARNING - RENDERING ATTACHED PDFBUILDER');
    }

    const result = this.renderTemplate('pdfBuilder', {
      sidebar: this.renderTemplate('builderSidebar', {
        scrollEnabled: this.sideBarScroll,
        groupOrder: this.groupOrder,
        groupId: `builder-sidebar-${this.id}`,
        groups: this.groupOrder.map((groupKey) => this.renderTemplate('builderSidebarGroup', {
          group: this.groups[groupKey],
          groupKey,
          groupId: `builder-sidebar-${this.id}`,
          subgroups: this.groups[groupKey].subgroups.map((group) => this.renderTemplate('builderSidebarGroup', {
            group,
            groupKey: group.key,
            groupId: `builder-sidebar-${groupKey}`,
            subgroups: []
          })),
        })),
      }),
      form: this.webform.render()
    });

    this.stateDebug.rendered = true;

    return result;
  }

  build() {
    console.log(`${this.id} - PDFBuilder - build`);
    return super.build();
  }

  draw() {
    console.log(`${this.id} - PDFBuilder - draw`);
    return super.draw();
  }

  rebuild() {
    console.log(`${this.id} - PDFBuilder - rebuild`);

    /*
     There is no WebformBuilder.rebuild; this invokes Component.rebuild():

      rebuild() {
        this.destroy();
        this.init();
        this.redraw();
      }
    */
    return super.rebuild();
  }

  redraw() {
    console.log(`${this.id} - PDFBuilder - redraw`);

    if (!this.stateDebug.initialized) {
      console.log(`${this.id} - PDFBuilder - redraw - SKIPPING, unitialized!`);
      return;
    }

    return super.redraw();
  }

  attach(element) {
    console.log(`${this.id} - PDFBuilder - attach`);

    if (!this.stateDebug.initialized) {
      console.log('WARNING - ATTACHING UNINITIALIZED PDFBUILDER');
    }

    if (!this.stateDebug.rendered) {
      console.log('WARNING - ATTACHING UNRENDERED PDFBUILDER');
    }

    if (this.stateDebug.attached) {
      console.log('WARNING - ATTACHING ALREADY-ATTACHED PDFBUILDER');
    }

    /*
      This invokes WebformBuilder.attach(), which does a lot, and which also invokes Component.attach():

      attach(element) {
        return super.attach(element).then(() => {
          // loads refs

          // sets up some click events

          // initializes dragula

          // calls .attach() on the webform (for us, PDF.attach())

          return this.webform.attach(this.refs.form);
        });
      }
    */
    return super.attach(element).then(() => {
      this.loadRefs(this.element, { iframeDropzone: 'single', 'sidebar-container': 'single' });

      if (this.refs.iframeDropzone) {
        this.initIframeEvents();
        this.updateDropzoneDimensions();
        this.initDropzoneEvents();
      }

      if (this.refs['sidebar-container']) {
        this.prepSidebarComponentsForDrag();
      }

      // this.formReadyResolve();

      this.stateDebug.attached = true;

      return this.element;
    });
  }

  createForm(options) {
    console.log(`${this.id} - PDFBuilder - createForm`);

    // Instantiate the webform from the PDF class instead of Webform
    options.skipInit = false;
    this.webform = new PDF(this.element, options);

    this.webform.on('attach', this.onPdfAttach.bind(this));

    return this.webform;
  }

  setForm(form) {
    console.log(`${this.id} - PDFBuilder - setForm`);

    return super.setForm(form).then(() => {
      return this.ready.then(() => {
        if (this.webform) {
          this.webform.postMessage({ name: 'form', data: form });
          return this.webform.setForm(form);
        }
        return form;
      });
    });
  }

  onPdfAttach() {
    // If the dropzone exists but has been removed in a PDF rebuild, reinstate it
    if (this.refs.iframeDropzone && ![...this.refs.form.children].includes(this.refs.iframeDropzone)) {
      this.prependTo(this.refs.iframeDropzone, this.refs.form);
    }
  }

  detach() {
    console.log(`${this.id} - PDFBuilder - detach`);

    /*
      This invokes WebformBuilder.detach, and through it Component.detach():

      detach() {
        if (this.dragula) {
          this.dragula.destroy();
        }
        this.dragula = null;
        if (this.sideBarScroll && Templates.current.clearBuilderSidebarScroll) {
          Templates.current.clearBuilderSidebarScroll.call(this, this);
        }

        // Via Component.detach():

        this.removeEventListeners();
        if (this.tooltip) {
          this.tooltip.dispose();
        }
      }
    */

    if (!this.stateDebug.initialized) {
      console.log('WARNING - DETACHING UNINITIALIZED PDFBUILDER');
    }

    if (!this.stateDebug.rendered) {
      console.log('WARNING - DETACHING UNRENDERED PDFBUILDER');
    }

    if (!this.stateDebug.attached) {
      console.log('WARNING - DETACHING UNATTACHED PDFBUILDER');
    }

    const result = super.detach();

    this.stateDebug.attached = false;

    return result;
  }

  destroy() {
    console.log(`${this.id} - PDFBuilder - destroy`);

    /*
      There is no WebformBuilder.destroy; this invokes Component.destroy():

      destroy() {
        this.removeEventListeners();
        this.removeAllEvents();
        this.detach();
      }
    */

    super.destroy();

    /*
      This removes event listeners:

      this.off('iframe-submission');
      this.off('iframe-ready');
    */
    this.webform.destroy();

    this.stateDebug.initialized = false;
    this.stateDebug.rendered = false;
    // this.stateDebug.attached = false;
  }

  // d8b 8888888888                                                                              888
  // Y8P 888                                                                                     888
  //     888                                                                                     888
  // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
  // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
  // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
  // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
  // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'

  initIframeEvents() {
    this.webform.on('iframe-elementUpdate', schema => {
      const component = this.webform.getComponentById(schema.id);
      if (component && component.component) {
        component.component.overlay = {
          page: schema.page,
          left: schema.left,
          top: schema.top,
          height: schema.height,
          width: schema.width
        };
        this.editComponent(component.component, this.webform.iframeElement);
        this.emit('updateComponent', component);
      }
      return component;
    });

    this.webform.on('iframe-componentUpdate', schema => {
      const component = this.webform.getComponentById(schema.id);
      if (component && component.component) {
        component.component.overlay = {
          page: schema.overlay.page,
          left: schema.overlay.left,
          top: schema.overlay.top,
          height: schema.overlay.height,
          width: schema.overlay.width
        };
        this.emit('updateComponent', component);
        this.emit('change', this.form);
      }
      return component;
    });

    this.webform.on('iframe-componentClick', schema => {
      const component = this.webform.getComponentById(schema.id);
      if (component) {
        this.editComponent(component.component, this.webform.iframeElement);
      }
    }, true);
  }

  addComponent(component, element, data, before) {
    console.log('PDFBuilder.addComponent()');
    // return super.addComponent(component, element, data, before, true);
  }

  // removeComponent(a, b, c, d, e, f) {
  //   console.log('PDFBuilder.removeComponent()');
  // }

  // 8888888b.                                                                   888                   d8b
  // 888  "Y88b                                                                  888                   Y8P
  // 888    888                                                                  888
  // 888    888 888d888 .d88b.  88888b. 88888888  .d88b.  88888b.   .d88b.       888  .d88b.   .d88b.  888  .d8888b
  // 888    888 888P"  d88""88b 888 "88b   d88P  d88""88b 888 "88b d8P  Y8b      888 d88""88b d88P"88b 888 d88P"
  // 888    888 888    888  888 888  888  d88P   888  888 888  888 88888888      888 888  888 888  888 888 888
  // 888  .d88P 888    Y88..88P 888 d88P d88P    Y88..88P 888  888 Y8b.          888 Y88..88P Y88b 888 888 Y88b.
  // 8888888P"  888     "Y88P"  88888P" 88888888  "Y88P"  888  888  "Y8888       888  "Y88P"   "Y88888 888  "Y8888P
  //                            888                                                                888
  //                            888                                                           Y8b d88P
  //                            888                                                            "Y88P"

  initDropzoneEvents() {
    // This is required per HTML spec in order for the drop event to fire
    this.addEventListener(this.refs.iframeDropzone, 'dragover', (e) => {
      console.log('dropzone dragover');
      e.preventDefault();
      return false;
    });

    this.addEventListener(this.refs.iframeDropzone, 'drop', this.onDropzoneDrop.bind(this));
  }

  prepSidebarComponentsForDrag() {
    [...this.refs['sidebar-container'].children].forEach(el => {
      el.draggable = true;
      el.setAttribute('draggable', true);

      this.addEventListener(el, 'dragstart', this.onDragStart.bind(this), true);
      this.addEventListener(el, 'dragend',   this.onDragEnd  .bind(this), true);
    });
  }

  updateDropzoneDimensions() {
    if (!this.refs.iframeDropzone) {
      return;
    }

    const iframeRect = getElementRect(this.webform.refs.iframeContainer);
    this.refs.iframeDropzone.style.height = iframeRect && iframeRect.height ? `${iframeRect.height}px` : '1000px';
    this.refs.iframeDropzone.style.width  = iframeRect && iframeRect.width  ? `${iframeRect.width }px` : '100%';
  }

  onDragStart(e) {
    console.log('component drag start');
    e.dataTransfer.setData('text/html', null);

    this.updateDropzoneDimensions();
    this.addClass(this.refs.iframeDropzone, 'enabled');
  }

  onDropzoneDrop(e) {
    console.log('dropzone drop');
    this.dropEvent = e;
    e.preventDefault();
    return false;
  }

  onDragEnd(e) {
    console.log('component drag end');

    // IMPORTANT - must retrieve offsets BEFORE disabling the dropzone - offsets will
    // reflect absolute positioning if accessed after the target element is hidden
    const offsetX = this.dropEvent ? this.dropEvent.offsetX : null;
    const offsetY = this.dropEvent ? this.dropEvent.offsetY : null;

    // Always disable the dropzone on drag end
    this.removeClass(this.refs.iframeDropzone, 'enabled');

    // If there hasn't been a drop event on the dropzone, we're done
    if (!this.dropEvent) {
      return;
    }

    const element = e.target;
    const type = element.getAttribute('data-type');

    const schema = _.cloneDeep(this.schemas[type]);

    schema.key = _.camelCase(
      schema.label ||
      schema.placeholder ||
      schema.type
    );

    // Set a unique key for this component.
    BuilderUtils.uniquify([this.webform.component], schema);

    this.webform.component.components.push(schema);

    this.emit('addComponent', schema);

    schema.overlay = {
      top: offsetY,
      left: offsetX,
      width: 100,
      height: 20
    };

    this.webform.addComponent(schema, {}, null, true);
    this.webform.postMessage({ name: 'addElement', data: schema });

    // Delete the stored drop event now that it's been handled
    this.dropEvent = null;
  }

  // addComponentTo(parent, schema, element, sibling) {
  //   const comp = super.addComponentTo(parent, schema, element, sibling);
  //   comp.isNew = true;
  //   if (this.webform && schema.overlay) {
  //     this.webform.postMessage({ name: 'addElement', data: schema });
  //   }
  //   return comp;
  // }

  // deleteComponent(component) {
  //   if (this.webform && component.component) {
  //     this.webform.postMessage({ name: 'removeElement', data: component.component });
  //   }
  //   return super.deleteComponent(component);
  // }

  // removeEventListeners(all) {
  //   super.removeEventListeners(all);
  //   _.each(this.groups, (group) => {
  //     _.each(group.components, (builderComponent) => {
  //       this.removeEventListener(builderComponent, 'dragstart');
  //       this.removeEventListener(builderComponent, 'dragend');
  //     });
  //   });
  // }

  // Don't need to add a submit button here... the webform will already do this.
  // addSubmitButton() {}
}
