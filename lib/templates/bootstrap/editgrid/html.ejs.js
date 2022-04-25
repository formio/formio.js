Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<ul class="editgrid-listgroup list-group\r\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.bordered ? 'table-bordered' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\r\n    ">\r\n  ';
 if (ctx.header) { ;
__p += '\r\n  <li class="list-group-item list-group-header">\r\n    ' +
((__t = (ctx.header)) == null ? '' : __t) +
'\r\n  </li>\r\n  ';
 } ;
__p += '\r\n  ';
 ctx.rows.forEach(function(row, rowIndex) { ;
__p += '\r\n  <li class="list-group-item" ref="' +
((__t = (ctx.ref.row)) == null ? '' : __t) +
'">\r\n    ' +
((__t = (row)) == null ? '' : __t) +
'\r\n    ';
 if (ctx.openRows[rowIndex] && !ctx.readOnly) { ;
__p += '\r\n    <div class="editgrid-actions">\r\n      <button class="btn btn-primary" ref="' +
((__t = (ctx.ref.saveRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.saveRow || 'Save'))) == null ? '' : __t) +
'</button>\r\n      ';
 if (ctx.component.removeRow) { ;
__p += '\r\n      <button class="btn btn-danger" ref="' +
((__t = (ctx.ref.cancelRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.removeRow || 'Cancel'))) == null ? '' : __t) +
'</button>\r\n      ';
 } ;
__p += '\r\n    </div>\r\n    ';
 } ;
__p += '\r\n    <div class="has-error">\r\n      <div class="editgrid-row-error help-block">\r\n        ' +
((__t = (ctx.errors[rowIndex])) == null ? '' : __t) +
'\r\n      </div>\r\n    </div>\r\n  </li>\r\n  ';
 }) ;
__p += '\r\n  ';
 if (ctx.footer) { ;
__p += '\r\n  <li class="list-group-item list-group-footer">\r\n    ' +
((__t = (ctx.footer)) == null ? '' : __t) +
'\r\n  </li>\r\n  ';
 } ;
__p += '\r\n</ul>\r\n';
return __p
}