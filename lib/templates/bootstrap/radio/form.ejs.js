Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="form-radio radio">\r\n  ';
 ctx.values.forEach(function(item) { ;
__p += '\r\n  <div class="form-check' +
((__t = (ctx.inline ? '-inline' : '')) == null ? '' : __t) +
'" ref="wrapper">\r\n    <label class="form-check-label label-position-' +
((__t = ( ctx.component.optionsLabelPosition )) == null ? '' : __t) +
'" for="' +
((__t = (ctx.id)) == null ? '' : __t) +
'' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'">\r\n      ';
 if (ctx.component.optionsLabelPosition === 'left' || ctx.component.optionsLabelPosition === 'top') { ;
__p += '\r\n      <span>' +
((__t = (ctx.t(item.label))) == null ? '' : __t) +
'</span>\r\n      ';
 } ;
__p += '\r\n      <' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'\r\n        ref="input"\r\n        ';
 for (var attr in ctx.input.attr) { ;
__p += '\r\n        ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\r\n        ';
 } ;
__p += '\r\n        value="' +
((__t = (item.value)) == null ? '' : __t) +
'"\r\n        ';
 if (ctx.value && (ctx.value === item.value || (typeof ctx.value === 'object' && ctx.value.hasOwnProperty(item.value) && ctx.value[item.value]))) { ;
__p += '\r\n          checked=true\r\n        ';
 } ;
__p += '\r\n        ';
 if (item.disabled) { ;
__p += '\r\n          disabled=true\r\n        ';
 } ;
__p += '\r\n        id="' +
((__t = (ctx.id)) == null ? '' : __t) +
'' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'"\r\n      >\r\n      ';
 if (!ctx.component.optionsLabelPosition || ctx.component.optionsLabelPosition === 'right' || ctx.component.optionsLabelPosition === 'bottom') { ;
__p += '\r\n      <span>' +
((__t = (ctx.t(item.label))) == null ? '' : __t) +
'</span>\r\n      ';
 } ;
__p += '\r\n    </label>\r\n  </div>\r\n  ';
 }) ;
__p += '\r\n</div>\r\n';
return __p
}