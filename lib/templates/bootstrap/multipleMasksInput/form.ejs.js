Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div\r\n  class="input-group formio-multiple-mask-container"\r\n  ref="' +
((__t = (ctx.input.ref ? ctx.input.ref : 'input')) == null ? '' : __t) +
'"\r\n>\r\n  <select\r\n    class="form-control formio-multiple-mask-select"\r\n    id="' +
((__t = (ctx.key)) == null ? '' : __t) +
'-mask"\r\n    ref="select"\r\n    ';
 if (ctx.input.attr.disabled) { ;
__p += 'disabled';
 } ;
__p += '>\r\n    ';
 ctx.selectOptions.forEach(function(option) { ;
__p += '\r\n    <option value="' +
((__t = (option.value)) == null ? '' : __t) +
'">' +
((__t = (option.label)) == null ? '' : __t) +
'</option>\r\n    ';
 }); ;
__p += '\r\n  </select>\r\n  <input\r\n    ref="mask"\r\n    ';
 for (var attr in ctx.input.attr) { ;
__p += '\r\n    ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\r\n    ';
 } ;
__p += '\r\n  >\r\n</div>\r\n';
return __p
}