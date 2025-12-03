/*globals grecaptcha*/
import Component from '../_classes/component/Component';
import { Formio } from '../../Formio';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';

export default class ReCaptchaComponent extends Component {
  static schema(...extend) {
    return Component.schema(
      {
        type: 'recaptcha',
        key: 'recaptcha',
        label: 'reCAPTCHA',
      },
      ...extend,
    );
  }

  static get builderInfo() {
    return {};
  }

  static savedValueTypes() {
    return [];
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: [
        'isEmpty',
        'isNotEmpty',
      ],
    };
  }

  static get serverConditionSettings() {
    return ReCaptchaComponent.conditionOperatorsSettings;
  }

  render() {
    this.recaptchaResult = null;
    if (this.builderMode) {
      return super.render('reCAPTCHA');
    } else {
      return super.render('', true);
    }
  }

  createInput() {
    if (this.builderMode) {
      // We need to see it in builder mode.
      this.append(this.text(this.name));
    } else {
      const siteKey = _get(this.root?.form, 'settings.recaptcha.siteKey');
      if (siteKey) {
        const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        this.recaptchaApiReady = Formio.requireLibrary(
          'googleRecaptcha',
          'grecaptcha',
          recaptchaApiScriptUrl,
          true,
        );
      } else {
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

  async verify(actionName) {
    const siteKey = _get(this.root?.form, 'settings.recaptcha.siteKey');
    if (!siteKey) {
      console.warn('There is no Site Key specified in settings in form JSON');
      return;
    }
    if (!this.recaptchaApiReady) {
      const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${_get(this.root?.form, 'settings.recaptcha.siteKey')}`;
      this.recaptchaApiReady = Formio.requireLibrary(
        'googleRecaptcha',
        'grecaptcha',
        recaptchaApiScriptUrl,
        true,
      );
    }
    try {
      await this.recaptchaApiReady;
      this.recaptchaVerifiedPromise = new Promise((resolve, reject) => {
        if (!this.isLoading) {
          this.isLoading = true;
          grecaptcha.ready(
            _debounce(async () => {
              try {
                const token = await grecaptcha.execute(siteKey, { action: actionName });
                const verificationResult = await this.sendVerificationRequest(token);
                this.recaptchaResult = {
                  ...verificationResult,
                  token,
                };
                this.updateValue(this.recaptchaResult);
                this.isLoading = false;
                return resolve(verificationResult);
              } catch (err) {
                this.isLoading = false;
                reject(err);
              }
            }, 1000),
          );
        }
      });
    } catch (ignoreErr) {
      this.loading = false;
    }
  }

  beforeSubmit() {
    if (this.recaptchaVerifiedPromise) {
      return this.recaptchaVerifiedPromise.then(() => super.beforeSubmit());
    }
    return super.beforeSubmit();
  }

  sendVerificationRequest(token) {
    return Formio.makeStaticRequest(`${Formio.projectUrl}/recaptcha?recaptchaToken=${token}`);
  }

  checkComponentValidity(data, dirty, row, options = {}, errors = []) {
    data = data || this.rootValue;
    row = row || this.data;
    const { async = false } = options;

    // Verification could be async only (which for now is only the case for server-side validation)
    if (!async) {
      return super.checkComponentValidity(data, dirty, row, options, errors);
    }

    const componentData = row[this.component.key];
    if (!componentData || !componentData.token) {
      this.setCustomValidity(this.t('reCaptchaTokenNotSpecifiedError'));
      return Promise.resolve(false);
    }

    if (!componentData.success) {
      this.setCustomValidity(this.t('reCaptchaTokenValidationError'));
      return Promise.resolve(false);
    }

    // Any further validation will 100% not run on the client
    return Promise.resolve(true);
  }

  normalizeValue(newValue) {
    // If a recaptcha result has already been established, then do not allow it to be reset.
    return this.recaptchaResult ? this.recaptchaResult : newValue;
  }
}
