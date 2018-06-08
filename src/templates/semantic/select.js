export default {
  form: `
{% if (component.widget === 'html5') { %}
<div class="ui selection search dropdown fluid">
  <input type="hidden" name="{{id}}">
  <i class="dropdown icon"></i>
  <div class="default text">{{t(component.placeholder)}}</div>
  <div class="menu" ref="selectContainer">
  </div>
</div>
{% } else { %}
<select
  ref="selectContainer"
  {{ input.multiple ? 'multiple' : '' }}
  {% for (var attr in input.attr) { %}
  {{attr}}="{{input.attr[attr]}}"
  {% } %}
></select>
{% } %}
`,
};
