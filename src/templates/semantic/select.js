export default {
  form: `
<div class="ui selection dropdown fluid {{ component.suffix ? ' right' : '' }}{{ (component.prefix || component.suffix) ? ' labeled' : '' }}">
  {% if (component.prefix) { %}
  <label class="ui label">{{component.prefix}}</label>
  {% } %}
  <input type="hidden" ref="input"></input>
  <i class="dropdown icon"></i>
  <div class="default text">Gender</div>
  <div class="menu">
    <div class="item" data-value="1">Male</div>
    <div class="item" data-value="0">Female</div>
  </div>
  {% if (component.suffix) { %}
  <div class="ui label">{{component.suffix}}</div>
  {% } %}
</div>
`,
};
