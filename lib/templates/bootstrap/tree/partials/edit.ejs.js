Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="node-edit">\n  <div ref="nodeEdit">' +
((__t = ( ctx.children )) == null ? '' : __t) +
'</div>\n  ';
 if (!ctx.readOnly) { ;
__p += '\n    <div class="node-actions">\n      <button ref="saveNode" class="btn btn-primary saveNode">' +
((__t = ( ctx.t('Save') )) == null ? '' : __t) +
'</button>\n      <button ref="cancelNode" class="btn btn-danger cancelNode">' +
((__t = ( ctx.t('Cancel') )) == null ? '' : __t) +
'</button>\n    </div>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}