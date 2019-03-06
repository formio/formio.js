/*globals grecaptcha*/
import BaseComponent from '../base/Base';
import Formio from '../../Formio';
import _get from 'lodash/get';

export default class ReCaptchaComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'recaptcha',
      key: 'recaptcha',
      label: 'reCAPTCHA'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'reCAPTCHA',
      group: 'advanced',
      icon: 'fa fa-refresh',
      documentation: 'http://help.form.io/userguide/#recaptcha',
      weight: 550,
      schema: ReCaptchaComponent.schema()
    };
  }

  createInput() {
    if (this.options.builder) {
      // We need to see it in builder mode.
      this.append(this.text(this.name));
    }
    else {
      const siteKey = _get(this.root.form, 'settings.recaptcha.siteKey');
      if (siteKey) {
        const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        this.recaptchaApiReady = Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
      }
      else {
        console.warn('There is no Site Key specified in settings in form JSON');
      }
    }
  }

  createLabel() {
    return;
  }

  verify(actionName) {
    const siteKey = _get(this.root.form, 'settings.recaptcha.siteKey');
    if (!siteKey) {
      console.warn('There is no Site Key specified in settings in form JSON');
      return;
    }
    if (!this.recaptchaApiReady) {
      const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${_get(this.root.form, 'settings.recaptcha.siteKey')}`;
      this.recaptchaApiReady = Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
    }
    if (this.recaptchaApiReady) {
      this.recaptchaVerifiedPromise = new Promise((resolve, reject) => {
        this.recaptchaApiReady
          .then(() => {
            grecaptcha.ready(() => {
              grecaptcha
                .execute(siteKey, {
                  action: actionName
                })
                .then((token) => {
                  return this.sendVerificationRequest(token);
                })
                .then(verificationResult => {
                  this.setValue(verificationResult);
                  return resolve(verificationResult);
                });
            });
          })
          .catch(() => {
            return reject();
          });
      });
    }
  }

  beforeSubmit() {
    if (this.recaptchaVerifiedPromise) {
      return this.recaptchaVerifiedPromise;
    }
    return super.beforeSubmit();
  }

  sendVerificationRequest(token) {
    return Formio.makeStaticRequest(`${Formio.projectUrl}/recaptcha?recaptchaToken=${token}`);
  }

  setValue(value) {
    this.dataValue = value;
  }

  getValue() {
    return this.dataValue;
  }
}
