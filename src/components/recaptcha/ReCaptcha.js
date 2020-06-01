/*globals grecaptcha*/
import Component from '../_classes/component/Component';
import Formio from '../../Formio';
import _get from 'lodash/get';
import NativePromise from 'native-promise-only';

export default class ReCaptchaComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'recaptcha',
      key: 'recaptcha',
      label: 'reCAPTCHA'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'reCAPTCHA',
      group: 'premium',
      icon: 'refresh',
      documentation: 'http://help.form.io/userguide/#recaptcha',
      weight: 40,
      schema: ReCaptchaComponent.schema()
    };
  }

  render() {
    if (this.builderMode) {
      return super.render('reCAPTCHA');
    }
    else {
      return super.render('', true);
    }
  }

  createInput() {
    if (this.builderMode) {
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
      this.recaptchaVerifiedPromise = new NativePromise((resolve, reject) => {
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
      return this.recaptchaVerifiedPromise
        .then(() => super.beforeSubmit());
    }
    return super.beforeSubmit();
  }

  sendVerificationRequest(token) {
    return Formio.makeStaticRequest(`${Formio.projectUrl}/recaptcha?recaptchaToken=${token}`);
  }

  setValue(value) {
    const changed = this.hasChanged(value, this.dataValue);
    this.dataValue = value;
    return changed;
  }

  getValue() {
    return this.dataValue;
  }
}
