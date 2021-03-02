'use strict';
import NestedComponent from './NestedComponent';
import Harness from '../../../../test/harness';
import assert from 'power-assert';
import each from 'lodash/each';
import { expect } from 'chai';
import { comp1, comp2, comp3 } from './fixtures';
import { nestedForm } from '../../../../test/fixtures';
import _map from 'lodash/map';
import Webform from '../../../Webform';

let component = null;
describe('NestedComponent class', () => {
  it('Should create a new NestedComponent class', () => {
    return Harness.testCreate(NestedComponent, {
      // key: 'nested',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          input: true
        },
        {
          type: 'textfield',
          key: 'lastName',
          input: true
        }
      ]
    }).then((_component) => {
      component = _component;
      Harness.testElements(component, 'input[name="data[firstName]"]', 1);
      Harness.testElements(component, 'input[name="data[lastName]"]', 1);
    });
  });

  it('Should be able to add new components', (done) => {
    component.addComponent({
      type: 'email',
      key: 'email',
      input: true
    });
    component.redraw();
    Harness.testElements(component, 'input[name="data[email]"]', 1);
    done();
  });

  it('Should be able to set data within the components.', (done) => {
    const value = {
      firstName: 'Joe',
      lastName: 'Smith',
      email: 'joe@example.com'
    };
    component.setValue(value);
    assert.deepEqual(component.getValue(), value);
    each(component.components, (component) => {
      assert.equal(component.getValue(), value[component.key]);
    });
    done();
  });

  it('Should create nested visibility elements.', () => {
    return Harness.testCreate(NestedComponent, {
      components: [
        {
          type: 'checkbox',
          key: 'showPanel',
          label: 'Show Panel',
          input: true
        },
        {
          type: 'panel',
          key: 'parent',
          title: 'Parent Panel',
          conditional: {
            json: { var: 'data.showPanel' }
          },
          components: [
            {
              type: 'checkbox',
              key: 'showChild',
              label: 'Child 1',
              input: true,
              conditional: {
                json: { var: 'data.showChild' }
              }
            },
            {
              type: 'checkbox',
              key: 'forceParent',
              label: 'Child 2',
              input: true,
              conditional: {
                json: { var: 'data.forceParent' },
              }
            }
          ]
        }
      ]
    }).then((comp) => {
      // Make sure we built the components tree.
      assert.equal(comp.components.length, 2);
      assert.equal(comp.components[1].components.length, 2, 'two');
      const data = {
        showPanel: true,
        showChild: false,
        forceParent: false
      };

      comp.setValue(data);
      comp.checkConditions(data);
      assert.equal(comp.components[1]._visible, true);
      assert.equal(comp.components[1].components[0]._visible, false);
      assert.equal(comp.components[1].components[1]._visible, false);

      data.showChild = true;
      comp.setValue(data);
      comp.checkConditions(data);
      assert.equal(comp.components[1]._visible, true);
      assert.equal(comp.components[1].components[0]._visible, true);
      assert.equal(comp.components[1].components[1]._visible, false);

      data.showPanel = false;
      comp.setValue(data);
      comp.checkConditions(data);
      assert.equal(comp.components[1]._visible, false);
      assert.equal(comp.components[1].components[0]._visible, true);
      assert.equal(comp.components[1].components[1]._visible, false);

      // overrideParent is depricated.
      data.forceParent = true;
      comp.setValue(data);
      comp.checkConditions(data);
      assert.equal(comp.components[1]._visible, false);
      assert.equal(comp.components[1].components[0]._visible, true);
      assert.equal(comp.components[1].components[1]._visible, true);
    });
  });

  describe('set/get visible', () => {
    it('should set/get visible flag on instance and child components', done => {
      Harness.testCreate(NestedComponent, comp1)
        .then(nested => {
          expect(nested.visible).to.be.true;
          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.true;
          });

          nested.visible = false;

          expect(nested.visible).to.be.false;

          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.false;
          });

          nested.visible = true;

          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.true;
          });

          done();
        }, done)
        .catch(done);
    });
  });

  describe('set/get parentVisible', () => {
    it('should set/get parentVisible flag on instance and child components', done => {
      Harness.testCreate(NestedComponent, comp1)
        .then(nested => {
          expect(nested.parentVisible).to.be.true;

          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.true;
          });

          nested.parentVisible = false;

          expect(nested.parentVisible).to.be.false;

          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.false;
          });

          nested.parentVisible = true;

          expect(nested.parentVisible).to.be.true;

          nested.components.forEach(cmp => {
            expect(cmp.parentVisible).to.be.true;
          });

          done();
        }, done)
        .catch(done);
    });
  });

  describe('get schema', () => {
    it('components array shouldn\'t have duplicates', done => {
      Harness.testCreate(NestedComponent, comp1)
        .then(nested => {
          const child = nested.components[0];
          nested.components = [...nested.components, child, child, child];
          expect(nested.components).to.have.lengthOf(5);
          expect(nested.schema.components).to.be.lengthOf(2);
          expect(_map(nested.schema.components, 'key')).to.deep.equal(['firstName', 'lastName']);
          done();
        }, done)
        .catch(done);
    });
  });

  describe('calculateComponentPath', () => {
    it('the first layer components', (done) => {
      Harness.testCreate(NestedComponent, comp1)
        .then((nested) => {
          assert(nested.components[0].path === 'firstName');
          assert(nested.components[1].path === 'lastName');
          done();
        })
        .catch(done);
    });
    it('inside data components', (done) => {
      Harness.testCreate(NestedComponent, comp2)
        .then((nested) => {
          assert(nested.components[0].path === 'dataGrid');
          const dataGrid = nested.components[0];
          dataGrid.setValue([{ textField: '' }, { textField: '' }]);
          setTimeout(() => {
            assert(dataGrid.components[0].path === 'dataGrid[0].textField');
            assert(dataGrid.components[1].path === 'dataGrid[1].textField');
            done();
          },250);
        })
        .catch(done);
    });
    it('inside nested forms', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(nestedForm)
        .then(() => {
          assert(form.components[0].path === 'form');

          const childForm = form.components[0].subForm;
          const textField = childForm.components[0];
          const dataGrid = childForm.components[1];
          const tabs = childForm.components[2];

          assert(textField.path === 'form.data.textField');
          assert(dataGrid.path === 'form.data.dataGrid');
          assert(dataGrid.components[0].path === 'form.data.dataGrid[0].textField');
          assert(tabs.path === 'form.data.tabs');
          assert(tabs.tabs[0][0].path === 'form.data.tabsTextfield');
          done();
        })
        .catch(done);
    });
  });

  describe('getComponent', () => {
    it('the first layer components', (done) => {
      Harness.testCreate(NestedComponent, comp1)
        .then((nested) => {
          const firstNameTextFieldByStringPath = nested.getComponent('firstName');
          const firstNameTextFieldByArrayPath = nested.getComponent(['firstName']);
          assert(firstNameTextFieldByStringPath.path === 'firstName');
          assert(firstNameTextFieldByArrayPath.path === 'firstName');
          done();
        })
        .catch(done);
    });
    it('inside data components', (done) => {
      Harness.testCreate(NestedComponent, comp2)
        .then((nested) => {
          assert(nested.components[0].path === 'dataGrid');
          const dataGrid = nested.components[0];
          dataGrid.setValue([{ textField: '' }, { textField: '' }]);
          setTimeout(() => {
            const dataGridFirstRowTextField= nested.getComponent('dataGrid[0].textField');
            const dataGridSecondRowTextField= nested.getComponent('dataGrid[1].textField');

            assert(dataGrid.components[0] === dataGridFirstRowTextField);
            assert(dataGrid.components[1] === dataGridSecondRowTextField);
            done();
          },250);
        })
        .catch(done);
    });
    it('inside nested forms', (done) => {
      const formElement = document.createElement('div');
      const form = new Webform(formElement);
      form.setForm(nestedForm)
        .then(() => {
          const childForm = form.components[0].subForm;
          const textField = form.getComponent('form.data.textField');
          const dataGrid = form.getComponent('form.data.dataGrid');
          const dataGridTextField = form.getComponent('form.data.dataGrid[0].textField');

          assert(textField === childForm.components[0]);
          assert(dataGrid === childForm.components[1]);
          assert(dataGridTextField === childForm.components[1].components[0]);
          done();
        })
        .catch(done);
    });
  });

  describe('render value as String', () => {
    it('Should render a Select\'s value template', (done) => {
      Harness.testCreate(NestedComponent, comp3)
      .then((nested) => {
        const editGrid = nested.components[0];
        editGrid.addRow();
        editGrid.editRows[0].components[0].setValue(2);
        setTimeout(() => {
          editGrid.saveRow(0);
          setTimeout(() => {
            assert.equal(editGrid.dataValue[0].select, 2);
            const rowContent = editGrid.element.querySelector('[ref="editgrid-editGrid-row"] .row .col-sm-2 span');
            assert(rowContent);
            assert.equal(rowContent.textContent, 'Banana');
            done();
          }, 250);
        }, 250);
      })
      .catch(done);
    });
  });
});
