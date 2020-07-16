Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="formio-component-modal-wrapper formio-component-modal-wrapper-' +
((__t = ( ctx.component.type )) == null ? '' : __t) +
'" ref="componentModalWrapper">\n  <div ref="openModalWrapper"></div>\n  <div class="formio-dialog formio-dialog-theme-default component-rendering-hidden" ref="modalWrapper">\n    <div class="formio-dialog-overlay" ref="modalOverlay"></div>\n    <div class="formio-dialog-content" ref="modalContents">\n      <div ref="modalContents">\n        ';
 if (ctx.visible) { ;
__p += '\n        ' +
((__t = (ctx.children)) == null ? '' : __t) +
'\n        ';
 } ;
__p += '\n        <div class="formio-dialog-buttons">\n          <button class="btn btn-success formio-dialog-button" ref="modalSave">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n        </div>\n      </div>\n      <button class="formio-dialog-close float-right btn btn-secondary btn-sm" aria-label="close" ref="modalClose"></button>\n    </div>\n  </div>\n</div>\n';
return __p
}