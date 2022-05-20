Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div ref="container" class="formio-modaledit-view-container">\n  <button\n    ref="edit"\n    type="button"\n    role="button"\n    class="btn btn-xxs btn-warning formio-modaledit-edit">\n    <i class="' +
((__t = (ctx.iconClass('edit'))) == null ? '' : __t) +
'"></i>\n  </button>\n  <div ref="input" class="modaledit-view-inner reset-margins">' +
((__t = (ctx.content)) == null ? '' : __t) +
'</div>\n</div>\n';
return __p
}