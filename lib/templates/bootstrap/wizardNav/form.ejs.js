Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<ul class="formio-wizard-nav-container list-inline" id="' +
((__t = ( ctx.wizardKey )) == null ? '' : __t) +
'-nav">\n  ';
 ctx.buttonOrder.forEach(function(button) { ;
__p += '\n    ';
 if (button === 'cancel' && ctx.buttons.cancel) { ;
__p += '\n    <li>\n      <button class="btn btn-secondary btn-wizard-nav-cancel" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-cancel" aria-label="' +
((__t = (ctx.t('cancelButtonAriaLabel'))) == null ? '' : __t) +
'">' +
((__t = (ctx.t('cancel'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (button === 'previous' && ctx.buttons.previous) { ;
__p += '\n    <li>\n      <button class="btn btn-primary btn-wizard-nav-previous" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-previous" aria-label="' +
((__t = (ctx.t('previousButtonAriaLabel'))) == null ? '' : __t) +
'">' +
((__t = (ctx.t('previous'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (button === 'next' && ctx.buttons.next) { ;
__p += '\n    <li>\n      <button class="btn btn-primary btn-wizard-nav-next" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-next" aria-label="' +
((__t = (ctx.t('nextButtonAriaLabel'))) == null ? '' : __t) +
'">' +
((__t = (ctx.t('next'))) == null ? '' : __t) +
'</button>\n    </li>\n    ';
 } ;
__p += '\n    ';
 if (button === 'submit' && ctx.buttons.submit) { ;
__p += '\n    <li>\n      ';
 if (ctx.disableWizardSubmit){ ;
__p += '\n      <button disabled class="btn btn-primary btn-wizard-nav-submit" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-submit" aria-label="' +
((__t = (ctx.t('submitButtonAriaLabel'))) == null ? '' : __t) +
'">' +
((__t = (ctx.t('submit'))) == null ? '' : __t) +
'</button>\n      ';
 } else { ;
__p += '\n      <button class="btn btn-primary btn-wizard-nav-submit" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-submit" aria-label="' +
((__t = (ctx.t('submitButtonAriaLabel'))) == null ? '' : __t) +
'">' +
((__t = (ctx.t('submit'))) == null ? '' : __t) +
'</button>\n      ';
 } ;
__p += '\n    </li>\n    ';
 } ;
__p += '\n  ';
 }) ;
__p += '\n</ul>\n';
return __p
}