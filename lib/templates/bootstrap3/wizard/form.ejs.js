Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div style="position: relative;">\n  <nav aria-label="navigation">\n    <ul class="pagination">\n      ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n      <li class="page-item' +
((__t = (ctx.currentPage === index ? ' active' : '')) == null ? '' : __t) +
'" style="">\n        <span class="page-link" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link">' +
((__t = (panel.title)) == null ? '' : __t) +
'</span>\n      </li>\n      ';
 }) ;
__p += '\n    </ul>\n  </nav>\n  <div class="wizard-page" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'">\n    ' +
((__t = (ctx.components)) == null ? '' : __t) +
'\n  </div>\n  <ul class="list-inline">\n    ';
 if (ctx.buttons.cancel) { ;
__p += '\n    <li class="list-inline-item">\n      <button class="btn btn-default btn-wizard-nav-cancel" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-cancel">' +
((__t = (ctx.t('cancel'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.previous) { ;
__p += '\n    <li class="list-inline-item">\n      <button class="btn btn-primary btn-wizard-nav-previous" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-previous">' +
((__t = (ctx.t('previous'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.next) { ;
__p += '\n    <li class="list-inline-item">\n      <button class="btn btn-primary btn-wizard-nav-next" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-next">' +
((__t = (ctx.t('next'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.submit) { ;
__p += '\n    <li class="list-inline-item">\n      <button class="btn btn-primary btn-wizard-nav-submit" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-submit">' +
((__t = (ctx.t('submit'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n  </ul>\n</div>\n';
return __p
}