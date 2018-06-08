export default {
  form: `
<select
  ref="selectContainer"
  {{ input.multiple ? 'multiple' : '' }}
  {% for (var attr in input.attr) { %}
  {{attr}}="{{input.attr[attr]}}"
  {% } %}
></select>
`,
};
