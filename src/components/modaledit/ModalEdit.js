/* globals InlineEditor */
import _ from 'lodash';
import Formio from '../../Formio';
import TextAreaComponent from '../textarea/TextArea';
import { withSwitch } from '../../utils/utils.js';
import NativePromise from 'native-promise-only';

const EDIT = Symbol('edit');
const VIEW = Symbol('view');
const CKEDITOR = 'https://cdn.ckeditor.com/ckeditor5/11.2.0/inline/ckeditor.js';

export default class ModalEditComponent extends TextAreaComponent {
  static schema(...extend) {
    return TextAreaComponent.schema({
      type: 'modaledit',
      label: 'Modal Edit',
      key: 'modalEdit',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Modal Edit',
      group: 'advanced',
      icon: 'fa fa-font',
      weight: 50,
      schema: ModalEditComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
    const [get, toggle] = withSwitch(VIEW, EDIT);
    this.getMode = get;
    this.toggleMode = () => {
      toggle();
      this.emit('modechange');
    };
  }

  build() {
    this.createElement();

    const labelAtTheBottom = this.component.labelPosition === 'bottom';

    if (!labelAtTheBottom) {
      this.createLabel(this.element);
    }

    this.editElement = this.buildEditMode({
      onCloseRequest: () => {
        this.removeChildFrom(this.editElement, document.body);
        this.toggleMode();
      }
    });
    this.preview = this.ce('div', { class: 'edittable-preview' });
    this.element.appendChild(this.preview);
    this.updateView(this.preview);

    if (labelAtTheBottom) {
      this.createLabel(this.element);
    }

    this.restoreValue();

    this.on('modechange', this.updateView.bind(this, this.preview));
  }

  buildViewMode({ content = '', onEdit: onClick }) {
    const icon = this.ce('i', { class: this.iconClass('edit') });
    const button = this.ce(
      'button',
      {
        type: 'button',
        role: 'button',
        onClick,
        class: 'btn btn-xxs btn-warning formio-modaledit-edit'
      },
      icon
    );
    const child = this.ce('div', { class: 'modaledit-view-inner reset-margins' });

    child.innerHTML = this.interpolate(content);

    return this.ce('div', {
      class: 'formio-modaledit-view-container',
      onDblClick: onClick,
    }, [
      button,
      child
    ]);
  }

  buildEditMode({ onCloseRequest, onCloseClick, onOverlayClick }) {
    const overlay = this.ce('div', { class: 'formio-dialog-overlay' });
    const inner = this.ce('div', { class: 'reset-margins' });
    const close = this.ce(
      'button',
      {
        type: 'button',
        class: 'btn btn-primary btn-xs formio-modaledit-close',
      },
      'Close'
    );
    const container = this.ce(
      'div',
      {
        class: 'formio-modaledit-content'
      },
      [
        close,
        inner
      ]
    );
    const dialog = this.ce('div', {
      class: 'formio-dialog formio-dialog-theme-default formio-modaledit-dialog',
    }, [
      overlay,
      container
    ]);
    const [dw, dh] = this.defaultEditorSize;
    const layout = _.get(this.component, 'editorLayout', this.defaultLayout);
    const widthPath = _.get(this.layoutOptions, [layout, 'width']);
    const heightPath = _.get(this.layoutOptions, [layout, 'height']);
    const width = _.get(this.component, widthPath, dw);
    const height = _.get(this.component, heightPath, dh);

    this.createInput(inner);

    if (this.isPlain) {
      const textarea = container.querySelector('textarea');
      textarea.style.minHeight = `${height}px`;
      textarea.style.borderRadius = 0;
      textarea.style.resize = 'vertical';
    }

    container.style.position = 'absolute';
    container.style.backgroundColor = '#fff';
    container.style.width = `${width}px`;
    container.style.minHeight = `${height}px`;

    this.addEventListener(overlay, 'click', event => {
      event.preventDefault();

      if (_.isFunction(onOverlayClick)) {
        onOverlayClick();
      }

      if (_.isFunction(onCloseRequest)) {
        onCloseRequest();
      }
    });

    this.addEventListener(close, 'click', event => {
      event.preventDefault();

      if (_.isFunction(onCloseClick)) {
        onCloseClick();
      }

      if (_.isFunction(onCloseRequest)) {
        onCloseRequest();
      }
    });

    dialog.updateLayout = () => {
      const rect = this.preview.getBoundingClientRect();
      container.style.top = `${rect.top}px`;
      container.style.left = `${rect.left}px`;
      container.style.width = `${Math.max(width, rect.width)}px`;
    };

    return dialog;
  }

  updateView(container) {
    const mode = this.getMode();

    if (this.options.builder || mode === VIEW) {
      const view = this.buildViewMode({
        onEdit: this.toggleMode,
        content: _.isString(this.dataValue) ? this.dataValue : '',
      });

      if (container.firstChild) {
        container.replaceChild(
          view,
          container.firstChild
        );
      }
      else {
        container.appendChild(view);
      }
    }

    if (mode === EDIT) {
      this.editElement.updateLayout();
      document.body.appendChild(this.editElement);
    }
  }

  // get defaultValue() {
  //   const value = super.defaultValue;
  //   return '';
  // }

  get defaultEditorSize() {
    return [300, 200];
  }

  get defaultLayout() {
    return 'grow';
  }

  get layoutOptions() {
    return {
      grow: {
        width: 'minEditorWidth',
        height: 'minEditorHeight',
      },
      fixed: {
        width: 'width',
        height: 'height'
      }
    };
  }

  addCKE(element, settings, onChange) {
    settings = _.isEmpty(settings) ? null : settings;
    return Formio.requireLibrary('ckeditor', 'InlineEditor', CKEDITOR, true)
      .then(() => {
        if (!element.parentNode) {
          return NativePromise.reject();
        }
        return InlineEditor.create(element, settings).then(editor => {
          editor.model.document.on('change', () => onChange(editor.data.get()));
          return editor;
        });
      });
  }
}
