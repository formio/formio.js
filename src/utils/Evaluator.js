import _ from 'lodash';
import stringHash from 'string-hash';
import { Evaluator as CoreEvaluator } from '@formio/core/utils';
const Evaluator = {
  noeval: false,
  protectedEval: false, // This property can be customized only by plugins
  cache: {},
  templateSettings: CoreEvaluator.templateSettings,
  evaluator: CoreEvaluator.evaluator,
  template(template, hash) {
    hash = hash || stringHash(template);
    if (Evaluator.cache[hash]) {
      return Evaluator.cache[hash];
    }
    try {
      // Ensure we handle copied templates from the ejs files.
      template = template.replace(/ctx\./g, '');
      return (Evaluator.cache[hash] = _.template(template, Evaluator.templateSettings));
    }
    catch (err) {
      console.warn('Error while processing template', err, template);
    }
  },
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
    if (Evaluator.noeval || options.noeval) {
      return CoreEvaluator.interpolateString(rawTemplate, data, _options);
    }
    else {
      template = Evaluator.template(rawTemplate);
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
  },
  evaluate(func, args) {
    return Array.isArray(args) ? func(...args) : func(args);
  }
};

Evaluator.registerEvaluator = (evaluator) => {
  Object.keys(evaluator).forEach((key) => {
    Evaluator[key] = evaluator[key];
  });
};

export default Evaluator;
