Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="ui grid">\n  <div class="row">\n    ';
 ctx.values.forEach(function(value) { ;
__p += '\n    <div class="two wide column">\n      ' +
((__t = ( value )) == null ? '' : __t) +
'\n    </div>\n    ';
 }) ;
__p += '\n    <div class="five wide column">\n      <div class="ui mini right floated buttons">\n        ';
 if (ctx.node.hasChildren) { ;
__p += '\n        <button ref="toggleNode" class="ui button toggleNode">' +
((__t = ( ctx.t(ctx.node.collapsed ? 'Expand' : 'Collapse') )) == null ? '' : __t) +
'</button>\n        <div class="or"></div>\n        ';
 } ;
__p += '\n        ';
 if (!ctx.readOnly) { ;
__p += '\n        <button ref="addChild" class="ui button primary addChild">' +
((__t = ( ctx.t('Add') )) == null ? '' : __t) +
'</button>\n        <div class="or"></div>\n        <button ref="editNode" class="ui button editNode">' +
((__t = ( ctx.t('Edit') )) == null ? '' : __t) +
'</button>\n        <div class="or"></div>\n        <button ref="removeNode" class="ui button negative removeNode">' +
((__t = ( ctx.t('Delete') )) == null ? '' : __t) +
'</button>\n        ';
 if (ctx.node.revertAvailable) { ;
__p += '\n        <div class="or"></div>\n        <button ref="revertNode" class="ui button negative revertNode">' +
((__t = ( ctx.t('Revert') )) == null ? '' : __t) +
'</button>\n        ';
 } ;
__p += '\n        ';
 } ;
__p += '\n      </div>\n    </div>\n  </div>\n</div>\n';
return __p
}