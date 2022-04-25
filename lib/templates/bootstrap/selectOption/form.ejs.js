Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<option ' +
((__t = ( ctx.selected ? 'selected="selected"' : '' )) == null ? '' : __t) +
'\r\n  value="' +
((__t = (ctx.useId ? ctx.id : ctx.option.value)) == null ? '' : __t) +
'"\r\n  ';
 for (var attr in ctx.attrs) { ;
__p += '\r\n  ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.attrs[attr])) == null ? '' : __t) +
'"\r\n  ';
 } ;
__p += '\r\n  >\r\n  ' +
((__t = (ctx.t(ctx.option.label))) == null ? '' : __t) +
'\r\n</option>\r\n';
return __p
}