Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div ref="value">\n  ';
 var filtered = ctx.values.filter(function(item) {return ctx.value === item.value || (typeof ctx.value === 'object' && ctx.value.hasOwnProperty(item.value) && ctx.value[item.value])}).map(function(item) { return ctx.t(item.label, { _userInput: true })}).join(', ') ;
__p += '\n  ' +
((__t = ( filtered )) == null ? '' : __t) +
'\n  </div>\n';
return __p
}