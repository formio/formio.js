Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="fields ' +
((__t = (ctx.inline ? 'inline' : 'grouped')) == null ? '' : __t) +
'">\n  ';
 ctx.values.forEach(function(item) { ;
__p += '\n  <div class="field">\n    <div class="ui ' +
((__t = (ctx.input.attr.type==='radio' ? 'radio' : '')) == null ? '' : __t) +
' checkbox" ref="wrapper">\n      <' +
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
 if (ctx.value === item.value || (typeof ctx.value === 'object' && ctx.value.hasOwnProperty(item.value) && ctx.value[item.value])) { ;
__p += '\n          checked=true\n        ';
 } ;
__p += '\n        id="' +
((__t = (ctx.id)) == null ? '' : __t) +
'' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'"\n      >\n      <label class="" for="' +
((__t = (ctx.id)) == null ? '' : __t) +
'' +
((__t = (ctx.row)) == null ? '' : __t) +
'-' +
((__t = (item.value)) == null ? '' : __t) +
'">\n        <span>' +
((__t = (ctx.t(item.label))) == null ? '' : __t) +
'</span>\n      </label>\n    </div>\n  </div>\n  ';
 }) ;
__p += '\n</div>\n';
return __p
}