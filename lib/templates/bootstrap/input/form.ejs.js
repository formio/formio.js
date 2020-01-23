Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.component.prefix || ctx.component.suffix) { ;
__p += '\n<div class="input-group">\n';
 } ;
__p += '\n';
 if (ctx.component.prefix) { ;
__p += '\n<div class="input-group-prepend" ref="prefix">\n  <span class="input-group-text">\n    ' +
((__t = (ctx.component.prefix)) == null ? '' : __t) +
'\n  </span>\n</div>\n';
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
__p += '\n<span class="text-muted pull-right" ref="charcount"></span>\n';
 } ;
__p += '\n';
 if (ctx.component.showWordCount) { ;
__p += '\n<span class="text-muted pull-right" ref="wordcount"></span>\n';
 } ;
__p += '\n';
 if (ctx.component.suffix) { ;
__p += '\n<div class="input-group-append" ref="suffix">\n  <span class="input-group-text">\n    ' +
((__t = (ctx.component.suffix)) == null ? '' : __t) +
'\n  </span>\n</div>\n';
 } ;
__p += '\n';
 if (ctx.component.prefix || ctx.component.suffix) { ;
__p += '\n</div>\n';
 } ;
__p += '\n';
return __p
}