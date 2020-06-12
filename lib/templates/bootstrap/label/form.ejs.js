Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<label class="col-form-label ' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'">\n  ' +
((__t = ( ctx.t(ctx.component.label) )) == null ? '' : __t) +
'\n  ';
 if (ctx.component.tooltip) { ;
__p += '\n    <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\n  ';
 } ;
__p += '\n</label>\n';
return __p
}