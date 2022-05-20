Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row" role="group"\n  ';
 if (ctx.component.hideLabel) { ;
__p += '\n  aria-label="' +
((__t = (ctx.component.label)) == null ? '' : __t) +
'"\n  ';
 } else { ;
__p += '\n  aria-labelledby="l-' +
((__t = (ctx.instance.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n  ';
 if (ctx.component.description) { ;
__p += '\n  aria-describedby="d-' +
((__t = (ctx.instance.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n  >\n  ';
 if (ctx.dayFirst && ctx.showDay) { ;
__p += '\n  <div class="col col-xs-3">\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-day" class="';
 if(ctx.component.fields.day.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Day'))) == null ? '' : __t) +
'</label>\n    ';
 } ;
__p += '\n    <div>' +
((__t = (ctx.day)) == null ? '' : __t) +
'</div>\n  </div>\n  ';
 } ;
__p += '\n  ';
 if (ctx.showMonth) { ;
__p += '\n  <div class="col col-xs-4">\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-month" class="';
 if(ctx.component.fields.month.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Month'))) == null ? '' : __t) +
'</label>\n    ';
 } ;
__p += '\n    <div>' +
((__t = (ctx.month)) == null ? '' : __t) +
'</div>\n  </div>\n  ';
 } ;
__p += '\n  ';
 if (!ctx.dayFirst && ctx.showDay) { ;
__p += '\n  <div class="col col-xs-3">\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-day" class="';
 if(ctx.component.fields.day.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Day'))) == null ? '' : __t) +
'</label>\n    ';
 } ;
__p += '\n    <div>' +
((__t = (ctx.day)) == null ? '' : __t) +
'</div>\n  </div>\n  ';
 } ;
__p += '\n  ';
 if (ctx.showYear) { ;
__p += '\n  <div class="col col-xs-5">\n    ';
 if (!ctx.component.hideInputLabels) { ;
__p += '\n    <label for="' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'-year" class="';
 if(ctx.component.fields.year.required) { ;
__p += 'field-required';
 } ;
__p += '">' +
((__t = (ctx.t('Year'))) == null ? '' : __t) +
'</label>\n    ';
 } ;
__p += '\n    <div>' +
((__t = (ctx.year)) == null ? '' : __t) +
'</div>\n  </div>\n  ';
 } ;
__p += '\n</div>\n<input name="ctx.data[day]" type="hidden" class="form-control" lang="en" value="" ref="input">\n';
return __p
}