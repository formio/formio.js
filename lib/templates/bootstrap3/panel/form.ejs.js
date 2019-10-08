Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="panel panel-' +
((__t = (ctx.component.theme)) == null ? '' : __t) +
'">\n  <div class="panel-heading">\n    <h4 class="mb-0 panel-title" ref="header">\n      ';
 if (ctx.component.collapsible) { ;
__p += '\n        <i class="formio-collapse-icon ' +
((__t = (ctx.iconClass(ctx.collapsed ? 'plus' : 'minus'))) == null ? '' : __t) +
' text-muted" data-title="Collapse Panel"></i>\n      ';
 } ;
__p += '\n      ' +
((__t = (ctx.t(ctx.component.title))) == null ? '' : __t) +
'\n      ';
 if (ctx.component.tooltip) { ;
__p += '\n        <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\n      ';
 } ;
__p += '\n    </h4>\n  </div>\n  ';
 if (!ctx.collapsed || ctx.builder) { ;
__p += '\n  <div class="panel-body" ref="' +
((__t = (ctx.nestedKey)) == null ? '' : __t) +
'">\n    ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\n  </div>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}