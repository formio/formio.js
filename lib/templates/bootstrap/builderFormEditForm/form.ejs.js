Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="row">\r\n  <div class="col col-sm-12">\r\n    <p class="lead">' +
((__t = (ctx.t('Form'))) == null ? '' : __t) +
'</p>\r\n  </div>\r\n</div>\r\n<div class="row">\r\n  <div class="col col-sm-12" ref="editFormWrapper">\r\n    <div ref="editForm">\r\n      ' +
((__t = (ctx.editForm)) == null ? '' : __t) +
'\r\n    </div>\r\n    <div class="edit-form-action-buttons">\r\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\r\n      <button class="btn btn-secondary" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n';
return __p
}