Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="builder-component" ref="dragComponent">\r\n  <div class="component-btn-group" data-noattach="true">\r\n    <span class="builder-component__title">\r\n      ' +
((__t = (ctx.component.label || ctx.component.key)) == null ? '' : __t) +
'\r\n    </span>\r\n    <div class="btn btn-xxs btn-danger component-settings-button component-settings-button-remove" ref="removeComponent">\r\n      <i class="' +
((__t = (ctx.iconClass('remove'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-copy" ref="copyComponent">\r\n      <i class="' +
((__t = (ctx.iconClass('copy'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-paste" ref="pasteComponent">\r\n      <i class="' +
((__t = (ctx.iconClass('save'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-edit-json" ref="editJson">\r\n      <i class="' +
((__t = (ctx.iconClass('wrench'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-default component-settings-button component-settings-button-move" ref="moveComponent">\r\n      <i class="' +
((__t = (ctx.iconClass('move'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n    <div class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit" ref="editComponent">\r\n      <i class="' +
((__t = (ctx.iconClass('cog'))) == null ? '' : __t) +
'"></i>\r\n    </div>\r\n  </div>\r\n  ' +
((__t = (ctx.html)) == null ? '' : __t) +
'\r\n</div>\r\n';
return __p
}