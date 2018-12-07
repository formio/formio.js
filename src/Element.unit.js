import Element from './Element';
import assert from 'assert';
describe('Element Class Unit Tests', () => {
  it('Adding an on change event', () => {
    const element = new Element({});
    element.on('Test Event',() => {
      console.log('The element is changed.');
    });

    assert.equal(element.events._events.hasOwnProperty('formio.Test Event'),true);
  });
  it('Adding an event listener', () => {
    const element = new Element({});
    element.on('Test Event',() => {
      console.log('The element is changed.');
    });
    assert.equal(element.eventHandlers.length,0);
    element.addEventListener(element.events,'Test Event',function() {
      console.log('Test');
    },false);
    assert.equal(element.eventHandlers.length,1);
  });
  it('Destroying event listeners', () => {
    const element = new Element({});
    element.on('Test Event',() => {
      console.log('The element is changed.');
    });
    element.addEventListener(element.events,'Test Event',function() {
      console.log('Test');
    },false);
    element.addEventListener(element.events,'Test Event',function() {
      console.log('Test');
    },false);
    assert.equal(element.eventHandlers.length,2);
    element.destroy();
    assert.equal(element.eventHandlers.length,0);
  });
});
