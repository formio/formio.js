import { expect } from 'chai';
import _ from 'lodash';
import assert from 'power-assert';
import sinon from 'sinon';
import formWithCKEditor from '../../../test/forms/formWithCKEditor';
import formWithRichTextAreas from '../../../test/forms/formWithRichTextAreas';
import Harness from '../../../test/harness';
import Formio from '../../Formio';
import { comp1, comp2, comp3, comp4 } from './fixtures';
import TextAreaComponent from './TextArea';
import 'ace-builds';

describe('TextArea Component', () => {
  it('Should build a TextArea component', () => {
    return Harness.testCreate(TextAreaComponent, comp1).then((component) => {
      Harness.testElements(component, 'textarea', 1);
    });
  });

  it('setValue should be called only once', () => {
    return Harness.testCreate(TextAreaComponent, comp2).then((component) => {
      const valueToSet = [
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        },
      ];
      const emit = sinon.spy(component, 'setValue');
      component.setValue(valueToSet);
      expect(component.getValue()).to.deep.equal([
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        }
      ]);
      expect(emit.callCount).to.equal(1);
    });
  });

  it('Should provide min/max length validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { minLength: 5, maxLength: 10 };

    const validValues = [
      '',
      'te_st',
      'test value',
      '      ',
      'What?',
      'test: ',
      't    ',
      '   t '
    ];

    const invalidMin = [
      't',
      'tt',
      'ttt',
      'tttt',
      '  t ',
      '  t',
      '_4_'
    ];

    const invalidMax = [
      'test__value',
      'test value ',
      ' test value',
      'test: value',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Text Area must have at least 5 characters.');
    testValidity(invalidMax, false, 'Text Area must have no more than 10 characters.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide min/max words validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { minWords: 2, maxWords: 5 };

    const validValues = [
      '',
      'test value',
      'some, test value',
      'some - test - value',
      '   value      value     value    value   value      ',
      ' What ?',
      '" test "',
    ];

    const invalidMin = [
      '  t   ',
      '? ',
      'e',
      '_test    ',
      '   9',
      't  ',
      'What?',
      '"4"'
    ];

    const invalidMax = [
      'te st __ va lue ""',
      '" te st va lue "',
      '11 - 22 - 33 - 44',
      'te st : va lue :',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidMin, false, 'Text Area must have at least 2 words.');
    testValidity(invalidMax, false, 'Text Area must have no more than 5 words.', invalidMax[invalidMax.length-1]);
  });

  it('Should provide pattern validation', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].validate = { pattern: '\\D+' };

    const validValues = [
      '',
      '     ',
      'test value',
      '& "" (test) _ ,.*',
      '  some - test - value   ',
    ];

    const invalidValues = [
      'test(2)',
      '123',
      '0 waste',
      '"9"',
      '   9',
    ];

    const testValidity = (values, valid, message, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textArea');
          const changed = component.setValue(value);
          const error = message;

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message.trim(), error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues,
      false,
      'Text Area does not match the pattern \\D+',
      invalidValues[invalidValues.length-1]
    );
  });

  it('Should set custom number of rows', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].rows = 5;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      assert.equal(component.refs.input[0].rows, component.component.rows, 'Should set custom number of rows');

      done();
    }).catch(done);
  });

  it('Should render HTML', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].inputFormat = 'html';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textArea: '<b>HTML!</b>'
        }
      });
      setTimeout(() => {
        const textArea = form.getComponent('textArea');
        assert.equal(textArea.refs.input[0].innerHTML, '<b>HTML!</b>');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should render plain text', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].inputFormat = 'plain';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textArea: '<b>Plain text!</b>'
        }
      });
      setTimeout(() => {
        const textArea = form.getComponent('textArea');
        assert.equal(textArea.refs.input[0].innerText, '<b>Plain text!</b>');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should correctly count characters if character counter is enabled', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].showCharCount = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value) => {
        assert.equal(component.dataValue, value, 'Should set value');
        assert.equal(parseInt(component.refs.charcount[0].textContent), value.length, 'Should show correct chars number');
        assert.equal(component.refs.charcount[0].textContent, `${value.length} characters`, 'Should show correct message');
      };

      let value = 'test Value (@#!-"]) _ 23.,5}/*&&';
      inputValue(value);
      setTimeout(() => {
        checkValue(value);
        value = '';
        inputValue(value);

        setTimeout(() => {
          checkValue(value);
          value = '  ';
          inputValue(value);

          setTimeout(() => {
            checkValue(value);

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should correctly count words if word counter is enabled', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].showWordCount = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textArea');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value, expected) => {
        assert.equal(component.dataValue, value, 'Should set value');
        assert.equal(parseInt(component.refs.wordcount[0].textContent), expected, 'Should show correct words number');
        assert.equal(component.refs.wordcount[0].textContent, `${expected} words`, 'Should show correct message');
      };

      let value = 'test , test_test 11 - "so me"';
      inputValue(value);

      setTimeout(() => {
        checkValue(value, 7);
        value = ' test ';
        inputValue(value);

        setTimeout(() => {
          checkValue(value, 1);
          value = ' .   .  ';
          inputValue(value);

          setTimeout(() => {
            checkValue(value, 2);

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  describe('Rich text editors', () => {
    describe('CKEditor', () => {
      it('Should allow to insert media fiels and show the in them read-only mode', (done) => {
        const element = document.createElement('div');

        Formio.createForm(element, formWithCKEditor, { readOnly: true }).then(form => {
          form.submission = {
            data: {
              textArea: `
                <figure class="media">
                  <div data-oembed-url="https://www.youtube.com/watch?v=GsLRrmnJXF8">
                    <div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">
                      <iframe src="https://www.youtube.com/embed/GsLRrmnJXF8" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="">
                      </iframe>
                    </div>
                  </div>
                </figure>
                <figure class="media">
                <div data-oembed-url="https://www.youtube.com/watch?v=FmA6U5rXl38&amp;t=111s">
                  <div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">
                    <iframe src="https://www.youtube.com/embed/FmA6U5rXl38" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="">
                    </iframe>
                  </div>
                </div>
              </figure>`,
            },
            state: 'submitted',
          };

          setTimeout(() => {
            const mediaA = form.element.querySelector('iframe[src="https://www.youtube.com/embed/GsLRrmnJXF8"]');
            const mediaB = form.element.querySelector('iframe[src="https://www.youtube.com/embed/FmA6U5rXl38"]');
            assert(mediaA, 'Should not remove embedded media');
            assert(mediaB, 'Should not remove embedded media');

            done();
          }, 300);
        }).catch(done);
      });
    });

    it('Should clear value in the editor on Reset', (done) => {
      const element = document.createElement('div');

      Formio.createForm(element, formWithRichTextAreas).then(form => {
        form.setValue({
          data: {
            textArea: 'Test',
            textAreaAce: 'Test',
          },
        });

        setTimeout(() => {
          const plainTextArea = form.getComponent(['textArea']);
          const aceTextArea = form.getComponent(['textAreaAce']);

          const textAreaElement = plainTextArea.element.querySelector('textarea');
          console.log(aceTextArea.editors);
          const aceEditor = aceTextArea.editors[0];

          // Make sure value is set to the components
          assert.equal(plainTextArea.dataValue, 'Test');
          assert.equal(aceTextArea.dataValue, 'Test');

          // Make sure value is set to the editors/elements
          assert.equal(textAreaElement.value, 'Test');
          assert.equal(aceEditor.getValue(), 'Test');

          form.resetValue();

          setTimeout(() => {
            // Make sure value is cleared on the components
            assert.equal(plainTextArea.dataValue, '');
            assert.equal(aceTextArea.dataValue, '');

            // Make sure value is cleared in the editors/elements
            assert.equal(textAreaElement.value, '');
            assert.equal(aceEditor.getValue(), '');
            done();
          }, 300);
        }, 500);
      }).catch(done);
    });

    it('Should set empty value properly when save as JSON', (done) => {
      const element = document.createElement('div');

      Formio.createForm(element, comp4).then(form => {
        const aceTextArea = form.getComponent(['jsonTextarea']);
        assert.equal(aceTextArea.data.jsonTextarea, '', 'The value should be empty');
        done();
      }).catch(done);
    });

    it('Should not autofocus until the editor is ready', (done) => {
      const element = document.createElement('div');
      const testComponents = [
        {
          type: 'textarea',
          autofocus: true,
          editor: 'ckeditor',
          key: 'textArea',
          label: 'Text Area',
          input: true,
        }
      ];
      const testForm = { ...formWithCKEditor, components: testComponents };

      Formio.createForm(element, testForm).then(form => {
          const textArea = form.getComponent('textArea');
          // since prior to this fix the focus function will throw, we'll make sure it doesn't
          expect(textArea.focus.bind(textArea)).to.not.throw();

          done();
      }).catch(done);
    });

    it('Should not autofocus if the form is readOnly', (done) => {
      const element = document.createElement('div');
      const testComponents = [
        {
          type: 'textarea',
          autofocus: true,
          editor: 'ckeditor',
          key: 'textArea',
          label: 'Text Area',
          input: true,
        }
      ];
      const testForm = { ...formWithCKEditor, components: testComponents };

      Formio.createForm(element, testForm, { readOnly: true }).then(form => {
          const textArea = form.getComponent('textArea');
          // since prior to this fix the focus function will throw if readOnly, we'll make sure it doesn't
          expect(textArea.focus.bind(textArea)).to.not.throw();

          done();
      }).catch(done);
    });
  });
});
