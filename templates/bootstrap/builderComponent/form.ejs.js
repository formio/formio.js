Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="builder-component" ref="dragComponent">\n  ';
 if (!ctx.disableBuilderActions) { ;
__p += '\n    <div class="component-btn-group" data-noattach="true">\n      <div\n        role="button"\n        aria-label="Remove button. Click to remove component from the form"\n        tabindex="-1"\n        class="btn btn-xxs btn-danger component-settings-button component-settings-button-remove"\n        ref="removeComponent"\n      >\n        <i class="' +
((__t = (ctx.iconClass('remove'))) == null ? '' : __t) +
'"></i>\n      </div>\n      <div\n        role="button"\n        aria-label="Copy button. Click to copy component"\n        tabindex="-1"\n        class="btn btn-xxs btn-default component-settings-button component-settings-button-copy"\n        ref="copyComponent"\n      >\n        <i class="' +
((__t = (ctx.iconClass('copy'))) == null ? '' : __t) +
'"></i>\n      </div>\n      <div\n        role="button"\n        aria-label="Paste below button. Click to paste component below the current component"\n        tabindex="-1"\n        class="btn btn-xxs btn-default component-settings-button component-settings-button-paste"\n        ref="pasteComponent"\n      >\n        <i class="' +
((__t = (ctx.iconClass('save'))) == null ? '' : __t) +
'"></i>\n      </div>\n      <div\n        role="button"\n        aria-label="Edit json button. Click to edit json of the current component"\n        tabindex="-1"\n        class="btn btn-xxs btn-default component-settings-button component-settings-button-edit-json" \n        ref="editJson"\n      >\n        <i class="' +
((__t = (ctx.iconClass('wrench'))) == null ? '' : __t) +
'"></i>\n      </div>\n      <div\n        role="button"\n        aria-label="Move button"\n        tabindex="-1"\n        class="btn btn-xxs btn-default component-settings-button component-settings-button-move"\n        ref="moveComponent"\n      >\n        <i class="' +
((__t = (ctx.iconClass('move'))) == null ? '' : __t) +
'"></i>\n      </div>\n      <div\n        role="button"\n        aria-label="Edit button. Click to open component settings modal window"\n        tabindex="-1"\n        class="btn btn-xxs btn-secondary component-settings-button component-settings-button-edit"\n        ref="editComponent"\n      >\n        <i class="' +
((__t = (ctx.iconClass('cog'))) == null ? '' : __t) +
'"></i>\n      </div>\n    </div>\n  ';
 } ;
__p += '\n  ' +
((__t = (ctx.html)) == null ? '' : __t) +
'\n</div>\n';
return __p
}