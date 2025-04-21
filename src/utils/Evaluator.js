import _ from 'lodash';
import stringHash from 'string-hash';
import { Evaluator as CoreEvaluator } from '@formio/core';

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
      return (this.cache[hash] = _.template(template, DefaultEvaluator.templateSettings));
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

export let Evaluator = DefaultEvaluator.create();

/**
 * Set the evaluator to use for evaluating expressions.
 * @param {Evaluator} override - The new evaluator instance to use.
 * @returns {void}
 */
export function registerEvaluator(override) {
    Evaluator = override;
}
