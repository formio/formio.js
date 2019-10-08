Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }

 if (ctx.node.isRoot) { ;
__p += '\n  <div class="ui relaxed list">\n  <div class="item" ref="root" role="listitem">\n  ';
 } else { ;
__p += '\n  <div ref="node" class="item tree__level" role="listitem">\n    ';
 } ;
__p += '\n    ';
 if (ctx.content) { ;
__p += '\n    <div ref="content" class="tree__node-content content">\n      ' +
((__t = ( ctx.content )) == null ? '' : __t) +
'\n    </div>\n    ';
 } ;
__p += '\n    ';
 if (ctx.childNodes && ctx.childNodes.length) { ;
__p += '\n    <div ref="childNodes" class="tree__node-children list" role="list">\n      ' +
((__t = ( ctx.childNodes.join('') )) == null ? '' : __t) +
'\n    </div>\n    ';
 } ;
__p += '\n    ';
 if (ctx.node.isRoot) { ;
__p += '\n    </div>\n  </div>\n  ';
 } else { ;
__p += '\n  </div>\n';
 } ;
__p += '\n';
return __p
}