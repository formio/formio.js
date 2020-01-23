Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table table-striped table-bordered">\n  <thead>\n    <tr>\n      <th></th>\n      ';
 ctx.component.values.forEach(function(value) { ;
__p += '\n      <th style="text-align: center;">' +
((__t = (ctx.t(value.label))) == null ? '' : __t) +
'</th>\n      ';
 }) ;
__p += '\n    </tr>\n  </thead>\n  <tbody>\n    ';
 ctx.component.questions.forEach(function(question) { ;
__p += '\n    <tr>\n      <td>' +
((__t = (ctx.t(question.label))) == null ? '' : __t) +
'</td>\n      ';
 ctx.component.values.forEach(function(value) { ;
__p += '\n      <td style="text-align: center;">\n        <input type="radio" name="' +
((__t = ( ctx.self.getInputName(question) )) == null ? '' : __t) +
'" value="' +
((__t = (value.value)) == null ? '' : __t) +
'" id="' +
((__t = (ctx.key)) == null ? '' : __t) +
'-' +
((__t = (question.value)) == null ? '' : __t) +
'-' +
((__t = (value.value)) == null ? '' : __t) +
'" ref="input">\n      </td>\n      ';
 }) ;
__p += '\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n</table>\n';
return __p
}