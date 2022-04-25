Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (!ctx.label.hidden && ctx.label.labelPosition !== 'bottom') { ;
__p += '\r\n  ' +
((__t = ( ctx.labelMarkup )) == null ? '' : __t) +
'\r\n';
 } ;
__p += '\r\n\r\n';
 if (ctx.label.hidden && ctx.label.className && ctx.component.validate.required) { ;
__p += '\r\n  <label class="' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'"></label>\r\n';
 } ;
__p += '\r\n\r\n' +
((__t = (ctx.element)) == null ? '' : __t) +
'\r\n\r\n';
 if (!ctx.label.hidden && ctx.label.labelPosition === 'bottom') { ;
__p += '\r\n  ' +
((__t = ( ctx.labelMarkup )) == null ? '' : __t) +
'\r\n';
 } ;
__p += '\r\n';
 if (ctx.component.description) { ;
__p += '\r\n  <div class="form-text text-muted">' +
((__t = (ctx.t(ctx.component.description))) == null ? '' : __t) +
'</div>\r\n';
 } ;
__p += '\r\n';
return __p
}