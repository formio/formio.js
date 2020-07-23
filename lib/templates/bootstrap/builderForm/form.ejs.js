Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="builder-component" ref="dragComponent">\r\n  <div class="component-btn-group" data-noattach="true">\r\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-edit-json" ref="editFormJson">\r\n      <i class="' +
((__t = (ctx.iconClass('wrench'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit", ref="editForm">\r\n      <i class="' +
((__t = (ctx.iconClass('cog'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n  </div>\r\n  <div style="padding-top: 24px;">\r\n    ' +
((__t = (ctx.html)) == null ? '' : __t) +
'\r\n  </div>\r\n</div>\r\n';
return __p
}