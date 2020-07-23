Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div ref="container" class="formio-modaledit-view-container">\r\n  <button\r\n    ref="edit"\r\n    type="button"\r\n    role="button"\r\n    class="btn btn-xxs btn-warning formio-modaledit-edit">\r\n    <i class="' +
((__t = (ctx.iconClass('edit'))) == null ? '' : __t) +
'"></i>\r\n  </button>\r\n  <div ref="input" class="modaledit-view-inner reset-margins">' +
((__t = (ctx.content)) == null ? '' : __t) +
'</div>\r\n</div>\r\n';
return __p
}