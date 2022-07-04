Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\n  ';
 ctx.util.eachComponent(ctx.components, function(component) { ;
__p += '\n    ';
 if (!component.hasOwnProperty('tableView') || component.tableView) { ;
__p += '\n      <div class="col-sm-2">' +
((__t = ( ctx.t(component.label) )) == null ? '' : __t) +
'</div>\n    ';
 } ;
__p += '\n  ';
 }) ;
__p += '\n</div>\n';
return __p
}