import _ from 'lodash';
import FormioAddon from '../FormioAddon';
import PasswordStrengthEditForm from './PasswordStrengthAddon.form';

export default class PasswordStrengthAddon extends FormioAddon {
  static get info() {
    return {
      supportedComponents: ['password'],
      name: 'passwordStrength',
      components: PasswordStrengthEditForm,
      label: 'Password Strength',
      defaultSettings: {
        validations: [
          { name: 'length' },
          { name: 'upperCase' },
          { name: 'numeric' },
          { name: 'lowerCase' },
          { name: 'symbols' },
        ],
        updateOn: 'levelChange',
        required: true,
        levels: [
          { name: 'low', maxEntropy: 27, style: 'danger' },
          { name: 'medium', maxEntropy: 35, style: 'warning' },
          { name: 'high', maxEntropy: 59, style: 'success' }
        ],
        blackList: [],
        template: `
          <div class="formio-security-indicator">
            {% if (!ctx.readOnly && !ctx.pristine) { %}
              <div
                title="{{ctx.t(ctx.tooltip)}}"
                class="security-{{ctx.level.name}} {{ ctx.level.style ? 'bg-' + ctx.level.style : ''}}"
                style="{{ctx.level.color ? 'background-color: ' + ctx.level.color + ';' : ''}}"
              ></div>
            {% } %}
          </div>
        `,
        location: {
          insert: 'after',
          selector: '[ref="element"]'
        }
      }
    };
  }

  get defaultSettings() {
    return PasswordStrengthAddon.info.defaultSettings;
  }

  get rules() {
    return {
      length: {
        check: (value) => {
          const minLength = this.component.component.validate.minLength || 6;
          if (value.length < minLength) {
            return false;
          }
          return true;
        },
        message: `Value must be longer than ${this.component.component.validate.minLength || 6} characters`
      },
      upperCase: {
        check: (value) => {
          if (/[A-Z]/g.test(value)) {
            return true;
          }
          return false;
        },
        increaseCharactersPoolSize: 26,
        message: 'Value must contain uppercased alphabetical characters',
      },
      numeric: {
        check: (value) => {
          if (/[0-9]/g.test(value)) {
            return true;
          }
          return false;
        },
        increaseCharactersPoolSize: 10,
        message: 'Value must contain numeric characters',
      },
      lowerCase: {
        check: (value) => {
          if (/[a-z]/g.test(value)) {
            return true;
          }
          return false;
        },
        increaseCharactersPoolSize: 26,
        message: 'Value must contain lowercased alphabetical characters',
      },
      symbols: {
        check: (value) => {
          if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)) {
            return true;
          }
          return false;
        },
        increaseCharactersPoolSize: 32,
        message: 'Value must contain symbols',
      },
    };
  }

  get charactersPoolLength() {
    return this._charactersPoolLength;
  }

  set charactersPoolLength(value) {
    this._charactersPoolLength = value;
  }

  get level() {
    return this._level || this.getLevel();
  }

  set level(level) {
    this._level = level;
  }

  get entropy() {
    return this._entropy;
  }

  get dictionarySize() {
    return this.settings.dictionarySize || 171476;
  }

  set entropy(value) {
    const oldLevel = this.getLevel();
    const updateOnEntropyChange = this.settings.updateOn === 'entropyChange' && this._entropy !== value;
    this._entropy = value;
    this.level = this.getLevel();
    const updateOnLevelChange = this.settings.updateOn === 'levelChange' && oldLevel.name !== this.level.name;
    if (updateOnLevelChange || updateOnEntropyChange) {
      this.updateView();
    }
  }

  get template() {
    return this.settings.template;
  }

  get tooltip() {
    return this.level?.tooltip || `${this.level?.name} strongness`;
  }

  log2(value) {
    if (typeof Math.log2 === 'function') {
      return Math.log2(value);
    }
    return Math.log(value) * Math.LOG2E;
  }

  calculatePasswordEntropy(passwordLength, charactersPoolSize) {
    return !passwordLength || !charactersPoolSize ? 0 : this.log2(Math.pow(charactersPoolSize, passwordLength));
  }

  calculatePasswordEntropyWords(wordsCount) {
    return !this.dictionarySize ? 0 : this.log2(this.dictionarySize) * wordsCount;
  }

  render() {
    const view = this.component.interpolate(this.template, {
      entropy: this.entropy,
      maxEntropy: this.maxEntropy,
      level: this.level,
      levels: this.levels,
      readOnly: this.component.options.readOnly,
      pristine: this.component.pristine,
      t: this.t.bind(this),
      tooltip: this.tooltip,
    });

    return this.component.sanitize(view);
  }

  checkBlackList(value) {
    const blackList = [...this.settings.blackList];
    let customBlacklistedWords = this.settings.customBlacklistedWords;

    if (customBlacklistedWords) {
      customBlacklistedWords = this.evaluate(customBlacklistedWords, { value }, 'values');
      if (customBlacklistedWords && customBlacklistedWords.length) {
        blackList.push(...customBlacklistedWords);
      }
    }

    let restValue = value;
    const blacklistedWords = [];

    for (let i = 0; i < blackList.length; i++) {
      const word = blackList[i];
      const regExp = new RegExp(`${word}`, 'gi');

      if (regExp.test(value)) {
        blacklistedWords.push(word);
        restValue = restValue.replace(regExp, '');
      }

      if (restValue.length < 3) {
        break;
      }
    }

    if (blacklistedWords.length) {
      const { charactersPoolSize } = restValue.length ? this.performChecks(restValue) : 0;
      const entropyOfNonblacklistedValue = this.calculatePasswordEntropy(restValue.length, charactersPoolSize);
      const dictionaryCheckEntropy = this.calculatePasswordEntropyWords(blacklistedWords.length);
      const entropy = dictionaryCheckEntropy + entropyOfNonblacklistedValue;
      return { entropy, blacklistedWords };
    }

    return true;
  }

  /**
   * Determines is a password is secure enough to submit
   * @return {boolean}
   */
  isValid() {
    const isValidCheck = this.settings.isValid;
    if (typeof isValidCheck === 'string') {
      const valid = this.evaluate(isValidCheck, {
        entropy: this.entropy,
        level: this.level
      }, 'valid');
      return valid;
    }

    return this.entropy >= Math.round(this.maxEntropy / 2);
  }

  /**
   * Handles the result of check and constructs a new error object or returns an amount of points to add to the current entropy
   * @param {boolean|number} valid - Determines if the validation was failed or an amount of points if it was passed
   * @param {*} validation - Validation configuration
   * @param {string} value - Value which was validated
   * @param {string} message - Message which should be shown if validation was not passed
   */
  handleValidationResult(valid, validation, value, message, errors) {
    if (valid === false) {
      errors.push({
        validation: validation.name,
        value, message,
        level: validation.required ? 'error' : 'warning'
      });
    }
    else if (validation.increaseCharactersPoolSize) {
      return validation.increaseCharactersPoolSize;
    }

    return 0;
  }

  performChecks(value) {
    const errors = [];
    let charactersPoolSize = 0;

    this.validations.forEach((validation) => {
      if (typeof validation.check === 'string') {
        const valid = this.evaluate(this.settings.isValid, { value }, 'valid');
        const message = validation.message || 'Password is not secure';
        charactersPoolSize += this.handleValidationResult(valid, validation, value, message, errors);
      }
      else if (this.rules[validation.name]) {
        const rule = { ...this.rules[validation.name] };
        rule.required = validation.hasOwnProperty('required') ? validation.required : rule.required;
        rule.name = validation.name;
        const valid = rule.check(value);
        const message = validation.message || rule.message || 'Password is not secure';
        charactersPoolSize += this.handleValidationResult(valid, rule, value, message, errors);
      }
    });

    return {
      charactersPoolSize,
      errors
    };
  }

  /**
   * Performs checks to validate password security
   * @param {string} value - Suggested password
   */
  checkValidity(value) {
    const passwordLength = value.length;

    const { charactersPoolSize, errors } = this.performChecks(value);
    this.errors = errors;

    const entropy = this.calculatePasswordEntropy(passwordLength, charactersPoolSize);
    const blackListCheck = this.settings.blackList?.length || this.settings.customBlacklistedWords ?
      this.checkBlackList(value)
      : null;

    if (blackListCheck && blackListCheck !== true) {
     this.handleBlackListCheckResult(blackListCheck, value);
      this.entropy = Math.min(entropy, blackListCheck.entropy);
    }
    else {
      this.entropy = entropy;
    }

    const isValid = this.isValid();
    if (!isValid) {
      this.errors.push({
        value,
        message: 'Password is not secure enough',
        level: this.settings.required ? 'error' : 'warning'
      });
    }

    return !this.errors.length;
  }

  handleBlackListCheckResult(result, value) {
    const blacklistedWords = result.blacklistedWords;
    const isRequired = this.settings.disableBlacklistedWords;

    blacklistedWords.forEach((word) => this.handleValidationResult(false, {
      name: 'blacklist',
      required: isRequired,
    }, value, `Password ${isRequired ? 'must' : 'should'} not include word "${word}"`, this.errors));
  }

  constructor(settings, componentInstance) {
    super(settings, componentInstance);
    this._entropy = 0; // Set initial value of entropy
    this.validations = [...(this.settings.validations || this.defaultSettings.validations)];
    this.levels = [...(this.settings.levels || this.defaultSettings.levels)];
    this.levels.sort((a, b) => a.maxEntropy - b.maxEntropy); // Sort levels from the lowest one to the highest
    this.level = this.levels[0]; // Set currnt level to the lowest one
    this.maxEntropy = this.levels[this.levels.length - 1].maxEntropy; // Set maximal amount of security points based on the highest level
  }

  attach(element) {
    super.attach(element);
    const container = this.component.ce('div', { ref: 'passwordStrengthIndicator' });

    const inserted = this.insertContainer(element, container);

    if (!inserted) {
      this.component.append(container);
    }

    this._element = container;
    this.component.on('redraw', () => this.updateView());
    this.component.on('componentError', () => this.updateView());
    this.updateView();
  }

  insertContainer(element, container) {
    if (!element || !container) {
      return false;
    }

    const insert = this.settings.location?.insert;
    const selector = this.settings.location?.selector;
    let reference;

    if (selector) {
      reference = element.querySelector(selector);
    }

    if (reference) {
      const parent = reference.parentNode;

      switch (insert) {
        case 'after':
          if (parent) {
            parent.insertBefore(container, reference.nextSibling || null);
            return true;
          }
          return false;
        case 'before':
          if (parent) {
            parent.insertBefore(container, reference);
            return true;
          }
          return false;
        default:
          console.warn(`Unknown insert option: ${insert}`);
          return false;
      }
    }
    else {
      console.warn(`No elements found using selector: ${selector}`);
      return false;
    }
  }

  destroy() {
    super.destroy();
  }

  /**
   * Finds the level which one the passed entropy suits
   * @param {number} entropy - Points of password's security
   */
  getLevel(entropy = this.entropy) {
    const lowestLevel = this.levels[0];
    let prevMaxEntropy = lowestLevel.maxEntropy;

    if (entropy <= lowestLevel.maxEntropy) {
      return lowestLevel;
    }

    if (entropy >= this.maxEntropy) {
      return this.levels[this.levels.length - 1];
    }

    // Iterate through levels and find the one which the passed entropy belongs to
    for (let i = 1; i < this.levels.length; i++) {
      const level = this.levels[i];

      if (entropy > prevMaxEntropy && entropy <= level.maxEntropy) {
        return level;
      }

      prevMaxEntropy = level.maxEntropy;
    }

    return lowestLevel;
  }

  /**
   * Update the current view of the password's security indicator
   */
  updateView() {
    if (!this.element) {
      return;
    }

    const view = this.render();
    this.element.innerHTML = view;
  }
}
