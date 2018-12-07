import SelectBoxesComponent from './SelectBoxes';
import assert from 'assert';
describe('SelectBoxes Unit Tests', () => {
  it('Should create a new SelectBoxes component', () => {
    const selectBoxes = new SelectBoxesComponent();
    assert.equal(selectBoxes.key,'selectBoxes');
  });
  it('Checking the  default schema of the selectBoxes component', () => {
    const selectBoxes = new SelectBoxesComponent();
    assert.equal(selectBoxes.defaultSchema.inputType,'radio');
    assert.equal(selectBoxes.defaultSchema.fieldSet,false);
    assert.equal(selectBoxes.defaultSchema.validate.customPrivate,false);
  });
  it('Checking the empty value', () => {
    const selectBoxes = new SelectBoxesComponent();
    assert.equal(selectBoxes.isEmpty('Test'),false);
  });
  it('Checking the view', () => {
    const selectBoxes = new SelectBoxesComponent();
    assert.equal(selectBoxes.isEmpty('Test'),false);
  });
});
