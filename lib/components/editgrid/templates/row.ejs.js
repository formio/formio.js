Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="row">\r\n  ';
 ctx.util.eachComponent(ctx.components, function(component) { ;
__p += '\r\n    ';
 if (!component.hasOwnProperty('tableView') || component.tableView) { ;
__p += '\r\n      <div class="col-sm-2">\r\n        ' +
((__t = ( ctx.getView(component, ctx.row[component.key]) )) == null ? '' : __t) +
'\r\n      </div>\r\n    ';
 } ;
__p += '\r\n  ';
 }) ;
__p += '\r\n  ';
 if (!ctx.self.options.readOnly) { ;
__p += '\r\n    <div class="col-sm-2">\r\n      <div class="btn-group pull-right">\r\n        <button class="btn btn-default btn-light btn-sm editRow"><i class="' +
((__t = ( ctx.iconClass('edit') )) == null ? '' : __t) +
'"></i></button>\r\n        <button class="btn btn-danger btn-sm removeRow"><i class="' +
((__t = ( ctx.iconClass('trash') )) == null ? '' : __t) +
'"></i></button>\r\n      </div>\r\n    </div>\r\n  ';
 } ;
__p += '\r\n</div>\r\n';
return __p
}