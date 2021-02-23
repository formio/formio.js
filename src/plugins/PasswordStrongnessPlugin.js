import _ from 'lodash';
import FormioPlugin from './FormioPlugin';

export default class PasswordStrongnessPlugin extends FormioPlugin {
  static get info() {
    return {
      supportedComponents: ['password']
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
        { name: 'low', maxScore: 25 },
        { name: 'medium', maxScore: 50 },
        { name: 'high', maxScore: 100 }
      ],
      template: `
        <div class="formio-security-indicator">
          {% if (!ctx.readOnly && !ctx.pristine) { %}
            <div
              title="{{ctx.t(ctx.tooltip)}}"
              class="security-{{ctx.level.name}}"
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
          const maxLength = this.component.component.validate.maxLength || 24;
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

          return 10;
        },
        message: 'Value must be longer than 6 characters'
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
      level: this.level,
      levels: this.levels,
      readOnly: this.component.options.readOnly,
      pristine: this.component.pristine,
      t: this.t.bind(this),
      tooltip: this.tooltip
    });

    return this.component.sanitize(view);
  }

  isValid() {
    if (typeof this.settings.isValid === 'string') {
      const valid = this.evaluate(this.settings.isValid, {
        score: this.score,
        level: this.level
      }, 'valid');
      return valid;
    }

    return this.score >= Math.round(this.maxScore / 2);
  }

  handleValidationResult(valid, validation, value, message) {
    if (valid === false || valid === 0) {
      this.errors.push({ validation: validation.name, value, message, level: validation.required ? 'error' : 'warning' });
    }
    else if (typeof valid === 'number') {
      return valid;
    }

    return 0;
  }

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
    this._score = 0;
    this.validations = [...(this.settings.validations || this.defaultSettings.validations)];
    this.levels = [...(this.settings.levels || this.defaultSettings.levels)];
    this.levels.sort((a, b) => a.maxScore - b.maxScore);
    this.level = this.levels[0];
    this.maxScore = this.levels[this.levels.length - 1].maxScore;
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

  getLevel(score = this.score) {
    const lowestLevel = this.levels[0];
    let prevMaxScore = lowestLevel.maxScore;

    if (score <= lowestLevel.maxScore) {
      return lowestLevel;
    }

    if (score >= this.maxScore) {
      return this.levels[this.levels.length - 1];
    }

    for (let i = 1; i < this.levels.length; i++) {
      const level = this.levels[i];

      if (score > prevMaxScore && score <= level.maxScore) {
        return level;
      }

      prevMaxScore = level.maxScore;
    }

    return lowestLevel;
  }

  updateView() {
    if (!this.element) {
      return;
    }

    const view = this.render();
    this.element.innerHTML = view;
  }
}
