Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="mb-2 card border">\r\n  <div class="card-header ' +
((__t = (ctx.transform('class', 'bg-' + ctx.component.theme))) == null ? '' : __t) +
'" ref="header">\r\n    <span class="mb-0 card-title ';
 if (ctx.component.theme && ctx.component.theme !== 'default') { ;
__p += 'text-light';
 } ;
__p += '">\r\n      ';
 if (ctx.component.collapsible) { ;
__p += '\r\n        <i class="formio-collapse-icon ' +
((__t = (ctx.iconClass(ctx.collapsed ? 'plus-square-o' : 'minus-square-o'))) == null ? '' : __t) +
' text-muted" data-title="Collapse Panel"></i>\r\n      ';
 } ;
__p += '\r\n      ' +
((__t = (ctx.t(ctx.component.title))) == null ? '' : __t) +
'\r\n      ';
 if (ctx.component.tooltip) { ;
__p += '\r\n        <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\r\n      ';
 } ;
__p += '\r\n    </span>\r\n  </div>\r\n  ';
 if (!ctx.collapsed || ctx.builder) { ;
__p += '\r\n  <div class="card-body" ref="' +
((__t = (ctx.nestedKey)) == null ? '' : __t) +
'">\r\n    ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\r\n  </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n';
return __p
}