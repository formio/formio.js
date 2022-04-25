Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table\r\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.bordered ? 'table-bordered' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\r\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\r\n  ">\r\n  ';
 if (ctx.component.header && ctx.component.header.length > 0) { ;
__p += '\r\n  <thead>\r\n    <tr>\r\n      ';
 ctx.component.header.forEach(function(header) { ;
__p += '\r\n      <th>' +
((__t = (ctx.t(header))) == null ? '' : __t) +
'</th>\r\n      ';
 }) ;
__p += '\r\n    </tr>\r\n  </thead>\r\n  ';
 } ;
__p += '\r\n  <tbody>\r\n    ';
 ctx.tableComponents.forEach(function(row, rowIndex) { ;
__p += '\r\n    <tr ref="row-' +
((__t = (ctx.id)) == null ? '' : __t) +
'">\r\n      ';
 row.forEach(function(column, colIndex) { ;
__p += '\r\n      <td ref="' +
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
'</td>\r\n      ';
 }) ;
__p += '\r\n    </tr>\r\n    ';
 }) ;
__p += '\r\n  </tbody>\r\n</table>\r\n';
return __p
}