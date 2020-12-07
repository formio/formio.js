Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<label class="control-label">' +
((__t = ( ctx.t(ctx.component.label) )) == null ? '' : __t) +
'</label><br>\n<button lang=\'en\' class=\'btn btn-light btn-md open-modal-button form-control\' ref=\'openModal\'>\n  ' +
((__t = ( ctx.previewText )) == null ? '' : __t) +
'\n</button>\n<div class="formio-errors invalid-feedback">\n  ' +
((__t = ( ctx.messages )) == null ? '' : __t) +
'\n</div>\n';
return __p
}