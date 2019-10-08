Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="ui ' +
((__t = (ctx.component.editor ? '' : 'input')) == null ? '' : __t) +
' fluid ' +
((__t = ( ctx.component.suffix ? ' right' : '' )) == null ? '' : __t) +
'' +
((__t = ( (ctx.component.prefix || ctx.component.suffix) ? ' labeled' : '' )) == null ? '' : __t) +
'">\n';
 if (ctx.component.prefix) { ;
__p += '\n<label class="ui label" ref="prefix">' +
((__t = (ctx.component.prefix)) == null ? '' : __t) +
'</label>\n';
 } ;
__p += '\n<' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'\n  ref="' +
((__t = (ctx.input.ref ? ctx.input.ref : 'input')) == null ? '' : __t) +
'"\n  ';
 for (var attr in ctx.input.attr) { ;
__p += '\n  ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.input.attr[attr])) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n>' +
((__t = (ctx.input.content)) == null ? '' : __t) +
'</' +
((__t = (ctx.input.type)) == null ? '' : __t) +
'>\n';
 if (ctx.component.showCharCount) { ;
__p += '\n<span class="ui right floated" ref="charcount"></span>\n';
 } ;
__p += '\n';
 if (ctx.component.showWordCount) { ;
__p += '\n<span class="ui right floated" ref="wordcount"></span>\n';
 } ;
__p += '\n';
 if (ctx.component.suffix) { ;
__p += '\n<div class="ui label" ref="suffix">' +
((__t = (ctx.component.suffix)) == null ? '' : __t) +
'</div>\n';
 } ;
__p += '\n</div>\n';
return __p
}