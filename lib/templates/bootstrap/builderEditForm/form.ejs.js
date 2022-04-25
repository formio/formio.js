Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\r\n  <div class="col col-sm-6">\r\n    <p class="lead">' +
((__t = (ctx.t(ctx.componentInfo.title))) == null ? '' : __t) +
' ' +
((__t = (ctx.t('Component'))) == null ? '' : __t) +
'</p>\r\n  </div>\r\n  ';
 if (ctx.helplinks) { ;
__p += '\r\n  <div class="col col-sm-6">\r\n    <div class="float-right" style="margin-right: 20px; margin-top: 10px">\r\n      <a href="' +
((__t = (ctx.t(ctx.helplinks + ctx.componentInfo.documentation))) == null ? '' : __t) +
'" target="_blank">\r\n        <i class="' +
((__t = (ctx.iconClass('new-window'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t('Help'))) == null ? '' : __t) +
'\r\n      </a>\r\n    </div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n<div class="row">\r\n  <div class="col ';
 if (ctx.preview) { ;
__p += 'col-sm-6';
 } else { ;
__p += 'col-sm-12';
 } ;
__p += '">\r\n    <div ref="editForm">\r\n        ' +
((__t = (ctx.editForm)) == null ? '' : __t) +
'\r\n    </div>\r\n    ';
 if (!ctx.preview) { ;
__p += '\r\n    <div style="margin-top: 10px;">\r\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\r\n      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\r\n      <button class="btn btn-danger" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\r\n    </div>\r\n    ';
 } ;
__p += '\r\n  </div>\r\n  ';
 if (ctx.preview) { ;
__p += '\r\n  <div class="col col-sm-6">\r\n    <div class="card panel preview-panel">\r\n      <div class="card-header">\r\n        <h4 class="card-title mb-0">' +
((__t = (ctx.t('Preview'))) == null ? '' : __t) +
'</h4>\r\n      </div>\r\n      <div class="card-body">\r\n        <div class="component-preview" ref="preview">\r\n          ' +
((__t = (ctx.preview)) == null ? '' : __t) +
'\r\n        </div>\r\n      </div>\r\n    </div>\r\n    ';
 if (ctx.componentInfo.help) { ;
__p += '\r\n    <div class="card card-body bg-light formio-settings-help">\r\n      ' +
((__t = ( ctx.t(ctx.componentInfo.help) )) == null ? '' : __t) +
'\r\n    </div>\r\n    ';
 } ;
__p += '\r\n    <div style="margin-top: 10px;">\r\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\r\n      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\r\n      <button class="btn btn-danger" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\r\n    </div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n';
return __p
}