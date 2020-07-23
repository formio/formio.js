Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.node.isRoot) { ;
__p += '\r\n  <div ref="root" class="list-group-item">\r\n';
 } else { ;
__p += '\r\n  <li ref="node" class="list-group-item col-sm-12 tree__level tree__level_' +
((__t = ( ctx.odd ? 'odd' : 'even' )) == null ? '' : __t) +
'">\r\n';
 } ;
__p += '\r\n  ';
 if (ctx.content) { ;
__p += '\r\n    <div ref="content" class="tree__node-content">\r\n      ' +
((__t = ( ctx.content )) == null ? '' : __t) +
'\r\n    </div>\r\n  ';
 } ;
__p += '\r\n  ';
 if (ctx.childNodes && ctx.childNodes.length) { ;
__p += '\r\n    <ul ref="childNodes" class="tree__node-children list-group row">\r\n      ' +
((__t = ( ctx.childNodes.join('') )) == null ? '' : __t) +
'\r\n    </ul>\r\n  ';
 } ;
__p += '\r\n';
 if (ctx.node.isRoot) { ;
__p += '\r\n  </div>\r\n';
 } else { ;
__p += '\r\n  </li>\r\n';
 } ;
__p += '\r\n';
return __p
}