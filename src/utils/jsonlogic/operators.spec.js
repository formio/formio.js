'use strict';

/* eslint-env mocha */
import { expect } from 'chai';
import { jsonLogic } from '../index';

describe('Lodash operators', () => {
  it('sum', () => {
    const logic = { _sum: [ [ 2, 3 ] ] };
    expect(jsonLogic.apply(logic)).to.be.equal(5);
  });
});
