import { expect, assert } from 'chai';
import _ from 'lodash';
const application = require('./fixtures/application.json');
const wizard = require('./fixtures/wizard.json');
import * as FormUtils from './formUtils';
import async from 'async';

describe('findComponent', () => {
  it('Should be able to find a regular component', (done) => {
    FormUtils.findComponent(application.components, 'lastName', (component, path) => {
      assert(!!component, 'Component not found');
      assert.equal(component.key, 'lastName');
      assert.deepEqual(path, [
        0,
        'components',
        0,
        'columns',
        1,
        'components',
        0
      ]);
      done();
    });
  });

  it('Should be able to find a component deep in the schema', (done) => {
    FormUtils.findComponent(application.components, 'to', (component, path) => {
      assert(!!component, 'Component not found');
      assert.equal(component.key, 'to');
      assert.deepEqual(path, [
        2,
        'components',
        0,
        'components',
        3
      ]);
      done();
    });
  });

  it('Should be able to find a column without a key', (done) => {
    FormUtils.findComponent(application.components, 'column2', (component, path) => {
      assert(!!component, 'Component not found');
      assert.deepEqual(path, [
        0,
        'components',
        0,
        'columns',
        1
      ]);
      done();
    });
  });
});

describe('Form Changes', () => {
  it('Should allow modifications to application form', (done) => {
    const modified = _.cloneDeep(application);
    const comps = {};
    async.waterfall([
      (next) => FormUtils.findComponent(modified.components, 'column1', (comp) => {
        comps.column1 = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(modified.components, 'column2', (comp) => {
        comps.column2 = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(comps.column2.components, 'lastName', (comp) => {
        comps.lastName = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(comps.column1.components, 'emailAddress', (comp) => {
        comps.email = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(comps.column1.components, 'homeAddress', (comp) => {
        comps.homeAddress = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(comps.column1.components, 'firstName', (comp) => {
        comps.firstName = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(application.components, 'column1', (comp) => {
        comps.column1Source = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(comps.column1Source.components, 'emailAddress', (comp) => {
        comps.emailSource = comp;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(application.components, 'department', (comp, path) => {
        comps.departmentSource = comp;
        comps.departmentSource.path = path;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(application.components, 'column2', (comp) => {
        comps.column2Source = comp;
        next(null, comps)
      })
    ], (err, comps) => {
      // Make sure we found all components.
      assert(!!comps.column1, 'Component not found');
      assert(!!comps.column2, 'Component not found');
      assert(!!comps.lastName, 'Component not found');
      assert(!!comps.email, 'Component not found');
      assert(!!comps.firstName, 'Component not found');
      assert(!!comps.column1Source, 'Component not found');
      assert(!!comps.emailSource, 'Component not found');
      assert(!!comps.departmentSource, 'Component not found');
      assert(!!comps.column2Source, 'Component not found');

      // Fix the missing keys... our renderer does this part.
      comps.column1.key = 'column1';
      comps.column2.key = 'column2';

      const changes = [];
      const a = {
        id: '1234',
        parent: comps.column1,
        schema: {
          key: 'a',
          label: 'A',
          id: '1234',
          type: 'textfield'
        }
      };

      const b = {
        id: '2345',
        parent: comps.column1,
        schema: {
          key: 'b',
          label: 'B',
          id: '2345',
          type: 'textfield'
        }
      };

      const c = {
        id: '3456',
        parent: comps.column2,
        schema: {
          key: 'c',
          label: 'C',
          id: '3456',
          type: 'textfield'
        }
      };

      // Add some components.
      comps.column1.components.splice(1, 0, a.schema);
      comps.column1.components.splice(3, 0, b.schema);
      comps.column2.components.splice(0, 0, c.schema);
      changes.push(FormUtils.generateFormChange('add', a));
      changes.push(FormUtils.generateFormChange('add', b));
      changes.push(FormUtils.generateFormChange('add', c));

      // Change an existing component.
      const lastNameModified = _.cloneDeep(comps.lastName);
      lastNameModified.label = 'Surname';
      changes.push(FormUtils.generateFormChange('edit', {
        originalComponent: comps.lastName,
        schema: lastNameModified
      }));

      // Change another component
      const emailModified = _.cloneDeep(comps.email);
      emailModified.label = 'Email';
      changes.push(FormUtils.generateFormChange('edit', {
        originalComponent: comps.email,
        schema: emailModified
      }));

      // Now delete the first name.
      changes.push(FormUtils.generateFormChange('remove', {
        schema: comps.firstName
      }));

      // Now move the homeAddress
      changes.push(FormUtils.generateFormChange('remove', {
        schema: comps.homeAddress
      }));
      comps.homeAddress.id = '5678';
      comps.column2.components.splice(2, 0, comps.homeAddress);
      changes.push(FormUtils.generateFormChange('add', {
        id: comps.homeAddress.id,
        parent: comps.column2,
        schema: comps.homeAddress
      }));

      // Now make a change in the source form.
      comps.column2Source.components.splice(2, 0, {
        key: 'd',
        label: 'D',
        type: 'textfield'
      });

      // Now modify the email field.
      comps.emailSource.label = 'Enter email address';
      comps.emailSource.placeholder = '';

      // Now delete the department field.
      FormUtils.removeComponent(application.components, comps.departmentSource.path);

      // Make sure we can no longer find that component.
      assert(!FormUtils.findComponent(application.components, 'department'), 'Should not find department');

      // Now apply the changes to the modified form.
      const result = FormUtils.applyFormChanges(application, changes);
      assert.equal(result.failed.length, 0);

      // Make sure all the changes are there.
      assert.equal(result.form.components[0].components[0].columns[0].components.length, 3);
      assert.equal(result.form.components[0].components[0].columns[0].components[0].key, 'a');
      assert.equal(result.form.components[0].components[0].columns[0].components[1].key, 'b');
      assert.equal(result.form.components[0].components[0].columns[0].components[2].key, 'emailAddress');
      assert.equal(result.form.components[0].components[0].columns[0].components[2].label, 'Email');
      assert.equal(result.form.components[0].components[0].columns[0].components[2].placeholder, '');
      assert.equal(result.form.components[0].components[0].columns[1].components.length, 5);
      assert.equal(result.form.components[0].components[0].columns[1].components[0].key, 'c');
      assert.equal(result.form.components[0].components[0].columns[1].components[1].key, 'lastName');
      assert.equal(result.form.components[0].components[0].columns[1].components[1].label, 'Surname');
      assert.equal(result.form.components[0].components[0].columns[1].components[2].key, 'homeAddress');
      assert.equal(result.form.components[0].components[0].columns[1].components[3].key, 'phoneNumber');
      assert.equal(result.form.components[0].components[0].columns[1].components[4].key, 'd');
      assert(!FormUtils.findComponent(result.form.components, 'department'), 'Should not find department');
      done();
    });
  });
});

describe('Wizard Changes', () => {
  it('Should allow modifications to wizard form', (done) => {
    const modified = _.cloneDeep(wizard);
    const comps = {};
    async.waterfall([
      (next) => FormUtils.findComponent(modified.components, 'selectyourDentalPlan', (comp, path) => {
        comps.selectyourDentalPlan = comp;
        comps.selectyourDentalPlan.path = path;
        next(null, comps);
      }),
      (comps, next) => FormUtils.findComponent(modified.components, 'participants', (comp, path) => {
        comps.participants = comp;
        assert.equal(path.length, 3);
        comps.participants.path = path;
        next(null, comps);
      }),
    ], (err, comps) => {

      const changes = [];
      // Add a new page to the end
      const newPage = {
        id: '1234',
        key: 'lastPage',
        label: 'Last Page',
        type: 'panel',
        components: []
      };
      modified.components.push(newPage);
      changes.push(FormUtils.generateFormChange('add', {
        id: newPage.id,
        schema: newPage,
        parent: modified
      }));

      // Add a component to that new page.
      const newComp = {
        id: '2345',
        key: 'a',
        label: 'A',
        type: 'textfield'
      };
      newPage.components.push(newComp);
      changes.push(FormUtils.generateFormChange('add', {
        id: newComp.id,
        schema: newComp,
        parent: newPage
      }));

      // Move an existing component to the new page and change its properties.
      changes.push(FormUtils.generateFormChange('remove', {
        schema: comps.selectyourDentalPlan
      }));
      comps.selectyourDentalPlan.id = '3456';
      const selectPlan = _.clone(comps.selectyourDentalPlan);
      selectPlan.label = 'Dental Plan';
      newPage.components.splice(0, 0, selectPlan);
      changes.push(FormUtils.generateFormChange('add', {
        id: selectPlan.id,
        parent: newPage,
        schema: selectPlan
      }));
      changes.push(FormUtils.generateFormChange('edit', {
        originalComponent: comps.selectyourDentalPlan,
        schema: selectPlan
      }));

      // Move a datagrid to the first page.
      changes.push(FormUtils.generateFormChange('remove', {
        schema: comps.participants
      }));
      comps.participants.id = '4567';
      modified.components[0].components.splice(0, 0, comps.participants);
      changes.push(FormUtils.generateFormChange('add', {
        id: comps.participants.id,
        parent: modified.components[0],
        schema: comps.participants
      }));

      // Now add a page with the current form.
      const otherPage = {
        type: 'panel',
        key: 'otherPage',
        label: 'Other Page',
        components: []
      };
      wizard.components.splice(1, 0, otherPage);

      // Now add a component to that page.
      otherPage.components.push({
        type: 'textfield',
        key: 'b',
        label: 'B'
      });

      // Try moving the same component to this new page and modifying it...
      const dentalPlan = _.clone(comps.selectyourDentalPlan);
      FormUtils.removeComponent(wizard.components, dentalPlan.path);
      dentalPlan.label = 'Dental Plan';
      dentalPlan.placeholder = 'Select the dental plan you would like to register for.';
      dentalPlan.tooltip = 'This is the plan for your teeth.';
      otherPage.components.push(dentalPlan);

      // Now apply the changes to the modified form.
      const result = FormUtils.applyFormChanges(wizard, changes);
      assert.equal(result.failed.length, 0);

      // Check to see if the last page was added.
      assert.equal(result.form.components.length, 6);

      // The last page is on the 5th page because we added a page which throws off the index.  Expected behavior.
      assert.equal(result.form.components[4].key, 'lastPage');
      assert.equal(result.form.components[4].components.length, 2);
      assert.equal(result.form.components[4].components[0].key, 'selectyourDentalPlan');
      assert.equal(result.form.components[4].components[0].label, 'Dental Plan');
      assert.equal(result.form.components[4].components[1].key, 'a');
      assert(!FormUtils.findComponent(result.form.components[1].components, 'selectyourDentalPlan'), 'Dental plan should not be in the second page anymore.');

      // Check to see if the other page was added.
      assert.equal(result.form.components[1].key, 'otherPage');
      assert.equal(result.form.components[1].components.length, 1);
      assert.equal(result.form.components[1].components[0].key, 'b');

      // Check to make sure the datagrid was moved.
      assert.equal(result.form.components[0].components.length, 2);
      assert.equal(result.form.components[0].components[0].key, 'participants');
      assert.equal(result.form.components[0].components[0].components.length, 4);
      assert.equal(result.form.components[2].title, 'Health Plan');
      assert.equal(result.form.components[2].components.length, 2);
      assert(!FormUtils.findComponent(result.form.components[2].components, 'participants'), 'Should not find the participants on the 2nd page');

      done();
    });
  });
});
