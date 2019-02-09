export default {
  form: `
<table class="ui table striped celled">
  <thead>
    <tr>
      <th></th>
      {% component.values.forEach(function(value) { %}
      <th style="text-align: center;">{{t(value.label)}}</th>
      {% }) %}
    </tr>
  </thead>
  <tbody>
    {% component.questions.forEach(function(question) { %}
    <tr>
      <td>{{t(question.label)}}</td>
      {% component.values.forEach(function(value) { %}
      <td style="text-align: center;">
        <input type="radio" name="{{ self.getInputName(question) }}" value="{{value.value}}" id="{{key}}-{{question.value}}-{{value.value}}" ref="input">
      </td>
      {% }) %}
    </tr>
    {% }) %}
  </tbody>
</table>
`,
  html: `
<table class="ui table striped celled">
  <tbody>
    {% component.questions.forEach(function(question) { %}
    <tr>
      <th>{{t(question.label)}}</th>
      <td>
      {% component.values.forEach(function(item) { %}
        {% if (value && value.hasOwnProperty(question.value) && value[question.value] === item.value) { %}
          {{t(item.label)}}
        {% } %}
      {% }) %}
      </td>
    </tr>
    {% }) %}
  </tbody>
</table>
  `
};
