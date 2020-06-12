Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (!ctx.label.hidden && ctx.label.labelPosition !== 'bottom') { ;
__p += '\n  ' +
((__t = ( ctx.labelMarkup )) == null ? '' : __t) +
'\n';
 } ;
__p += '\n\n';
 if (ctx.label.hidden && ctx.label.className && ctx.component.validate.required) { ;
__p += '\n  <label class="' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'"></label>\n';
 } ;
__p += '\n\n' +
((__t = (ctx.element)) == null ? '' : __t) +
'\n\n';
 if (!ctx.label.hidden && ctx.label.labelPosition === 'bottom') { ;
__p += '\n  ' +
((__t = ( ctx.labelMarkup )) == null ? '' : __t) +
'\n';
 } ;
__p += '\n';
 if (ctx.component.description) { ;
__p += '\n  <div class="form-text text-muted">' +
((__t = (ctx.t(ctx.component.description))) == null ? '' : __t) +
'</div>\n';
 } ;
__p += '\n';
return __p
}