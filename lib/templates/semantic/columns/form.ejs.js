Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="ui grid" style="width: 100%">\n    ';
 ctx.component.columns.forEach(function(column, index) { ;
__p += '\n    <div class="' +
((__t = (ctx.transform('columns', column.width))) == null ? '' : __t) +
' wide column" ref="' +
((__t = (ctx.columnKey)) == null ? '' : __t) +
'">\n      ' +
((__t = (ctx.columnComponents[index])) == null ? '' : __t) +
'\n    </div>\n    ';
 }) ;
__p += '\n</div>\n';
return __p
}