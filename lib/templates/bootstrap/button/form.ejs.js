Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'\r\n  ref="button"\r\n  ';
 for (var attr in ctx.input.attr) { ;
__p += '\r\n  ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\r\n  ';
 } ;
__p += '\r\n>\r\n';
 if (ctx.component.leftIcon) { ;
__p += '<span class="' +
((__t = (ctx.component.leftIcon)) == null ? '' : __t) +
'"></span>&nbsp;';
 } ;
__p += '\r\n' +
((__t = (ctx.input.content)) == null ? '' : __t) +
'\r\n';
 if (ctx.component.tooltip) { ;
__p += '\r\n  <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\r\n';
 } ;
__p += '\r\n';
 if (ctx.component.rightIcon) { ;
__p += '&nbsp;<span class="' +
((__t = (ctx.component.rightIcon)) == null ? '' : __t) +
'"></span>';
 } ;
__p += '\r\n</' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'>\r\n<div ref="buttonMessageContainer">\r\n  <span class="help-block" ref="buttonMessage"></span>\r\n</div>\r\n';
return __p
}