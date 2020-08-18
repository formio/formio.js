Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<nav aria-label="navigation" id="' +
((__t = ( ctx.wizardKey )) == null ? '' : __t) +
'-header">\n  ';
 if (ctx.options && ctx.options.renderMode === 'classic') { ;
__p += '\n    <div class="formio-classic-wizard">\n      <div class="formio-classic-wizard-wrapper">\n        ';
 if (ctx.panels.length > 1 ) { ;
__p += '\n          <div class="formio-classic-wizard-progress">\n            <div\n              class="formio-classic-wizard-progress-fill"\n              style="width: ' +
((__t = (ctx.progressFillWidth)) == null ? '' : __t) +
';"\n              ref="progressFill"\n            ></div>\n          </div>\n        ';
 } ;
__p += '\n        <div class="formio-classic-wizard-steps"' +
((__t = (ctx.panels.length <= 1 ? ' style="justify-content: center;"' : '')) == null ? '' : __t) +
'>\n          ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n            <div class="formio-classic-wizard-step' +
((__t = (ctx.currentPage >= index ? ' active' : '')) == null ? '' : __t) +
'">\n              <div class="formio-classic-wizard-header text-center">' +
((__t = (ctx.t(panel.title))) == null ? '' : __t) +
'</div>\n              <a\n                class="formio-classic-wizard-circle' +
((__t = (index > ctx.prevPage ? ' animated' : '')) == null ? '' : __t) +
'' +
((__t = (index <= ctx.prevPage && index > ctx.currentPage ? ' reverted' : '')) == null ? '' : __t) +
'"\n                ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link">\n              </a>\n            </div>\n          ';
 }) ;
__p += '\n        </div>\n      </div>\n    </div>\n  ';
 } else if (ctx.options && ctx.options.renderMode === 'default') { ;
__p += '\n    <div class="formio-wizard-header_default">\n      <div class="formio-wizard-header__cells">\n        ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n          <div class="formio-wizard-header__cell' +
((__t = (index <= ctx.currentPage ? ' active' : '')) == null ? '' : __t) +
'"></div>\n        ';
 }) ;
__p += '\n      </div>\n      <div class="formio-wizard-header__info">\n        ' +
((__t = (ctx.currentPage + 1)) == null ? '' : __t) +
' of ' +
((__t = (ctx.panels.length)) == null ? '' : __t) +
' - \n        <span class="formio-wizard-header__title">' +
((__t = (ctx.panels[ctx.currentPage].title)) == null ? '' : __t) +
'</span>\n      </div>\n    </div>\n  ';
 } else { ;
__p += '\n    <ul class="pagination">\n      ';
 ctx.panels.forEach(function(panel, index) { ;
__p += '\n      <li class="page-item' +
((__t = (ctx.currentPage === index ? ' active' : '')) == null ? '' : __t) +
'" style="">\n        <span class="page-link" ref="' +
((__t = (ctx.wizardKey)) == null ? '' : __t) +
'-link">' +
((__t = (ctx.t(panel.title))) == null ? '' : __t) +
'</span>\n      </li>\n      ';
 }) ;
__p += '\n    </ul>\n  ';
 } ;
__p += '\n</nav>\n';
return __p
}