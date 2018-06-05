export default {
  form: `
<table class="ui celled table">
  <tbody>
  {{rows}}
  <tr>
    <td colspan="2">
      <button class="ui button primary" ref="addButton"><i class="plus icon"></i> {{addAnother}}</button>
    </td>
  </tr>
  </tbody>
</table>
`,
};
