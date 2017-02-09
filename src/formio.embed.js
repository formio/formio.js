import FormioForm from './formio.form.js';
let query = {};
var scripts = document.getElementsByTagName('script');
var thisScript = scripts[ scripts.length - 1 ];
var scriptSrc = thisScript.src.replace(/^([^\?]+).*/, '$1').split('/');
scriptSrc.pop();
scriptSrc = scriptSrc.join('/');
var queryString = thisScript.src.replace(/^[^\?]+\??/,'');
let id = Math.random().toString(36).substring(7);
document.write('<link rel="stylesheet" href="' + scriptSrc + '/formio.form.min.css"><div id="' + id + '" style="height:500px;"></div>');
queryString.replace(/\?/g, '&').split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});
let formElement = document.getElementById(id);
let form = new FormioForm(formElement);
form.src = query.src;
