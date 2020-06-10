module.exports = /** @class */ (function () {
    function Rule(component, settings, config) {
        this.component = component;
        this.settings = settings;
        this.config = config;
    }
    Rule.prototype.check = function () {
    };
    return Rule;
}());
