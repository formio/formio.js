Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.component.columns.forEach(function(column, index) { ;
__p += '\n<div class="\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-' +
((__t = (column.currentWidth)) == null ? '' : __t) +
'\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-offset-' +
((__t = (column.offset)) == null ? '' : __t) +
'\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-push-' +
((__t = (column.push)) == null ? '' : __t) +
'\n    col-' +
((__t = (column.size)) == null ? '' : __t) +
'-pull-' +
((__t = (column.pull)) == null ? '' : __t) +
'\n  " ref="' +
((__t = (ctx.columnKey)) == null ? '' : __t) +
'">\n  ' +
((__t = (ctx.columnComponents[index])) == null ? '' : __t) +
'\n</div>\n';
 }) ;
__p += '\n';
return __p
}