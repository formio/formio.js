Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\r\n  ';
 if (ctx.dayFirst && ctx.showDay) { ;
__p += '\r\n  <div class="col col-xs-3">\r\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\r\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-day" class="';
 if(ctx.component.fields.day.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Day'))) == null ? '' : __t) +
'</label>\r\n    ';
 } ;
__p += '\r\n    <div>' +
((__t = (ctx.day)) == null ? '' : __t) +
'</div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n  ';
 if (ctx.showMonth) { ;
__p += '\r\n  <div class="col col-xs-4">\r\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\r\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-month" class="';
 if(ctx.component.fields.month.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Month'))) == null ? '' : __t) +
'</label>\r\n    ';
 } ;
__p += '\r\n    <div>' +
((__t = (ctx.month)) == null ? '' : __t) +
'</div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n  ';
 if (!ctx.dayFirst && ctx.showDay) { ;
__p += '\r\n  <div class="col col-xs-3">\r\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\r\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-day" class="';
 if(ctx.component.fields.day.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Day'))) == null ? '' : __t) +
'</label>\r\n    ';
 } ;
__p += '\r\n    <div>' +
((__t = (ctx.day)) == null ? '' : __t) +
'</div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n  ';
 if (ctx.showYear) { ;
__p += '\r\n  <div class="col col-xs-5">\r\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\r\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-year" class="';
 if(ctx.component.fields.year.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Year'))) == null ? '' : __t) +
'</label>\r\n    ';
 } ;
__p += '\r\n    <div>' +
((__t = (ctx.year)) == null ? '' : __t) +
'</div>\r\n  </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n<input name="ctx.data[day]" type="hidden" class="form-control" lang="en" value="" ref="input">\r\n';
return __p
}