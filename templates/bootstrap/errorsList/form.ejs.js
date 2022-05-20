Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<p>' +
((__t = (ctx.t('error'))) == null ? '' : __t) +
'\n  ';
 if (ctx.options.vpat) { ;
__p += '\n  <span ref="errorTooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
'" tabindex="0"></span>\n  ';
 } ;
__p += '\n</p>\n<ul>\n  ';
 ctx.errors.forEach(function(err) { ;
__p += '\n  <li>\n    <span\n      data-component-key = "' +
((__t = (err.keyOrPath)) == null ? '' : __t) +
'"\n      ref = "errorRef"\n      tabIndex = "0"\n      role="link"\n    >\n      ' +
((__t = (err.message)) == null ? '' : __t) +
'\n    </span>\n  </li>\n  ';
 }) ;
__p += '\n</ul>\n';
return __p
}