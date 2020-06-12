Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div\n  class="input-group formio-multiple-mask-container"\n  ref="' +
((__t = (ctx.input.ref ? ctx.input.ref : 'input')) == null ? '' : __t) +
'"\n>\n  <select\n    class="form-control formio-multiple-mask-select"\n    id="' +
((__t = (ctx.key)) == null ? '' : __t) +
'-mask"\n    ref="select"\n    ';
 if (ctx.input.attr.disabled) { ;
__p += 'disabled';
 } ;
__p += '>\n    ';
 ctx.selectOptions.forEach(function(option) { ;
__p += '\n    <option value="' +
((__t = (option.value)) == null ? '' : __t) +
'">' +
((__t = (option.label)) == null ? '' : __t) +
'</option>\n    ';
 }); ;
__p += '\n  </select>\n  <input\n    ref="mask"\n    ';
 for (var attr in ctx.input.attr) { ;
__p += '\n    ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\n    ';
 } ;
__p += '\n  >\n</div>\n';
return __p
}