Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="field-wrapper\r\n  ' +
((__t = (ctx.isRightPosition ? 'field-wrapper--reverse' : '')) == null ? '' : __t) +
'">\r\n  ';
 if (!ctx.label.hidden) { ;
__p += '\r\n    <div class="field-label\r\n      ' +
((__t = (ctx.isRightAlign ? 'field-label--right' : '')) == null ? '' : __t) +
'"\r\n      style="' +
((__t = (ctx.labelStyles)) == null ? '' : __t) +
'">\r\n    ' +
((__t = ( ctx.labelMarkup )) == null ? '' : __t) +
'\r\n    </div>\r\n  ';
 } ;
__p += '\r\n\r\n  ';
 if (ctx.label.hidden && ctx.label.className && ctx.component.validate.required) { ;
__p += '\r\n    <div class="field-label\r\n      ' +
((__t = (ctx.isRightAlign ? 'field-label--right' : '')) == null ? '' : __t) +
'"\r\n      style="' +
((__t = (ctx.labelStyles)) == null ? '' : __t) +
'">\r\n      <label class="' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'"></label>\r\n    </div>\r\n  ';
 } ;
__p += '\r\n\r\n  <div class="filed-content" style="' +
((__t = (ctx.contentStyles)) == null ? '' : __t) +
'">\r\n    ' +
((__t = (ctx.element)) == null ? '' : __t) +
'\r\n  </div>\r\n</div>\r\n\r\n';
 if (ctx.component.description) { ;
__p += '\r\n  <div class="form-text text-muted">' +
((__t = (ctx.t(ctx.component.description))) == null ? '' : __t) +
'</div>\r\n';
 } ;
__p += '\r\n';
return __p
}