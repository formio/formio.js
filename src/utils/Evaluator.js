import _ from 'lodash';
import stringHash from 'string-hash';

const cache = {};

const getTemplate = (template, hash, templateSettings) => {
  if (typeof template === 'function') {
    return template;
  }

  hash = hash || stringHash(template);
  try {
    // Ensure we handle copied templates from the ejs files.
    template = template.replace(/ctx\./g, '');

    return (cache[hash] = _.template(template, templateSettings));
  }
  catch (err) {
    console.warn('Error while processing template', err, template);
  }
};

const Evaluator = {
  noeval: false,
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
  interpolate(rawTemplate, data) {
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

    const hash = _.isNumber(rawTemplate) ? rawTemplate : stringHash(rawTemplate);
    let template;
    if (cache[hash]) {
      template = cache[hash];
    }
    else if (Evaluator.noeval) {
      // No cached template methods available. Use poor-mans interpolate without eval.
      return rawTemplate.replace(/({{\s+(.*)\s+}})/, (match, $1, $2) => _.get(data, $2));
    }
    else {
      template = getTemplate(rawTemplate, hash, Evaluator.templateSettings);
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
};

export default Evaluator;
