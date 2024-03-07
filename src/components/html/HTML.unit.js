import Harness from '../../../test/harness';
import HTMLComponent from './HTML';
import sinon from 'sinon';
import assert from 'power-assert';

import { comp1, comp2 } from './fixtures';

describe('HTML Component', function () {
	it('Should build an html component', function () {
		return Harness.testCreate(HTMLComponent, comp1);
	});

	it('Should build an html component and ignore empty attribute name', function () {
		const comp = comp1;
		comp.attrs.push({
			attr: '',
			value: '',
		});

		return Harness.testCreate(HTMLComponent, comp1);
	});

	it('setContent should not be called if it is not conditionally visible', function () {
		return Harness.testCreate(HTMLComponent, comp2).then((component) => {
			const emit = sinon.spy(component, 'setContent');
			component.checkRefreshOn(null);
			assert.equal(emit.callCount, 0);
		});
	});
});
