Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<nav aria-label="navigation" id="' +
((__t = ( ctx.wizardKey )) == null ? '' : __t) +
'-header">\r\n  <ul class="pagination">\r\n    ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\r\n    <li class="page-item' +
((__t = (ctx.currentPage === index ? ' active' : '')) == null ? '' : __t) +
'" style="">\r\n      <span class="page-link" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link">' +
((__t = (ctx.t(panel.title))) == null ? '' : __t) +
'</span>\r\n    </li>\r\n    ';
 }) ;
__p += '\r\n  </ul>\r\n</nav>\r\n';
return __p
}