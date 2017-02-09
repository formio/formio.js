import FormioForm from './formio.form.js';
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
let id = query.id || 'formio-' + Math.random().toString(36).substring(7);
let height = query.height || 500;
let className = query.class || 'formio-form';
let styles = query.styles || (scriptSrc + '/formio.form.min.css');
document.write('<link rel="stylesheet" href="' + styles + '"><div id="' + id + '" class="' + className + '" style="height:' + height + 'px;"></div>');
let formElement = document.getElementById(id);
let form = new FormioForm(formElement);
form.src = query.src;
