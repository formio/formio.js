import assert from 'power-assert';
import Harness from '../../../test/harness';
import TreeComponent from './Tree';
import {
  comp1,
  comp2,
  comp3,
  comp4
} from './fixtures';
import Webform from '../../Webform';
import _ from 'lodash';
import Formio from '../../Formio';

describe('Tree Component', () => {
  it('Should set and render values in readOnly mode', function(done) {
    Harness.testCreate(TreeComponent, comp1).then((component) => {
    component.setValue({
      data: {
        number: 111,
      },
      children: [{
        data: {
          number: 222,
        },
        children: [{
          data: {
            number: 333,
          },
          children: []
        }]
      }]
    });

    assert.equal(component.element.querySelectorAll('.tree__node-content').length, 3);
    assert.equal(component.element.querySelectorAll('.editNode').length, 3);

    component.options.readOnly = true;
    component.redraw();

    const valueContainers = component.element.querySelectorAll('.col-sm-2');

    assert.equal(component.element.querySelectorAll('.tree__node-content').length, 3);
    assert.equal(component.element.querySelectorAll('.editNode').length, 0);
    assert.equal(valueContainers[0].innerHTML.trim(), '111');
    assert.equal(valueContainers[1].innerHTML.trim(), '222');
    assert.equal(valueContainers[2].innerHTML.trim(), '333');

    done();
    });
  });
  it('Should render tree and allow to save node with basic, layout and data component inside', function(done) {
    Harness.testCreate(TreeComponent, comp2).then((component) => {
      assert.equal(!!component.treeRoot.refs.content, true);
      assert.equal(!!component.treeRoot.refs.cancelNode, true);
      assert.equal(!!component.treeRoot.refs.saveNode, true);
      assert.equal(!!component.treeRoot.refs.addChild, false);
      assert.equal(!!component.treeRoot.refs.editNode, false);
      assert.equal(!!component.treeRoot.refs.removeNode, false);

      const value = {
        data: {
          dataGrid: [{ textField: 'data grid 1st row text' }],
          number: 3333,
          select: '',
          textArea: 'text area text',
        },
        children: []
      };

      const inputFields = {
        'data[tree][dataGrid][0][textField]': value.data.dataGrid[0].textField,
        'data[tree][number]':value.data.number,
        'data[tree][textArea]': value.data.textArea
      };

      const inputEvent = new Event('input');
      _.each(inputFields, (value, fieldName)=> {
        const input = component.element.querySelector(`[name="${fieldName}"]`);
        input.value = value;
        input.dispatchEvent(inputEvent);
      });

      setTimeout(() => {
        const clickEvent = new Event('click');
        component.treeRoot.refs.saveNode.dispatchEvent(clickEvent);
        setTimeout(() => {
          assert.equal(!!component.treeRoot.refs.content, true);
          assert.equal(!!component.treeRoot.refs.cancelNode, false);
          assert.equal(!!component.treeRoot.refs.saveNode, false);
          assert.equal(!!component.treeRoot.refs.addChild, true);
          assert.equal(!!component.treeRoot.refs.editNode, true);
          assert.equal(!!component.treeRoot.refs.removeNode, true);
          assert.deepEqual(component.getValue(), value, 'setvalue');

          done();
        });
      });
    });
  });
  it('Should keep the node of parent tree opened when saving the node of a child tree', function(done) {
    Harness.testCreate(TreeComponent, comp3).then((component) => {
      assert.equal(!!component.treeRoot.refs.cancelNode, true);
      assert.equal(!!component.treeRoot.refs.saveNode, true);
      assert.equal(!!component.treeRoot.refs.editNode, false);

      const clickEvent = new Event('click');
      const childSaveNodeBtn = component.element.querySelector('.formio-component-tree1').querySelector('[ref="saveNode"]');

      childSaveNodeBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(!!component.treeRoot.refs.cancelNode, true);
        assert.equal(!!component.treeRoot.refs.saveNode, true);
        assert.equal(!!component.treeRoot.refs.editNode, false);

        const childTree = component.element.querySelector('.formio-component-tree1');
        const saveBtn = childTree.querySelector('[ref="saveNode"]');
        const editBtn = childTree.querySelector('[ref="editNode"]');

        assert.equal(!!saveBtn, false);
        assert.equal(!!editBtn, true);

        done();
      });
    });
  });
  it('Should allow to open node of a child tree for editing after opening parent tree node', function(done) {
    Harness.testCreate(TreeComponent, comp3).then((component) => {
      assert.equal(!!component.treeRoot.refs.cancelNode, true, 'Should show cancel btn for parent tree');
      assert.equal(!!component.treeRoot.refs.saveNode, true, 'Should show save btn for parent tree');
      assert.equal(!!component.treeRoot.refs.editNode, false, 'Should not show edit btn for parent node in editing tree');

      assert.equal(!!component.treeRoot.components[0].treeRoot.refs.cancelNode, true, 'Should show cancel btn for child tree');
      assert.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, true, 'Should show save btn for child tree');
      assert.equal(!!component.treeRoot.components[0].treeRoot.refs.editNode, false, 'Should not show edit btn for child tree in editing tree');

      const clickEvent = new Event('click');
      const childSaveNodeBtn = component.treeRoot.components[0].treeRoot.refs.saveNode;
      const parentSaveNodeBtn = component.treeRoot.refs.saveNode;
      childSaveNodeBtn.dispatchEvent(clickEvent);
      parentSaveNodeBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(!!component.treeRoot.refs.cancelNode, false, 'Should not show cancel btn for parent tree');
        assert.equal(!!component.treeRoot.refs.saveNode, false, 'Should not show save btn for parent tree');
        assert.equal(!!component.treeRoot.refs.editNode, true, 'Should show edit btn for parent tree');

        const parentEditNodeBtn = component.treeRoot.refs.editNode;

        parentEditNodeBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, false, 'Should not show save btn for child tree');
          assert.equal(!!component.treeRoot.components[0].treeRoot.refs.editNode, true, 'Should show edit btn for child tree');

          const childEditNodeBtn = component.treeRoot.components[0].treeRoot.refs.editNode;

          childEditNodeBtn.dispatchEvent(clickEvent);

          assert.equal(component.treeRoot.components[0].treeRoot.editing, true, 'Should set editing mode for child tree');
          assert.equal(!!component.treeRoot.components[0].treeRoot.refs.saveNode, true, 'Should show save btn for child tree');

          done();
        });
      });
    });
  });

  it('Should stop the submission if component didn\'t saved and has required fields', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    form.setForm(comp4).then(() => {
      const submitButton = form.getComponent(['submit']);
      assert.equal(submitButton.disabled, true, 'Submit button should being disabled');
      const tree = form.getComponent(['tree']);
      const textField = tree.getComponents()[0].getComponent(['textField']);
      textField.setValue('123');

      setTimeout(() => {
        assert.equal(submitButton.disabled, true, 'Submit button should being disabled');
        tree.saveNode(tree.treeRoot);

        setTimeout(() => {
          assert.equal(submitButton.disabled, false, 'Submit button should being disabled');
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should work with empty data and no defaults', (done) => {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, {
      type: 'form',
      components: [comp1],
      display: 'form',
    }, { noDefaults: true })
      .then((form) => {
        setTimeout(() => {
          const tree = form.getComponent(['tree']);
          assert.equal(tree.treeRoot.new, true);
          done();
        }, 300);
      })
      .catch(done);
  });
});
