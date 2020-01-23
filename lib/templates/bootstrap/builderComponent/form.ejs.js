Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="builder-component" ref="dragComponent">\n  <div class="component-btn-group" data-noattach="true">\n    <div class="btn btn-xxs btn-danger component-settings-button component-settings-button-remove" ref="removeComponent">\n      <i class="' +
((__t = (ctx.iconClass('remove'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-copy" ref="copyComponent">\n      <i class="' +
((__t = (ctx.iconClass('copy'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-paste" ref="pasteComponent">\n      <i class="' +
((__t = (ctx.iconClass('save'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-edit-json" ref="editJson">\n      <i class="' +
((__t = (ctx.iconClass('wrench'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-move" ref="moveComponent">\n      <i class="' +
((__t = (ctx.iconClass('move'))) == null ? '' : __t) +
'"></i>\n    </div>\n    <div class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit", ref="editComponent">\n      <i class="' +
((__t = (ctx.iconClass('cog'))) == null ? '' : __t) +
'"></i>\n    </div>\n  </div>\n  ' +
((__t = (ctx.html)) == null ? '' : __t) +
'\n</div>\n';
return __p
}