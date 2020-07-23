Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<label class="' +
((__t = (ctx.input.labelClass)) == null ? '' : __t) +
'">\n    ' +
((__t = (ctx.input.content)) == null ? '' : __t) +
'\n    ';
 if (!ctx.self.labelIsHidden()) { ;
__p += '<span>' +
((__t = (ctx.input.label)) == null ? '' : __t) +
'</span>';
 } ;
__p += '\n</label>\n<div ref="value">';
 if (ctx.checked) { ;
__p += 'True';
 } else { ;
__p += 'False';
 } ;
__p += '</div>\n';
return __p
}