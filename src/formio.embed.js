/*global Formio*/
const scripts = document.getElementsByTagName('script');
let thisScript = null;
let i = scripts.length;
while (i--) {
  if (scripts[i].src && (scripts[i].src.indexOf('formio.embed') !== -1)) {
    thisScript = scripts[i];
    break;
  }
}

if (thisScript) {
  const Form = require('./formio.form').Form;
  Formio.loadModules();
  const query = {};
  let scriptSrc = thisScript.src.replace(/^([^?]+).*/, '$1').split('/');
  scriptSrc.pop();
  scriptSrc = scriptSrc.join('/');
  const queryString = thisScript.src.replace(/^[^?]+\??/,'');
  queryString.replace(/\?/g, '&').split('&').forEach((item) => {
    query[item.split('=')[0]] = item.split('=')[1] && decodeURIComponent(item.split('=')[1]);
  });
  query.styles = query.styles || (`${scriptSrc}/formio.full.min.css`);
  Form.embed(query).then((instance) => {
    Formio.events.emit('formEmbedded', instance);
    instance.on('submit', (submission) => {
      let returnUrl = query.return || query.redirect;

      // Allow form based configuration for return url.
      if (
        !returnUrl &&
        (
          instance._form &&
          instance._form.settings &&
          (
            instance._form.settings.returnUrl ||
            instance._form.settings.redirect
          )
        )
      ) {
        returnUrl = instance._form.settings.returnUrl || instance._form.settings.redirect;
      }

      if (returnUrl) {
        const formSrc = instance.formio ? instance.formio.formUrl : '';
        const hasQuery = !!returnUrl.match(/\?/);
        const isOrigin = returnUrl.indexOf(location.origin) === 0;
        returnUrl += hasQuery ? '&' : '?';
        returnUrl += `sub=${submission._id}`;
        if (!isOrigin && formSrc) {
          returnUrl += `&form=${encodeURIComponent(formSrc)}`;
        }
        window.location.href = returnUrl;
        if (isOrigin) {
          window.location.reload();
        }
      }
    });
  });
}
else {
  // Show an error if the script cannot be found.
  document.write('<span>Could not locate the Embedded form.</span>');
}
