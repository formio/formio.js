const scripts = document.getElementsByTagName('script');
let thisScript = scripts[(scripts.length - 1)];
let foundScript = false;
if (!thisScript.src || thisScript.src.indexOf('formio.embed') === -1) {
  // Fallback mode: Manually search for the script...
  for (var i in scripts) {
    if (
      scripts[i].src &&
      (scripts[i].src.indexOf('formio.embed') !== -1)
    ) {
      foundScript = true;
      thisScript = scripts[i];
      break;
    }
  }
}
else {
  foundScript = true;
}

if (foundScript) {
  const Form = require('./formio.form').Form;
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
  document.write('<span>Could not locate form render script.</span>');
}
