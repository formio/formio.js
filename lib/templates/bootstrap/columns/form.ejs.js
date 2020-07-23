Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.component.columns.forEach(function(column, index) { ;
__p += '\r\n<div class="\r\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-' +
((__t = (column.width)) == null ? '' : __t) +
'\r\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-offset-' +
((__t = (column.offset)) == null ? '' : __t) +
'\r\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-push-' +
((__t = (column.push)) == null ? '' : __t) +
'\r\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-pull-' +
((__t = (column.pull)) == null ? '' : __t) +
'\r\n  " ref="' +
((__t = (ctx.columnKey)) == null ? '' : __t) +
'">\r\n  ' +
((__t = (ctx.columnComponents[index])) == null ? '' : __t) +
'\r\n</div>\r\n';
 }) ;
__p += '\r\n';
return __p
}