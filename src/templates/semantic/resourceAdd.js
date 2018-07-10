export default {
  form: `
<table class="ui table celled">
  <tbody>
    <tr>
      <td>
        {{element}}
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <button class="ui button primary" ref="addResource">
          <i class="{{iconClass('plus')}}"></i>
          {{t(component.addResourceLabel || 'Add Resource')}}
        </button>
      </td>
    </tr>
  </tbody>
</table>
`,
};
