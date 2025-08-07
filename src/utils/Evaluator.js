import _ from 'lodash';
import stringHash from 'string-hash';
import { DefaultEvaluator as CoreEvaluator } from '@formio/core';

export class DefaultEvaluator extends CoreEvaluator {
  cache = {};
  protectedEval = false;

  template(template, hash) {
    hash = hash || stringHash(template);
    if (this.cache[hash]) {
      return this.cache[hash];
    }
    try {
      // Ensure we handle copied templates from the ejs files.
      template = template.replace(/ctx\./g, '');
      return (this.cache[hash] = _.template(template, this.templateSettings));
    }
    catch (err) {
      console.warn('Error while processing template', err, template);
    }
  }

  interpolate(rawTemplate, data, _options) {
    // Ensure reverse compatability.
    const options = _.isObject(_options) ? _options : { noeval: _options };
    if (typeof rawTemplate === 'function') {
      try {
        return rawTemplate(data);
      }
      catch (err) {
        console.warn('Error interpolating template', err, data);
        return err.message;
      }
    }

    rawTemplate = String(rawTemplate);
    let template;
    if (this.noeval || options.noeval) {
      return this.interpolateString(rawTemplate, data, _options);
    }
    else {
      template = this.template(rawTemplate);
    }
    if (typeof template === 'function') {
      try {
        return template(data);
      }
      catch (err) {
        console.warn('Error interpolating template', err, rawTemplate, data);
        return err.message;
      }
    }
    return template;
  }
}

let currentEvaluator = new DefaultEvaluator();

/**
 *Create evaluator object that forwards calls to current evaluator
 * to provide access to actual Evaluator instance via formioUtils
 */
function createEvaluatorObject() {
  return {
    get cache() { return currentEvaluator.cache; },
    set cache(value) { currentEvaluator.cache = value; },

    get noeval() { return currentEvaluator.noeval; },
    set noeval(value) { currentEvaluator.noeval = value; },

    get protectedEval() { return currentEvaluator.protectedEval; },
    set protectedEval(value) { currentEvaluator.protectedEval = value; },

    get templateSettings() { return currentEvaluator.templateSettings; },
    set templateSettings(value) { currentEvaluator.templateSettings = value; },

    evaluator: (...args) => currentEvaluator.evaluator ? currentEvaluator.evaluator(...args) : undefined,
    interpolate: (...args) => currentEvaluator.interpolate ? currentEvaluator.interpolate(...args) : undefined,
    evaluate: (...args) => currentEvaluator.evaluate ? currentEvaluator.evaluate(...args) : undefined,
    template: (...args) => currentEvaluator.template ? currentEvaluator.template(...args) : undefined,
  };
}

// for compatibility with @formio/protected-eval
/**
 * @type {DefaultEvaluator}
 */
export const Evaluator = createEvaluatorObject();

// preserve the standalone interpolate function for backwards compatibility
/**
 * For backwards compatibility we a standalone interpolate function. This merely calls the
 * global mutable Evaluator instance's interpolate function.
 * @param  {...any} args - interpolate arguments, typically "rawTemplate", "data", and "options"
 * @returns {any} the interpolation result.
 */
export function interpolate(...args) {
  return currentEvaluator.interpolate(...args);
}

/**
 * Set the evaluator to use for evaluating expressions.
 * @param {CoreEvaluator} override - The new evaluator instance to use.
 * @returns {void}
 */
export function registerEvaluator(override) {
  currentEvaluator = override ;
  // Update the Evaluator object methods to point to new evaluator
  Object.assign(Evaluator, createEvaluatorObject());
}
