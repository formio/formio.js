Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\n  ';
 ctx.util.eachComponent(ctx.components, function(component) { ;
__p += '\n    ';
 if (!component.hasOwnProperty('tableView') || component.tableView) { ;
__p += '\n      <div class="col-sm-2">\n        ' +
((__t = ( ctx.getView(component, ctx.row[component.key]) )) == null ? '' : __t) +
'\n      </div>\n    ';
 } ;
__p += '\n  ';
 }) ;
__p += '\n  ';
 if (!ctx.self.options.readOnly) { ;
__p += '\n    <div class="col-sm-2">\n      <div class="btn-group pull-right">\n        <button class="btn btn-default btn-light btn-sm editRow"><i class="' +
((__t = ( ctx.iconClass('edit') )) == null ? '' : __t) +
'"></i></button>\n        <button class="btn btn-danger btn-sm removeRow"><i class="' +
((__t = ( ctx.iconClass('trash') )) == null ? '' : __t) +
'"></i></button>\n      </div>\n    </div>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}