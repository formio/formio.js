Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="formio-wizard-position">\n  <nav aria-label="navigation">\n    <div class="ui steps">\n      ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n      <a class="' +
((__t = (ctx.currentPage === index ? ' active' : '')) == null ? '' : __t) +
' step" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link">\n        <div class="content">\n          <div class="title">' +
((__t = (panel.title)) == null ? '' : __t) +
'</div>\n        </div>\n      </a>\n      ';
 }) ;
__p += '\n    </div>\n  </nav>\n  <div class="wizard-page" ref="' +
((__t = (wizardKey)) == null ? '' : __t) +
'">\n    ' +
((__t = (ctx.components)) == null ? '' : __t) +
'\n  </div>\n  <div class="ui horizontal list">\n    ';
 if (ctx.buttons.cancel) { ;
__p += '\n    <div class="item">\n      <button class="ui button secondary btn-wizard-nav-cancel" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-cancel">' +
((__t = (ctx.t('cancel'))) == null ? '' : __t) +
'</button>\n    </div>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.previous) { ;
__p += '\n    <div class="item">\n      <button class="ui button primary btn-wizard-nav-previous" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-previous">' +
((__t = (ctx.t('previous'))) == null ? '' : __t) +
'</button>\n    </div>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.next) { ;
__p += '\n    <div class="item">\n      <button class="ui button primary btn-wizard-nav-next" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-next">' +
((__t = (ctx.t('next'))) == null ? '' : __t) +
'</button>\n    </div>\n    ';
 } ;
__p += '\n    ';
 if (ctx.buttons.submit) { ;
__p += '\n    <div class="item">\n      <button class="ui button primary btn-wizard-nav-submit" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-submit">' +
((__t = (ctx.t('submit'))) == null ? '' : __t) +
'</button>\n    </div>\n    ';
 } ;
__p += '\n  </div>\n</div>\n';
return __p
}