Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div id="' +
((__t = (ctx.groupId)) == null ? '' : __t) +
'" class="accordion builder-sidebar' +
((__t = (ctx.scrollEnabled ? ' builder-sidebar_scroll' : '')) == null ? '' : __t) +
'" ref="sidebar" role="tablist">\n  <input class="form-control builder-sidebar_search" type="search" ref="sidebar-search" placeholder="Search field(s)" />\n    ';
 ctx.groups.forEach(function(group) { ;
__p += '\n      ' +
((__t = ( group )) == null ? '' : __t) +
'\n    ';
 }) ;
__p += '\n</div>\n';
return __p
}