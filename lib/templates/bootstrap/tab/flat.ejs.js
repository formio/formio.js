Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 ctx.component.components.forEach(function(tab, index) { ;
__p += '\n  <div class="mb-2 card border">\n    <div class="card-header bg-default">\n      <h4 class="mb-0 card-title">' +
((__t = ( ctx.t(tab.label, { _userInput: true }) )) == null ? '' : __t) +
'</h4>\n    </div>\n    <div\n      class="card-body"\n      ref="' +
((__t = (ctx.tabKey)) == null ? '' : __t) +
'"\n    >\n      ' +
((__t = ( ctx.tabComponents[index] )) == null ? '' : __t) +
'\n    </div>\n  </div>\n';
 }) ;
__p += '\n';
return __p
}