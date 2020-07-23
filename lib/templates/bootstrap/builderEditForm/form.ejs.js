Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\n  <div class="col col-sm-6">\n    <p class="lead">' +
((__t = (ctx.t(ctx.componentInfo.title))) == null ? '' : __t) +
' ' +
((__t = (ctx.t('Component'))) == null ? '' : __t) +
'</p>\n  </div>\n  <div class="col col-sm-6">\n    <div class="float-right" style="margin-right: 20px; margin-top: 10px">\n      <a href="' +
((__t = (ctx.t(ctx.componentInfo.documentation))) == null ? '' : __t) +
'" target="_blank">\n        <i class="' +
((__t = (ctx.iconClass('new-window'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t('Help'))) == null ? '' : __t) +
'\n      </a>\n    </div>\n  </div>\n</div>\n<div class="row">\n  <div class="col ';
 if (ctx.sidebarForm) { ;
__p += 'col-sm-6';
 } else { ;
__p += 'col-sm-12';
 } ;
__p += '" ref="editFormWrapper">\n    <div ref="editForm">\n      ' +
((__t = (ctx.editForm)) == null ? '' : __t) +
'\n    </div>\n    <div class="edit-form-action-buttons">\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\n      <button class="btn btn-danger" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\n    </div>\n  </div>\n  ';
 if (ctx.sidebarForm) { ;
__p += '\n  <div class="col col-sm-6" ref="sidebarFormWrapper">\n    <div ref="sidebarForm">\n      ' +
((__t = (ctx.sidebarForm)) == null ? '' : __t) +
'\n    </div>\n    <div class="edit-form-action-buttons">\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n      <button class="btn btn-secondary" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\n      <button class="btn btn-danger" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\n    </div>\n  </div>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}