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

    console.log(element.eventHandlers.length);
    element.addEventListener(element.events,'Test Event',function() {
      console.log('Test');
    },false);
    console.log(element.eventHandlers.length);
    assert.equal(element.events._events.hasOwnProperty('formio.Test Event'),true);
  });
});
