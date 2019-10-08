Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="ui table datagrid-table\n    ' +
((__t = ( ctx.component.striped ? 'striped' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.bordered ? 'celled' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.hover ? 'selectable' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.condensed ? 'compact' : 'padded')) == null ? '' : __t) +
'\n    ">\n  ';
 if (ctx.hasHeader) { ;
__p += '\n  <thead>\n    <tr>\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n      ';
 if (ctx.visibleColumns[col.key]) { ;
__p += '\n      <th class="' +
((__t = (col.validate && col.validate.required ? 'field-required' : '')) == null ? '' : __t) +
'">\n        ' +
((__t = ( col.hideLabel ? '' : ctx.t(col.label || col.title) )) == null ? '' : __t) +
'\n        ';
 if (col.tooltip) { ;
__p += ' <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted"></i>';
 } ;
__p += '\n      </th>\n      ';
 } ;
__p += '\n      ';
 }) ;
__p += '\n    </tr>\n  </thead>\n  ';
 } ;
__p += '\n  <tbody>\n    ';
 ctx.rows.forEach(function(row) { ;
__p += '\n    <tr>\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n      ';
 if (ctx.visibleColumns[col.key]) { ;
__p += '\n      <td ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'">\n        ' +
((__t = (row[col.key])) == null ? '' : __t) +
'\n      </td>\n      ';
 } ;
__p += '\n      ';
 }) ;
__p += '\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n</table>\n';
return __p
}