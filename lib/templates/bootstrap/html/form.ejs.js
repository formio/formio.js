Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<' +
((__t = (ctx.tag)) == null ? '' : __t) +
' class="' +
((__t = ( ctx.component.className )) == null ? '' : __t) +
'" ref="html"\n  ';
 ctx.attrs.forEach(function(attr) { ;
__p += '\n    ' +
((__t = (attr.attr)) == null ? '' : __t) +
'="' +
((__t = (attr.value)) == null ? '' : __t) +
'"\n  ';
 }) ;
__p += '\n>' +
((__t = (ctx.t(ctx.content))) == null ? '' : __t);
 if (!ctx.singleTags || ctx.singleTags.indexOf(ctx.tag) === -1) { ;
__p += '</' +
((__t = (ctx.tag)) == null ? '' : __t) +
'>';
 } ;
__p += '\n';
return __p
}