Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="formio builder ui grid formbuilder">\n  <div class="four wide column formcomponents">\n    ' +
((__t = (ctx.sidebar)) == null ? '' : __t) +
'\n  </div>\n  <div class="twelve wide column formarea">\n    <div class="ui breadcrumb" style="margin-bottom: 0.5em">\n      ';
 ctx.pages.forEach(function(page, pageIndex) { ;
__p += '\n        <div title="' +
((__t = (page.title)) == null ? '' : __t) +
'" class="';
 if (pageIndex === ctx.self.currentPage) { ;
__p += ' active section ';
 } else { ;
__p += ' section ';
 } ;
__p += ' wizard-page-label" ref="gotoPage">' +
((__t = (page.title)) == null ? '' : __t) +
'</div>\n        <div class="divider">/</div>\n      ';
 }) ;
__p += '\n      <div title="' +
((__t = (ctx.t('Create Page'))) == null ? '' : __t) +
'" class="section wizard-page-label" ref="addPage"><i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t('Page'))) == null ? '' : __t) +
'</div>\n    </div>\n    <div ref="form">\n      ' +
((__t = (ctx.form)) == null ? '' : __t) +
'\n    </div>\n  </div>\n</div>\n';
return __p
}