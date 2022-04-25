Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\r\n  ';
 ctx.util.eachComponent(ctx.components, function(component) { ;
__p += '\r\n    ';
 if (!component.hasOwnProperty('tableView') || component.tableView) { ;
__p += '\r\n      <div class="col-sm-2">' +
((__t = ( component.label )) == null ? '' : __t) +
'</div>\r\n    ';
 } ;
__p += '\r\n  ';
 }) ;
__p += '\r\n</div>\r\n';
return __p
}