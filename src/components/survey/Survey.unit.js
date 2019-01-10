import Survey from './Survey';
import assert from 'assert';
describe('Survey Unit Tests', () => {
  it('Should create a new Survey component', () => {
    const survey = new Survey();
    assert.equal(survey.key,'survey');
  });
  it('Checking the  default schema of the survey component', () => {
    const survey = new Survey();
    assert.equal(survey.defaultSchema.type,'survey');
    assert.equal(survey.defaultSchema.questions,'');
    assert.equal(survey.defaultSchema.values,'');
  });
  it('Rendering the component', () => {
    const survey = new Survey();
    assert.equal(survey.rendered,false);
    survey.render();
    assert.equal(survey.rendered,true);
  });
  it('Should be able to add Questions and Values to survey component',() => {
   const survey = new Survey({
     key: 'survey',
     questions: 'Test',
     value: 'Yes'
   });
  });
});

