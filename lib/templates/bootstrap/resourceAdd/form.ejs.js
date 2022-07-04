Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '';
__p += '<table class="table table-bordered">\n  <tbody>\n    <tr>\n      <td>\n        ' +
((__t = (ctx.element)) == null ? '' : __t) +
'\n      </td>\n    </tr>\n    <tr>\n      <td colspan="2">\n        <button class="btn btn-primary formio-button-add-resource" ref="addResource">\n          <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i>\n          ' +
((__t = (ctx.t(ctx.component.addResourceLabel || 'Add Resource', { _userInput: true }))) == null ? '' : __t) +
'\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n';
return __p
}