Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<nav aria-label="navigation" id="' +
((__t = ( ctx.wizardKey )) == null ? '' : __t) +
'-header">\n  <ul class="pagination flex-column">\n    ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n    <li class="col-xs-12 page-item' +
((__t = (ctx.currentPage === index ? ' active' : '')) == null ? '' : __t) +
'" style="cursor: pointer;">\n      <span class="page-link" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link" style="margin-left: 0px;">\n        ' +
((__t = (ctx.t(panel.title, { _userInput: true }))) == null ? '' : __t) +
'\n        ';
 if (panel.tooltip && ctx.currentPage === index) { ;
__p += '\n        <i ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted" data-tooltip="' +
((__t = (panel.tooltip)) == null ? '' : __t) +
'"></i>\n        ';
 } ;
__p += '\n      </span>\n    </li>\n    ';
 }) ;
__p += '\n  </ul>\n</nav>\n';
return __p
}