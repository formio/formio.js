export default {
  form: `
<div id="{{id}}" class="{{classes}}"{% if (styles) { %} styles="{{styles}}"{% } %} ref="component">
  {% if (visible) { %}
  {{children}}
  <div ref="messageContainer" class="formio-errors invalid-feedback"></div>
  {% } %}
</div>
`,
};
