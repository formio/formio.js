Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="formio builder row formbuilder">\n  <div class="col-xs-4 col-sm-3 col-md-2 formcomponents">\n    ' +
((__t = (ctx.sidebar)) == null ? '' : __t) +
'\n  </div>\n  <div class="col-xs-8 col-sm-9 col-md-10 formarea">\n    <ol class="breadcrumb">\n      ';
 ctx.pages.forEach(function(page, pageIndex) { ;
__p += '\n      <li>\n        <span title="' +
((__t = (page.title)) == null ? '' : __t) +
'" class="mr-2 badge ';
 if (pageIndex === ctx.self.page) { ;
__p += 'badge-primary';
 } else { ;
__p += 'badge-info';
 } ;
__p += ' wizard-page-label" ref="gotoPage">' +
((__t = (page.title)) == null ? '' : __t) +
'</span>\n      </li>\n      ';
 }) ;
__p += '\n      <li>\n        <span title="' +
((__t = (ctx.t('Create Page'))) == null ? '' : __t) +
'" class="mr-2 badge badge-success wizard-page-label" ref="addPage">\n          <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t('Page'))) == null ? '' : __t) +
'\n        </span>\n      </li>\n    </ol>\n    <div ref="form">\n      ' +
((__t = (ctx.form)) == null ? '' : __t) +
'\n    </div>\n  </div>\n</div>\n';
return __p
}