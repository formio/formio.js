import { BaseComponent } from '../base/Base';
import FormioUtils from '../../utils';
import _each from 'lodash/each';

export class ButtonComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'button';
    info.attr.type = (this.component.action === 'submit') ? 'submit' : 'button';
    this.component.theme = this.component.theme || 'default';
    info.attr.class = 'btn btn-' + this.component.theme;
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    if (this.component.customClass) {
      info.attr.class += ' ' + this.component.customClass;
    }
    return info;
  }

  set loading(loading) {
    this.setLoading(this.button, loading);
  }

  set disabled(disabled) {
    super.disabled = disabled;
    this.setDisabled(this.button, disabled);
  }

  getValue() {
    if (!this.component.input) {
      return;
    }
    return this.clicked;
  }

  get className() {
    let className = super.className;
    className += ' form-group';
    return className;
  }

  build() {
    if (this.viewOnly) {
      this.component.hidden = true;
    }

    this.clicked = false;
    this.createElement();
    this.element.appendChild(this.button = this.ce(this.info.type, this.info.attr));
    this.addShortcut(this.button);
    if (this.component.label) {
      this.labelElement = this.text(this.addShortcutToLabel());
      this.button.appendChild(this.labelElement);
      this.createTooltip(this.button, null, this.iconClass('question-sign'));
    }
    if (this.component.action === 'submit') {
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
        this.disabled = (this.component.disableOnInvalid && !this.root.isValid(value.data, true));
      }, true);
      this.on('error', () => {
        this.loading = false;
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
    this.addEventListener(this.button, 'click', (event) => {
      this.clicked = false;
      switch (this.component.action) {
        case 'submit':
          event.preventDefault();
          event.stopPropagation();
          this.emit('submitButton');
          break;
        case 'event':
          this.events.emit(this.component.event, this.data);
          this.emit('customEvent', {
            type: this.component.event,
            component: this.component,
            data: this.data,
            event: event
          });
          break;
        case 'custom':
          // Get the FormioForm at the root of this component's tree
          var form = this.getRoot();
          // Get the form's flattened schema components
          var flattened = FormioUtils.flattenComponents(form.component.components, true);
          // Create object containing the corresponding HTML element components
          var components = {};
          _each(flattened, function(component, key) {
            var element = form.getComponent(key);
            if (element) {
              components[key] = element;
            }
          });

          try {
            (new Function('form', 'flattened', 'components', 'data', this.component.custom.toString()))(form, flattened, components, this.data);
          }
          catch (e) {
            /* eslint-disable no-console */
            console.warn('An error occurred evaluating custom logic for ' + this.key, e);
            /* eslint-enable no-console */
          }
          break;
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
        case 'oauth':
          if (this.root === this) {
            console.warn('You must add the OAuth button to a form for it to function properly');
            return;
          }

          // Display Alert if OAuth config is missing
          if(!this.component.oauth){
            this.root.setAlert('danger', 'You must assign this button to an OAuth action before it will work.');
            break;
          }

          // Display Alert if oAuth has an error is missing
          if(this.component.oauth.error){
            this.root.setAlert('danger', 'The Following Error Has Occured' + this.component.oauth.error);
            break;
          }

          this.openOauth(this.component.oauth);

          break;
      }
    });
    if (this.shouldDisable) {
      this.disabled = true;
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
      redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
      state: settings.state,
      scope: settings.scope
    };
    /*eslint-enable camelcase */

    // Make display optional.
    if (settings.display) {
      params.display = settings.display;
    }

    params = Object.keys(params).map(key => {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    const url = settings.authURI + '?' + params;
    const popup = window.open(url, settings.provider, 'width=1020,height=618');

    const interval = setInterval(() => {
      try {
        const popupHost = popup.location.host;
        const currentHost = window.location.host;
        if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
          popup.close();
          let params = popup.location.search.substr(1).split('&').reduce((params, param) => {
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
          submission.oauth[settings.provider].redirectURI = window.location.origin || window.location.protocol + '//' + window.location.host;
          this.root.formio.saveSubmission(submission)
            .then(submission => {
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
    this.removeShortcut(this.element);
  }
}

