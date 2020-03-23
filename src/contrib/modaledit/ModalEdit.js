import _ from 'lodash';
import TextAreaComponent from '../../components/textarea/TextArea';
import ModalEditForm from './ModalEdit.form';

export default class ModalEditComponent extends TextAreaComponent {
  static schema(...extend) {
    return TextAreaComponent.schema({
      type: 'modaledit',
      label: 'Modal Edit',
      key: 'modalEdit',
      modalLayout: 'fixed',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Modal Edit',
      group: 'data',
      icon: 'font',
      weight: 40,
      schema: ModalEditComponent.schema()
    };
  }

  /** @override **/
  renderElement(content = '') {
    return this.renderTemplate('modaledit', { content });
  }

  /** @override **/
  attach(element) {
    this.loadRefs(element, {
      container: 'single',
      edit: 'single'
    });
    return super.attach(element);
  }

  /** @override **/
  attachElement(element) {
    // Allow work with div as if it would be plain input
    Object.defineProperty(element, 'value', {
      get: function() {
        return this.innerHTML;
      },
      set: function(value) {
        this.innerHTML = value;
      }
    });

    const show = this.showModal.bind(this);

    this.addEventListener(this.refs.container, 'dblclick', show);

    this.addEventListener(this.refs.edit, 'click', show);
  }

  /** @override **/
  createModal(element) {
    const self = this;
    const dialog = this.ce('div');
    this.setContent(dialog, this.renderTemplate('modaldialog'));
    dialog.refs = {};
    this.loadRefs.call(dialog, dialog, {
      overlay: 'single',
      content: 'single',
      inner: 'single',
      close: 'single'
    });
    const rect = this.getElementRect(this.refs.container);
    const layout = this.getModalLayout(rect);
    const styles = this.getModalStyle(layout);
    Object.assign(dialog.refs.content.style, styles);
    dialog.refs.inner.appendChild(element);
    this.addEventListener(dialog.refs.overlay, 'click', (event) => {
      event.preventDefault();
      dialog.close();
    });
    this.addEventListener(dialog.refs.close, 'click', (event) => {
      event.preventDefault();
      dialog.close();
    });
    this.addEventListener(dialog, 'close', () => {
      this.removeChildFrom(dialog, document.body);
    });

    dialog.close = function() {
      dialog.dispatchEvent(new CustomEvent('close'));
      self.removeChildFrom(dialog, document.body);
    };

    document.body.appendChild(dialog);
    return dialog;
  }

  /** @override **/
  updateOnChange(flags, changed = false) {
    if (super.updateOnChange(flags, changed)) {
      this.updateContentView(this.dataValue);
    }
  }

  showModal() {
    const elt = this.ce('div');
    this.setContent(elt, super.renderElement(this.dataValue));
    const editor = elt.children[0];
    if (this.isPlain) {
      editor.style.resize = 'vertical';
    }
    super.attachElement(editor);
    this.createModal(editor);
  }

  updateContentView(content = '') {
    const view = _.get(this, 'refs.input[0]', null);

    return this.setContent(view, content);
  }

  getElementRect(elt) {
    return elt.getBoundingClientRect();
  }

  getModalStyle(args, overrides = {}) {
    const defaultStyles = {
      position: 'absolute',
      height: 'auto',
    };

    const layout = _.mapValues(
      _.pick(args, ['top', 'left', 'width']),
      p => `${p}px`
    );

    return {
      ...defaultStyles,
      ...overrides,
      ...layout
    };
  }

  getModalLayout(rect) {
    const { width, height: minHeight } = this.getModalSize(rect.width, rect.height);
    return {
      left: rect.left,
      minHeight,
      top: rect.top,
      width,
    };
  }

  getModalSize(currentWidth, currentHeight) {
    const [dw, dh] = this.defaultModalSize;
    const type = _.get(this.component, 'modalLayout', 'fixed');
    const { widthProp, heightProp } = this.layoutProps[type];
    const width = _.get(this.component, widthProp, dw);
    const height = _.get(this.component, heightProp, dh);

    if (type === 'fluid') {
      return {
        width: Math.max(currentWidth, width),
        height: Math.max(currentHeight, height)
      };
    }

    return { width, height };
  }

  get defaultModalSize() {
    return [475, 300];
  }

  get layoutProps() {
    return {
      fixed: {
        widthProp: 'width',
        heightProp: 'height'
      },
      fluid: {
        widthProp: 'minWidth',
        heightProp: 'minHeight'
      }
    };
  }
}

ModalEditComponent.editForm = ModalEditForm;
