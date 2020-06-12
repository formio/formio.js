Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div ref="value">';
 if (ctx.value) { ;
__p +=
((__t = ( ctx.self.itemValueForHTMLMode(ctx.value) )) == null ? '' : __t);
 } else { ;
__p += '-';
 } ;
__p += '</div>\n';
return __p
}