import _ from 'lodash';
import Field from '../_classes/field/Field';
import Input from '../_classes/input/Input';
import { componentValueTypes, eachComponent, getArrayFromComponentPath, getComponentSavedTypes } from '../../utils';

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
      documentation: '/userguide/form-building/form-components#button',
      weight: 110,
      schema: ButtonComponent.schema()
    };
  }

  static savedValueTypes(schema) {
    return getComponentSavedTypes(schema) || [componentValueTypes.boolean];
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.filesUploading = 0;
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
    info.content = this.t(this.component.label, { _userInput: true });
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

  get skipInEmail() {
    return true;
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
    className += ` ${this.transform('class', 'form-group')}`;
    return className;
  }

  get oauthConfig() {
    if (_.has(this, 'root.form.config.oauth') && this.component.oauthProvider) {
      return this.root.form.config.oauth[this.component.oauthProvider];
    }
    // Legacy oauth location.
    if (this.component.oauth) {
      return this.component.oauth;
    }
    return false;
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
        this.disabled = true;
      }, true);
      this.on('cancelSubmit', () => {
        this.disabled = false;
      }, true);
      this.on('submitDone', (message) => {
        const resultMessage = _.isString(message) ? message : this.t('complete');
        this.loading = false;
        this.disabled = false;
        this.addClass(this.refs.button, 'btn-success submit-success');
        this.removeClass(this.refs.button, 'btn-danger submit-fail');
        this.addClass(this.refs.buttonMessageContainer, 'has-success');
        this.removeClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, resultMessage);
      }, true);
      this.on('submitError', (message) => {
        const resultMessage = _.isString(message) ? this.t(message) : this.t(this.errorMessage('submitError'));
        this.loading = false;
        this.disabled = false;
        this.hasError = true;
        this.removeClass(this.refs.button, 'btn-success submit-success');
        this.addClass(this.refs.button, 'btn-danger submit-fail');
        this.removeClass(this.refs.buttonMessageContainer, 'has-success');
        this.addClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, resultMessage);
      }, true);

      this.on('fileUploadingStart', () => {
        this.filesUploading++;
        this.disabled = true;
        this.setDisabled(this.refs.button, this.disabled);
      }, true);

      this.on('fileUploadingEnd', () => {
        this.filesUploading--;
        this.disabled = this.shouldDisabled ? true : false;
        this.setDisabled(this.refs.button, this.disabled);
      }, true);

      onChange = (value, isValid) => {
        this.removeClass(this.refs.button, 'btn-success submit-success');
        if (isValid) {
          this.removeClass(this.refs.button, 'btn-danger submit-fail');
          if (this.hasError) {
            this.hasError = false;
            this.setContent(this.refs.buttonMessage, '');
            this.removeClass(this.refs.buttonMessageContainer, 'has-success');
            this.removeClass(this.refs.buttonMessageContainer, 'has-error');
          }
        }
      };
      onError = () => {
        this.hasError = true;
        this.removeClass(this.refs.button, 'btn-success submit-success');
        this.addClass(this.refs.button, 'btn-danger submit-fail');
        this.removeClass(this.refs.buttonMessageContainer, 'has-success');
        this.addClass(this.refs.buttonMessageContainer, 'has-error');
        this.setContent(this.refs.buttonMessage, this.t(this.errorMessage('submitError')));
      };
    }

    if (this.component.action === 'url') {
      this.on('requestButton', () => {
        this.disabled = true;
      }, true);
      this.on('requestDone', () => {
        this.loading = false;
        this.disabled = false;
      }, true);
    }

    this.on('change', (value, flags) => {
      let isValid = value.isValid;
      const isSilent = flags && flags.silent;
      //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors
      if (flags && flags.noValidate && (this.component.disableOnInvalid || this.hasError)) {
        isValid = flags.rootValidity || (this.root ? (this.root.validate(this.root.data, { dirty: false, silentCheck: true }).length === 0) : true);
        flags.rootValidity = isValid;
      }
      this.isDisabledOnInvalid = this.component.disableOnInvalid && (isSilent || !isValid);
      this.disabled = this.shouldDisabled;
      this.setDisabled(this.refs.button, this.disabled);

      if (onChange) {
        onChange(value, isValid);
      }
    }, true);

    this.on('error', () => {
      this.loading = false;
      this.disabled = false;
      if (onError) {
        onError();
      }
    }, true);

    if (this.component.saveOnEnter) {
      this.root.addEventListener(this.root.element, 'keyup', (event) => {
        if (event.keyCode === 13) {
          this.onClick.call(this, event);
        }
      });
    }
    this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));
    this.addEventListener(this.refs.buttonMessageContainer, 'click', () => {
      if (this.refs.buttonMessageContainer.classList.contains('has-error')) {
        if (this.root && this.root.alert) {
          this.scrollIntoView(this.root.alert);
        }
      }
    });

    this.disabled = this.shouldDisabled;
    this.setDisabled(this.refs.button, this.disabled);

    /**
     * Get url parameter by name
     * @param {string} name - The url parameter
     * @returns {string} - The url parameter value
     */
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
    if ((this.component.action === 'oauth') && this.oauthConfig && !this.oauthConfig.error) {
      const iss = getUrlParameter('iss');
      if (iss && (this.oauthConfig.authURI.indexOf(iss) === 0)) {
        this.openOauth(this.oauthConfig);
      }
    }
  }

  get shouldDisabled() {
    return super.shouldDisabled || this.filesUploading > 0 || this.isDisabledOnInvalid;
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
    super.detach();
  }

  onClick(event) {
    this.triggerCaptcha();
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
        this.loading = true;
        this.emit('submitButton', {
          noValidate: this.component.state === 'draft',
          state: this.component.state || 'submitted',
          component: this.component,
          instance: this
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

        const flattened = {};
        const components = {};

        eachComponent(form.components, (componentWrapper, path) => {
          const component = componentWrapper.component || componentWrapper;
          flattened[path] = component;
          components[component.key] = component;
        }, true);

        this.evaluate(this.component.custom, {
          form,
          flattened,
          components
        });

        this.triggerChange();
        break;
      }
      case 'url':
        this.loading = true;
        this.emit('requestButton', {
          component: this.component,
          instance: this
        });
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
          console.warn(this.t('noOAuthBtn'));
          return;
        }

        // Display Alert if OAuth config is missing
        if (!this.oauthConfig) {
          this.root.setAlert('danger', this.t('noOAuthConfiguration'));
          break;
        }

        // Display Alert if oAuth has an error is missing
        if (this.oauthConfig.error) {
          this.root.setAlert('danger', `${this.t('oAuthErrorsTitle')} ${this.t(this.oauthConfig.error)}`);
          break;
        }

        this.openOauth(this.oauthConfig);

        break;
    }
  }

  openOauth(settings) {
    if (!this.root.formio) {
      console.warn(this.t('noOAuthFormUrl'));
      return;
    }

    /*eslint-disable camelcase */
    let params = {
      response_type: 'code',
      client_id: settings.clientId,
      redirect_uri: (settings.redirectURI && this.interpolate(settings.redirectURI)) || window.location.origin || `${window.location.protocol}//${window.location.host}`,
      scope: settings.scope
    };
    if (settings.state) {
      params.state = settings.state;
    }
    else if (settings.code_challenge) {
      params.code_challenge = settings.code_challenge;
      params.code_challenge_method = 'S256';
    }

    /*eslint-enable camelcase */

    // Needs for the correct redirection URI for the OpenID
    const originalRedirectUri = params.redirect_uri;

    // Make display optional.
    if (settings.display) {
      params.display = settings.display;
    }

    params = Object.keys(params).map(key => {
      return `${key}=${encodeURIComponent(params[key])}`;
    }).join('&');

    const separator = settings.authURI.indexOf('?') !== -1 ? '&' : '?';
    const url = `${settings.authURI}${separator}${params}`;
    const popup = window.open(url, settings.provider, 'width=1020,height=618');

    const interval = setInterval(() => {
      try {
        const popupHost = popup.location.host;
        const currentHost = window.location.host;
        if (popup && !popup.closed && popupHost === currentHost) {
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
            this.root.setAlert('danger', this.t('oAuthStateError'));
            return;
          }
          // Depending on where the settings came from, submit to either the submission endpoint (old) or oauth endpoint (new).
          let requestPromise = Promise.resolve();

          if (_.has(this, 'root.form.config.oauth') && this.root.form.config.oauth[this.component.oauthProvider]) {
            params.provider = settings.provider;
            params.redirectURI = originalRedirectUri;

            // Needs for the exclude oAuth Actions that not related to this button
            params.triggeredBy = this.oauthComponentPath;
            requestPromise = this.root.formio.makeRequest('oauth', `${this.root.formio.projectUrl}/oauth2`, 'POST', params);
          }
          else {
            const submission = { data: {}, oauth: {} };
            submission.oauth[settings.provider] = params;
            submission.oauth[settings.provider].redirectURI = originalRedirectUri;
            if (settings.logoutURI) {
              this.root.formio.oauthLogoutURI(settings.logoutURI);
            }

            // Needs for the exclude oAuth Actions that not related to this button
            submission.oauth[settings.provider].triggeredBy = this.oauthComponentPath;
            requestPromise = this.root.formio.saveSubmission(submission);
          }
          requestPromise.then((result) => {
              this.root.onSubmit(result, true);
            })
            .catch((err) => {
              this.root.onSubmissionError(err);
            });
        }
      }
      catch (error) {
        if (error.name !== 'SecurityError' && (error.name !== 'Error' || error.message !== 'Permission denied')) {
          this.root.setAlert('danger', this.t(`${error.message || error}`));
        }
      }
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(interval);
      }
    }, 100);
  }

  get oauthComponentPath() {
    const pathArray = getArrayFromComponentPath(this.path);
    return _.chain(pathArray).filter(pathPart => !_.isNumber(pathPart)).join('.').value();
  }

  focus() {
    if (this.refs.button) {
      this.refs.button.focus();
    }
  }

  triggerCaptcha() {
    if (!this.root) {
      return;
    }

    let captchaComponent;

    this.root.everyComponent((component)=> {
      if (/^(re)?captcha$/.test(component.component.type) &&
        component.component.eventType === 'buttonClick' &&
        component.component.buttonKey === this.component.key) {
          captchaComponent = component;
        }
    });

    if (captchaComponent) {
      captchaComponent.verify(`${this.component.key}Click`);
    }
  }
}
