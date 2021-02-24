import _ from 'lodash';
import FormioAddon from './FormioAddon';

export default class PasswordStrongnessAddon extends FormioAddon {
  static get info() {
    return {
      supportedComponents: ['password'],
    };
  }

  get defaultSettings() {
    return {
      validations: [
        { name: 'length' },
        { name: 'upperCase' },
        { name: 'numeric' },
        { name: 'alphabetical' }
      ],
      updateOn: 'levelChange',
      levels: [
        { name: 'low', maxScore: 25, style: 'danger' },
        { name: 'medium', maxScore: 50, style: 'warning' },
        { name: 'high', maxScore: 100, style: 'success' }
      ],
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
    };
  }

  get rules() {
    return {
      length: {
        check: (value) => {
          const minLength = this.component.component.validate.minLength || 6;
          const maxLength = this.component.component.validate.maxLength || minLength;
          if (value.length < minLength) {
            return false;
          }
          const diff = maxLength - minLength;
          if (diff > 1) {
            const average = Math.floor(diff / 2);
            if (value < minLength + average) {
              return 5;
            }
            return 10;
          }

          return 10 + value.length - minLength;
        },
        message: `Value must be longer than ${this.component.component.validate.minLength || 6} characters`
      },
      upperCase: {
        check: (value) => {
          if (/[A-Z]/g.test(value)) {
            return 15;
          }
          return false;
        },
        required: true,
        message: 'Value must contain uppercased letters',
      },
      numeric: {
        check: (value) => {
          if (/[0-9]/g.test(value)) {
            return 15;
          }
          return false;
        },
        required: true,
        message: 'Value must contain numeric symbols',
      },
      alphabetical: {
        check: (value) => {
          if (/[A-Z]/gi.test(value)) {
            return 15;
          }
          return false;
        },
        required: true,
        message: 'Value must contain alphabetical symbols',
      }
    };
  }

  get level() {
    return this._level || this.getLevel();
  }

  set level(level) {
    this._level = level;
  }

  get score() {
    return this._score;
  }

  set score(value) {
    const oldLevel = this.getLevel();
    const updateOnScoreChange = this.settings.updateOn === 'scoreChange' && this._score !== value;
    this._score = value;
    this.level = this.getLevel();
    const updateOnLevelChange = this.settings.updateOn === 'levelChange' && oldLevel.name !== this.level.name;
    if (updateOnLevelChange || updateOnScoreChange) {
      this.updateView();
    }
  }

  get template() {
    return this.settings.template;
  }

  get tooltip() {
    return this.level?.tooltip || `${this.level?.name} strongness`;
  }

  render() {
    const view = this.component.interpolate(this.template, {
      score: this.score,
      maxScore: this.maxScore,
      level: this.level,
      levels: this.levels,
      readOnly: this.component.options.readOnly,
      pristine: this.component.pristine,
      t: this.t.bind(this),
      tooltip: this.tooltip,
    });

    return this.component.sanitize(view);
  }

  /**
   * Determines is a password is secure enough to submit
   * @return {boolean}
   */
  isValid() {
    const isValidCheck = this.settings.isValid;
    if (typeof isValidCheck === 'string') {
      const valid = this.evaluate(isValidCheck, {
        score: this.score,
        level: this.level
      }, 'valid');
      return valid;
    }

    return this.score >= Math.round(this.maxScore / 2);
  }

  /**
   * Handles the result of check and constructs a new error object or returns an amount of points to add to the current score
   * @param {boolean|number} valid - Determines if the validation was failed or an amount of points if it was passed
   * @param {*} validation - Validation configuration
   * @param {string} value - Value which was validated
   * @param {string} message - Message which should be shown if validation was not passed
   */
  handleValidationResult(valid, validation, value, message) {
    if (valid === false || valid === 0) {
      this.errors.push({ validation: validation.name, value, message, level: validation.required ? 'error' : 'warning' });
    }
    else if (typeof valid === 'number') {
      return valid;
    }

    return 0;
  }

  /**
   * Performs checks to validate password security
   * @param {string} value - Suggested password
   */
  checkValidity(value) {
    this.errors = [];
    let score = 0;

    this.validations.forEach((validation) => {
      if (typeof validation.check === 'string') {
        const valid = this.evaluate(this.settings.isValid, { value }, 'valid');
        const message = validation.message || 'Password is not secure';
        score += this.handleValidationResult(valid, validation, value, message);
      }
      else if (this.rules[validation.name]) {
        const rule = this.rules[validation.name];
        const valid = rule.check(value);
        const message = validation.message || rule.message || 'Password is not secure';
        score += this.handleValidationResult(valid, validation, value, message);
      }
    });

    this.score = score;

    const isValid = this.isValid();
    if (!isValid) {
      this.errors.push({ value, message: 'Password is not secure enough', level: 'error' });
    }

    return !this.errors.length;
  }

  constructor(settings, componentInstance) {
    super(settings, componentInstance);
    this._score = 0; // Set initial value of score
    this.validations = [...(this.settings.validations || this.defaultSettings.validations)];
    this.levels = [...(this.settings.levels || this.defaultSettings.levels)];
    this.levels.sort((a, b) => a.maxScore - b.maxScore); // Sort levels from the lowest one to the highest
    this.level = this.levels[0]; // Set currnt level to the lowest one
    this.maxScore = this.levels[this.levels.length - 1].maxScore; // Set maximal amount of security points based on the highest level
  }

  attach(element) {
    super.attach(element);
    const container = this.component.ce('div', { ref: 'passwordStrongnessIndicator' });

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
   * Finds the level which one the passed score suits
   * @param {number} score - Points of password's security
   */
  getLevel(score = this.score) {
    const lowestLevel = this.levels[0];
    let prevMaxScore = lowestLevel.maxScore;

    if (score <= lowestLevel.maxScore) {
      return lowestLevel;
    }

    if (score >= this.maxScore) {
      return this.levels[this.levels.length - 1];
    }

    // Iterate through levels and find the one which the passed score belongs to
    for (let i = 1; i < this.levels.length; i++) {
      const level = this.levels[i];

      if (score > prevMaxScore && score <= level.maxScore) {
        return level;
      }

      prevMaxScore = level.maxScore;
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
