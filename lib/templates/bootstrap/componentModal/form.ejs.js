Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="formio-component-modal-wrapper formio-component-modal-wrapper-' +
((__t = ( ctx.component.type )) == null ? '' : __t) +
'" ref="componentModalWrapper">\r\n  <div ref="openModalWrapper"></div>\r\n  <div class="formio-dialog formio-dialog-theme-default component-rendering-hidden" ref="modalWrapper">\r\n    <div class="formio-dialog-overlay" ref="modalOverlay"></div>\r\n    <div class="formio-dialog-content" ref="modalContents">\r\n      <div ref="modalContents">\r\n        ';
 if (ctx.visible) { ;
__p += '\r\n        ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\r\n        ';
 } ;
__p += '\r\n        <div class="formio-dialog-buttons">\r\n          <button class="btn btn-success formio-dialog-button" ref="modalSave">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\r\n        </div>\r\n      </div>\r\n      <button class="formio-dialog-close float-right btn btn-secondary btn-sm" aria-label="close" ref="modalClose"></button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
return __p
}