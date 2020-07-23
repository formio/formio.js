Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\n  ';
 ctx.values.forEach(function(value) { ;
__p += '\n    <div class="col-sm-2">\n      ' +
((__t = ( value )) == null ? '' : __t) +
'\n    </div>\n  ';
 }) ;
__p += '\n  <div class="col-sm-3">\n    <div class="btn-group pull-right">\n      ';
 if (ctx.node.hasChildren) { ;
__p += '\n        <button ref="toggleNode" class="btn btn-default btn-sm toggleNode">' +
((__t = ( ctx.t(ctx.node.collapsed ? 'Expand' : 'Collapse') )) == null ? '' : __t) +
'</button>\n      ';
 } ;
__p += '\n      ';
 if (!ctx.readOnly) { ;
__p += '\n        <button ref="addChild" class="btn btn-default btn-sm addChild">' +
((__t = ( ctx.t('Add') )) == null ? '' : __t) +
'</button>\n        <button ref="editNode" class="btn btn-default btn-sm editNode">' +
((__t = ( ctx.t('Edit') )) == null ? '' : __t) +
'</button>\n        <button ref="removeNode" class="btn btn-danger btn-sm removeNode">' +
((__t = ( ctx.t('Delete') )) == null ? '' : __t) +
'</button>\n        ';
 if (ctx.node.revertAvailable) { ;
__p += '\n          <button ref="revertNode" class="btn btn-danger btn-sm revertNode">' +
((__t = ( ctx.t('Revert') )) == null ? '' : __t) +
'</button>\n        ';
 } ;
__p += '\n      ';
 } ;
__p += '\n    </div>\n  </div>\n</div>\n';
return __p
}