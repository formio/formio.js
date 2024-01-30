import _ from 'lodash';
import NativePromise from 'native-promise-only';
import { GlobalFormio as Formio } from './Formio';

import WebformBuilder from './WebformBuilder';
import { fastCloneDeep, getElementRect , getBrowserInfo } from './utils/utils';
import { eachComponent } from './utils/formUtils';
import BuilderUtils from './utils/builder';
import PDF from './PDF';

export default class PDFBuilder extends WebformBuilder {
  constructor() {
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
    options.display = 'pdf';

    if (element) {
      super(element, options);
    }
    else {
      super(options);
    }

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
          datetime: true,
          file: true,
          htmlelement: true,
          signrequestsignature: true
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

  get hasPDF() {
    return _.has(this.webform.form, 'settings.pdf');
  }

  get projectUrl() {
    return this.options.projectUrl || Formio.getProjectUrl();
  }

  init() {
    this.options.attachMode = 'builder';
    this.webform = this.webform || this.createForm(this.options);
    this.webform.init();
  }

  render() {
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
            groupId: `group-container-${groupKey}`,
            subgroups: []
          })),
        })),
      }),
      form: this.hasPDF ?
        this.webform.render() :
        this.renderTemplate('pdfBuilderUpload', {})
    });

    return result;
  }

  attach(element) {
    // PDF Upload
    if (!this.hasPDF) {
      this.loadRefs(element, {
        'fileDrop': 'single',
        'fileBrowse': 'single',
        'hiddenFileInputElement': 'single',
        'uploadError': 'single',
        'uploadProgress': 'single',
        'uploadProgressWrapper': 'single',
        'dragDropText': 'single'
      });
      this.addEventListener(this.refs['pdf-upload-button'], 'click', (event) => {
        event.preventDefault();
      });

      // Init the upload error.
      if (!this.projectUrl) {
        this.setUploadError('Form options.projectUrl not set. Please set the "projectUrl" property of the options for this form or use Formio.setProjectUrl(). This setting is necessary to upload a pdf background.');
      }
      else {
        this.setUploadError();
      }

      if (this.refs.fileDrop) {
        const element = this;
        this.addEventListener(this.refs.fileDrop, 'dragover', function(event) {
          this.className = 'fileSelector fileDragOver';
          event.preventDefault();
        });
        this.addEventListener(this.refs.fileDrop, 'dragleave', function(event) {
          this.className = 'fileSelector';
          event.preventDefault();
        });
        this.addEventListener(this.refs.fileDrop, 'drop', function(event) {
          this.className = 'fileSelector';
          event.preventDefault();
          element.upload(event.dataTransfer.files[0]);
          return false;
        });
      }

      if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
        this.addEventListener(this.refs.fileBrowse, 'click', (event) => {
          event.preventDefault();
          // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
          // a click event on it.
          if (typeof this.refs.hiddenFileInputElement.trigger === 'function') {
            this.refs.hiddenFileInputElement.trigger('click');
          }
          else {
            this.refs.hiddenFileInputElement.click();
          }
        });
        this.addEventListener(this.refs.hiddenFileInputElement, 'change', () => {
          if (!this.refs.hiddenFileInputElement.value) {
            return;
          }

          this.upload(this.refs.hiddenFileInputElement.files[0]);
          this.refs.hiddenFileInputElement.value = '';
        });
      }

      return NativePromise.resolve();
    }

    // Normal PDF Builder
    return super.attach(element).then(() => {
      this.loadRefs(this.element, {
        iframeDropzone: 'single',
        'sidebar-container': 'multiple',
        'sidebar': 'single',
      });

      this.afterAttach();
      return this.element;
    });
  }

  afterAttach() {
    this.on('saveComponent', (component) => {
      this.webform.postMessage({ name: 'updateElement', data: component });
    });
    this.on('removeComponent', (component) => {
      this.webform.postMessage({ name: 'removeElement', data: component });
    });
    this.initIframeEvents();
    this.updateDropzoneDimensions();

    const sidebar = this.refs.sidebar;
    if (sidebar) {
      this.addClass(sidebar, 'disabled');
      this.webform.on('iframe-ready', () => {
        this.pdfLoaded = true;
        this.updateDragAndDrop();
        this.removeClass(sidebar, 'disabled');
      }, true);
    }
  }

  upload(file) {
    const formio = new Formio(this.projectUrl);
    if (this.refs.dragDropText) {
      this.refs.dragDropText.style.display = 'none';
    }
    if (this.refs.uploadProgressWrapper) {
      this.refs.uploadProgressWrapper.style.display = 'inherit';
    }
    formio.uploadFile('url', file, file, '', (event) => {
      if (this.refs.uploadProgress) {
        const progress = Math.floor((event.loaded / event.total) * 100);
        this.refs.uploadProgress.style.width = `${progress}%`;
        if (progress > 98) {
          this.refs.uploadProgress.innerHTML = this.t('Converting PDF. Please wait.');
        }
        else {
          this.refs.uploadProgress.innerHTML = `${this.t('Uploading')} ${progress}%`;
        }
      }
    }, `${this.projectUrl}/upload`, {}, 'file')
      .then((result) => {
        let autoConversionComponentsAssigned = false;

        if (result.data.formfields?.components && result.data.formfields.components.length) {
          const formInitState = this.webform.form.components[0]?.key === 'submit';
          const wizardInitState = this.webform.form.components[0]?.key === 'page1' &&
                                  this.webform.form.components[0]?.components.length === 0;
          const emptyFormState = this.webform.form.components.length === 0;

          if (formInitState || wizardInitState || emptyFormState) {
            autoConversionComponentsAssigned = true;
            this.webform.form.components = result.data.formfields.components;
          }
        }
        if (this.refs.dragDropText) {
          this.refs.dragDropText.style.display = 'inherit';
        }
        if (this.refs.uploadProgressWrapper) {
          this.refs.uploadProgressWrapper.style.display = 'none';
        }

        _.set(this.webform.form, 'settings.pdf', {
          id: result.data.file,
          src: result.data.filesServer ? `${result.data.filesServer}${result.data.path}` : `${new URL(this.projectUrl).origin}/pdf-proxy${result.data.path}`,
          nonFillableConversionUsed: autoConversionComponentsAssigned && result.data.formfields.nonFillableConversionUsed
        });

        this.emit('pdfUploaded', result.data);
        this.redraw();
      })
      .catch((err) => this.setUploadError(err));
  }

  setUploadError(message) {
    if (!this.refs.uploadError) {
      return;
    }
    this.refs.uploadError.style.display = message ? '' : 'none';
    this.refs.uploadError.innerHTML = message;
  }

  createForm(options) {
    // Instantiate the webform from the PDF class instead of Webform
    options.skipInit = false;
    options.hideLoader = true;
    this.webform = new PDF(this.element, options);
    this.webform.on('attach', () => {
      // If the dropzone exists but has been removed in a PDF rebuild, reinstate it
      if (this.refs.iframeDropzone && ![...this.refs.form.children].includes(this.refs.iframeDropzone)) {
        this.prependTo(this.refs.iframeDropzone, this.refs.form);
      }
    });
    return this.webform;
  }

  destroy(deleteFromGlobal) {
    super.destroy(deleteFromGlobal);
    this.webform.destroy(deleteFromGlobal);
  }

  // d8b 8888888888                                                                              888
  // Y8P 888                                                                                     888
  //     888                                                                                     888
  // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
  // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
  // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
  // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
  // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'
  getParentContainer(component) {
    let container = [];
    let originalComponent = null;
    eachComponent(this.webform._form.components, (comp, path, components) => {
      if (comp.id === component.component.id) {
        container = components;
        originalComponent = comp;
        return true;
      }
    }, true);
    return {
      formioComponent: component.parent,
      formioContainer: container,
      originalComponent
    };
  }

  initIframeEvents() {
    this.webform.off('iframe-elementUpdate');
    this.webform.off('iframe-componentUpdate');
    this.webform.off('iframe-componentClick');
    this.webform.on('iframe-elementUpdate', schema => {
      const component = this.webform.getComponentById(schema.id);
      if (component && component.component) {
        const isNew = true;
        component.component.overlay = {
          page: schema.page,
          left: schema.left,
          top: schema.top,
          height: schema.height,
          width: schema.width
        };

        if (!this.options.noNewEdit && !component.component.noNewEdit) {
          this.editComponent(component.component, this.getParentContainer(component), isNew);
        }
        this.emit('updateComponent', component.component);
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
        this.emit('updateComponent', component.component);
        this.emit('change', this.form);
      }
      return component;
    });

    this.webform.on('iframe-componentClick', schema => {
      const component = this.webform.getComponentById(schema.id);
      if (component) {
        this.editComponent(component.component, this.getParentContainer(component));
      }
    }, true);
  }

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
    if (!this.refs.iframeDropzone) {
      return;
    }
    // This is required per HTML spec in order for the drop event to fire
    this.removeEventListener(this.refs.iframeDropzone, 'dragover');
    this.removeEventListener(this.refs.iframeDropzone, 'drop');
    this.addEventListener(this.refs.iframeDropzone, 'dragover', (e) => {
      e.preventDefault();
      return false;
    });

    this.addEventListener(this.refs.iframeDropzone, 'drop', this.onDropzoneDrop.bind(this));
  }

  updateDragAndDrop() {
    if (!this.pdfLoaded) {
      return;
    }
    this.initDropzoneEvents();
    this.prepSidebarComponentsForDrag();
  }

  prepSidebarComponentsForDrag() {
    if (!this.refs['sidebar-container']) {
      return;
    }
    this.refs['sidebar-container'].forEach(container => {
      [...container.children].forEach(el => {
        el.draggable = true;
        el.setAttribute('draggable', true);
        this.removeEventListener(el, 'dragstart');
        this.removeEventListener(el, 'dragend');
        this.addEventListener(el, 'dragstart', this.onDragStart.bind(this), true);
        this.addEventListener(el, 'dragend', this.onDragEnd.bind(this), true);
        this.addEventListener(el, 'drag', (e) => {
          e.target.style.cursor = 'none';
        });
      });
    });
  }

  updateDropzoneDimensions() {
    if (!this.refs.iframeDropzone) {
      return;
    }

    const iframeRect = getElementRect(this.webform.refs.iframeContainer);
    this.refs.iframeDropzone.style.height = iframeRect && iframeRect.height ? `${iframeRect.height}px` : '1000px';
    this.refs.iframeDropzone.style.width = iframeRect && iframeRect.width ? `${iframeRect.width}px` : '100%';
  }

  onDragStart(e) {
    // Taking the current offset of a dragged item relative to the cursor
    const { offsetX = 0, offsetY = 0 } = e;
    this.itemOffsetX = offsetX;
    this.itemOffsetY = offsetY;

    e.dataTransfer.setData('text', '');
    this.updateDropzoneDimensions();
    this.addClass(this.refs.iframeDropzone, 'enabled');
    this.dropEmitted = false;
  }

  onDropzoneDrop(e) {
    this.dropEmitted = true;
    this.dropEvent = e;
    e.preventDefault();
    return false;
  }

  onDragEnd(e) {
    // IMPORTANT - must retrieve offsets BEFORE disabling the dropzone - offsets will
    // reflect absolute positioning if accessed after the target element is hidden
    const iframeRect = this.webform.refs.iframeContainer.getBoundingClientRect();
    const layerX = this.dropEvent ? this.dropEvent.layerX : null;
    const layerY = this.dropEvent ? this.dropEvent.layerY : null;
    const WIDTH = 100;
    const HEIGHT = 20;
    // Always disable the dropzone on drag end
    this.removeClass(this.refs.iframeDropzone, 'enabled');

    // If there hasn't been a drop event on the dropzone, we're done
    if (!this.dropEvent) {
      // a 'drop' event may not be emited in the chrome browser when using a Mac, therefore an additional check has been added
      // eslint-disable-next-line no-undef
      if (!this.dropEmitted && (getBrowserInfo().chrome || getBrowserInfo().edge) && globalThis.navigator.userAgentData.platform === 'macOS' && iframeRect.left < e.clientX && iframeRect.top < e.clientY ) {
        this.dropEvent = e;
        this.dropEvent.dataTransfer.effectAllowed = 'all';
        this.dropEmitted = true;
      }
      else {
        return;
      }
    }

    const element = e.target;
    const type = element.getAttribute('data-type');
    const key = element.getAttribute('data-key');
    const group = element.getAttribute('data-group');
    const schema = fastCloneDeep(this.schemas[type]);

    if (key && group) {
      const info = this.getComponentInfo(key, group);
      _.merge(schema, info);
    }

    // Set a unique key for this component.
    BuilderUtils.uniquify([this.webform._form], schema);
    this.webform._form.components.push(schema);

    schema.overlay = {
      top: layerY ? (layerY - this.itemOffsetY + HEIGHT) : (e.clientY - iframeRect.top - (this.itemOffsetY - HEIGHT )*2),
      left: layerX ? (layerX - this.itemOffsetX) : (e.clientX - iframeRect.left - this.itemOffsetX*2),
      width: WIDTH,
      height: HEIGHT
    };

    this.webform.addComponent(schema, {}, null, true);
    this.webform.postMessage({ name: 'addElement', data: schema });

    this.emit('addComponent', schema, this.webform, schema.key, this.webform.component.components.length, !this.options.noNewEdit && !schema.noNewEdit);

    // Delete the stored drop event now that it's been handled
    this.dropEvent = null;
    e.target.style.cursor = 'default';
  }

  highlightInvalidComponents() {
    const repeatablePaths = this.findRepeatablePaths();

    // update elements which path was duplicated if any pathes have been changed
    if (!_.isEqual(this.repeatablePaths, repeatablePaths)) {
      eachComponent(this.webform.getComponents(), (comp, path) => {
        if (this.repeatablePaths.includes(path)) {
          this.webform.postMessage({ name: 'updateElement', data: comp.component });
        }
      });

      this.repeatablePaths = repeatablePaths;
    }

    if (!repeatablePaths.length) {
      return;
    }

    eachComponent(this.webform.getComponents(), (comp, path) => {
      if (this.repeatablePaths.includes(path)) {
        this.webform.postMessage({
          name: 'showBuilderErrors',
          data: {
            compId: comp.component.id,
            errorMessage: `API Key is not unique: ${comp.key}`,
          }
        });
      }
    });
  }
}
