export default {
  form: `
<option {{ selected ? 'selected="selected"' : '' }}
  {% for (var attr in attrs) { %}
  {{attr}}="{{attrs[attr]}}"
  {% } %}
  >
  {{t(option.label)}}
</option>
`,
};
