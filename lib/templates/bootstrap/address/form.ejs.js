Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.mode.autocomplete) { ;
__p += '\r\n  <div class="address-autocomplete-container">\r\n    <input\r\n      ref="' +
((__t = ( ctx.ref.searchInput )) == null ? '' : __t) +
'"\r\n      ';
 for (var attr in ctx.inputAttributes) { ;
__p += '\r\n        ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.inputAttributes[attr])) == null ? '' : __t) +
'"\r\n      ';
 } ;
__p += '\r\n      value="' +
((__t = ( ctx.displayValue )) == null ? '' : __t) +
'"\r\n      autocomplete="off"\r\n    >\r\n    ';
 if (!ctx.component.disableClearIcon) { ;
__p += '\r\n      <i\r\n        class="address-autocomplete-remove-value-icon fa fa-times"\r\n        tabindex="' +
((__t = ( ctx.inputAttributes.tabindex )) == null ? '' : __t) +
'"\r\n        ref="' +
((__t = ( ctx.ref.removeValueIcon )) == null ? '' : __t) +
'"\r\n      ></i>\r\n    ';
 } ;
__p += '\r\n  </div>\r\n';
 } ;
__p += '\r\n';
 if (ctx.self.manualModeEnabled) { ;
__p += '\r\n  <div class="form-check checkbox">\r\n    <label class="form-check-label">\r\n      <input\r\n        ref="' +
((__t = ( ctx.ref.modeSwitcher )) == null ? '' : __t) +
'"\r\n        type="checkbox"\r\n        class="form-check-input"\r\n        tabindex="' +
((__t = ( ctx.inputAttributes.tabindex )) == null ? '' : __t) +
'"\r\n        ';
 if (ctx.mode.manual) { ;
__p += 'checked=true';
 } ;
__p += '\r\n        ';
 if (ctx.disabled) { ;
__p += 'disabled=true';
 } ;
__p += '\r\n      >\r\n      <span>' +
((__t = ( ctx.component.switchToManualModeLabel )) == null ? '' : __t) +
'</span>\r\n    </label>\r\n  </div>\r\n';
 } ;
__p += '\r\n';
 if (ctx.self.manualMode) { ;
__p += '\r\n  <div ref="' +
((__t = ( ctx.nestedKey )) == null ? '' : __t) +
'">\r\n    ' +
((__t = ( ctx.children )) == null ? '' : __t) +
'\r\n  </div>\r\n';
 } ;
__p += '\r\n';
return __p
}