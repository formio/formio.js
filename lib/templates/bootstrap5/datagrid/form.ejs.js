Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function(ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<table class="table datagrid-table table-bordered\n    ' +
((__t = ( ctx.component.striped ? 'table-striped' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.hover ? 'table-hover' : '')) == null ? '' : __t) +
'\n    ' +
((__t = ( ctx.component.condensed ? 'table-sm' : '')) == null ? '' : __t) +
'\n    " ';
 if (ctx.component.layoutFixed) { ;
__p += 'style="table-layout: fixed;"';
 } ;
__p += '>\n  ';
 if (ctx.hasHeader) { ;
__p += '\n  <thead>\n    <tr>\n      ';
 if (ctx.component.reorder) { ;
__p += '<th></th>';
 } ;
__p += '\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n        <th class="' +
((__t = (col.validate && col.validate.required ? 'field-required' : '')) == null ? '' : __t) +
'">\n          ' +
((__t = ( col.hideLabel ? '' : ctx.t(col.label || col.title, { _userInput: true }) )) == null ? '' : __t) +
'\n          ';
 if (col.tooltip) { ;
__p += ' <i ref="tooltip" tabindex="0" data-title="' +
((__t = (col.tooltip)) == null ? '' : __t) +
'" class="' +
((__t = (ctx.iconClass('question-sign'))) == null ? '' : __t) +
' text-muted" data-tooltip="' +
((__t = (col.tooltip)) == null ? '' : __t) +
'"></i>';
 } ;
__p += '\n        </th>\n      ';
 }) ;
__p += '\n      ';
 if (ctx.hasExtraColumn) { ;
__p += '\n      <th>\n        <span class="visually-hidden">' +
((__t = ( ctx.t('Add/Remove') )) == null ? '' : __t) +
'</span>\n        ';
 if (!ctx.builder && ctx.hasAddButton && ctx.hasTopSubmit) { ;
__p += '\n        <button class="btn btn-primary formio-button-add-row" ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-addRow" tabindex="' +
((__t = (ctx.tabIndex)) == null ? '' : __t) +
'">\n          <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i>' +
((__t = (ctx.t(ctx.component.addAnother || 'Add Another', { _userInput: true }))) == null ? '' : __t) +
'\n        </button>\n        ';
 } ;
__p += '\n      </th>\n      ';
 } ;
__p += '\n    </tr>\n  </thead>\n  ';
 } ;
__p += '\n  <tbody ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-tbody" data-key="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'">\n    ';
 ctx.rows.forEach(function(row, index) { ;
__p += '\n    ';
 if (ctx.hasGroups && ctx.groups[index]) { ;
__p += '\n    <tr ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-group-header" class="datagrid-group-header' +
((__t = (ctx.hasToggle ? ' clickable' : '')) == null ? '' : __t) +
'">\n      <td\n        ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-group-label"\n        colspan="' +
((__t = (ctx.numColumns)) == null ? '' : __t) +
'"\n        class="datagrid-group-label">' +
((__t = (ctx.groups[index].label)) == null ? '' : __t) +
'</td>\n    </tr>\n    ';
 } ;
__p += '\n    <tr ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-row">\n      ';
 if (ctx.component.reorder) { ;
__p += '\n        <td>\n          <button type="button" class="formio-drag-button btn btn-default fa fa-bars" data-key="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'"></button>\n        </td>\n      ';
 } ;
__p += '\n      ';
 ctx.columns.forEach(function(col) { ;
__p += '\n        <td ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'" ';
 if (col.key && col.overlay && col.overlay.width) { ;
__p += ' style="width: ' +
((__t = (col.overlay.width + 'px')) == null ? '' : __t) +
'"';
 } ;
__p += ' >\n          ' +
((__t = (row[col.key])) == null ? '' : __t) +
'\n        </td>\n      ';
 }) ;
__p += '\n      ';
 if (ctx.hasExtraColumn) { ;
__p += '\n        ';
 if (ctx.hasRemoveButtons) { ;
__p += '\n        <td>\n          <button type="button" class="btn btn-secondary formio-button-remove-row" ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-removeRow" tabindex="' +
((__t = (ctx.tabIndex)) == null ? '' : __t) +
'" aria-label="' +
((__t = (ctx.t('remove'))) == null ? '' : __t) +
'">\n            <i class="' +
((__t = (ctx.iconClass('remove-circle'))) == null ? '' : __t) +
'"></i>\n          </button>\n        </td>\n        ';
 } ;
__p += '\n        ';
 if (ctx.canAddColumn) { ;
__p += '\n        <td ref="' +
((__t = (ctx.key)) == null ? '' : __t) +
'-container">\n          ' +
((__t = (ctx.placeholder)) == null ? '' : __t) +
'\n        </td>\n        ';
 } ;
__p += '\n      ';
 } ;
__p += '\n    </tr>\n    ';
 }) ;
__p += '\n  </tbody>\n  ';
 if (!ctx.builder && ctx.hasAddButton && ctx.hasBottomSubmit) { ;
__p += '\n  <tfoot>\n    <tr>\n      <td colspan="' +
((__t = (ctx.component.layoutFixed ? ctx.numColumns :  ctx.numColumns + 1)) == null ? '' : __t) +
'">\n        <button class="btn btn-primary formio-button-add-row" ref="' +
((__t = (ctx.datagridKey)) == null ? '' : __t) +
'-addRow" tabindex="' +
((__t = (ctx.tabIndex)) == null ? '' : __t) +
'">\n          <i class="' +
((__t = (ctx.iconClass('plus'))) == null ? '' : __t) +
'"></i> ' +
((__t = (ctx.t(ctx.component.addAnother || 'Add Another', { _userInput: true }))) == null ? '' : __t) +
'\n        </button>\n      </td>\n    </tr>\n  </tfoot>\n  ';
 } ;
__p += '\n</table>\n';
return __p
}