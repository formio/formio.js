import Harness from '../../../test/harness';
import FormComponent from './Form';

import {
  comp1,
  comp3
} from './fixtures';

describe('Form Component', () => {
  it('Should build a form component', () => {
    return Harness.testCreate(FormComponent, comp1);
  });
});

describe('Wizard Component', () => {
  it('Should build a wizard component and disable cancel, next and breadcrumbs', (done) => {
    Harness.testCreate(FormComponent, comp3, {
      breadcrumbSettings:
        { clickable: false },
      buttonSettings:
        { showCancel: false, showPrevious: false }
    }).then(() => {
      done();
    });
  });
});
