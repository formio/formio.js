Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<h4 class="ui top attached block header ' +
((__t = (ctx.component.className)) == null ? '' : __t) +
'" ref="header">\n  ';
 if (ctx.component.collapsible) { ;
__p += '\n    <i class="formio-collapse-icon ' +
((__t = (ctx.iconClass(ctx.collapsed ? 'plus-square-o' : 'minus-square-o'))) == null ? '' : __t) +
' text-muted" data-title="Collapse Panel"></i>\n  ';
 } ;
__p += '\n  ' +
((__t = (ctx.t(ctx.component.title))) == null ? '' : __t) +
'\n  ';
 if (ctx.component.tooltip) { ;
__p += '\n    <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\n  ';
 } ;
__p += '\n</h4>\n';
 if (!ctx.collapsed || ctx.builder) { ;
__p += '\n<div class="ui bottom attached segment" ref="' +
((__t = (ctx.nestedKey)) == null ? '' : __t) +
'">\n  ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\n</div>\n';
 } ;
__p += '\n';
return __p
}