Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="builder-component" ref="dragComponent">\n  <div class="component-btn-group" data-noattach="true">\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-edit-json" ref="editFormJson">\n      <i class="' +
((__t = (ctx.iconClass('wrench'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit", ref="editForm">\n      <i class="' +
((__t = (ctx.iconClass('cog'))) == null ? '' : __t) +
'"></i>\n    </div>\n  </div>\n  <div style="padding-top: 24px;">\n    ' +
((__t = (ctx.html)) == null ? '' : __t) +
'\n  </div>\n</div>\n';
return __p
}