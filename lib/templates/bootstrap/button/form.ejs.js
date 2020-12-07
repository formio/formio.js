Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'\n  ref="button"\n  ';
 for (var attr in ctx.input.attr) { ;
__p += '\n  ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n>\n';
 if (ctx.component.leftIcon) { ;
__p += '<span class="' +
((__t = (ctx.component.leftIcon)) == null ? '' : __t) +
'"></span>&nbsp;';
 } ;
__p += '\n' +
((__t = (ctx.input.content)) == null ? '' : __t) +
'\n';
 if (ctx.component.tooltip) { ;
__p += '\n  <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\n';
 } ;
__p += '\n';
 if (ctx.component.rightIcon) { ;
__p += '&nbsp;<span class="' +
((__t = (ctx.component.rightIcon)) == null ? '' : __t) +
'"></span>';
 } ;
__p += '\n</' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'>\n<div ref="buttonMessageContainer">\n  <span class="help-block" ref="buttonMessage"></span>\n</div>\n';
return __p
}