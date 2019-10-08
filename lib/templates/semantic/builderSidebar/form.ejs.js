Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div id="builder-sidebar-' +
((__t = (ctx.id)) == null ? '' : __t) +
'" class="ui segments" ref="sidebar">\n  ';
 ctx.groups.forEach(function(group) { ;
__p += '\n    ' +
((__t = ( group )) == null ? '' : __t) +
'\n  ';
 }) ;
__p += '\n</div>\n';
return __p
}