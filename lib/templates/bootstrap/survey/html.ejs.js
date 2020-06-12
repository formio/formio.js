Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table table-striped table-bordered">\n  <tbody>\n    ';
 ctx.component.questions.forEach(function(question) { ;
__p += '\n    <tr>\n      <th>' +
((__t = (ctx.t(question.label))) == null ? '' : __t) +
'</th>\n      <td>\n      ';
 ctx.component.values.forEach(function(item) { ;
__p += '\n        ';
 if (ctx.value && ctx.value.hasOwnProperty(question.value) && ctx.value[question.value] === item.value) { ;
__p += '\n          ' +
((__t = (ctx.t(item.label))) == null ? '' : __t) +
'\n        ';
 } ;
__p += '\n      ';
 }) ;
__p += '\n      </td>\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n</table>\n';
return __p
}