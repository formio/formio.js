Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default=function (ctx) {
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="ui grid">\n  <div class="eight wide column">\n    <h3 class="lead">' +
((__t = (ctx.componentInfo.title)) == null ? '' : __t) +
' ' +
((__t = (ctx.t('Component'))) == null ? '' : __t) +
'</h3>\n  </div>\n  <div class="eight wide column">\n    <div class="right floated" style="margin-right: 20px; margin-top: 10px">\n      <a href="' +
((__t = (ctx.componentInfo.documentation)) == null ? '' : __t) +
'" target="_blank">\n        <i class="' +
((__t = (ctx.iconClass('new-window'))) == null ? '' : __t) +
'"> ' +
((__t = (ctx.t('Help'))) == null ? '' : __t) +
'</i>\n      </a>\n    </div>\n  </div>\n</div>\n<div class="ui grid">\n  <div class="';
 if (ctx.preview) { ;
__p += 'eight';
 } else { ;
__p += 'sixteen';
 } ;
__p += ' wide column">\n    <div ref="editForm">\n        ' +
((__t = (ctx.editForm)) == null ? '' : __t) +
'\n    </div>\n    ';
 if (!ctx.preview) { ;
__p += '\n    <div style="margin-top: 10px;">\n      <button class="ui button primary" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n      <button class="ui button default" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\n      <button class="ui button negative" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\n    </div>\n    ';
 } ;
__p += '\n  </div>\n  ';
 if (ctx.preview) { ;
__p += '\n  <div class="eight wide column">\n    <div class="ui top attached block header">\n      ' +
((__t = (ctx.t('Preview'))) == null ? '' : __t) +
'\n    </div>\n    <div class="ui bottom attached segment" ref="preview">\n      ' +
((__t = (ctx.preview)) == null ? '' : __t) +
'\n    </div>\n    ';
 if (ctx.componentInfo.help) { ;
__p += '\n    <div class="ui secondary segment formio-settings-help">\n      ' +
((__t = ( ctx.componentInfo.help )) == null ? '' : __t) +
'\n    </div>\n    ';
 } ;
__p += '\n    <div style="margin-top: 10px;">\n      <button class="ui button primary" style="margin-right: 10px;" ref="saveButton">' +
((__t = (ctx.t('Save'))) == null ? '' : __t) +
'</button>\n      <button class="ui button default" style="margin-right: 10px;" ref="cancelButton">' +
((__t = (ctx.t('Cancel'))) == null ? '' : __t) +
'</button>\n      <button class="ui button negative" ref="removeButton">' +
((__t = (ctx.t('Remove'))) == null ? '' : __t) +
'</button>\n    </div>\n  </div>\n  ';
 } ;
__p += '\n</div>\n';
return __p
}