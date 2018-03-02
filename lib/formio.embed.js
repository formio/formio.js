'use strict';

var _formio = require('./formio.full');

var query = {};
var scripts = document.getElementsByTagName('script');
var thisScript = scripts[scripts.length - 1];
var scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
scriptSrc.pop();
scriptSrc = scriptSrc.join('/');
var queryString = thisScript.src.replace(/^[^?]+\??/, '');
queryString.replace(/\?/g, '&').split('&').forEach(function (item) {
  query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
});
query.styles = query.styles || scriptSrc + '/formio.form.min.css';
_formio.Formio.embedForm(query).then(function (instance) {
  instance.on('submit', function (submission) {
    var returnUrl = query.return || query.redirect;

    // Allow form based configuration for return url.
    if (!returnUrl && instance._form && instance._form.settings && (instance._form.settings.returnUrl || instance._form.settings.redirect)) {
      returnUrl = instance._form.settings.returnUrl || instance._form.settings.redirect;
    }

    if (returnUrl) {
      var formSrc = instance.formio ? instance.formio.formUrl : '';
      var hasQuery = !!returnUrl.match(/\?/);
      var isOrigin = returnUrl.indexOf(location.origin) === 0;
      returnUrl += hasQuery ? '&' : '?';
      returnUrl += 'sub=' + submission._id;
      if (!isOrigin && formSrc) {
        returnUrl += '&form=' + encodeURIComponent(formSrc);
      }
      window.location.href = returnUrl;
      if (isOrigin) {
        window.location.reload();
      }
    }
  });
});