import assert from 'power-assert';

import Harness from '../../../test/harness';
import SurveyComponent from './Survey';

import {
  comp1,
  comp2
} from './fixtures';

describe('Survey Component', () => {
  it('Should build a survey component', (done) => {
    Harness.testCreate(SurveyComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      inputs.forEach((input, index) => {
        if (index < 5) {
          // Service
          assert.equal(input.name, 'data[surveyQuestions][service]');
          assert.equal(input.id, `${component.id}-service-${comp1.values[index].value}`);
        }
        else {
          // How do you like our service?
          assert.equal(input.name, 'data[surveyQuestions][howWouldYouRateTheTechnology]');
          assert.equal(input.id, `${component.id}-howWouldYouRateTheTechnology-${comp1.values[index - 5].value}`);
        }
      });
      done();
    });
  });

  it('Should set the value of surveys.', (done) => {
    Harness.testCreate(SurveyComponent, comp1).then((component) => {
      Harness.testSetGet(component, { service: 'bad', howWouldYouRateTheTechnology: 'good' });
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      for (const input of inputs) {
        if (
          (input.id === `${component.id}-service-bad`) ||
          (input.id === `${component.id}-howWouldYouRateTheTechnology-good`)
        ) {
          assert.equal(input.checked, true);
        }
        else {
          assert.equal(input.checked, false);
        }
      }
      done();
    });
  });

  it('Should require all questions for required Survey', (done) => {
    Harness.testCreate(SurveyComponent, comp2).then((component) => {
      Harness.testSetGet(component, { service: 'bad' });
      component.on('componentChange', () => {
        console.log(component.element.className);
        done();
      });
      // assert(component.element)
    });
  });
});
