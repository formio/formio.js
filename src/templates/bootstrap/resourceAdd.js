export default {
  form: `
<table class="table table-bordered">
  <tbody>
    <tr>
      <td>
        {{element}}
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <button class="btn btn-primary formio-button-add-resource" ref="addResource">
          <i class="{{iconClass('plus')}}"></i>
          {{t(component.addResourceLabel || 'Add Resource')}}
        </button>
      </td>
    </tr>
  </tbody>
</table>
`,
};
