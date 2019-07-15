import Component from './Component';
import assert from 'assert';

describe('Base Component Unit Tests', () => {
  it('Should create a Base Component', () => {
    const component = new Component();

    // Test that we have a proper constructed component.
    assert.equal(component.options.renderMode, 'form');
    assert.equal(component.options.attachMode, 'full');
    assert.equal(component.attached, false);
    assert.equal(component.rendered, false);
  });
});
