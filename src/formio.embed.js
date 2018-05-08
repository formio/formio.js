import Form from './Form';
const query = {};
const scripts = document.getElementsByTagName('script');
const thisScript = scripts[ scripts.length - 1 ];
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
