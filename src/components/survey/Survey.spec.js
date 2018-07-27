import assert from 'power-assert';

import Harness from '../../../test/harness';
import SurveyComponent from './Survey';

import {
  comp1,
  comp2
} from './fixtures';

describe('Survey Component', () => {
  it('Should build a survey component', () => {
    return Harness.testCreate(SurveyComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      inputs.forEach((input, index) => {
        if (index < 5) {
          // Service
          assert.equal(input.name, 'data[surveyQuestions][service]');
          assert.equal(input.id, `${component.key}-service-${comp1.values[index].value}`);
        }
        else {
          // How do you like our service?
          assert.equal(input.name, 'data[surveyQuestions][howWouldYouRateTheTechnology]');
          assert.equal(input.id, `${component.key}-howWouldYouRateTheTechnology-${comp1.values[index - 5].value}`);
        }
      });
    });
  });

  it('Should set the value of surveys.', () => {
    return Harness.testCreate(SurveyComponent, comp1).then((component) => {
      Harness.testSetGet(component, { service: 'bad', howWouldYouRateTheTechnology: 'good' });
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      for (const input of inputs) {
        if (
          (input.id === `${component.key}-service-bad`) ||
          (input.id === `${component.key}-howWouldYouRateTheTechnology-good`)
        ) {
          assert.equal(input.checked, true);
        }
        else {
          assert.equal(input.checked, false);
        }
      }
    });
  });

  it('Should require all questions for required Survey', (done) => {
    Harness.testCreate(SurveyComponent, comp2).then((component) => {
      Harness.testSetGet(component, { service: 'bad' });
      component.on('componentChange', () => {
        done();
      });
      // assert(component.element)
    });
  });
});
