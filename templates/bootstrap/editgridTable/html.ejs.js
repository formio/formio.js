Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="editgrid-table-container">\n  <div class="table-responsive">\n    <table class="table\n      ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\n      ' +
((__t = ( ctx.component.bordered ? 'table-bordered' : '')) == null ? '' : __t) +
'\n      ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\n      ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\n    ">\n      ';
 if (ctx.header) { ;
__p += '\n      <thead class="editgrid-table-head">\n        ' +
((__t = (ctx.header)) == null ? '' : __t) +
'\n      </thead>\n      ';
 } ;
__p += '\n      <tbody class="editgrid-table-body">\n        ';
 ctx.rows.forEach(function(row, rowIndex) { ;
__p += '\n        <tr ref="' +
((__t = (ctx.ref.row)) == null ? '' : __t) +
'">\n          ' +
((__t = (row)) == null ? '' : __t) +
'\n          ';
 if (ctx.openRows[rowIndex] && !ctx.readOnly) { ;
__p += '\n          <td class="editgrid-table-column">\n            <div class="editgrid-actions">\n              <button class="btn btn-primary" ref="' +
((__t = (ctx.ref.saveRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.saveRow || 'Save', { _userInput: true }))) == null ? '' : __t) +
'</button>\n              ';
 if (ctx.component.removeRow) { ;
__p += '\n              <button class="btn btn-danger" ref="' +
((__t = (ctx.ref.cancelRow)) == null ? '' : __t) +
'">' +
((__t = (ctx.t(ctx.component.removeRow || 'Cancel', { _userInput: true }))) == null ? '' : __t) +
'</button>\n              ';
 } ;
__p += '\n            </div>\n          </td>\n          ';
 } ;
__p += '\n          ';
 if (ctx.errors[rowIndex]) { ;
__p += '\n          <td class="editgrid-table-column">\n            <div class="has-error">\n              <div class="editgrid-row-error help-block">\n                ' +
((__t = (ctx.errors[rowIndex])) == null ? '' : __t) +
'\n              </div>\n            </div>\n          </td>\n          ';
 } ;
__p += '\n        </tr>\n        ';
 }) ;
__p += '\n      </tbody>\n      ';
 if (ctx.footer) { ;
__p += '\n      <tfoot>\n        <tr>\n          ' +
((__t = (ctx.footer)) == null ? '' : __t) +
'\n         </tr>\n      <tfoot>\n      ';
 } ;
__p += '\n    </table>\n  </div>\n</div>\n';
return __p
}