'use strict';
import assert from 'power-assert';
import { expect } from 'chai';
import sinon from 'sinon';
import Component from './Component';
import Webform from '../../../Webform';
import Harness from '../../../../test/harness';
import { comp1 } from './fixtures';
import _merge from 'lodash/merge';
import comp3 from './fixtures/comp3';
import comp4 from './fixtures/comp4';
import comp5 from './fixtures/comp5';

describe('Component', () => {
  it('Should create a Component', (done) => {
    const component = new Component();

    // Test that we have a proper constructed component.
    assert.equal(component.options.renderMode, 'form');
    assert.equal(component.options.attachMode, 'full');
    assert.equal(component.attached, false);
    assert.equal(component.rendered, false);
    done();
  });

  it('Should build a base component', () => {
    return Harness.testCreate(Component, { type: 'base' }).then((component) => {
      const element = component.element.querySelector('[ref="component"]');
      assert.equal(element.textContent.trim(), 'Unknown component: base');
    });
  });

  it('Should provide required validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: { required: true }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: '',
        field: 'firstName',
        error: 'First Name is required'
      },
      good: {
        value: 'te'
      }
    }, done)).catch(done);
  });

  it('Should provide minLength validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: { minLength: 2 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 't',
        field: 'firstName',
        error: 'First Name must have at least 2 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide maxLength validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: { maxLength: 5 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'testte',
        field: 'firstName',
        error: 'First Name must have no more than 5 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide maxWords validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: { maxWords: 2 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'test test test',
        field: 'firstName',
        error: 'First Name must have no more than 2 words.'
      },
      good: {
        value: 'te st'
      }
    }, done));
  });

  it('Should provide minWords validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: { minWords: 2 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'test',
        field: 'firstName',
        error: 'First Name must have at least 2 words.'
      },
      good: {
        value: 'te st'
      }
    }, done));
  });

  it('Should provide custom validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'Joe',
        field: 'firstName',
        error: 'You cannot be Joe'
      },
      good: {
        value: 'Tom'
      }
    }, done));
  });

  it('Should provide json validation', (done) => {
    Harness.testCreate(Component, _merge({}, comp1, {
      validate: {
        json: {
          'if': [
            {
              '===': [
                { var: 'data.firstName' },
                'Joe'
              ]
            },
            true,
            'You must be Joe'
          ]
        }
      }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'Tom',
        field: 'firstName',
        error: 'You must be Joe'
      },
      good: {
        value: 'Joe'
      }
    }, done));
  });

  it('Should mark as invalid calculated fields that are invalid', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const formJson = {
      components: [
        {
          label: 'A',
          mask: false,
          tableView: false,
          delimiter: false,
          requireDecimal: false,
          inputFormat: 'plain',
          key: 'a',
          type: 'number',
          input: true
        },
        {
          label: 'B',
          mask: false,
          disabled: true,
          tableView: false,
          delimiter: false,
          requireDecimal: false,
          inputFormat: 'plain',
          calculateValue: 'value = data.a + 1;',
          validate: {
            custom: 'valid = input <= 10 ? true : \'B should be less or equal to 10\';'
          },
          key: 'b',
          type: 'number',
          input: true
        }
      ],
    };

    form.setForm(formJson).then(() => {
      return form.setSubmission({
        data: {
          a: 1
        }
      });
    })
    .then(() => {
      setTimeout(() => {
        const a = form.getComponent('a');
        a.updateComponentValue(10);
        setTimeout(()=> {
          const b = form.getComponent('b');
          expect(b.refs.messageContainer?.innerHTML.indexOf('B should be less or equal to 10') > -1).to.be.true;
          expect(b.refs.input[0].classList.contains('is-invalid')).to.be.true;
          done();
        }, 300);
      }, 300);
    })
    .catch(done);
  });

  describe('shouldSkipValidation', () => {
    it('should return true if component is hidden', done => {
      Harness.testCreate(Component, comp1)
        .then(cmp => {
          cmp.visible = false;
          cmp.checkCondition = () => true;
          expect(cmp.visible).to.be.false;
          expect(cmp.checkCondition()).to.be.true;
          expect(cmp.shouldSkipValidation()).to.be.true;
          done();
        }, done)
        .catch(done);
    });

    it('should return true if component is conditionally hidden', done => {
      Harness.testCreate(Component, comp1)
        .then(cmp => {
          cmp.visible = true;
          cmp.checkCondition = () => false;
          expect(cmp.visible).to.be.true;
          expect(cmp.checkCondition()).to.be.false;
          expect(cmp.shouldSkipValidation()).to.be.true;
          done();
        }, done)
        .catch(done);
    });

    it('should return false if not hidden', done => {
      Harness.testCreate(Component, comp1)
        .then(cmp => {
          cmp.visible = true;
          cmp.checkCondition = () => true;
          expect(cmp.visible).to.be.true;
          expect(cmp.checkCondition()).to.be.true;
          expect(cmp.shouldSkipValidation()).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('Component Modal', () => {
    it('Modal window should stay opened after redrawing component if it was opened ont hte moment of calling', (done) => {
      Harness.testCreate(Component, comp3).then((component) => {
        component.componentModal.openModal();
        component.redraw().then(() => {
          const isVisible = !component.componentModal.refs.modalWrapper.classList.contains('component-rendering-hidden');
          assert(isVisible);
          done();
        }).catch(done);
      }).catch(done);
    });
  });

  it('Should return value for HTML mode', () => {
    return Harness.testCreate(Component, comp1).then((component) => {
      assert.equal(component.itemValueForHTMLMode(['option 1', 'option 2', 'option 3']), 'option 1, option 2, option 3');
      assert.equal(component.itemValueForHTMLMode(['option 1', ['option 2', 'option 3']]), 'option 1, option 2, option 3');
      assert.equal(component.itemValueForHTMLMode(['2020-03-18T15:00:00.000Z', '2020-03-31T09:05:00.000Z']), '2020-03-18T15:00:00.000Z, 2020-03-31T09:05:00.000Z');
      assert.equal(component.itemValueForHTMLMode('test'), 'test');
    });
  });

  it('Should protect against change loops', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const formJson = {
      components: [
        {
          key: 'textField',
          label: 'Text Field',
          type: 'textfield',
          calculateValue: "value = value + '_calculated'",
        },
      ],
    };

    form.setForm(formJson).then(() => {
      const textField = form.getComponent('textField');
      const spy = sinon.spy(textField, 'calculateComponentValue');
      form.onChange({ textField: 'test' });

      setTimeout(() => {
        expect(spy.calledOnce).to.be.true;

        done();
      }, 500);
    })
    .catch((err) => done(err));
  });

  it('Should mark as invalid only invalid fields in multiple components', function(done) {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);
    const formJson = {
      components: [
        {
          label: 'Email',
          tableView: true,
          multiple: true,
          validate: {
            required: true
          },
          key: 'email',
          type: 'email',
          input: true
        },
      ],
    };

    form.setForm(formJson).then(() => {
      return form.setSubmission({
        data: {
          email: [
            'oleg@form.io',
            'oleg@form',
            '',
          ]
        }
      });
    })
    .then(() => {
      setTimeout(() => {
        const email = form.getComponent('email');
        expect(email.refs.input[0].classList.contains('is-invalid')).to.be.false;
        expect(email.refs.input[1].classList.contains('is-invalid')).to.be.true;
        expect(email.refs.input[2].classList.contains('is-invalid')).to.be.true;
        done();
      }, 300);
    })
    .catch(done);
  });

  it('Should sanitize HTML even if options.pdf is set', (done) => {
    const component = new Component({}, { pdf: true });
    assert.equal(component.sanitize('<a href="javascript:console.log("untrusted")></a>'), '<a></a>');
    done();
  });

  describe('shouldDisplayRedAsterisk', () => {
    it('modalPreview template should have className "field-required" if component is required', done => {
      Harness.testCreate(Component, _merge({}, comp4, {
        validate: { required: true }
      })).then(cmp => {
        assert.equal(!!cmp.element.querySelector('.field-required'), true);
        done();
      }, done)
      .catch(done);
    });
  });

  it('Should not execute code inside Tooltips/Description', (done) => {
    const formElement = document.createElement('div');
    const form = new Webform(formElement);

    form.setForm(comp5).then(() => {
      setTimeout(() => {
        assert.equal(window._ee, undefined, 'Should not execute code inside Tooltips/Description');
        done();
      }, 200);
    })
      .catch(done);
  });
});
