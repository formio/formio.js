import assert from 'power-assert';
import _ from 'lodash';

import Harness from '../harness';
import SurveyComponent from '../../src/components/survey/Survey';
import { Formio } from '../../src/Formio';

import {
  comp1,
  comp2,
  comp3,
} from './fixtures/survey';

describe('Survey Component', () => {
  it('Should build a survey component', () => {
    return Harness.testCreate(SurveyComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="radio"]', 10);
      inputs.forEach((input, index) => {
        if (index < 5) {
          // Service
          assert.equal(input.name, `data[surveyQuestions][service][${component.id}]`);
          assert.equal(input.id, `${component.key}-service-${comp1.values[index].value}`);
        }
        else {
          // How do you like our service?
          assert.equal(input.name, `data[surveyQuestions][howWouldYouRateTheTechnology][${component.id}]`);
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

  it('Should set the value for nested surveys.', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp3));
    const survey = form.getComponent(['form', 'survey']);
    const surveyInput = survey.refs.input[0];
    surveyInput.checked = true;
    surveyInput.dispatchEvent(new Event('change'));
    assert.equal(surveyInput.checked, true);
    const survey2 = form.getComponent(['form1', 'survey']);
    const surveyInput2 = survey2.refs.input[0];
    surveyInput2.checked = true;
    surveyInput2.dispatchEvent(new Event('change'));
    assert.equal(surveyInput.checked, true);
    assert.equal(surveyInput2.checked, true);
    assert.deepEqual(survey.dataValue, { question: 'yes' });
    assert.deepEqual(survey2.dataValue, { question: 'yes' });
  });
});
