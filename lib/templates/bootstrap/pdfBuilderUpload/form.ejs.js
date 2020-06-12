Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="pdf-upload formio-component-file">\n  <h3 class="label">' +
((__t = (ctx.t('Upload a PDF File'))) == null ? '' : __t) +
'</h3>\n  <input type="file" style="opacity: 0; position: absolute;" tabindex="-1" accept=".pdf" ref="hiddenFileInputElement">\n  <div class="fileSelector" ref="fileDrop">\n    <i class="' +
((__t = (ctx.iconClass('cloud-upload'))) == null ? '' : __t) +
'"></i>' +
((__t = (ctx.t('Drop pdf to start, or'))) == null ? '' : __t) +
' <a href="#" ref="fileBrowse" class="browse">' +
((__t = (ctx.t('browse'))) == null ? '' : __t) +
'</a>\n  </div>\n  <div class="alert alert-danger" ref="uploadError">\n\n  </div>\n</div>\n\n';
return __p
}