const Rule = require('./Rule');

module.exports = class Url extends Rule {
  defaultMessage = '{{field}} must be a valid url.';

  check(value) {
    /* eslint-disable max-len */
    // From https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    const re = /(https?:\/\/(?:www\.|(?!www)))?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
    /* eslint-enable max-len */

    // Allow urls to be valid if the component is pristine and no value is provided.
    return !value || re.test(value);
  }
};
