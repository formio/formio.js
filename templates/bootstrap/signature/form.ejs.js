Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p +=
((__t = (ctx.element)) == null ? '' : __t) +
'\n<div\n  class="signature-pad-body"\n  style="width: ' +
((__t = (ctx.component.width)) == null ? '' : __t) +
';height: ' +
((__t = (ctx.component.height)) == null ? '' : __t) +
';padding:0;margin:0;"\n  tabindex="' +
((__t = (ctx.component.tabindex || 0)) == null ? '' : __t) +
'"\n  ref="padBody"\n>\n  <a class="btn btn-sm btn-light signature-pad-refresh" ref="refresh">\n    <i class="' +
((__t = (ctx.iconClass('refresh'))) == null ? '' : __t) +
'"></i>\n  </a>\n  <canvas class="signature-pad-canvas" style="display: none;" height="' +
((__t = (ctx.component.height)) == null ? '' : __t) +
'" ref="canvas"></canvas>\n  ';
 if (ctx.required) { ;
__p += '\n  <span class="form-control-feedback field-required-inline text-danger">\n    <i class="' +
((__t = (ctx.iconClass('asterisk'))) == null ? '' : __t) +
'"></i>\n  </span>\n  ';
 } ;
__p += '\n  <img style="width: 100%;display: inherit;" ref="signatureImage">\n</div>\n';
 if (ctx.component.footer) { ;
__p += '\n  <div class="signature-pad-footer">\n    ' +
((__t = (ctx.t(ctx.component.footer, { _userInput: true }))) == null ? '' : __t) +
'\n  </div>\n';
 } ;
__p += '\n';
return __p
}