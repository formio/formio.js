'use strict';
import assert from 'power-assert';
import Component from './Component';
import Harness from '../../../../test/harness';

describe('Component', () => {
  it('Should build a base component', () => {
    return Harness.testCreate(Component, {type: 'base'}).then((component) => {
      const element = component.element.querySelector(`[ref="component"]`);
      assert.equal(element.textContent.trim(), 'Unknown component: base');
    });
  });
});
