import Harness from '../../../test/harness';
import TableComponent from './Table';

import { comp1 } from './fixtures';

describe('Table Component', function () {
    it('Should build a Table component', function () {
        return Harness.testCreate(TableComponent, comp1).then((component) => {
            Harness.testElements(component, 'input[type="text"]', 6);
        });
    });
});
