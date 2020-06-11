Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<div class="row">\n  <div class="col col-sm-12">\n    <p class="lead">' +
((__t = (ctx.t('Form'))) == null ? '' : __t) +
'</p>\n  </div>\n</div>\n<div class="row">\n  <div class="col col-sm-12" ref="editFormWrapper">\n    <div ref="editForm">\n      ' +
((__t = (ctx.editForm)) == null ? '' : __t) +
'\n    </div>\n    <div class="edit-form-action-buttons">\n      <button class="btn btn-success" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n      <button class="btn btn-secondary" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\n    </div>\n  </div>\n</div>\n';
return __p
}