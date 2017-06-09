import { Formio } from './formio.full';
let query = {};
var scripts = document.getElementsByTagName('script');
var thisScript = scripts[ scripts.length - 1 ];
var scriptSrc = thisScript.src.replace(/^([^\?]+).*/, '$1').split('/');
scriptSrc.pop();
scriptSrc = scriptSrc.join('/');
var queryString = thisScript.src.replace(/^[^\?]+\??/,'');
queryString.replace(/\?/g, '&').split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});
query.styles = query.styles || (scriptSrc + '/formio.form.min.css');
Formio.embedForm(query);
