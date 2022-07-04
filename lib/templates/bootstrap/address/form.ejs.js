Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.mode.autocomplete) { ;
__p += '\n  <div class="address-autocomplete-container">\n    <input\n      ref="' +
((__t = ( ctx.ref.searchInput )) == null ? '' : __t) +
'"\n      ';
 for (var attr in ctx.inputAttributes) { ;
__p += '\n        ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.inputAttributes[attr])) == null ? '' : __t) +
'"\n      ';
 } ;
__p += '\n      value="' +
((__t = ( ctx.displayValue )) == null ? '' : __t) +
'"\n      autocomplete="off"\n      aria-label="' +
((__t = (ctx.t('autocomplete'))) == null ? '' : __t) +
'"\n    >\n    ';
 if (!ctx.component.disableClearIcon) { ;
__p += '\n      <i\n        class="address-autocomplete-remove-value-icon fa fa-times"\n        tabindex="' +
((__t = ( ctx.inputAttributes.tabindex )) == null ? '' : __t) +
'"\n        ref="' +
((__t = ( ctx.ref.removeValueIcon )) == null ? '' : __t) +
'"\n      ></i>\n    ';
 } ;
__p += '\n  </div>\n';
 } ;
__p += '\n';
 if (ctx.self.manualModeEnabled) { ;
__p += '\n  <div class="form-check checkbox">\n    <label class="form-check-label">\n      <input\n        ref="' +
((__t = ( ctx.ref.modeSwitcher )) == null ? '' : __t) +
'"\n        type="checkbox"\n        class="form-check-input"\n        tabindex="' +
((__t = ( ctx.inputAttributes.tabindex )) == null ? '' : __t) +
'"\n        ';
 if (ctx.mode.manual) { ;
__p += 'checked=true';
 } ;
__p += '\n        ';
 if (ctx.disabled) { ;
__p += 'disabled=true';
 } ;
__p += '\n      >\n      <span>' +
((__t = ( ctx.component.switchToManualModeLabel )) == null ? '' : __t) +
'</span>\n    </label>\n  </div>\n';
 } ;
__p += '\n';
 if (ctx.self.manualMode) { ;
__p += '\n  <div ref="' +
((__t = ( ctx.nestedKey )) == null ? '' : __t) +
'">\n    ' +
((__t = ( ctx.children )) == null ? '' : __t) +
'\n  </div>\n';
 } ;
__p += '\n';
return __p
}