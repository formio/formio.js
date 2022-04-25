Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.component.components.forEach(function(tab, index) { ;
__p += '\r\n  <div class="mb-2 card border">\r\n    <div class="card-header bg-default">\r\n      <h4 class="mb-0 card-title">' +
((__t = ( ctx.t(tab.label) )) == null ? '' : __t) +
'</h4>\r\n    </div>\r\n    <div\r\n      class="card-body"\r\n      ref="' +
((__t = (ctx.tabKey)) == null ? '' : __t) +
'"\r\n    >\r\n      ' +
((__t = ( ctx.tabComponents[index] )) == null ? '' : __t) +
'\r\n    </div>\r\n  </div>\r\n';
 }) ;
__p += '\r\n';
return __p
}