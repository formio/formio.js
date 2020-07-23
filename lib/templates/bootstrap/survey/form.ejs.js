Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table table-striped table-bordered">\r\n  <thead>\r\n    <tr>\r\n      <th></th>\r\n      ';
 ctx.component.values.forEach(function(value) { ;
__p += '\r\n      <th style="text-align: center;">' +
((__t = (ctx.t(value.label))) == null ? '' : __t) +
'</th>\r\n      ';
 }) ;
__p += '\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    ';
 ctx.component.questions.forEach(function(question) { ;
__p += '\r\n    <tr>\r\n      <td>' +
((__t = (ctx.t(question.label))) == null ? '' : __t) +
'</td>\r\n      ';
 ctx.component.values.forEach(function(value) { ;
__p += '\r\n      <td style="text-align: center;">\r\n        <input type="radio" name="' +
((__t = ( ctx.self.getInputName(question) )) == null ? '' : __t) +
'" value="' +
((__t = (value.value)) == null ? '' : __t) +
'" id="' +
((__t = (ctx.key)) == null ? '' : __t) +
'-' +
((__t = (question.value)) == null ? '' : __t) +
'-' +
((__t = (value.value)) == null ? '' : __t) +
'" ref="input">\r\n      </td>\r\n      ';
 }) ;
__p += '\r\n    </tr>\r\n    ';
 }) ;
__p += '\r\n  </tbody>\r\n</table>\r\n';
return __p
}