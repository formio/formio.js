import _ from 'lodash';
import stringHash from 'string-hash';
const Evaluator = {
  noeval: false,
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
    else {
      return new Function(...params, func);
    }
  },
  template(template, hash) {
    if (typeof template === 'function') {
      return template;
    }
    hash = hash || stringHash(template);
    try {
      return (Evaluator.cache[hash] = _.template(template, Evaluator.templateSettings));
    }
    catch (err) {
      console.warn('Error while processing template', err, template);
    }
  },
  interpolate(rawTemplate, data) {
    if (typeof rawTemplate === 'function') {
      return rawTemplate(data);
    }

    const hash = _.isNumber(rawTemplate) ? rawTemplate : stringHash(rawTemplate);
    let template;
    if (Evaluator.cache[hash]) {
      template = Evaluator.cache[hash];
    }
    else if (Evaluator.noeval) {
      // No cached template methods available. Use poor-mans interpolate without eval.
      return rawTemplate.replace(/({{\s+(.*)\s+}})/, (match, $1, $2) => _.get(data, $2));
    }
    else {
      template = Evaluator.template(rawTemplate, hash);
    }
    if (typeof template === 'function') {
      try {
        return template(data);
      }
      catch (err) {
        console.warn('Error interpolating template', err, rawTemplate, data);
      }
    }
    return template;
  }
};

export default Evaluator;
