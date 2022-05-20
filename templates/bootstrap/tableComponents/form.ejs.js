Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.children.forEach(function(component) { ;
__p += '\n  <td class="editgrid-table-column">\n    ' +
((__t = ( component )) == null ? '' : __t) +
'\n  </td>\n';
 }) ;
__p += '\n';
return __p
}