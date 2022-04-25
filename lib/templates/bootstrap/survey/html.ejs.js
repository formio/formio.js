Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table table-striped table-bordered">\r\n  <tbody>\r\n    ';
 ctx.component.questions.forEach(function(question) { ;
__p += '\r\n    <tr>\r\n      <th>' +
((__t = (ctx.t(question.label))) == null ? '' : __t) +
'</th>\r\n      <td>\r\n      ';
 ctx.component.values.forEach(function(item) { ;
__p += '\r\n        ';
 if (ctx.value && ctx.value.hasOwnProperty(question.value) && ctx.value[question.value] === item.value) { ;
__p += '\r\n          ' +
((__t = (ctx.t(item.label))) == null ? '' : __t) +
'\r\n        ';
 } ;
__p += '\r\n      ';
 }) ;
__p += '\r\n      </td>\r\n    </tr>\r\n    ';
 }) ;
__p += '\r\n  </tbody>\r\n</table>\r\n';
return __p
}