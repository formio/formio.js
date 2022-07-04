Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.bordered ? 'table-bordered' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\n  ">\n  <caption class="sr-only">' +
((__t = (ctx.t(ctx.component.label))) == null ? '' : __t) +
'</caption>\n  ';
 if (ctx.component.header && ctx.component.header.length > 0) { ;
__p += '\n  <thead>\n    <tr>\n      ';
 ctx.component.header.forEach(function(header) { ;
__p += '\n      <th>' +
((__t = (ctx.t(header))) == null ? '' : __t) +
'</th>\n      ';
 }) ;
__p += '\n    </tr>\n  </thead>\n  ';
 } ;
__p += '\n  <tbody>\n    ';
 ctx.tableComponents.forEach(function(row, rowIndex) { ;
__p += '\n    <tr ref="row-' +
((__t = (ctx.id)) == null ? '' : __t) +
'">\n      ';
 row.forEach(function(column, colIndex) { ;
__p += '\n      <td ref="' +
((__t = (ctx.tableKey)) == null ? '' : __t) +
'-' +
((__t = (rowIndex)) == null ? '' : __t) +
'"';
 if (ctx.cellClassName) { ;
__p += ' class="' +
((__t = (ctx.cellClassName)) == null ? '' : __t) +
'"';
 } ;
__p += '>' +
((__t = (column)) == null ? '' : __t) +
'</td>\n      ';
 }) ;
__p += '\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n</table>\n';
return __p
}