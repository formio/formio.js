Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.selected) { ;
__p +=
((__t = (ctx.t(ctx.option.label))) == null ? '' : __t);
 } ;
__p += '\r\n';
return __p
}