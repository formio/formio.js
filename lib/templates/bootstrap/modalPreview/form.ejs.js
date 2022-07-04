Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<label id="l-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'" class="control-label ' +
((__t = ( ctx.label.className )) == null ? '' : __t) +
'">\n  ' +
((__t = ( ctx.t(ctx.component.label, { _userInput: true }) )) == null ? '' : __t) +
'<span ref="modalLabelValue" class="sr-only">. ' +
((__t = ( ctx.component.type === 'signature' ? ctx.self.getValueAsString(ctx.previewText) : ctx.previewText )) == null ? '' : __t) +
'</span>\n</label><br>\n<span class="sr-only" ref="modalPreviewLiveRegion" aria-live="assertive"></span>\n<button\n  lang="en"\n  class="btn btn-light btn-md open-modal-button form-control ' +
((__t = (ctx.openModalBtnClasses || '')) == null ? '' : __t) +
'"\n  ref="openModal"\n  aria-labelledby="l-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'"\n>\n  ' +
((__t = ( ctx.previewText )) == null ? '' : __t) +
'\n</button>\n<div class="formio-errors invalid-feedback">\n  ' +
((__t = ( ctx.messages )) == null ? '' : __t) +
'\n</div>\n';
return __p
}