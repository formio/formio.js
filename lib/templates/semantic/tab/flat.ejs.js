Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.component.components.forEach(function(tab, index) { ;
__p += '\n  <h4 class="ui top attached block header">' +
((__t = ( ctx.t(tab.label) )) == null ? '' : __t) +
'</h4>\n  <div class="ui bottom attached segment">\n    ' +
((__t = ( ctx.tabComponents[index] )) == null ? '' : __t) +
'\n  </div>\n';
 }) ;
__p += '\n';
return __p
}