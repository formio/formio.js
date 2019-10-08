Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<label class="' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'">\n  ';
 if (!ctx.label.hidden) { ;
__p += '\n    ' +
((__t = ( ctx.t(ctx.component.label) )) == null ? '' : __t) +
'\n    ';
 if (ctx.tooltip) { ;
__p += '\n      <span data-tooltip="' +
((__t = (ctx.tooltip)) == null ? '' : __t) +
'" data-position="right center">\n        <i class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
'"></i>\n      </span>\n    ';
 } ;
__p += '\n  ';
 } ;
__p += '\n</label>\n';
return __p
}