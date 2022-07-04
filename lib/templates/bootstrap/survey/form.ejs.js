Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table table-striped table-bordered" aria-labelledby="l-' +
((__t = (ctx.instance.id)) == null ? '' : __t) +
'-' +
((__t = (ctx.component.key)) == null ? '' : __t) +
'">\n  <thead>\n    <tr>\n      <th></th>\n      ';
 ctx.component.values.forEach(function(value) { ;
__p += '\n      <th style="text-align: center;">\n        ' +
((__t = (ctx.t(value.label, { _userInput: true }))) == null ? '' : __t) +
'\n        ';
 if (value.tooltip) { ;
__p += '\n          <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted" data-tooltip="' +
((__t = (value.tooltip)) == null ? '' : __t) +
'"></i>\n        ';
 } ;
__p += '\n      </th>\n      ';
 }) ;
__p += '\n    </tr>\n  </thead>\n  <tbody>\n    ';
 ctx.component.questions.forEach(function(question) { ;
__p += '\n    <tr>\n      <td>\n        ' +
((__t = (ctx.t(question.label))) == null ? '' : __t) +
'\n        ';
 if (question.tooltip) { ;
__p += '\n          <i ref="tooltip" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted" data-tooltip="' +
((__t = (question.tooltip)) == null ? '' : __t) +
'"></i>\n        ';
 } ;
__p += '\n      </td>\n      ';
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