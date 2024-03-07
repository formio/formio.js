import { expect } from 'chai';
import { jsonLogic } from '../utils';

describe('Lodash operators', function () {
    describe('Arrays', function () {});

    describe('Collection', function () {});

    describe('Date', function () {});

    describe('Function', function () {});

    describe('Lang', function () {
        it('isEqual', function () {
            const logicTrue = {
                _isEqual: [
                    [2, 3],
                    [2, 3],
                ],
            };
            const logicFalse = {
                _isEqual: [
                    [2, 3],
                    [2, 4],
                ],
            };
            expect(jsonLogic.apply(logicTrue)).to.be.equal(true);
            expect(jsonLogic.apply(logicFalse)).to.be.equal(false);
        });
    });

    describe('Math', function () {
        it('add', function () {
            const logic = { _add: [2, 3] };
            expect(jsonLogic.apply(logic)).to.be.equal(5);
        });

        it('ceil', function () {
            const logic = { _ceil: [4.006] };
            expect(jsonLogic.apply(logic)).to.be.equal(5);
        });

        it('divide', function () {
            const logic = { _divide: [6, 3] };
            expect(jsonLogic.apply(logic)).to.be.equal(2);
        });

        it('floor', function () {
            const logic = { _floor: [4.906] };
            expect(jsonLogic.apply(logic)).to.be.equal(4);
        });

        it('max', function () {
            const logic = { _max: [[2, 5, 6, 3]] };
            expect(jsonLogic.apply(logic)).to.be.equal(6);
        });

        it('maxBy', function () {
            const data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
            const logic1 = { _maxBy: [{ var: '' }, 'n'] };
            const logic2 = { _maxBy: [{ var: '' }, { _property: 'n' }] };
            expect(jsonLogic.apply(logic1, data)).to.be.equal(data[2]);
            expect(jsonLogic.apply(logic2, data)).to.be.equal(data[2]);
        });

        it('mean', function () {
            const logic = { _mean: [[2, 5, 6, 3]] };
            expect(jsonLogic.apply(logic)).to.be.equal(4);
        });

        it('meanBy', function () {
            const data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
            const logic1 = { _meanBy: [{ var: '' }, 'n'] };
            const logic2 = { _meanBy: [{ var: '' }, { _property: 'n' }] };
            expect(jsonLogic.apply(logic1, data)).to.be.equal(5);
            expect(jsonLogic.apply(logic2, data)).to.be.equal(5);
        });

        it('min', function () {
            const logic = { _min: [[2, 5, 6, 3]] };
            expect(jsonLogic.apply(logic)).to.be.equal(2);
        });

        it('minBy', function () {
            const data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
            const logic1 = { _minBy: [{ var: '' }, 'n'] };
            const logic2 = { _minBy: [{ var: '' }, { _property: 'n' }] };
            expect(jsonLogic.apply(logic1, data)).to.be.equal(data[1]);
            expect(jsonLogic.apply(logic2, data)).to.be.equal(data[1]);
        });

        it('multiply', function () {
            const logic = { _multiply: [2, 3] };
            expect(jsonLogic.apply(logic)).to.be.equal(6);
        });

        it('round', function () {
            const logic1 = { _round: [4.006] };
            const logic2 = { _round: [4.906] };
            expect(jsonLogic.apply(logic1)).to.be.equal(4);
            expect(jsonLogic.apply(logic2)).to.be.equal(5);
        });

        it('subtract', function () {
            const logic = { _subtract: [2, 3] };
            expect(jsonLogic.apply(logic)).to.be.equal(-1);
        });

        it('sum', function () {
            const logic = { _sum: [[2, 3]] };
            expect(jsonLogic.apply(logic)).to.be.equal(5);
        });

        it('sumBy', function () {
            const data = [{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }];
            const logic1 = { _sumBy: [{ var: '' }, 'n'] };
            const logic2 = { _sumBy: [{ var: '' }, { _property: 'n' }] };
            expect(jsonLogic.apply(logic1, data)).to.be.equal(20);
            expect(jsonLogic.apply(logic2, data)).to.be.equal(20);
        });
    });

    describe('Number', function () {});

    describe('Object', function () {});

    describe('String', function () {});

    describe('Util', function () {
        it('property', function () {
            const data = [{ a: { b: 2 } }, { a: { b: 1 } }];
            const logic = { _sumBy: [{ var: '' }, { _property: 'a.b' }] };
            expect(jsonLogic.apply(logic, data)).to.be.equal(3);
        });
    });
});
