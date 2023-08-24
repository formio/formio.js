import _ from 'lodash';
import stringHash from 'string-hash';
const Evaluator = {
  noeval: false,
  protectedEval: false, // This property can be customized only by plugins
  cache: {},
  templateSettings: {
    evaluate: /\{%([\s\S]+?)%\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g,
    escape: /\{\{\{([\s\S]+?)\}\}\}/g
  },
  evaluator(func, ...params) {
    if (Evaluator.noeval) {
      console.warn('No evaluations allowed for this renderer.');
      return _.noop;
    }

    if (typeof params[0] === 'object') {
      params = _.keys(params[0]);
    }
    return new Function(...params, func);
  },
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
      // No cached template methods available. Use poor-mans interpolate without eval.
      return rawTemplate.replace(/({{\s*(.*?)\s*}})/g, (match, $1, $2) => {
        // Allow for conditional values.
        const parts = $2.split('||').map(item => item.trim());
        let value = '';
        let path = '';
        for (let i = 0; i < parts.length; i++) {
          path = parts[i];
          value = _.get(data, path);
          if (value) {
            break;
          }
        }
        if (options.data) {
          _.set(options.data, path, value);
        }
        return value;
      });
    }
    else {
      template = Evaluator.template(rawTemplate);
    }
    if (typeof template === 'function') {
      try {
        if (data.component && data.component.filter === rawTemplate && !data.options.building) {
          data.data = _.mapValues(data.data, (val) => _.isString(val) ? encodeURIComponent(val) : val);
        }
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
