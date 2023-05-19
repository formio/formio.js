import assert from 'power-assert';
import Harness from '../../../test/harness';
import DateTimeComponent from './DateTime';
import Formio from './../../Formio';
import _ from 'lodash';
import 'flatpickr';
import {
  comp1,
  comp2,
  comp3,
  comp5,
  comp6,
  comp7,
  comp8,
 // comp9,
  comp10,
  comp11,
  comp12
} from './fixtures';

describe('DateTime Component', () => {
  it('Should build a date time component', () => {
    return Harness.testCreate(DateTimeComponent, comp1).then((dateTime) => dateTime.destroy());
  });

  it('Test formatting', (done) => {
    Harness.testCreate(DateTimeComponent, comp2).then((dateTime) => {
      const value = '2020-09-22T00:00:00';
      const formattedValue = '2020-09-22';
      dateTime.setValue(value);
      setTimeout(() => {
        assert.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');
        dateTime.destroy();
        done();
      }, 250);
    }).catch(done);
  });

  it('Should format value', () => {
    comp2.format = 'yyyy-MM-dd hh:mm a';
    return Harness.testCreate(DateTimeComponent, comp2)
      .then((dateTime) => {
        assert.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');
        dateTime.destroy();
      });
  });

  it('Should not change manually entered value on blur when time is disabled', (done) => {
    const form = _.cloneDeep(comp11);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const blurEvent = new Event('blur');

      const value = '01-02-2021';
      const input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        assert.equal(input.value, value);
        document.innerHTML = '';
        done();
      }, 600);
    }).catch(done);
  });

  it('Should allow manual input', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const blurEvent = new Event('blur');

      const value = '2021-04-13 7:00 PM';
      const expectedValueStart = '2021-04-13T19:00:00';
      const input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        assert.equal(dateTime.getValue().startsWith(expectedValueStart), true);
        assert.equal(dateTime.dataValue.startsWith(expectedValueStart), true);

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should allow manual input for date with full month format (like MMMM)', (done) => {
    const form = _.cloneDeep(comp12);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const blurEvent = new Event('blur');

      const value = 'April 22';
      const expectedValue = 'April/22';
      const input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        assert.equal(input.value, expectedValue);
        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not allow manual input', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].allowInput = false;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const blurEvent = new Event('blur');

      const value = '2021-04-13 7:00 PM';
      const input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        assert.equal(dateTime.getValue(), '');
        assert.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should format date correctly', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    const formatsInitial = [
      {
        format: 'yyyy-dd-MM',
        inputValue:'2021-15-03 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'2021-15-03'
      },
      {
        format: 'yyyy-dd',
        inputValue:'2021-15-03 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'2021-15'
      },
      {
        format: 'yyyy',
        inputValue:'2021-15-03 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'2021'
      },
      {
        format: 'dd-MM-yyyy',
        inputValue:'15-03-2021 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'15-03-2021'
      },
      {
        format: 'MM-dd',
        inputValue:'03-15-2021 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'03-15'
      },
      {
        format: 'dd-MM',
        inputValue:'15-03-2021 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'15-03'
      },
      {
        format: 'MM-dd-yyyy',
        inputValue:'03-15-2021 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'03-15-2021'
      },
      {
        format: 'yyyy-MM-dd',
        inputValue:'2021-03-15 11:10 AM',
        setValue:'2021-03-15T00:00:00',
        expectedFormattedValue:'2021-03-15'
      },
      {
        format: 'dd-MM-yyyy hh:mm',
        inputValue:'15-03-2021 11:10 AM',
        setValue:'2021-03-15T11:10:00',
        expectedFormattedValue:'15-03-2021 11:10'
      },
      {
        format: 'yyyy-MM-dd a',
        inputValue:'2021-03-15 PM',
        setValue:'2021-03-15T12:00:00',
        expectedFormattedValue:'2021-03-15 PM'
      },
      {
        format: 'hh',
        inputValue:'11:10 AM',
        setValue:'2021-01-01T11:00:00',
        expectedFormattedValue:'11'
      },
      {
        format: 'hh:mm a',
        inputValue:'11:10 AM 34',
        setValue:'2021-01-01T11:10:00',
        expectedFormattedValue:'11:10 AM'
      },
      {
        format: 'mm',
        inputValue:'11:10 AM',
        setValue:'2021-01-01T00:11:00',
        expectedFormattedValue:'11'
      },
    ];

    const getAllFormats = function(formats) {
      const separators = ['.', '/'];

      const formatsWithDiffSeparators = separators.reduce((result, separator) => {
        const formatWithNewSeparator = formats
          .filter(format => {
            return format.format.split('-').length > 1;
          })
          .map(format => {
            return {
              ...format,
              format: format.format.split('-').join(separator),
              inputValue: format.inputValue.split('-').join(separator),
              expectedFormattedValue: format.expectedFormattedValue.split('-').join(separator),
            };
          });

        return [...result, ...formatWithNewSeparator];
      }, []);

      return [...formats, ...formatsWithDiffSeparators];
    };

    const formats = getAllFormats(formatsInitial);
    const formComponents = [];

    formats.forEach((format, index) => {
      const comp = _.cloneDeep(form.components[0]);
      comp.format = format.format;
      comp.widget.format = format.format;
      comp.key = comp.key + index;
      formComponents.push(comp);
    });

    form.components = formComponents;

    Formio.createForm(element, form).then(form => {
      form.components.forEach((comp, index) => {
        comp.setValue(formats[index].setValue);
      });

      setTimeout(() => {
        form.components.forEach((comp, index) => {
          const input = comp.element.querySelector('.input');
          assert.equal(input.value, formats[index].expectedFormattedValue, 'Should format date/time value after setting value');

          const blurEvent = new Event('blur');
          input.value = formats[index].inputValue;
          input.dispatchEvent(blurEvent);
        });

        setTimeout(() => {
          form.components.forEach((comp, index) => {
            const input = comp.element.querySelector('.input');
            assert.equal(input.value, formats[index].expectedFormattedValue, 'Should format date/time value after inputting value');
          });

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  }).timeout(4000);

  it('Should disable weekends', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.disableWeekends = true;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.disableWeekends, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should disable weekdays', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.disableWeekdays = true;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.disableWeekdays, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should disable time', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].enableTime = false;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.enableTime, false);
      assert.equal(!!calendar.timeContainer, false);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should disable date', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].enableDate = false;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(!!calendar.daysContainer, false);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should enable time', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].enableTime = true;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.enableTime, true);
      assert.equal(!!calendar.timeContainer, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should enable date', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].enableDate = true;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.enableDate, true);
      assert.equal(!!calendar.daysContainer, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should not input the date that is disabled', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.disable = '2021-04-15';

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input = dateTime.element.querySelector('.input');

      const blurEvent = new Event('blur');
      input.value = '2021-04-15';
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '');
        assert.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not input the date that is in disabled range', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.disable = '2021-04-15-2021-04-20';

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input = dateTime.element.querySelector('.input');

      const blurEvent = new Event('blur');
      input.value = '2021-04-17';
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '');
        assert.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not allow inputting the date that meets condition of "custom disabled date"', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.disableFunction = 'date.getDay() === 2';

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input = dateTime.element.querySelector('.input');

      const blurEvent = new Event('blur');
      input.value = '2021-04-06';
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '');
        assert.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not allow inputting the date if it is out of min/max date range', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].datePicker.minDate = '2021-04-04T12:00:00';
    form.components[0].datePicker.maxDate = '2021-04-18T12:00:00';

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input = dateTime.element.querySelector('.input');

      const blurEvent = new Event('blur');
      input.value = '2020-04-03';
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '');
        assert.equal(dateTime.dataValue, '');

        const blurEvent = new Event('blur');
        input.value = '2022-04-13';
        input.dispatchEvent(blurEvent);

        setTimeout(() => {
          const input = dateTime.element.querySelector('.input');
          assert.equal(input.value, '');
          assert.equal(dateTime.dataValue, '');

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should set hour and minutes step', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].timePicker = { hourStep:3, minuteStep:10 };

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
      assert.equal(calendar.config.minuteIncrement, 10);
      assert.equal(calendar.config.hourIncrement, 3);

      document.innerHTML = '';
      done();
    }).catch(done);
  });

  it('Should allow inputting 24h time', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');
    form.components[0].timePicker = { showMeridian: false };
    form.components[0].widget['time_24hr'] = true;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input = dateTime.element.querySelector('.input');

      const blurEvent = new Event('blur');
      input.value = '2020-04-03 22:11';
      input.dispatchEvent(blurEvent);
      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '2020-04-03 22:11');
        assert.equal(dateTime.dataValue.startsWith('2020-04-03T22:11:00'), true);

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not set value if it does not meet minDate validation', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      dateTime.setValue('2021-05-01T09:00:00');

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should set value in readOnly mode even if it does not meet current minDate validation conditions', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');

    Formio.createForm(element, form, { readOnly: true }).then(form => {
      const dateTime = form.getComponent('dateTime');
      dateTime.setValue('2021-05-01T09:00:00');

      setTimeout(() => {
        const input = dateTime.element.querySelector('.input');
        assert.equal(input.value, '05/01/21');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should save hours and minutes values on first change', (done) => {
    const form = _.cloneDeep(comp6);
    const element = document.createElement('div');
    form.components[0].enableDate = false;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const blurEvent = new Event('blur');
      const input = dateTime.element.querySelector('.input');
      input.dispatchEvent(blurEvent);

      setTimeout(() => {
        const calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
        calendar._input.value = '7:00 PM';
        const expectedValue = 'T19:00:00';
        calendar._input.dispatchEvent(blurEvent);

        setTimeout(() => {
          assert.equal(dateTime.dataValue.includes(expectedValue), true);

          document.innerHTML = '';
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide correct value after submission', (done) => {
    const form = _.cloneDeep(comp7);
    const element = document.createElement('div');
    form.components[0].enableTime = false;

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      dateTime.setValue('2022-12-21');

      setTimeout(() => {
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(dateTime.dataValue, '2022-12-21');
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should not highlight the field when it is valid when multiple values and required validation are enabled', (done) => {
    const form = _.cloneDeep(comp8);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const input1 = dateTime.element.querySelectorAll('.input')[0];

      const blurEvent = new Event('blur');
      input1.value = '2020-04-03';
      input1.dispatchEvent(blurEvent);

      const addAnotherBtn = dateTime.refs.addButton[0];
      const clickEvent = new Event('click');
      addAnotherBtn.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(dateTime.refs.input.length, 2);

        const inputs = dateTime.element.querySelectorAll('.input');
        assert.equal(inputs[0].classList.contains('is-invalid'), false);
        assert.equal(inputs[1].classList.contains('is-invalid'), true);

        inputs[1].value = '2020-05-05';
        inputs[1].dispatchEvent(blurEvent);

        setTimeout(() => {
          const input2 = dateTime.element.querySelectorAll('.input')[1];
          assert.equal(input2.classList.contains('is-invalid'), false);

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should provide correct values with time after submission', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const dateTime = form.getComponent('dateTime');
      const textField = form.getComponent('textField');

      dateTime.setValue('2022-04-01T14:00:00.000');
      textField.setValue('2022-04-01T14:00:00.000');

      setTimeout(() => {
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const input1 = dateTime.element.querySelector('.input');
          const input2 = textField.element.querySelector('.input');

          assert.equal(input1.value, '2022-04-01 02:00 PM');
          assert.equal(input2.value, '2022-04-01 02:00 PM');
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should add date to format if enableDate is true', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].format = 'hh:mm a';
    form.components[0].enableDate = true;
    const element = document.createElement('div');

    Formio.createForm(element, form, { attachMode: 'builder' }).then(form => {
      const dateTime = form.getComponent('dateTime');
      assert.equal(dateTime.component.format, 'yyyy-MM-dd hh:mm a');
      done();
    }).catch(done);
  });

  it('Should add time to format if enableTime is true', (done) => {
    const form = _.cloneDeep(comp3);
    form.components[0].format = 'yyyy-MM-dd';
    form.components[0].enableTime = true;
    const element = document.createElement('div');

    Formio.createForm(element, form, { attachMode: 'builder' }).then(form => {
      const dateTime = form.getComponent('dateTime');
      assert.equal(dateTime.component.format, 'yyyy-MM-dd hh:mm a');
      done();
    }).catch(done);
  });

  // it('Should provide correct date in selected timezone after submission', (done) => {
  //   const form = _.cloneDeep(comp9);
  //   const element = document.createElement('div');

  //   Formio.createForm(element, form, { readOnly: true }).then(form => {
  //     const dateTime = form.getComponent('dateTime');
  //     const dateTime1 = form.getComponent('dateTime1');

  //     dateTime.setValue('2022-04-01T00:00:00.000');
  //     dateTime1.setValue('2022-04-01T00:00:00.000');

  //     document.body.addEventListener('zonesLoaded', () => {
  //       setTimeout(() => {
  //         const input = dateTime.element.querySelector('.input');
  //         const input1 = dateTime1.element.querySelector('.input');

  //         assert.equal(input.value, '2022-03-31 CDT');
  //         assert.equal(input1.value, '2022-04-01 KST');
  //         done();
  //       }, 100);
  //     });
  //   }).catch(done);
  // });

  // it('Test Shortcut Buttons', (done) => {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  //   window.flatpickr = Flatpickr;
  //   window.ShortcutButtonsPlugin = ShortcutButtonsPlugin;
  //   const formElement = document.createElement('div');
  //   const form = new Webform(formElement);
  //   form.setForm({ display: 'form', type: 'form', components: [comp2] })
  //     .then(() => {
  //       const dateTime = form.components[0];
  //       const buttonsWrappers = document.querySelectorAll('.shortcut-buttons-flatpickr-wrapper');
  //       const shortcutButtons = buttonsWrappers[buttonsWrappers.length - 1].querySelectorAll('.shortcut-buttons-flatpickr-button');

  //       assert.equal(shortcutButtons.length, 1);

  //       const input = dateTime.refs.input[0];
  //       Harness.clickElement(dateTime, shortcutButtons[0]);

  //       setTimeout(() => {
  //         input.widget.calendar.close();
  //         setTimeout(() => {
  //           assert.equal(form.data.date, '2020-10-10T00:00:00+00:00');
  //           dateTime.destroy();
  //           done();
  //         }, 250);
  //       }, 150);
  //     }).catch(done);
  // });
});
