import _ from 'lodash';
import { getStringFromComponentPath } from '../../utils/utils';

export default class Alert {
  constructor(container, component) {
    this.container = container;
    this.alert = null;
    this.parentComponent = component;
    this.refs = {};
    this.loadRefs  = this.parentComponent.loadRefs.bind(this);
  }

  createAlert(errors) {
    const alertTemplate = this.parentComponent.ce('p');
    this.parentComponent.setContent(alertTemplate, this.parentComponent.t('error'));
    const ul = this.parentComponent.ce('ul');
    const message = document.createDocumentFragment();

    errors.forEach(err => {
      if (err) {
        if (err.messages && err.messages.length) {
          const errLabel = this.parentComponent.t(err.component.label);
          err.messages.forEach(({ message }, index) => this.createMessage(ul,`${errLabel}. ${message}`, index, err));
        }
        else if (err) {
          const message = _.isObject(err) ? err.message || '' : err;
          this.createMessage(ul, message);
        }
      }
    });
    alertTemplate.appendChild(ul);
    message.appendChild(alertTemplate);
    return message;
  }

  showErrors(errors, triggerEvent) {
    const alert = this.createAlert(errors);
    this.showAlert('danger', alert);
    if (triggerEvent) {
      this.parentComponent.emit('error', errors);
    }

    return errors;
  }

  showAlert(type, message, customClasses) {
    if (this.alert) {
      this.clear();
    }
    if (message) {
      this.alert = this.parentComponent.ce('div', {
        class: customClasses || `alert alert-${type}`,
        id: `error-list-${this.parentComponent.id}`,
      });
      if (message instanceof HTMLElement) {
        this.parentComponent.appendTo(message, this.alert);
      }
      else {
        this.parentComponent.setContent(this.alert, message);
      }
    }
    if (!this.alert) {
      return;
    }

    this.loadRefs(this.alert, { alertErrorRef: 'multiple' });

    if (this.refs.alertErrorRef && this.refs.alertErrorRef.length) {
      this.refs.alertErrorRef.forEach(el => {
        this.parentComponent.addEventListener(el, 'click', (e) => {
          const key = e.currentTarget.dataset.componentKey;
          this.focusOnComponent(key);
        });
        this.parentComponent.addEventListener(el, 'keypress', (e) => {
          if (e.keyCode === 13) {
            const key = e.currentTarget.dataset.componentKey;
            this.focusOnComponent(key);
          }
        });
      });
    }
    this.parentComponent.prependTo(this.alert, this.container);
  }

  clear() {
    try {
      if (this.refs.alertErrorRef && this.refs.alertErrorRef.length) {
        this.refs.alertErrorRef.forEach(el => {
          this.parentComponent.removeEventListener(el, 'click');
          this.parentComponent.removeEventListener(el, 'keypress');
        });
      }
      this.parentComponent.removeChildFrom(this.alert, this.container);
      this.alert = null;
    }
    catch (err) {
      // ignore
    }
  }

  focusOnComponent(keyOrPath) {
    if (keyOrPath) {
      const component = this.parentComponent.root && this.parentComponent.root.getComponent(keyOrPath);
      if (component) {
        component.focus();
      }
    }
  }

  createMessage(element, message, index, err) {
    const params = {
      ref: 'alertErrorRef',
      tabIndex: 0,
      'aria-label': `${message}. Click to navigate to the field with following error.`
    };

    const li = this.parentComponent.ce('li', params);
    this.parentComponent.setContent(li, message);

    const messageFromIndex = !_.isUndefined(index) && err.messages && err.messages[index];
    const keyOrPath = (messageFromIndex && messageFromIndex.path) || (err && err.component && err.component.key);
    if (keyOrPath) {
      const formattedKeyOrPath = getStringFromComponentPath(keyOrPath);
      li.dataset.componentKey = formattedKeyOrPath;
    }

    this.parentComponent.appendTo(li, element);
  }
}
