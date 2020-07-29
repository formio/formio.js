var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import stringHash from 'string-hash';
var Evaluator = {
    noeval: false,
    cache: {},
    templateSettings: {
        evaluate: /\{%([\s\S]+?)%\}/g,
        interpolate: /\{\{([\s\S]+?)\}\}/g,
        escape: /\{\{\{([\s\S]+?)\}\}\}/g
    },
    evaluator: function (func) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        if (Evaluator.noeval) {
            console.warn('No evaluations allowed for this renderer.');
            return _.noop;
        }
        if (typeof params[0] === 'object') {
            params = _.keys(params[0]);
        }
        return new (Function.bind.apply(Function, __spreadArrays([void 0], params, [func])))();
    },
    template: function (template, hash) {
        hash = hash || stringHash(template);
        try {
            // Ensure we handle copied templates from the ejs files.
            template = template.replace(/ctx\./g, '');
            return (Evaluator.cache[hash] = _.template(template, Evaluator.templateSettings));
        }
        catch (err) {
            console.warn('Error while processing template', err, template);
        }
    },
    interpolate: function (rawTemplate, data) {
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
        var hash = stringHash(rawTemplate);
        var template;
        if (Evaluator.cache[hash]) {
            template = Evaluator.cache[hash];
        }
        else if (Evaluator.noeval) {
            // No cached template methods available. Use poor-mans interpolate without eval.
            return rawTemplate.replace(/({{\s*(.*?)\s*}})/g, function (match, $1, $2) { return _.get(data, $2); });
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
                return err.message;
            }
        }
        return template;
    },
    evaluate: function (func, args) {
        return Array.isArray(args) ? func.apply(void 0, args) : func(args);
    }
};
export default Evaluator;
