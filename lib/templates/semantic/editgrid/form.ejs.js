Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="editgrid-listgroup ui celled list">\n  ';
 if (ctx.header) { ;
__p += '\n  <div class="item list-group-header">\n    ' +
((__t = (ctx.header)) == null ? '' : __t) +
'\n  </div>\n  ';
 } ;
__p += '\n  ';
 ctx.rows.forEach(function(row, rowIndex) { ;
__p += '\n  <div class="item" ref="' +
((__t = (ctx.editgridKey)) == null ? '' : __t) +
'">\n    ' +
((__t = (row)) == null ? '' : __t) +
'\n    ';
 if (ctx.openRows[rowIndex] && !ctx.readOnly) { ;
__p += '\n    <div class="editgrid-actions">\n      <button class="ui button primary" ref="' +
((__t = (ctx.editgridKey)) == null ? '' : __t) +
'-saveRow">' +
((__t = (ctx.t(ctx.component.saveRow || 'Save'))) == null ? '' : __t) +
'</button>\n      ';
 if (ctx.component.removeRow) { ;
__p += '\n      <button class="ui button secondary" ref="' +
((__t = (ctx.editgridKey)) == null ? '' : __t) +
'-cancelRow">' +
((__t = (ctx.t(ctx.component.removeRow || 'Cancel'))) == null ? '' : __t) +
'</button>\n      ';
 } ;
__p += '\n    </div>\n    ';
 } ;
__p += '\n    <div class="has-error">\n      <div class="editgrid-row-error help-block">\n        ' +
((__t = (ctx.errors[rowIndex])) == null ? '' : __t) +
'\n      </div>\n    </div>\n  </div>\n  ';
 }) ;
__p += '\n  ';
 if (ctx.footer) { ;
__p += '\n  <div class="item list-group-footer">\n    ' +
((__t = (ctx.footer)) == null ? '' : __t) +
'\n  </div>\n  ';
 } ;
__p += '\n</div>\n';
 if (!ctx.readOnly && ctx.hasAddButton) { ;
__p += '\n<button class="ui button primary" ref="' +
((__t = (ctx.editgridKey)) == null ? '' : __t) +
'-addRow">\n  <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t(ctx.component.addAnother || 'Add Another'))) == null ? '' : __t) +
'\n</button>\n';
 } ;
__p += '\n';
return __p
}