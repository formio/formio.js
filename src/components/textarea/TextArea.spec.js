'use strict';
import { TextAreaComponent } from './TextArea';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('TextArea Component', function() {
  it('Should build a TextArea component', function(done) {
    Harness.testCreate(TextAreaComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'textarea', 1);
      done();
    });
  });
});
