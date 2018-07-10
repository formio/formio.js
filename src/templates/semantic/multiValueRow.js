export default {
  form: `
<tr ref="row">
  <td>
    {{element}}
  </td>
  {% if (!disabled) { %}
  <td>
    <button type="button" class="ui icon button secondary" ref="removeRow">
      <i class="trash icon"></i>
    </button>
  </td>
  {% } %}
</tr>
`,
};
