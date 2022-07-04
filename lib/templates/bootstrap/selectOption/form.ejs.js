Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<option ' +
((__t = ( ctx.selected ? 'selected="selected"' : '' )) == null ? '' : __t) +
'\n  value=\'' +
((__t = (ctx.useId ? ctx.id : ctx.option.value)) == null ? '' : __t) +
'\'\n  ';
 for (var attr in ctx.attrs) { ;
__p += '\n  ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.attrs[attr])) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n  >\n  ' +
((__t = (ctx.t(ctx.option.label, { _userInput: true }))) == null ? '' : __t) +
'\n</option>\n';
return __p
}