Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div\n  class="form-radio radio"\n  ref="radioGroup"\n  role="' +
((__t = (ctx.component.type === 'selectboxes' ? 'group' : 'radiogroup')) == null ? '' : __t) +
'"\n  aria-required="' +
((__t = (ctx.input.component.validate.required)) == null ? '' : __t) +
'"\n  aria-labelledby="l-' +
((__t = (ctx.instance.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'"\n  ';
 if (ctx.component.description) { ;
__p += '\n    aria-describedby="d-' +
((__t = (ctx.instance.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n>\n  ';
 ctx.values.forEach(function(item) { ;
__p += '\n  <div class="' +
((__t = (ctx.input.attr.type)) == null ? '' : __t) +
' ' +
((__t = ( ctx.component.optionsLabelPosition && ctx.component.optionsLabelPosition !== 'right' ? 'pl-0' : '')) == null ? '' : __t) +
' form-check' +
((__t = (ctx.inline ? '-inline' : '')) == null ? '' : __t) +
'" ref="wrapper">\n    <label class="form-check-label label-position-' +
((__t = ( ctx.component.optionsLabelPosition )) == null ? '' : __t) +
'" for="' +
((__t = (ctx.instance.root && ctx.instance.root.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'">\n      ';
 if (ctx.component.optionsLabelPosition === 'left' || ctx.component.optionsLabelPosition === 'top') { ;
__p += '\n      <span>' +
((__t = (ctx.t(item.label, { _userInput: true }))) == null ? '' : __t) +
'</span>\n      ';
 } ;
__p += '\n      <' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'\n        ref="input"\n        ';
 for (var attr in ctx.input.attr) { ;
__p += '\n        ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\n        ';
 } ;
__p += '\n        value="' +
((__t = (item.value)) == null ? '' : __t) +
'"\n        ';
 if (ctx.value && (ctx.value === item.value || (typeof ctx.value === 'object' && ctx.value.hasOwnProperty(item.value) && ctx.value[item.value]))) { ;
__p += '\n          checked=true\n        ';
 } ;
__p += '\n        ';
 if (item.disabled) { ;
__p += '\n          disabled=true\n        ';
 } ;
__p += '\n        id="' +
((__t = (ctx.instance.root && ctx.instance.root.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'"\n        role="' +
((__t = (ctx.component.type === 'selectboxes' ? 'checkbox' : 'radio')) == null ? '' : __t) +
'"\n      >\n      ';
 if (!ctx.component.optionsLabelPosition || ctx.component.optionsLabelPosition === 'right' || ctx.component.optionsLabelPosition === 'bottom') { ;
__p += '\n      <span>' +
((__t = (ctx.t(item.label, { _userInput: true }))) == null ? '' : __t) +
'</span>\n      ';
 } ;
__p += '\n    </label>\n  </div>\n  ';
 }) ;
__p += '\n</div>\n';
return __p
}