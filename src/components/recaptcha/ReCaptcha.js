/*globals grecaptcha*/
import Component from '../_classes/component/Component';
import { GlobalFormio as Formio } from '../../Formio';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
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
      documentation: '/userguide/form-building/premium-components#recaptcha',
      weight: 40,
      schema: ReCaptchaComponent.schema()
    };
  }

  static savedValueTypes() {
    return [];
  }

  render() {
    this.recaptchaResult = null;
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

  get skipInEmail() {
    return true;
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
            if (!this.isLoading) {
              this.isLoading= true;
              grecaptcha.ready(_debounce(() => {
                grecaptcha
                  .execute(siteKey, {
                    action: actionName
                  })
                  .then((token) => {
                    return this.sendVerificationRequest(token).then(({ verificationResult, token }) => {
                      this.recaptchaResult = {
                        ...verificationResult,
                        token,
                      };
                      this.updateValue(this.recaptchaResult);
                      return resolve(verificationResult);
                    });
                  })
                  .catch(() => {
                    this.isLoading = false;
                  });
              }, 1000));
            }
          })
          .catch(() => {
            return reject();
          });
      }).then(() => {
        this.isLoading = false;
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
    return Formio.makeStaticRequest(`${Formio.projectUrl}/recaptcha?recaptchaToken=${token}`)
      .then((verificationResult) => ({ verificationResult, token }));
  }

  checkComponentValidity(data, dirty, row, options = {}) {
    data = data || this.rootValue;
    row = row || this.data;
    const { async = false } = options;

    // Verification could be async only
    if (!async) {
      return super.checkComponentValidity(data, dirty, row, options);
    }

    const componentData = row[this.component.key];
    if (!componentData || !componentData.token) {
      this.setCustomValidity('ReCAPTCHA: Token is not specified in submission');
      return NativePromise.resolve(false);
    }

    if (!componentData.success) {
      this.setCustomValidity('ReCAPTCHA: Token validation error');
      return NativePromise.resolve(false);
    }

    return this.hook('validateReCaptcha', componentData.token, () => NativePromise.resolve(true))
      .then((success) => success)
      .catch((err) => {
        this.setCustomValidity(err.message || err);
        return false;
      });
  }

  normalizeValue(newValue) {
    // If a recaptcha result has already been established, then do not allow it to be reset.
    return this.recaptchaResult ? this.recaptchaResult : newValue;
  }
}
