Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div\n  ';
 for (var attr in ctx.attrs) { ;
__p += '\n    ' +
((__t = (attr)) == null ? '' : __t) +
'="' +
((__t = (ctx.attrs[attr])) == null ? '' : __t) +
'"\n  ';
 } ;
__p += '\n>\n  ' +
((__t = (ctx.message)) == null ? '' : __t) +
'\n  ';
 if (ctx.options.vpat) { ;
__p += '\n    <span class="sr-only" id="hotkey-i-' +
((__t = (ctx.form._id)) == null ? '' : __t) +
'">' +
((__t = (ctx.t('errorListHotkey'))) == null ? '' : __t) +
'</span>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}