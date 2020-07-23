Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div id="' +
((__t = (ctx.id)) == null ? '' : __t) +
'" class="' +
((__t = (ctx.classes)) == null ? '' : __t) +
'"';
 if (ctx.styles) { ;
__p += ' styles="' +
((__t = (ctx.styles)) == null ? '' : __t) +
'"';
 } ;
__p += ' ref="component">\r\n  ';
 if (ctx.visible) { ;
__p += '\r\n  ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\r\n  <div ref="messageContainer" class="formio-errors invalid-feedback"></div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n';
return __p
}