'use strict';
import assert from 'power-assert';
import {SurveyComponent} from './Survey';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Survey Component', () => {
  it('Should build a survey component', (done) => {
    Harness.testCreate(SurveyComponent, comps.comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      for (let i=0; i < 5; i++) {
        assert.equal(inputs[i].name, 'data[surveyQuestions][service]');
        assert.equal(inputs[i].id, `${component.id}-service-${comps.comp1.values[i].value}`);
      }
      for (let i=5, j=0; i < 10; i++, j++) {
        assert.equal(inputs[i].name, 'data[surveyQuestions][howWouldYouRateTheTechnology]');
        assert.equal(inputs[i].id, `${component.id}-howWouldYouRateTheTechnology-${comps.comp1.values[j].value}`);
      }
      done();
    });
  });

  it('Should set the value of surveys.', (done) => {
    Harness.testCreate(SurveyComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, {service: 'bad', howWouldYouRateTheTechnology: 'good'});
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      for (let i=0; i < inputs.length; i++) {
        if (
          (inputs[i].id === `${component.id}-service-bad`) ||
          (inputs[i].id === `${component.id}-howWouldYouRateTheTechnology-good`)
        ) {
          assert.equal(inputs[i].checked, true);
        }
        else {
          assert.equal(inputs[i].checked, false);
        }
      }
      done();
    });
  });
});
