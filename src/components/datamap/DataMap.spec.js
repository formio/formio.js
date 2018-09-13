import Harness from '../../../test/harness';
import DataMapComponent from './DataMap';
import { comp1 } from './fixtures';

describe('DataMap Component', () => {
  it('Should build a data map component', (done) => {
    Harness.testCreate(DataMapComponent, comp1).then((component) => {
      done();
    });
  });

  it('Should get and set values within the datamap.', (done) => {
    Harness.testCreate(DataMapComponent, comp1).then((component) => {
      Harness.testSetGet(component, {
        one: 'One',
        two: 'Two',
        three: 'Three'
      });
      done();
    });
  });
});
