Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table datagrid-table table-bordered\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\n    ">\n  ';
 if (ctx.hasHeader) { ;
__p += '\n  <thead>\n    <tr>\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n        <th class="' +
((__t = (col.validate && col.validate.required ? 'field-required' : '')) == null ? '' : __t) +
'">\n          ' +
((__t = ( col.hideLabel ? '' : ctx.t(col.label || col.title, { _userInput: true }) )) == null ? '' : __t) +
'\n          ';
 if (col.tooltip) { ;
__p += ' <i ref="tooltip" tabindex="0" data-title="' +
((__t = (col.tooltip)) == null ? '' : __t) +
'" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted" data-tooltip="' +
((__t = (col.tooltip)) == null ? '' : __t) +
'"></i>';
 } ;
__p += '\n        </th>\n      ';
 }) ;
__p += '\n    </tr>\n  </thead>\n  ';
 } ;
__p += '\n  <tbody>\n    ';
 ctx.rows.forEach(function(row) { ;
__p += '\n    <tr>\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n        <td ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'">\n          ' +
((__t = (row[col.key])) == null ? '' : __t) +
'\n        </td>\n      ';
 }) ;
__p += '\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n</table>\n';
return __p
}