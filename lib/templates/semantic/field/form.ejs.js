Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (!ctx.label.hidden && ctx.label.labelPosition !== 'bottom') { ;
__p += '\n  ' +
((__t = ( ctx.render('label', ctx) )) == null ? '' : __t) +
'\n';
 } ;
__p += '\n' +
((__t = (ctx.element)) == null ? '' : __t) +
'\n';
 if (!ctx.label.hidden && ctx.label.labelPosition === 'bottom') { ;
__p += '\n  <label class="' +
((__t = (ctx.label.className)) == null ? '' : __t) +
'">\n  ' +
((__t = (ctx.t(ctx.component.label))) == null ? '' : __t) +
'\n  ';
 if (ctx.tooltip) { ;
__p += '\n    <span data-tooltip="' +
((__t = (ctx.tooltip)) == null ? '' : __t) +
'" data-position="right center">\n      <i class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
'"></i>\n    </span>\n  ';
 } ;
__p += '\n  </label>\n';
 } ;
__p += '\n';
 if (ctx.component.description) { ;
__p += '\n  <div class="help-block">' +
((__t = (ctx.t(ctx.component.description))) == null ? '' : __t) +
'</div>\n';
 } ;
__p += '\n';
return __p
}