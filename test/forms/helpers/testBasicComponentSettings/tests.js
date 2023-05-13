import assert from 'power-assert';
import _ from 'lodash';
import settings from './settings';
import values from './values';

const layoutComponents = ['columns', 'fieldset', 'panel', 'table', 'tabs', 'well'];

export default {
  placeholder: {
    'Should show placeholder'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        const compInput = comp.element.querySelector(`[name="data[${compKey}]"]`);

        let renderedPlaceholder;
        let expectedPlaceholder;

        if (compType === 'day') {
          _.each(comp.component.fields, (fieldSettings, fieldName) => {
            if (fieldSettings.type === 'number') {
              renderedPlaceholder = comp.refs[fieldName].placeholder;
            }
            if (fieldSettings.type === 'select') {
              renderedPlaceholder = comp.refs[fieldName][0].textContent;
            }

            expectedPlaceholder = fieldSettings.placeholder;

            assert.equal(renderedPlaceholder.trim(), expectedPlaceholder.trim(), `Should show placeholder for ${fieldName} in ${compKey} (component ${compType})`);
          });
        }
        else {
          renderedPlaceholder = compType === 'select' ? compInput.attributes.placeholder.value : compInput.placeholder;
          expectedPlaceholder = comp.component.placeholder;
          assert.equal(renderedPlaceholder, expectedPlaceholder, `Should show placeholder for ${compKey} (component ${compType})`);
        }
      });
      done();
    },
  },
  description: {
    'Should show description'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        const compDescription = comp.element.querySelector('.text-muted').textContent;

        assert.equal(compDescription, comp.component.description, `Should show description for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  tooltip: {
    'Should render tooltip icon and show tooltip description on click'(form, done) {
      form.components.forEach((comp, index) => {
        const isLastComp = index === (form.components.length - 1);
        const compKey = comp.component.key;
        const compType = comp.component.type;
        const clickEvent = new Event('click');

        assert.equal(comp.tooltips.length, 1, `${compKey} (component ${compType}): should contain tooltip objects`);

        const tooltipIcon = comp.refs.tooltip[0];

        assert.equal(!!tooltipIcon, true, `${compKey} (component ${compType}): should contain ref to tooltip icon`);

        tooltipIcon.dispatchEvent(clickEvent);

        setTimeout(() => {
          const tooltipText = comp.element.querySelector('.tippy-content').textContent.trim();

          assert.equal(tooltipText, comp.component.tooltip.trim(), `Should show tooltip for ${compKey} (component ${compType})`);

          if (isLastComp) {
            done();
          }
        });
      });
    }
  },
  prefix: {
    'Should show prefix'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.equal(comp.refs.prefix[0].textContent.trim(), comp.component.prefix, `Should show prefix for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  suffix: {
    'Should show suffix'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.equal(comp.refs.suffix[0].textContent.trim(), comp.component.suffix, `Should show suffix for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  customClass: {
    'Should set custom css class'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.equal(comp.element.classList.contains(comp.component.customClass), true, `Should set custom class for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  tabindex: {
    'Should set tabindex'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        let tabInput;

        switch (comp.component.type) {
          case 'address':
            tabInput = comp.refs.searchInput[0].tabIndex;
            break;
          case 'button':
            tabInput = comp.refs.button.tabIndex;
            break;
          case 'select':
            tabInput = comp.element.querySelector('.selection').tabIndex;
            break;
          default:
            tabInput = comp.refs.input[0].tabIndex;
        }

        assert.equal(tabInput, comp.component.tabindex, `Should set tab index for ${compKey} (component ${compType})`);
      });

      done();
    },
  },
  hidden: {
    'Should not render hidden component'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.equal(comp.visible, false, `Should set visible:false for ${compKey} (component ${compType})`);
        if (compType !== 'well') {
          assert.equal(comp.element.classList.contains('formio-hidden'), true, `Should set formio-hidden class for ${compKey} (component ${compType})`);
        }
      });
      done();
    },
  },
  hideLabel: {
    'Should hide component label'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        let label;

        switch (comp.component.type) {
          case 'checkbox':
            label = comp.element.querySelector('.form-check-label').children[1];
            break;
          case 'panel':
            label = comp.element.querySelector('.card-title');
            break;
          default:
            label = comp.element.querySelector(`label[for="${comp.id}-${compKey}"]`);
        }

        assert.equal(!!label, false, `Should hide label for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  disabled: {
    'Should disable components'(form, done) {
      form.components.forEach(comp => {
        const compType = comp.component.type;

        const checkDisabled = (component, child) => {
          const componentType = component.component.type;
          const componentKey = component.component.key;

          if (child && componentType === 'datagrid') return; //BUG: remove the check once it is fixed;

          const disabled = _.isBoolean(component.disabled) ? component.disabled : component._disabled;

          assert.equal(
            disabled,
            true,
            !child ?
            `Should set disabled:true for ${componentKey} (component ${componentType})` :
            `Should set disabled:true for ${componentType} inside ${compType} component`
          );

          const compInput = component.element.querySelector(`[name="data[${componentKey}]"]`);
          let compInputs = [];

          if (componentType === 'day') {
            compInputs = Object.keys(component.component.fields).map(fieldName => {
              return component.element.querySelector(`[ref="${fieldName}"]`);
            });
          }

          if (compInput || compInputs.length) {
            const inputs = compInput ? [compInput] : compInputs;
            _.each(inputs, (input) => {
              assert.equal(
                input.disabled,
                true,
                !child ?
                `Should disable component input for ${componentKey} (component ${componentType})` :
                `Should disable component input for ${componentType} inside ${compType} component`
              );
            });
          }
        };

        checkDisabled(comp, false);
        const nestedComponents = comp.subForm ? comp.subForm.components : comp.components;

        if (_.isArray(nestedComponents)) {
          _.each(nestedComponents, (childComp) => {
            checkDisabled(childComp, true);
          });
        }
      });

      done();
    },
  },
  defaultValue: {
    'Should set default value'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        const defaultValue = comp.component.defaultValue;

        assert.deepEqual(comp.defaultValue, defaultValue, `Should correctly define default value for ${compKey} (component ${compType})`);
        assert.deepEqual(comp.dataValue, comp.defaultValue, `Should set default value for ${compKey} (component ${compType})`);

        const inputValue = comp.getValue();

        assert.deepEqual(
          compType === 'datetime' ? inputValue.startsWith(comp.defaultValue) : inputValue,
          compType === 'datetime' ? true : comp.defaultValue,
          `Got value must be equal to default value for ${compKey} (component ${compType})`);
      });
      done();
    },
  },
  customDefaultValue: {
    'Should correctly set custom default value'(form, done) {
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;
        if (compKey === 'basis') return;

        const defaultValue = settings.customDefaultValue[`${compKey}`].expectedValue;

        _.unset(comp.dataValue, 'metadata');

        assert.deepEqual(comp.defaultValue, defaultValue, `Should correctly define default value for ${compKey} (component ${compType})`);
        assert.deepEqual(comp.dataValue, comp.defaultValue, `Should set default value for ${compKey} (component ${compType})`);

        const inputValue = comp.getValue();

        assert.deepEqual(
          compType === 'datetime' ? inputValue.startsWith(comp.defaultValue) : inputValue,
          compType === 'datetime' ? true : comp.defaultValue,
          `Got value must be equal to default value for ${compKey} (component ${compType})`
        );
      });
      done();
    },
  },
  /*
  TODO: figure out why this test fails in CircleCI but not locally
  redrawOn: {
    'Should redraw on checkbox value change'(form, done) {
      const checkboxValue = form.data.checkbox;

      assert.deepEqual(checkboxValue, false, 'Should set checkbox value to false');
      form.components.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.deepEqual(comp.name.trim().endsWith(checkboxValue.toString()), true, `Should interpolate label using checkbox data for ${compKey} (component ${compType})`);
      });

      form.getComponent('checkbox').setValue(true);

      setTimeout(() => {
        const changedCheckboxValue = form.data.checkbox;

        assert.deepEqual(changedCheckboxValue, true, 'Should change checkbox value to true');
        form.components.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          assert.deepEqual(comp.name.trim().endsWith(changedCheckboxValue.toString()), true, `${compKey} (component ${compType}): should change interpolated label text based on new checkbox value`);
        });

        done();
      });
    },
  },
  */
  multiple: {
    'Should render component in multiple mode and able to add/remove value'(form, done) {
      const testComponents = form.components.filter(comp => !['select', 'file'].includes(comp.component.type));

      testComponents.forEach((comp, index) => {
        const isLastComp = index === (testComponents.length - 1);
        const compKey = comp.component.key;
        const compType = comp.component.type;

        const clickEvent = new Event('click');

        const addAnotherBtn = comp.refs.addButton[0] || comp.refs.addButton;
        const removeRowBtns = comp.refs.removeRow;
        const componentInputs = comp.refs.input || comp.refs.searchInput;

        assert.deepEqual(!!addAnotherBtn, true, `${compKey} (component ${compType}): should show addAnother button in multiple mode `);
        assert.deepEqual(removeRowBtns.length, 1, `${compKey} (component ${compType}): should have remove row button in multiple mode `);
        assert.deepEqual(componentInputs.length, 1, `${compKey} (component ${compType}): should render component input in multiple mode `);

        addAnotherBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const removeRowBtnsAfterAddingValue = comp.refs.removeRow;
          const componentInputsAfterAddingValue = comp.refs.input || comp.refs.searchInput;

          assert.deepEqual(removeRowBtnsAfterAddingValue.length, 2, `${compKey} (component ${compType}): should add remove value row btn for new row in multiple mode `);
          assert.deepEqual(componentInputsAfterAddingValue.length, 2, `${compKey} (component ${compType}): should add new row in multiple mode `);
          removeRowBtnsAfterAddingValue[0].dispatchEvent(clickEvent);

          setTimeout(() => {
            const removeRowBtnsAfterRemovingValue = comp.refs.removeRow;
            const componentInputsAfterRemovingValue = comp.refs.input || comp.refs.searchInput;

            assert.deepEqual(removeRowBtnsAfterRemovingValue.length, 1, `${compKey} (component ${compType}): should remove 'remove value row btn' if row is removed in multiple mode `);
            assert.deepEqual(componentInputsAfterRemovingValue.length, 1, `${compKey} (component ${compType}): should add remove row in multiple mode`);

            if (isLastComp) {
              done();
            }
          }, 100);
        }, 100);
      });
    },
    'Should set multiple values'(form, done) {
      form.components.forEach((comp) => {
        const compKey = comp.component.key;
        const value = _.cloneDeep(values.multipleValues[compKey]);

        comp.setValue(value);
      });

      setTimeout(() => {
        form.components.forEach((comp) => {
          const compKey = comp.component.key;
          const compType = comp.component.type;
          const value = _.cloneDeep(values.multipleValues[compKey]);
          const removeRowBtns = comp.refs.removeRow;

          assert.deepEqual(comp.getValue().length, value.length, `${compKey} (component ${compType}): should set multiple values`);

          assert.deepEqual(
            comp.type === 'datetime' ? comp.getValue().every((val, ind) => val.startsWith(value[ind])) : comp.getValue(),
            comp.type === 'datetime' ? true : value,
            `${compKey} (component ${compType}): set and get values must be equal in multiple mode`
          );

          if (!['select', 'file'].includes(compType)) {
            const componentInputs = comp.refs.input || comp.refs.searchInput;
            assert.deepEqual(componentInputs.length, value.length, `${compKey} (component ${compType}): should render multiple inputs`);
            assert.deepEqual(removeRowBtns.length, value.length, `${compKey} (component ${compType}): should add remove btn for each row in multiple mode`);
          }

          if (compType === 'file') {
            assert.deepEqual(comp.refs.fileLink.length, value.length, `${compKey} (component ${compType}): should render multiple file links`);
            assert.deepEqual(comp.refs.removeLink.length, value.length, `${compKey} (component ${compType}): should add remove link btn for each link in multiple mode`);
          }
        });

        done();
      }, 500);
    },
  },
  modalEdit: {
    'Should open and close modal window'(form, done) {
      const componentsWithBug = ['columns', 'fieldset', 'panel', 'table', 'tabs', 'well']; //BUG: include them in test when it is fixed
      const testComponents = form.components.filter(comp => ![...componentsWithBug, 'button'].includes(comp.component.type));
      testComponents.forEach((comp, index) => {
        const isLastComp = index === (testComponents.length - 1);
        const compKey = comp.component.key;
        const compType = comp.component.type;
        const clickEvent = new Event('click');

        const isModalWindowOpened = () => {
          return !comp.refs.modalWrapper.classList.contains('component-rendering-hidden');
        };

        assert.deepEqual(isModalWindowOpened(comp), false, `${compKey} (component ${compType}): should keep modal window closed after setting form`);

        const openModalBtn = comp.refs.openModal;
        openModalBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.deepEqual(isModalWindowOpened(comp), true, `${compKey} (component ${compType}): should open modal window`);

          const closeModalBtn = comp.componentModal.refs.modalClose;
          closeModalBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.deepEqual(isModalWindowOpened(comp), false, `${compKey} (component ${compType}): should close modal window`);

            if (isLastComp) {
              done();
            }
          });
        });
      });
    },
    'Should delete component changes when closing modal window and clicking "delete it" in confirmation dialog'(form, done) {
      const layoutComponents = ['columns', 'fieldset', 'panel', 'table', 'tabs', 'well'];
      const testComponents = form.components.filter(comp => !['htmlelement', 'content', 'button'].includes(comp.component.type));

      testComponents.forEach((comp, index) => {
        const componentsWithBug = layoutComponents; //BUG: include them in test when it is fixed
        const isLastComp = index === (testComponents.length - 1);
        const compKey = comp.component.key;
        const compType = comp.component.type;

        const clickEvent = new Event('click');
        const isModalWindowOpened = () => {
          return !comp.refs.modalWrapper.classList.contains('component-rendering-hidden');
        };

        const openModalBtn = comp.refs.openModal;
        openModalBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.deepEqual(isModalWindowOpened(), true, `${compKey} (component ${compType}): should open modal window`);

          const initialValue = _.cloneDeep(comp.getValue());
          const value = _.cloneDeep(values.values[compKey]);

          comp.setValue(value);

          setTimeout(() => {
            if (layoutComponents.includes(compType)) {
              _.each(comp.components, (child) => {
                const childType = child.component.type;
                const childKey = child.component.key;
                const childDataValue = child.getValue();
                const childExpectedValue = comp.getValue()[childKey];

                assert.deepEqual(
                  childType === 'datetime' ? childDataValue.startsWith(childExpectedValue) : childDataValue,
                  childType === 'datetime' ? true : childExpectedValue,
                  `${compKey} (component ${compType}): should set value in modalEdit mode`
                );
              });
            }
            else {
              assert.deepEqual(
                compType === 'datetime' ? comp.getValue().startsWith(value) : comp.getValue(),
                compType === 'datetime' ? true : value,
                `${compKey} (component ${compType}): should set value in modalEdit mode`
              );
            }

            const closeModalBtn = comp.refs.modalClose;

            closeModalBtn.dispatchEvent(clickEvent);

            setTimeout(() => {
              const confirmationDialog = document.querySelector('.formio-dialog-content[ref="dialogContents"]');
              assert.deepEqual(!!confirmationDialog, true, `${compKey} (component ${compType}): should open confirmation dialog`);

              const clearChangesBtn = confirmationDialog.querySelector('[ref="dialogYesButton"]');
              clearChangesBtn.dispatchEvent(clickEvent);

              setTimeout(() => {
                const confirmationDialogAfter = document.querySelector('.formio-dialog-content[ref="dialogContents"]');
                assert.deepEqual(!!confirmationDialogAfter, false, `${compKey} (component ${compType}): should close confirmation dialog`);

                if (!componentsWithBug.includes(compType)) {
                  if (compType === 'form') {
                    assert.deepEqual(comp.getValue().data, initialValue.data, `${compKey} (component ${compType}): should clear value in modalEdit mode`);
                  }
                  else {
                    assert.deepEqual(comp.getValue(), initialValue, `${compKey} (component ${compType}): should clear value in modalEdit mode`);
                  }
                }

                assert.deepEqual(isModalWindowOpened(), false, `${compKey} (component ${compType}): should close modal window`);

                if (isLastComp) {
                  done();
                }
              }, 50);
            }, 50);
          }, 50);
        });
      });
    },
    'Should save component values and close the modal after clicking "save"'(form, done) {
      const testComponents = form.components.filter(comp => !['htmlelement', 'content', 'button'].includes(comp.component.type));

      testComponents.forEach((comp, index) => {
        const isLastComp = index === (testComponents.length - 1);
        const compKey = comp.component.key;
        const compType = comp.component.type;

        const clickEvent = new Event('click');
        const isModalWindowOpened = () => {
          return !comp.refs.modalWrapper.classList.contains('component-rendering-hidden');
        };

        const openModalBtn = comp.refs.openModal;
        openModalBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.deepEqual(isModalWindowOpened(), true, `${compKey} (component ${compType}): should open modal window`);

          const value = _.cloneDeep(values.values[compKey]);
          comp.setValue(value);

          setTimeout(() => {
            const saveModalBtn = comp.refs.modalSave;
            saveModalBtn.dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.deepEqual(isModalWindowOpened(), false, `${compKey} (component ${compType}): should close modal window`);

              if (layoutComponents.includes(compType)) {
                _.each(comp.components, (child) => {
                  const childType = child.component.type;
                  const childKey = child.component.key;
                  const childDataValue = child.getValue();
                  const childExpectedValue = value[childKey];

                  assert.deepEqual(
                    childType === 'datetime' ? childDataValue.startsWith(childExpectedValue) : childDataValue,
                    childType === 'datetime' ? true : childExpectedValue,
                    `${compKey} (component ${compType}): should save value in modalEdit mode`
                  );
                });
              }
              else {
                assert.deepEqual(
                  compType === 'datetime' ? comp.getValue().startsWith(value) : comp.getValue(),
                  compType === 'datetime' ? true : value,
                  `${compKey} (component ${compType}): should save value in modalEdit mode`
                );
              }

              if (isLastComp) {
                done();
              }
            }, 50);
          }, 50);
        });
      });
    },
    'Should highlight modal button if component is invalid'(form, done, test) {
      test.timeout(10000);
      const testComponents = form.components.filter(comp => !['htmlelement', 'content', 'button'].includes(comp.component.type));

      form.everyComponent((comp) => {
        comp.component.validate = comp.component.validate || {};
        comp.component.validate.required = true;
      });
      setTimeout(() => {
        const clickEvent = new Event('click');
        form.getComponent('submit').refs.button.dispatchEvent(clickEvent);
        setTimeout(() => {
          testComponents
            .filter(comp => !comp.component.tree && comp.hasInput)
            .forEach((comp) => {
              const compKey = comp.component.key;
              const compType = comp.component.type;

              const isErrorHighlightClass = !!(comp.refs.openModalWrapper.classList.contains('formio-error-wrapper') || comp.componentModal.element.classList.contains('formio-error-wrapper'));
              assert.deepEqual(comp.subForm ? !!comp.subForm.errors.length : !!comp.error, true, `${compKey} (component ${compType}): should contain validation error`);
              //BUG in nested forms, remove the check once it is fixed
              if (compType !== 'form') {
                assert.deepEqual(isErrorHighlightClass, true, `${compKey} (component ${compType}): should highlight invalid modal button`);
              }
            });
          done();
        }, 200);
      }, 200);
    },
  },
  calculateValue: {
    'Should caclulate component value'(form, done, test) {
      test.timeout(2500);

      const basisComponent = form.getComponent('basis');
      let basis = basisComponent.getValue();

      const checkCalculatedValue = () => {
        form.components.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;
          if (compKey === 'basis') return;

          const getExpectedCalculatedValue = (basis) => settings.calculateValue[`${compKey}`].expectedValue(basis);

          const inputValue = comp.dataValue;

          _.unset(inputValue, 'metadata');

          assert.deepEqual(
            compType === 'datetime' ? inputValue.startsWith(getExpectedCalculatedValue(basis)) : inputValue,
            compType === 'datetime' ? true : getExpectedCalculatedValue(basis),
            `Should calculate component value for ${compKey} (component ${compType})`
          );
        });
      };

      checkCalculatedValue();

      let basisComponentNewValue = '';
      basisComponent.setValue(basisComponentNewValue);

      setTimeout(() => {
        basis = basisComponent.getValue();
        assert.deepEqual(basis, basisComponentNewValue, 'Should set basis component value');
        checkCalculatedValue();

        basisComponentNewValue = 'value for calculation of other components value';
        basisComponent.setValue(basisComponentNewValue);

        setTimeout(() => {
          basis = basisComponent.getValue();
          assert.deepEqual(basis, basisComponentNewValue, 'Should set basis component value');
          checkCalculatedValue();
          done();
        }, 250);
      }, 250);
    },
    'Should not allow overriding component colculated value'(form, done) {
      const basisComponent = form.getComponent('basis');
      const basis = basisComponent.getValue();

      const checkCalculatedValue = () => {
        form.components.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;
          if (compKey === 'basis') return;

          const getExpectedCalculatedValue = (basis) => settings.calculateValue[`${compKey}`].expectedValue(basis);

          const inputValue = comp.dataValue;
          _.unset(inputValue, 'metadata');

          assert.deepEqual(
            compType === 'datetime' ? inputValue.startsWith(getExpectedCalculatedValue(basis)) : inputValue,
            compType === 'datetime' ? true : getExpectedCalculatedValue(basis),
            `Should calculate component value for ${compKey} (component ${compType})`
          );
        });
      };

      checkCalculatedValue();

      form.setValue({
        data: _.cloneDeep(values.values)
      });

      setTimeout(() => {
        checkCalculatedValue();
        done();
      }, 300);
    },
    'Should allow overriding component calculated value'(form, done, test) {
      test.timeout(5000);

      const basisComponent = form.getComponent('basis');
      const basis = basisComponent.getValue();

      form.everyComponent((comp) => {
        if (comp.component.calculateValue) {
          comp.component.allowCalculateOverride = true;
        }
      });

      const checkCalculatedValue = (overriden) => {
        const testComponents = form.components.filter(comp => !['form'].includes(comp.component.type) && !['basis'].includes(comp.component.key));

        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          const getExpectedCalculatedValue = (basis) => {
            return overriden ? values.values[`${compKey}`] : settings.calculateValue[`${compKey}`].expectedValue(basis);
          };

          const inputValue = comp.dataValue;
          _.unset(inputValue, 'metadata');

          assert.deepEqual(
            compType === 'datetime' ? inputValue.startsWith(getExpectedCalculatedValue(basis)) : inputValue,
            compType === 'datetime' ? true : getExpectedCalculatedValue(basis),
            `Should calculate component value for ${compKey} (component ${compType})`
          );
        });
      };

      checkCalculatedValue(false);
      form.setValue({
        data: _.cloneDeep(values.values)
      });

      setTimeout(() => {
        checkCalculatedValue(true);
        done();
      }, 300);
    },
  },
  'validate.required': {
    'Should show required validation error on submit and remove error if component has value'(form, done, test) {
      test.timeout(5000);
      const testComponents = form.components.filter(comp => !['button'].includes(comp.component.type));

      const clickEvent = new Event('click');
      form.getComponent('submit').refs.button.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.deepEqual(form.errors.length, testComponents.length, 'Form should contain references to all components errors');
        assert.deepEqual(form.refs.errorRef.length, form.errors.length, 'Should contain references to all components errors in form alert with errors');

        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          const getExpectedErrorMessage = () => `${comp.component.label} is required`;

          assert.deepEqual(!!comp.error, true, `${compKey} (component ${compType}): should have required validation error`);
          assert.deepEqual(comp.error.message, getExpectedErrorMessage(), `${compKey} (component ${compType}): should have correct rquired validation message`);
          assert.deepEqual(comp.pristine, false, `${compKey} (component ${compType}): should set pristine to false`);
          assert.deepEqual(comp.element.classList.contains('formio-error-wrapper'), true, `${compKey} (component ${compType}): should set error class`);
          //remove below line once tree validation error display is fixed
          if (_.includes(['tree'], comp.component.type)) return;
          assert.deepEqual(comp.refs.messageContainer.querySelector('.error')?.textContent.trim(), getExpectedErrorMessage(), `${compKey} (component ${compType}): should display error message`);
        });

        form.setValue({
          data: _.cloneDeep(values.values)
        });

        setTimeout(() => {
          assert.deepEqual(form.errors.length, 0, 'Should remove required validation errors after setting values');
          testComponents.forEach(comp => {
            const compKey = comp.component.key;
            const compType = comp.component.type;

            assert.deepEqual(comp.dataValue, _.get(values.values, compKey), `${compKey} (component ${compType}): should set value`);
            assert.deepEqual(!!comp.error, false, `${compKey} (component ${compType}): Should remove error`);
            assert.deepEqual(comp.element.classList.contains('formio-error-wrapper'), false, `${compKey} (component ${compType}): Should remove error class`);
            assert.deepEqual(!!comp.refs.messageContainer.querySelector('.error'), false, `${compKey} (component ${compType}): should clear errors`);
          });
          done();
        }, 300);
      }, 300);
    },
    'Should show custom validation error if component is invalid'(form, done, test) {
      test.timeout(5000);
      const testComponents = form.components.filter(comp => !['button'].includes(comp.component.type));
      _.each(testComponents, (comp) => {
        _.set(comp.component, 'validate.customMessage', '{{component.key}}: custom validation error');
      });

      const clickEvent = new Event('click');
      form.getComponent('submit').refs.button.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.deepEqual(form.errors.length, testComponents.length, 'Form should contain references to all components errors');
        assert.deepEqual(form.refs.errorRef.length, form.errors.length, 'Should contain references to all components errors in form alert with errors');

        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          const getExpectedErrorMessage = () => `${compKey}: custom validation error`;

          assert.deepEqual(!!comp.error, true, `${compKey} (component ${compType}): should have required validation error`);
          assert.deepEqual(comp.error.message, getExpectedErrorMessage(), `${compKey} (component ${compType}): should have correct custom validation message`);
          //remove below line once tree validation error display is fixed
          if (_.includes(['tree'], comp.component.type)) return;
          assert.deepEqual(comp.refs.messageContainer.querySelector('.error')?.textContent.trim(), getExpectedErrorMessage(), `${compKey} (component ${compType}): should display custom error message`);
        });
        done();
      }, 300);
    },
    'Should show custom validation label if component is invalid'(form, done, test) {
      test.timeout(5000);
      const testComponents = form.components.filter(comp => !['button'].includes(comp.component.type));
      _.each(testComponents, (comp) => {
        _.set(comp.component, 'errorLabel', 'Custom label for {{component.key}}');
      });

      const clickEvent = new Event('click');
      form.getComponent('submit').refs.button.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.deepEqual(form.errors.length, testComponents.length, 'Form should contain references to all components errors');
        assert.deepEqual(form.refs.errorRef.length, form.errors.length, 'Should contain references to all components errors in form alert with errors');

        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          const getExpectedErrorMessage = () => `Custom label for ${compKey} is required`;

          assert.deepEqual(!!comp.error, true, `${compKey} (component ${compType}): should have required validation error with custom label`);
          assert.deepEqual(comp.error.message, getExpectedErrorMessage(), `${compKey} (component ${compType}): should have correct required validation message with custom label`);
          //remove below line once tree validation error display is fixed
          if (_.includes(['tree'], comp.component.type)) return;
          assert.deepEqual(comp.refs.messageContainer.querySelector('.error')?.textContent.trim(), getExpectedErrorMessage(), `${compKey} (component ${compType}): should display error message with custom label`);
        });
        done();
      }, 300);
    },
  },
  'validate.custom': {
    'Should execute custom validation'(form, done, test) {
      test.timeout(3000);
      const testComponents = form.components.filter(comp => !['button'].includes(comp.component.type));

      assert.deepEqual(form.errors.length, 0, 'Should not show validation errors');
      form.setPristine(false);
      form.setValue({
        data: _.cloneDeep(values.values)
      });

      setTimeout(() => {
        assert.deepEqual(form.errors.length, testComponents.length, 'Form should contain references to all components errors');

        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;
          const getExpectedErrorMessage = () => 'Custom validation message: component is invalid.';

          assert.deepEqual(comp.dataValue, _.get(values.values, compKey), `${compKey} (component ${compType}): should set value`);
          assert.deepEqual(!!comp.error, true, `${compKey} (component ${compType}): should have validation error`);
          assert.deepEqual(comp.error.message, getExpectedErrorMessage(), `${compKey} (component ${compType}): should have correct rquired validation message`);
          assert.deepEqual(comp.pristine, false, `${compKey} (component ${compType}): should set pristine to false`);
          assert.deepEqual(comp.element.classList.contains('has-error'), true, `${compKey} (component ${compType}): should set error class`);

          //remove below line once tree validation error display is fixed
          //remove below line once container validation error display is fixed
          if (_.includes(['tree', 'container'], comp.component.type)) return;
          assert.deepEqual(comp.refs.messageContainer.querySelector('.error')?.textContent.trim(), getExpectedErrorMessage(), `${compKey} (component ${compType}): should display error message`);
        });

        const getSetValue = (comp) => {
          return _.isNumber(comp.dataValue) ? 33333333 : comp.defaultValue;
        };

        _.each(testComponents, (comp) => {
          comp.setValue(getSetValue(comp));
        });

        setTimeout(() => {
          assert.deepEqual(form.errors.length, 0, 'Should remove validation errors after setting valid values');
          testComponents.forEach(comp => {
            const compKey = comp.component.key;
            const compType = comp.component.type;

            assert.deepEqual(!!comp.error, false, `${compKey} (component ${compType}): Should remove validation error`);
            assert.deepEqual(comp.element.classList.contains('has-error'), false, `${compKey} (component ${compType}): Should remove error class`);
            assert.deepEqual(!!comp.refs.messageContainer.querySelector('.error'), false, `${compKey} (component ${compType}): should clear errors list`);
          });
          done();
        }, 500);
      }, 500);
    },
  },
  'validate_nested_components': {
    'Should show validation errors for nested components'(form, done, test) {
      test.timeout(6000);
      const testComponents = [];
      const treeComponent = form.getComponent('tree');
      form.everyComponent((comp) => {
        const component = comp.component;
        //BUG: exclude datagrid from the check once it required validation issue is fixed
        if (!component.validate_nested_components && ![...layoutComponents, 'datagrid'].includes(component.type) && (!treeComponent || !treeComponent.getComponents().includes(comp))) {
          _.set(component, 'validate.required', true);
          testComponents.push(comp);
        }
      });
      setTimeout(() => {
        const clickEvent = new Event('click');
        form.getComponent('submit').refs.button.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.deepEqual(form.errors.length, testComponents.length, 'Form should contain references to all components errors');
          assert.deepEqual(form.refs.errorRef.length, form.errors.length, 'Should contain references to all components errors in form alert with errors');

          testComponents.forEach(comp => {
            const compKey = comp.component.key;
            const compType = comp.component.type;

            const getExpectedErrorMessage = () => `${comp.component.label} is required`;

            assert.deepEqual(!!comp.error, true, `${compKey} (component ${compType}): should have required validation error`);
            assert.deepEqual(comp.error.message, getExpectedErrorMessage(), `${compKey} (component ${compType}): should have correct rquired validation message`);
            assert.deepEqual(comp.pristine, false, `${compKey} (component ${compType}): should set pristine to false`);
            assert.deepEqual(comp.element.classList.contains('formio-error-wrapper'), true, `${compKey} (component ${compType}): should set error class`);

            //remove below line once tree validation error display is fixed
            if (_.includes(['tree'], comp.component.type)) return;
            assert.deepEqual(comp.refs.messageContainer.querySelector('.error')?.textContent.trim(), getExpectedErrorMessage(), `${compKey} (component ${compType}): should display error message`);
          });

          _.each(form.components, (comp) => {
            const compKey = comp.component.key;
            const value = _.cloneDeep(values.values[compKey]);

            if (value) {
              comp.setValue(value);
            }
          });

          setTimeout(() => {
            assert.deepEqual(form.errors.length, 0, 'Should remove required validation errors after setting values');
            testComponents.forEach(comp => {
              const compKey = comp.component.key;
              const compType = comp.component.type;

              assert.deepEqual(!!comp.error, false, `${compKey} (component ${compType}): Should remove valudation error`);
              assert.deepEqual(comp.element.classList.contains('formio-error-wrapper'), false, `${compKey} (component ${compType}): Should remove error class`);
              assert.deepEqual(!!comp.refs.messageContainer.querySelector('.error'), false, `${compKey} (component ${compType}): should clear errors`);
            });

            done();
          }, 700);
        }, 300);
      }, 300);
    },
  },
  conditional: {
    'Should show component if simple condition is met and hide it if simple condition is not fulfilled'(form, done, test) {
      test.timeout(3000);
      const testComponents = form.components.filter(comp => !['basis'].includes(comp.component.key));

      const testVisibility = (shouldBeVisible) => {
        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          assert.equal(comp.visible, shouldBeVisible, `Should set visible:${shouldBeVisible} for ${compKey} (component ${compType})`);
          assert.equal(comp.hasCondition(), true, `${compKey} (component ${compType}): hasCondition should return true`);
          assert.equal(comp.conditionallyVisible(), shouldBeVisible, `${compKey} (component ${compType}): should ${shouldBeVisible ? 'not' : ''} be conditionally visible`);

          if (compType !== 'well') {
            assert.equal(comp.element.classList.contains('formio-hidden'), !shouldBeVisible, `Should ${shouldBeVisible ? 'not' : ''} set formio-hidden class for ${compKey} (component ${compType})`);
          }
        });
      };

      testVisibility(false);
      form.getComponent('basis').setValue('show');

      setTimeout(() => {
        testVisibility(true);
        form.getComponent('basis').setValue('hide');

        setTimeout(() => {
          testVisibility(false);

          done();
        }, 300);
      }, 300);
    },
  },
  customConditional: {
    'Should show component if custom condition is met and hide it if custom condition is not fulfilled'(form, done, test) {
      test.timeout(3000);
      const testComponents = form.components.filter(comp => !['basis'].includes(comp.component.key));

      const testVisibility = (shouldBeVisible) => {
        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          assert.equal(comp.visible, shouldBeVisible, `Should set visible:${shouldBeVisible} for ${compKey} (component ${compType})`);
          assert.equal(comp.hasCondition(), true, `${compKey} (component ${compType}): hasCondition should return true`);
          assert.equal(comp.conditionallyVisible(), shouldBeVisible, `${compKey} (component ${compType}): should ${shouldBeVisible ? 'not' : ''} be conditionally visible`);

          if (compType !== 'well') {
            assert.equal(comp.element.classList.contains('formio-hidden'), !shouldBeVisible, `Should ${shouldBeVisible ? 'not' : ''} set formio-hidden class for ${compKey} (component ${compType})`);
          }
        });
      };

      testVisibility(false);
      form.getComponent('basis').setValue('show');

      setTimeout(() => {
        testVisibility(true);
        form.getComponent('basis').setValue('hide');

        setTimeout(() => {
          testVisibility(false);

          done();
        }, 300);
      }, 300);
    },
  },
  logic: {
    'Should execute value/property/merge schema/custom actions if simple logic condition is met'(form, done, test) {
      test.timeout(8000);
      const testComponents = form.components.filter(comp => !['basis', 'hideBtn'].includes(comp.component.key));

      form.getComponent('basis').setValue('value action');
      setTimeout(() => {
        checkSetValue(testComponents, 'should set value once simple logic value action is executed');
        form.getComponent('basis').setValue('property action');

        setTimeout(() => {
          testComponents.forEach(comp => {
            const compKey = comp.component.key;
            const compType = comp.component.type;

            assert.deepEqual(comp.component.label, 'changed label on property action', `${compKey} (component ${compType}): should change label once simple logic property action is executed`);
            assert.deepEqual(comp.name, 'changed label on property action', `${compKey} (component ${compType}): should change name once simple logic property action is executed`);
          });

          _.each(testComponents, (comp) => {
            comp.setValue(_.isNumber(comp.dataValue) ? 0 : comp.defaultValue);
          });

          form.getComponent('basis').setValue('merge schema action');

          setTimeout(() => {
            testComponents.forEach(comp => {
              const compKey = comp.component.key;
              const compType = comp.component.type;

              assert.deepEqual(comp.component.label, 'changed label on merge schema', `${compKey} (component ${compType}): should change label once simple logic merge schema action is executed`);
              assert.deepEqual(comp.name, 'changed label on merge schema', `${compKey} (component ${compType}): should change name once simple logic property merge schema action is executed`);
            });

            form.getComponent('basis').setValue('custom action');

            setTimeout(() => {
              checkSetValue(testComponents, 'should set value once simple logic custom action is executed');

              done();
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    },
    'Should execute value action if js logic condition is met'(form, done, test) {
      test.timeout(5000);
      const testComponents = form.components.filter(comp => !['basis', 'hideBtn'].includes(comp.component.key));

      form.getComponent('basis').setValue('some text value with length over twenty');
      setTimeout(() => {
        checkSetValue(testComponents, 'should set value once js logic value action is executed');
        done();
      }, 500);
    },
    'Should execute property action if json logic condition is met'(form, done, test) {
      test.timeout(3500);
      const testComponents = form.components.filter(comp => !['basis', 'hideBtn'].includes(comp.component.key));

      form.getComponent('basis').setValue('add class');
      setTimeout(() => {
        testComponents.forEach(comp => {
          const compKey = comp.component.key;
          const compType = comp.component.type;

          assert.deepEqual(comp.element.classList.contains('json-logic-class'), true, `${compKey} (component ${compType}): should set custom class once json logic property action is executed`);
        });
        done();
      }, 500);
    },
    'Should execute property action if logic event is emitted'(form, done) {
      const testComponents = form.components.filter(comp => !['basis', 'hideBtn'].includes(comp.component.key));
      const clickEvent = new Event('click');
      form.getComponent('hideBtn').refs.button.dispatchEvent(clickEvent);

      testComponents.forEach(comp => {
        const compKey = comp.component.key;
        const compType = comp.component.type;

        assert.equal(comp.visible, false, `Should set visible:false for ${compKey} (component ${compType})`);

        if (compType !== 'well') {
          assert.equal(comp.element.classList.contains('formio-hidden'), true, `Should set formio-hidden class for ${compKey} (component ${compType})`);
        }
      });

      done();
    },
  },
  'set_get_value': {
    'Should set and get components` value (including string value)'(form, done, test) {
      form.components.forEach(comp => {
        comp.setValue(_.cloneDeep(values.values[comp.component.key]));
      });

      setTimeout(() => {
        checkSetValue(form.components, 'should set value', true);
        done();
      }, 300);
    },
    'Should set and get submission'(form, done, test) {
      form.setSubmission({
        data: values.submission
      }).then(() => {
        setTimeout(() => {
          checkSetValue(form.components, 'should set submisson', true);
          assert.deepEqual(form.submission.data, values.submission, 'Should contain correct submission data');
          done();
        }, 100);
      });
    },
  },
};

function checkSetValue(testComponents, message, checkStringValue) {
  testComponents.forEach(comp => {
    const compKey = comp.component.key;
    const compType = comp.component.type;
    const value = _.get(values.values, compKey);

    const checkValues = (comp, expectedValue, expectedStringValue) => {
      const key = comp.component.key;
      const type = comp.component.type;
      const gotValue = comp.getValue();
      const dataValue = comp.dataValue;

      _.unset(dataValue, 'metadata');
      _.unset(gotValue, 'metadata');
      //not to compare datetime as it depends on timezone
      if (type !== 'datetime') {
        assert.deepEqual(gotValue, expectedValue, `${key}111111 (component ${type}): ${message}`);
      }

      assert.deepEqual(dataValue, expectedValue, `${key}22222 (component ${type}): ${message}`);

      if (checkStringValue) {
        assert.deepEqual(comp.getValueAsString(dataValue), expectedStringValue, `${key} (component ${type}): should get value as string`);
      }
    };

    if (layoutComponents.includes(compType)) {
      _.each(comp.components, (child) => {
        const childKey = child.component.key;
        checkValues(child, value[childKey], values.stringValues[childKey]);
      });
    }
    else {
      checkValues(comp, value, values.stringValues[compKey]);
    }
  });
}
