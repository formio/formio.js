Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<ul class="list-inline" id="' +
((__t = ( ctx.wizardKey )) == null ? '' : __t) +
'-nav">\n  ';
 if (ctx.buttons.cancel) { ;
__p += '\n  <li class="list-inline-item">\n    <button class="btn btn-secondary btn-wizard-nav-cancel" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-cancel">' +
((__t = (ctx.t('cancel'))) == null ? '' : __t) +
'</button>\n  </li>\n  ';
 } ;
__p += '\n  ';
 if (ctx.buttons.previous) { ;
__p += '\n  <li class="list-inline-item">\n    <button class="btn btn-primary btn-wizard-nav-previous" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-previous">' +
((__t = (ctx.t('previous'))) == null ? '' : __t) +
'</button>\n  </li>\n  ';
 } ;
__p += '\n  ';
 if (ctx.buttons.next) { ;
__p += '\n  <li class="list-inline-item">\n    <button class="btn btn-primary btn-wizard-nav-next" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-next">' +
((__t = (ctx.t('next'))) == null ? '' : __t) +
'</button>\n  </li>\n  ';
 } ;
__p += '\n  ';
 if (ctx.buttons.submit) { ;
__p += '\n  <li class="list-inline-item">\n    <button class="btn btn-primary btn-wizard-nav-submit" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-submit">' +
((__t = (ctx.t('submit'))) == null ? '' : __t) +
'</button>\n  </li>\n  ';
 } ;
__p += '\n</ul>\n';
return __p
}