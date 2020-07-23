Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\r\n  ';
 ctx.values.forEach(function(value) { ;
__p += '\r\n    <div class="col-sm-2">\r\n      ' +
((__t = ( value )) == null ? '' : __t) +
'\r\n    </div>\r\n  ';
 }) ;
__p += '\r\n  <div class="col-sm-3">\r\n    <div class="btn-group pull-right">\r\n      ';
 if (ctx.node.hasChildren) { ;
__p += '\r\n        <button ref="toggleNode" class="btn btn-default btn-sm toggleNode">' +
((__t = ( ctx.t(ctx.node.collapsed ? 'Expand' : 'Collapse') )) == null ? '' : __t) +
'</button>\r\n      ';
 } ;
__p += '\r\n      ';
 if (!ctx.readOnly) { ;
__p += '\r\n        <button ref="addChild" class="btn btn-default btn-sm addChild">' +
((__t = ( ctx.t('Add') )) == null ? '' : __t) +
'</button>\r\n        <button ref="editNode" class="btn btn-default btn-sm editNode">' +
((__t = ( ctx.t('Edit') )) == null ? '' : __t) +
'</button>\r\n        <button ref="removeNode" class="btn btn-danger btn-sm removeNode">' +
((__t = ( ctx.t('Delete') )) == null ? '' : __t) +
'</button>\r\n        ';
 if (ctx.node.revertAvailable) { ;
__p += '\r\n          <button ref="revertNode" class="btn btn-danger btn-sm revertNode">' +
((__t = ( ctx.t('Revert') )) == null ? '' : __t) +
'</button>\r\n        ';
 } ;
__p += '\r\n      ';
 } ;
__p += '\r\n    </div>\r\n  </div>\r\n</div>\r\n';
return __p
}