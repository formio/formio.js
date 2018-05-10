import _ from 'lodash';
import BaseComponent from '../base/Base';
import {flattenComponents, evaluate} from '../../utils/utils';

export default class ButtonComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'button',
      label: 'Submit',
      key: 'submit',
      size: 'md',
      leftIcon: '',
      rightIcon: '',
      block: false,
      action: 'submit',
      disableOnInvalid: false,
      theme: 'default'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Button',
      group: 'basic',
      icon: 'fa fa-stop',
      documentation: 'http://help.form.io/userguide/#button',
      weight: 110,
      schema: ButtonComponent.schema()
    };
  }

  get defaultSchema() {
    return ButtonComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'button';
    info.attr.type = (['submit', 'saveState'].includes(this.component.action)) ? 'submit' : 'button';
    this.component.theme = this.component.theme || 'default';
    info.attr.class = `btn btn-${this.component.theme}`;
    if (this.component.size) {
      info.attr.class += ` btn-${this.component.size}`;
    }
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    if (this.component.customClass) {
      info.attr.class += ` ${this.component.customClass}`;
    }
    return info;
  }

  set loading(loading) {
    this.setLoading(this.buttonElement, loading);
  }

  set disabled(disabled) {
    super.disabled = disabled;
    this.setDisabled(this.buttonElement, disabled);
  }

  // No label needed for buttons.
  createLabel() {}

  createInput(container) {
    this.buttonElement = super.createInput(container);
    return this.buttonElement;
  }

  get emptyValue() {
    return false;
  }

  getValue() {
    return this.dataValue;
  }

  get clicked() {
    return this.dataValue;
  }

  get defaultValue() {
    return false;
  }

  set dataValue(value) {
    if (!this.component.input) {
      return;
    }
    super.dataValue = value;
  }

  get className() {
    let className = super.className;
    className += ' form-group';
    return className;
  }

  /* eslint-disable max-statements */
  build() {
    if (this.viewOnly) {
      this.component.hidden = true;
    }

    this.dataValue = false;
    this.hasError = false;
    this.createElement();
    this.createInput(this.element);
    this.addShortcut(this.buttonElement);
    this.hook('input', this.buttonElement, this.element);
    if (this.component.leftIcon) {
      this.buttonElement.appendChild(this.ce('span', {
        class: this.component.leftIcon
      }));
      this.buttonElement.appendChild(this.text(' '));
    }

    if (this.component.label) {
      this.labelElement = this.text(this.addShortcutToLabel());
      this.buttonElement.appendChild(this.labelElement);
      this.createTooltip(this.buttonElement, null, this.iconClass('question-sign'));
    }
    if (this.component.rightIcon) {
      this.buttonElement.appendChild(this.text(' '));
      this.buttonElement.appendChild(this.ce('span', {
        class: this.component.rightIcon
      }));
    }
    if (this.component.action === 'submit') {
      const errorContainer = this.ce('div', {
        class: 'has-error'
      });
      const error = this.ce('span', {
        class: 'help-block'
      });
      error.appendChild(this.text(this.errorMessage('error')));
      errorContainer.appendChild(error);

      this.on('submitButton', () => {
        this.loading = true;
        this.disabled = true;
      }, true);
      this.on('submitDone', () => {
        this.loading = false;
        this.disabled = false;
      }, true);
      this.on('change', (value) => {
        this.loading = false;
        const isValid = this.root.isValid(value.data, true);
        this.disabled = this.options.readOnly || (this.component.disableOnInvalid && !isValid);
        if (isValid && this.hasError) {
          this.hasError = false;
          this.removeChild(errorContainer);
        }
      }, true);
      this.on('error', () => {
        this.loading = false;
        this.hasError = true;
        this.append(errorContainer);
      }, true);
    }

    if (this.component.action === 'url') {
      this.on('requestButton', () => {
        this.loading = true;
        this.disabled = true;
      }, true);
      this.on('requestDone', () => {
        this.loading = false;
        this.disabled = false;
      }, true);
      this.on('change', (value) => {
        this.loading = false;
        this.disabled = (this.component.disableOnInvalid && !this.root.isValid(value.data, true));
      }, true);
      this.on('error', () => {
        this.loading = false;
      }, true);
    }
    this.addEventListener(this.buttonElement, 'click', (event) => {
      this.dataValue = true;
      switch (this.component.action) {
        case 'saveState':
        case 'submit':
          event.preventDefault();
          event.stopPropagation();
          this.emit('submitButton', {
            state: this.component.state || 'submitted'
          });
          break;
        case 'event':
          this.emit(this.component.event, this.data);
          this.events.emit(this.component.event, this.data);
          this.emit('customEvent', {
            type: this.component.event,
            component: this.component,
            data: this.data,
            event: event
          });
          break;
        case 'custom': {
          // Get the FormioForm at the root of this component's tree
          const form = this.getRoot();
          // Get the form's flattened schema components
          const flattened = flattenComponents(form.component.components, true);
          // Create object containing the corresponding HTML element components
          const components = {};
          _.each(flattened, (component, key) => {
            const element = form.getComponent(key);
            if (element) {
              components[key] = element;
            }
          });

          evaluate(this.component.custom, {
            form,
            flattened,
            components,
            _,
            data: this.data,
            component: this.component,
            instance: this
          });
          break;
        }
        case 'url':
          this.emit('requestButton');
          this.emit('requestUrl', {
            url: this.component.url,
            headers: this.component.headers
          });
          break;
        case 'reset':
          this.emit('resetForm');
          break;
        case 'delete':
          this.emit('deleteSubmission');
          break;
        case 'oauth':
          if (this.root === this) {
            console.warn('You must add the OAuth button to a form for it to function properly');
            return;
          }

          // Display Alert if OAuth config is missing
          if (!this.component.oauth) {
            this.root.setAlert('danger', 'You must assign this button to an OAuth action before it will work.');
            break;
          }

          // Display Alert if oAuth has an error is missing
          if (this.component.oauth.error) {
            this.root.setAlert('danger', `The Following Error Has Occured${this.component.oauth.error}`);
            break;
          }

          this.openOauth(this.component.oauth);

          break;
      }
    });
    if (this.shouldDisable) {
      this.disabled = true;
    }

    function getUrlParameter(name) {
      name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
      const results = regex.exec(location.search);
      if (!results) {
        return results;
      }
      return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // If this is an OpenID Provider initiated login, perform the click event immediately
    if ((this.component.action === 'oauth') && this.component.oauth && this.component.oauth.authURI) {
      const iss = getUrlParameter('iss');
      if (iss && (this.component.oauth.authURI.indexOf(iss) === 0)) {
        this.openOauth();
      }
    }

    this.autofocus();
  }
  /* eslint-enable max-statements */

  openOauth() {
    if (!this.root.formio) {
      console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
      return;
    }

    const settings = this.component.oauth;

    /*eslint-disable camelcase */
    let params = {
      response_type: 'code',
      client_id: settings.clientId,
      redirect_uri: window.location.origin || `${window.location.protocol}//${window.location.host}`,
      state: settings.state,
      scope: settings.scope
    };
    /*eslint-enable camelcase */

    // Make display optional.
    if (settings.display) {
      params.display = settings.display;
    }

    params = Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`;
    }).join('&');

    const url = `${settings.authURI}?${params}`;
    const popup = window.open(url, settings.provider, 'width=1020,height=618');

    const interval = setInterval(() => {
      try {
        const popupHost = popup.location.host;
        const currentHost = window.location.host;
        if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
          popup.close();
          const params = popup.location.search.substr(1).split('&').reduce((params, param) => {
            const split = param.split('=');
            params[split[0]] = split[1];
            return params;
          }, {});
          if (params.error) {
            alert(params.error_description || params.error);
            this.root.setAlert('danger', params.error_description || params.error);
            return;
          }
          // TODO: check for error response here
          if (settings.state !== params.state) {
            this.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');
            return;
          }
          const submission = {data: {}, oauth: {}};
          submission.oauth[settings.provider] = params;
          submission.oauth[settings.provider].redirectURI = window.location.origin
            || `${window.location.protocol}//${window.location.host}`;
          this.root.formio.saveSubmission(submission)
            .then((result) => {
              this.root.onSubmit(result, true);
            })
            .catch((err) => {
              this.root.onSubmissionError(err);
            });
        }
      }
      catch (error) {
        if (error.name !== 'SecurityError') {
          this.root.setAlert('danger', error.message || error);
        }
      }
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(interval);
      }
    }, 100);
  }

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
    this.removeShortcut(this.buttonElement);
  }

  focus() {
    this.button.focus();
  }
}

