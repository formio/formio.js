export default {
  form: `
<option {{ selected ? 'selected="selected"' : '' }}
  value="{{option.value}}"
  {% for (var attr in attrs) { %}
  {{attr}}="{{attrs[attr]}}"
  {% } %}
  >
  {{t(option.label)}}
</option>
`,
};
