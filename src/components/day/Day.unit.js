import DayComponent from './Day';
import assert from 'assert';
describe('Day component Unit Tests', () => {
  it('Should create a new Day component', () => {
    const day = new DayComponent();
    assert.equal(day.key, 'day');
  });
  it('Checking the default schema of the component', () => {
    const day = new DayComponent();
    assert.equal(day.defaultSchema.label, 'Day');
    assert.equal(day.defaultSchema.type, 'day');
    assert.equal(day.defaultSchema.dayFirst, false);
  });
  it('Checking the day, month and year definitions of the component', () => {
    const day = new DayComponent();
    assert.equal(day.inputDefinition('day').attr.id,'day-day');
    assert.equal(day.inputDefinition('day').attr.type,'number');
    assert.equal(day.inputDefinition('day').attr.step,1);
    assert.equal(day.inputDefinition('day').attr.min,1);
    assert.equal(day.inputDefinition('day').attr.max,31);
    assert.equal(day.inputDefinition('month').attr.id,'day-month');
    assert.equal(day.inputDefinition('month').attr.type,'select');
    assert.equal(day.inputDefinition('month').attr.step,1);
    assert.equal(day.inputDefinition('month').attr.min,1);
    assert.equal(day.inputDefinition('month').attr.max,12);
    assert.equal(day.inputDefinition('year').attr.id,'day-year');
    assert.equal(day.inputDefinition('year').attr.type,'number');
    assert.equal(day.inputDefinition('year').attr.step,1);
    assert.equal(day.inputDefinition('year').attr.min,1);
    assert.equal(day.inputDefinition('year').attr.max,undefined);
  });
  it('Rendering the day compoenent', () => {
    const day = new DayComponent();
    assert.equal(day.rendered,false);
    day.render();
    assert.equal(day.rendered,true);
  });
});
