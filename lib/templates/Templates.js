import templates from './index';
import _ from 'lodash';
var Templates = /** @class */ (function () {
    function Templates() {
    }
    Object.defineProperty(Templates, "templates", {
        get: function () {
            if (!Templates._templates) {
                Templates._templates = templates;
            }
            return Templates._templates;
        },
        enumerable: false,
        configurable: true
    });
    Templates.addTemplate = function (name, template) {
        Templates.templates[name] = template;
    };
    Templates.extendTemplate = function (name, template) {
        Templates.templates[name] = _.merge({}, Templates.templates[name], template);
    };
    Templates.setTemplate = function (name, template) {
        Templates.addTemplate(name, template);
    };
    Object.defineProperty(Templates, "current", {
        get: function () {
            if (Templates._current) {
                return Templates._current;
            }
            return Templates.defaultTemplates;
        },
        set: function (templates) {
            var defaultTemplates = Templates.current;
            Templates._current = _.merge({}, defaultTemplates, templates);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Templates, "defaultTemplates", {
        get: function () {
            return Templates.templates.bootstrap;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Templates, "framework", {
        get: function () {
            return Templates._framework;
        },
        set: function (framework) {
            if (Templates.templates.hasOwnProperty(framework)) {
                Templates._framework = framework;
                Templates._current = Templates.templates[framework];
            }
        },
        enumerable: false,
        configurable: true
    });
    return Templates;
}());
export default Templates;
