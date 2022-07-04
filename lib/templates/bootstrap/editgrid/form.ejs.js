Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<ul class="editgrid-listgroup list-group\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.bordered ? 'table-bordered' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\n    ">\n  ';
 if (ctx.header) { ;
__p += '\n  <li class="list-group-item list-group-header">\n    ' +
((__t = (ctx.header)) == null ? '' : __t) +
'\n  </li>\n  ';
 } ;
__p += '\n  ';
 ctx.rows.forEach(function(row, rowIndex) { ;
__p += '\n  <li class="list-group-item" ref="' +
((__t = (ctx.ref.row)) == null ? '' : __t) +
'">\n    ' +
((__t = (row)) == null ? '' : __t) +
'\n    ';
 if (ctx.openRows[rowIndex] && !ctx.readOnly) { ;
__p += '\n    <div class="editgrid-actions">\n      <button class="btn btn-primary" ref="' +
((__t = (ctx.ref.saveRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.saveRow || 'Save', { _userInput: true }))) == null ? '' : __t) +
'</button>\n      ';
 if (ctx.component.removeRow) { ;
__p += '\n      <button class="btn btn-danger" ref="' +
((__t = (ctx.ref.cancelRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.removeRow || 'Cancel', { _userInput: true }))) == null ? '' : __t) +
'</button>\n      ';
 } ;
__p += '\n    </div>\n    ';
 } ;
__p += '\n    <div class="has-error">\n      <div class="editgrid-row-error">\n        ' +
((__t = (ctx.errors[rowIndex])) == null ? '' : __t) +
'\n      </div>\n    </div>\n  </li>\n  ';
 }) ;
__p += '\n  ';
 if (ctx.footer) { ;
__p += '\n  <li class="list-group-item list-group-footer">\n    ' +
((__t = (ctx.footer)) == null ? '' : __t) +
'\n  </li>\n  ';
 } ;
__p += '\n</ul>\n';
 if (!ctx.readOnly && ctx.hasAddButton) { ;
__p += '\n<button class="btn btn-primary" ref="' +
((__t = (ctx.ref.addRow)) == null ? '' : __t) +
'">\n  <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t(ctx.component.addAnother || 'Add Another', { _userInput: true }))) == null ? '' : __t) +
'\n</button>\n';
 } ;
__p += '\n';
return __p
}