import _ from 'lodash';
import Field from '../_classes/field/Field';
import Input from '../_classes/input/Input';
import { flattenComponents } from '../../utils/utils';

export default class ButtonComponent extends Field {
  static schema(...extend) {
    return Input.schema({
      type: 'button',
      label: 'Submit',
      key: 'submit',
      size: 'md',
      leftIcon: '',
      rightIcon: '',
      block: false,
      action: 'submit',
      persistent: false,
      disableOnInvalid: false,
      theme: 'primary',
      dataGridLabel: true
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Button',
      group: 'basic',
      icon: 'stop',
      documentation: 'http://help.form.io/userguide/#button',
      weight: 110,
      schema: ButtonComponent.schema()
    };
  }

  get defaultSchema() {
    return ButtonComponent.schema();
  }

  get inputInfo() {
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
    info.content = this.t(this.component.label);
    return info;
  }

  get labelInfo() {
    return {
      hidden: true
    };
  }

  set loading(loading) {
    this.setLoading(this.refs.button, loading);
  }

  // No label needed for buttons.
  createLabel() {}

  createInput(container) {
    this.refs.button = super.createInput(container);
    return this.refs.button;
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

  get className() {
    let className = super.className;
    className += ' form-group';
    return className;
  }

  render() {
    if (this.viewOnly || this.options.hideButtons) {
      this._visible = false;
    }
    return super.render(this.renderTemplate('button', {
      component: this.component,
      input: this.inputInfo,
    }));
  }

  attachButton() {
    this.addShortcut(this.refs.button);
    let onChange = null;
    let onError = null;
    if (this.component.action === 'submit') {
      this.on('submitButton', () => {
        this.loading = true;
        this.disabled = true;
      }, true);
      this.on('submitDone', () => {
        this.loading = false;
        this.disabled = false;
        this.addClass(this.refs.button, 'btn-success submit-success');
        this.removeClass(this.refs.button, 'btn-danger submit-fail');
        this.addClass(this.refs.buttonMessageContainer, 'has-success');
        this.removeClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, this.t('complete'));
      }, true);
      this.on('submitError', () => {
        this.loading = false;
        this.disabled = false;
        this.removeClass(this.refs.button, 'btn-success submit-success');
        this.addClass(this.refs.button, 'btn-danger submit-fail');
        this.removeClass(this.refs.buttonMessageContainer, 'has-success');
        this.addClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, this.t(this.errorMessage('error')));
      }, true);
      onChange = (value, isValid) => {
        this.removeClass(this.refs.button, 'btn-success submit-success');
        this.removeClass(this.refs.button, 'btn-danger submit-fail');
        if (isValid && this.hasError) {
          this.hasError = false;
          this.setContent(this.refs.buttonMessage, '');
          this.removeClass(this.refs.buttonMessageContainer, 'has-success');
          this.removeClass(this.refs.buttonMessageContainer, 'has-error');
        }
      };
      onError = () => {
        this.hasError = true;
        this.removeClass(this.refs.button, 'btn-success submit-success');
        this.addClass(this.refs.button, 'btn-danger submit-fail');
        this.removeClass(this.refs.buttonMessageContainer, 'has-success');
        this.addClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, this.t(this.errorMessage('error')));
      };
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
    }

    this.on('change', (value) => {
      this.loading = false;
      this.disabled = this.shouldDisabled || (this.component.disableOnInvalid && !value.isValid);
      this.setDisabled(this.refs.button, this.disabled);
      if (onChange) {
        onChange(value, value.isValid);
      }
    }, true);

    this.on('error', () => {
      this.loading = false;
      this.disabled = false;
      if (onError) {
        onError();
      }
    }, true);

    this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));

    this.disabled = this.shouldDisabled;

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
  }

  attach(element) {
    this.loadRefs(element, {
      button: 'single',
      buttonMessageContainer: 'single',
      buttonMessage: 'single'
    });

    const superAttach = super.attach(element);
    this.attachButton();
    return superAttach;
  }
  /* eslint-enable max-statements */

  detach(element) {
    if (element && this.refs.button) {
      this.removeShortcut(this.refs.button);
    }
  }

  onClick(event) {
    this.triggerReCaptcha();
    // Don't click if disabled or in builder mode.
    if (this.disabled || this.options.attachMode === 'builder') {
      return;
    }
    this.dataValue = true;
    if (this.component.action !== 'submit' && this.component.showValidations) {
      this.emit('checkValidity', this.data);
    }
    switch (this.component.action) {
      case 'saveState':
      case 'submit':
        event.preventDefault();
        event.stopPropagation();
        this.emit('submitButton', {
          state: this.component.state || 'submitted',
          component: this.component
        });
        break;
      case 'event':
        this.emit(this.interpolate(this.component.event), this.data);
        this.events.emit(this.interpolate(this.component.event), this.data);
        this.emit('customEvent', {
          type: this.interpolate(this.component.event),
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

        this.evaluate(this.component.custom, {
          form,
          flattened,
          components
        });
        break;
      }
      case 'url':
        this.emit('requestButton');
        this.emit('requestUrl', {
          url: this.interpolate(this.component.url),
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
  }

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
          const submission = { data: {}, oauth: {} };
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

  focus() {
    if (this.refs.button) {
      this.refs.button.focus();
    }
  }

  triggerReCaptcha() {
    if (!this.root) {
      return;
    }
    const recaptchaComponent = this.root.components.find((component) => {
      return component.component.type === 'recaptcha' &&
        component.component.eventType === 'buttonClick' &&
        component.component.buttonKey === this.component.key;
    });
    if (recaptchaComponent) {
      recaptchaComponent.verify(`${this.component.key}Click`);
    }
  }
}
