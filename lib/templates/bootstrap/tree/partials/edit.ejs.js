Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="node-edit">\r\n  <div ref="nodeEdit">' +
((__t = ( ctx.children )) == null ? '' : __t) +
'</div>\r\n  ';
 if (!ctx.readOnly) { ;
__p += '\r\n    <div class="node-actions">\r\n      <button ref="saveNode" class="btn btn-primary saveNode">' +
((__t = ( ctx.t('Save') )) == null ? '' : __t) +
'</button>\r\n      <button ref="cancelNode" class="btn btn-danger cancelNode">' +
((__t = ( ctx.t('Cancel') )) == null ? '' : __t) +
'</button>\r\n    </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n';
return __p
}