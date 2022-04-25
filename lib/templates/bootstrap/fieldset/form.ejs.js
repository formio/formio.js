Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<fieldset>\r\n  ';
 if (ctx.component.legend) { ;
__p += '\r\n  <legend ref="header" class="' +
((__t = (ctx.component.collapsible ? 'formio-clickable' : '')) == null ? '' : __t) +
'">\r\n    ' +
((__t = (ctx.t(ctx.component.legend))) == null ? '' : __t) +
'\r\n    ';
 if (ctx.component.tooltip) { ;
__p += '\r\n      <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>\r\n    ';
 } ;
__p += '\r\n  </legend>\r\n  ';
 } ;
__p += '\r\n  ';
 if (!ctx.collapsed) { ;
__p += '\r\n  <div class="fieldset-body" ref="' +
((__t = (ctx.nestedKey)) == null ? '' : __t) +
'">\r\n    ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\r\n  </div>\r\n  ';
 } ;
__p += '\r\n</fieldset>\r\n';
return __p
}