Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="pdf-upload formio-component-file">\r\n  <h3 class="label">' +
((__t = (ctx.t('Upload a PDF File'))) == null ? '' : __t) +
'</h3>\r\n  <input type="file" style="opacity: 0; position: absolute;" tabindex="-1" accept=".pdf" ref="hiddenFileInputElement">\r\n  <div class="fileSelector" ref="fileDrop">\r\n    <span ref="dragDropText">\r\n      <i class="' +
((__t = (ctx.iconClass('cloud-upload'))) == null ? '' : __t) +
'"></i>' +
((__t = (ctx.t('Drop pdf to start, or'))) == null ? '' : __t) +
' <a href="#" ref="fileBrowse" class="browse">' +
((__t = (ctx.t('browse'))) == null ? '' : __t) +
'</a>\r\n    </span>\r\n    <div class="progress pdf-progress" ref="uploadProgressWrapper" style="display:none;">\r\n      <div class="progress-bar" ref="uploadProgress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>\r\n    </div>\r\n  </div>\r\n  <div class="alert alert-danger" ref="uploadError">\r\n\r\n  </div>\r\n</div>\r\n\r\n';
return __p
}