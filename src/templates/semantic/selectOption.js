export default {
  form: `
    <div class="item" data-value="{{option.value}}"
      {% for (var attr in attrs) { %}
      {{attr}}="{{attrs[attr]}}"
      {% } %}
    >{{t(option.label)}}</div>
`,
};
