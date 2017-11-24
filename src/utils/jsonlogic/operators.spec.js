'use strict';

/* eslint-env mocha */
import { expect } from 'chai';
import { jsonLogic } from '../index';

describe('Lodash operators', () => {
  it('isEqual', () => {
    const logicTrue = { _isEqual: [ [ 2, 3 ], [2, 3] ] };
    const logicFalse = { _isEqual: [ [ 2, 3 ], [2, 4] ] };
    expect(jsonLogic.apply(logicTrue)).to.be.equal(true);
    expect(jsonLogic.apply(logicFalse)).to.be.equal(false);
  });

  it('sum', () => {
    const logic = { _sum: [ [ 2, 3 ] ] };
    expect(jsonLogic.apply(logic)).to.be.equal(5);
  });
});
