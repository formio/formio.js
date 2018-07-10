export default {
  form: `
<fieldset>
  {% if (component.legend) { %}<legend ref="header" class="{{component.collapsible ? 'formio-clickable' : ''}}">{{t(component.legend)}}</legend>{% } %}
  {% if (!collapsed) { %}
  <div class="card-body" ref="{{fieldsetKey}}">
    {{children}}
  </div>
  {% } %}
</fieldset>
`,
};
