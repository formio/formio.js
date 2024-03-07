import Harness from '../../../test/harness';
import WellComponent from './Well';

import { comp1 } from './fixtures';
import { expect } from 'chai';

describe('Well Component', function () {
	it('Should build a Well component', function () {
		return Harness.testCreate(WellComponent, comp1).then((component) => {
			Harness.testElements(component, 'input[type="text"]', 2);
		});
	});

	it('Should skip validation on non-input nested components', function (done) {
		Harness.testCreate(WellComponent, comp1)
			.then((cmp) => {
				expect(cmp.shouldSkipValidation()).to.be.true;
				done();
			}, done)
			.catch(done);
	});
});
