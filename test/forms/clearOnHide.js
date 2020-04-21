import assert from 'power-assert';
import _ from 'lodash';

const visibleData = {
  data: {
    columnfield: '',
    container: {
      containerfield: ''
    },
    datagrid: [
      {
        datagridfield: ''
      }
    ],
    editgrid: [],
    fieldsetfield: '',
    panelfield: '',
    plainfield: '',
    tablefield: '',
    visible: true,
    wellfield: ''
  }
};

const hiddenData = {
  data: {
    visible: false
  },
  metadata: {}
};

const existingData = {
  data: {
    columnfield: 'one',
    container: {
      containerfield: 'two'
    },
    datagrid: [
      {
        datagridfield: 'three'
      }
    ],
    editgrid: [],
    fieldsetfield: 'four',
    panelfield: 'five',
    plainfield: 'six',
    tablefield: 'seven',
    visible: true,
    wellfield: 'eight'
  },
  metadata: {}
};

export default {
  title: 'Clear on hide Form Test',
  form: {
    components: [{
      conditional: {
        eq: '',
        when: null,
        show: ''
      },
      tags: [],
      type: 'checkbox',
      validate: {
        required: false
      },
      clearOnHide: true,
      persistent: true,
      protected: false,
      defaultValue: false,
      key: 'visible',
      datagridLabel: true,
      label: 'Visible',
      hideLabel: false,
      tableView: true,
      inputType: 'checkbox',
      input: true,
      lockKey: true,
      hidden: false,
      name: '',
      value: ''
    }, {
      input: true,
      tableView: true,
      inputType: 'text',
      inputMask: '',
      label: 'Plain Field',
      key: 'plainfield',
      placeholder: '',
      prefix: '',
      suffix: '',
      multiple: false,
      defaultValue: '',
      protected: false,
      unique: false,
      persistent: true,
      hidden: false,
      clearOnHide: true,
      validate: {
        required: false,
        minLength: '',
        maxLength: '',
        pattern: '',
        custom: '',
        customPrivate: false
      },
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      type: 'textfield',
      hideLabel: false,
      labelPosition: 'top',
      tags: [],
      properties: {},
      lockKey: true
    }, {
      input: true,
      tree: true,
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'Container Field',
        key: 'containerfield',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        hidden: false,
        clearOnHide: true,
        validate: {
          required: false,
          minLength: '',
          maxLength: '',
          pattern: '',
          custom: '',
          customPrivate: false
        },
        conditional: {
          show: '',
          when: null,
          eq: ''
        },
        type: 'textfield',
        hideLabel: false,
        labelPosition: 'top',
        tags: [],
        properties: {},
        lockKey: true
      }],
      tableView: true,
      label: 'Container',
      key: 'container',
      protected: false,
      persistent: true,
      clearOnHide: true,
      type: 'container',
      labelPosition: 'top',
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      properties: {},
      hideLabel: false
    }, {
      conditional: {
        eq: 'true',
        when: 'visible',
        show: 'true'
      },
      tags: [],
      type: 'datagrid',
      clearOnHide: true,
      persistent: true,
      protected: false,
      key: 'datagrid',
      label: 'Datagrid',
      tableView: true,
      components: [{
        hideLabel: true,
        tags: [],
        type: 'textfield',
        conditional: {
          eq: '',
          when: null,
          show: ''
        },
        validate: {
          customPrivate: false,
          custom: '',
          pattern: '',
          maxLength: '',
          minLength: '',
          required: false
        },
        clearOnHide: true,
        persistent: true,
        unique: false,
        protected: false,
        defaultValue: '',
        multiple: false,
        suffix: '',
        prefix: '',
        placeholder: '',
        key: 'datagridfield',
        label: 'Datagrid  Field',
        inputMask: '',
        inputType: 'text',
        tableView: true,
        input: true,
        hidden: false,
        labelPosition: 'top',
        properties: {},
        lockKey: true
      }],
      tree: true,
      input: true,
      hidden: false,
      hideLabel: false,
      addAnotherPosition: 'bottom',
      properties: {},
      lockKey: true
    }, {
      input: true,
      tree: true,
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'Edit Grid Field',
        key: 'editgridfield',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        hidden: false,
        clearOnHide: true,
        validate: {
          required: false,
          minLength: '',
          maxLength: '',
          pattern: '',
          custom: '',
          customPrivate: false
        },
        conditional: {
          show: '',
          when: null,
          eq: ''
        },
        type: 'textfield',
        hideLabel: false,
        labelPosition: 'top',
        tags: [],
        properties: {},
        lockKey: true
      }],
      multiple: false,
      tableView: true,
      label: 'Edit Grid',
      key: 'editgrid',
      protected: false,
      persistent: true,
      hidden: false,
      clearOnHide: true,
      templates: {
        header: '<div class="row"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class="col-sm-2"> \n      {{ component.label }} \n    </div> \n  {% }) %} \n</div>',
        row: '<div class="row"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class="col-sm-2"> \n      {{ row[component.key] }} \n    </div> \n  {% }) %} \n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
        footer: ''
      },
      type: 'editgrid',
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      properties: {},
      lockKey: true,
      hideLabel: false
    }, {
      key: 'panel',
      input: false,
      title: 'Panel',
      theme: 'default',
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'Panel Field',
        key: 'panelfield',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        clearOnHide: true,
        validate: {
          required: false,
          minLength: '',
          maxLength: '',
          pattern: '',
          custom: '',
          customPrivate: false
        },
        conditional: {
          show: '',
          when: null,
          eq: ''
        },
        type: 'textfield',
        tags: [],
        hidden: false,
        hideLabel: false,
        labelPosition: 'top',
        properties: {},
        lockKey: true
      }],
      type: 'panel',
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      clearOnHide: false,
      tableView: false,
      hideLabel: false,
      breadcrumb: 'default',
      properties: {},
      lockKey: true
    }, {
      input: false,
      key: 'columns',
      columns: [{
        components: [{
          input: true,
          tableView: true,
          inputType: 'text',
          inputMask: '',
          label: 'Column Field',
          key: 'columnfield',
          placeholder: '',
          prefix: '',
          suffix: '',
          multiple: false,
          defaultValue: '',
          protected: false,
          unique: false,
          persistent: true,
          clearOnHide: true,
          validate: {
            required: false,
            minLength: '',
            maxLength: '',
            pattern: '',
            custom: '',
            customPrivate: false
          },
          conditional: {
            show: '',
            when: null,
            eq: ''
          },
          type: 'textfield',
          tags: [],
          hidden: false,
          hideLabel: false,
          labelPosition: 'top',
          properties: {},
          lockKey: true
        }],
        width: 6,
        offset: 0,
        push: 0,
        pull: 0
      }, {
        components: [],
        width: 6,
        offset: 0,
        push: 0,
        pull: 0
      }],
      type: 'columns',
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      customClass: 'Columns',
      clearOnHide: false,
      tableView: false,
      hideLabel: false,
      properties: {},
      lockKey: true
    }, {
      input: false,
      key: 'table',
      numRows: 3,
      numCols: 3,
      rows: [
        [{
          components: [{
            input: true,
            tableView: true,
            inputType: 'text',
            inputMask: '',
            label: 'Table Field',
            key: 'tablefield',
            placeholder: '',
            prefix: '',
            suffix: '',
            multiple: false,
            defaultValue: '',
            protected: false,
            unique: false,
            persistent: true,
            clearOnHide: true,
            validate: {
              required: false,
              minLength: '',
              maxLength: '',
              pattern: '',
              custom: '',
              customPrivate: false
            },
            conditional: {
              show: '',
              when: null,
              eq: ''
            },
            type: 'textfield',
            tags: [],
            hidden: false,
            hideLabel: false,
            labelPosition: 'top',
            properties: {},
            lockKey: true
          }]
        }, {
          components: []
        }, {
          components: []
        }],
        [{
          components: []
        }, {
          components: []
        }, {
          components: []
        }],
        [{
          components: []
        }, {
          components: []
        }, {
          components: []
        }]
      ],
      header: [],
      caption: '',
      striped: false,
      bordered: false,
      hover: false,
      condensed: false,
      type: 'table',
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      clearOnHide: false,
      tableView: false,
      hideLabel: false,
      properties: {},
      lockKey: true
    }, {
      clearOnHide: false,
      key: 'well',
      input: false,
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'Well Field',
        key: 'wellfield',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        hidden: false,
        clearOnHide: true,
        validate: {
          required: false,
          minLength: '',
          maxLength: '',
          pattern: '',
          custom: '',
          customPrivate: false
        },
        conditional: {
          show: '',
          when: null,
          eq: ''
        },
        type: 'textfield',
        hideLabel: false,
        labelPosition: 'top',
        tags: [],
        properties: {},
        lockKey: true
      }],
      tableView: false,
      type: 'well',
      hideLabel: false,
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      properties: {}
    }, {
      clearOnHide: false,
      key: 'fieldset',
      input: false,
      tableView: false,
      legend: 'Fieldset',
      components: [{
        input: true,
        tableView: true,
        inputType: 'text',
        inputMask: '',
        label: 'Fieldset Field',
        key: 'fieldsetfield',
        placeholder: '',
        prefix: '',
        suffix: '',
        multiple: false,
        defaultValue: '',
        protected: false,
        unique: false,
        persistent: true,
        hidden: false,
        clearOnHide: true,
        validate: {
          required: false,
          minLength: '',
          maxLength: '',
          pattern: '',
          custom: '',
          customPrivate: false
        },
        conditional: {
          show: '',
          when: null,
          eq: ''
        },
        type: 'textfield',
        hideLabel: false,
        labelPosition: 'top',
        tags: [],
        properties: {},
        lockKey: true
      }],
      type: 'fieldset',
      hideLabel: false,
      tags: [],
      conditional: {
        show: 'true',
        when: 'visible',
        eq: 'true'
      },
      properties: {}
    }]
  },
  tests: {
    'Test starting hidden'(form, done) {
      assert.deepEqual(form.getValue(), hiddenData);
      done();
    },
    'Test starting visible'(form, done) {
      form.pristine = false;
      form.submission = {
        data: {
          visible: true
        }
      };
      // Need to wait for the changes to propogate.
      setTimeout(() => {
        assert.deepEqual(form.getValue(), visibleData);
        done();
      }, 300);
    },
    'Test with data'(form, done) {
      form.submission = _.cloneDeep(existingData);
      // Go next tick to get the changes applied.
      setTimeout(() => {
        assert.deepEqual(form.getValue(), existingData);
        done();
      });
    },
    'Test changing visible from hidden to visible'(form, done) {
      form.pristine = false;
      form.submission = {
        data: {
          visible: true
        }
      };

      setTimeout(() => {
        form.getComponent('visible', component => {
          form.on('change', change => {
            assert.deepEqual(change.data, hiddenData.data);
            done();
          });
          component.setValue(false);
        });
      });
    },
    'Test changing visible from visible to hidden'(form, done) {
      form.pristine = false;
      form.submission = {
        data: {
          visible: false
        }
      };
      setTimeout(() => {
        form.getComponent('visible', component => {
          form.on('change', change => {
            assert.deepEqual(change.data, visibleData.data);
            done();
          });
          component.setValue(true);
        });
      });
    },
    // 'Test resetting data when hidden'(form, done) {
    //   form.pristine = false;
    //   form.submission = _.cloneDeep(existingData);
    //   setTimeout(() => {
    //     assert.deepEqual(form.getValue(), existingData);
    //     form.getComponent('visible', component => {
    //       let count = 0;
    //       form.on('change', change => {
    //         switch (count) {
    //           case 0:
    //             assert.deepEqual(change.data, hiddenData.data);
    //             break;
    //           case 1:
    //             assert.deepEqual(change.data, visibleData.data);
    //             done();
    //             break;
    //         }
    //         count++;
    //       });
    //       component.setValue(false);
    //       component.setValue(true);
    //     });
    //   });
    // }
  }
};

