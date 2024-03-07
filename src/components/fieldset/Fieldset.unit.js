import Harness from '../../../test/harness';
import FieldsetComponent from './Fieldset';

import { comp1 } from './fixtures';

describe('Fieldset Component', function () {
	it('Should build a fieldset component', function () {
		return Harness.testCreate(FieldsetComponent, comp1).then((component) => {
			Harness.testElements(component, 'input[type="text"]', 2);
		});
	});
});
