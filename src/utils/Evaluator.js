import _ from 'lodash';
import stringHash from 'string-hash';
import { JSONLogicEvaluator as CoreEvaluator } from '@formio/core/utils';

export class Evaluator extends CoreEvaluator {
  static cache = {};
  static protectedEval = false;
  static noeval = false;
  static template(template, hash) {
    hash = hash || stringHash(template);
    if (Evaluator.cache[hash]) {
      return Evaluator.cache[hash];
    }
    try {
      // Ensure we handle copied templates from the ejs files.
      template = template.replace(/ctx\./g, '');
      return (Evaluator.cache[hash] = _.template(template, Evaluator.templateSettings));
    } catch (err) {
      console.warn('Error while processing template', err, template);
    }
  }
  static interpolate(rawTemplate, data, _options) {
    // Ensure reverse compatability.
    const options = _.isObject(_options) ? _options : { noeval: _options };
    if (typeof rawTemplate === 'function') {
      try {
        return rawTemplate(data);
      } catch (err) {
        console.warn('Error interpolating template', err, data);
        return err.message;
      }
    }

    rawTemplate = String(rawTemplate);
    let template;
    if (Evaluator.noeval || options.noeval) {
      return CoreEvaluator.interpolateString(rawTemplate, data, _options);
    } else {
      template = Evaluator.template(rawTemplate);
    }
    if (typeof template === 'function') {
      try {
        return template(data);
      } catch (err) {
        console.warn('Error interpolating template', err, rawTemplate, data);
        return err.message;
      }
    }
    return template;
  }
}
