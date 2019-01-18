import assert from 'power-assert';

import Harness from '../../../test/harness';
import { flattenComponents } from '../../utils/formUtils';
import PanelComponent from './Panel';
import panelEditForm from './Panel.form';

import {
  comp1
} from './fixtures';

describe('Panel Component', () => {
  it('Should build a panel component', (done) => {
    Harness.testCreate(PanelComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Panel should have correct classes', (done) => {
    Harness.testCreate(PanelComponent, comp1).then((component) => {
      const panelClass = component.element.getAttribute('class');
      assert(panelClass.indexOf('card border') !== -1, 'No Bootstrap 4 classes');
      assert(panelClass.indexOf('panel panel-default') !== -1, 'No Bootstrap 3 classes');
      assert(component.element.childNodes[0].getAttribute('class').indexOf('card-header bg-default panel-heading') !== -1);
      assert(component.element.childNodes[0].childNodes[0].getAttribute('class').indexOf('card-title panel-title') !== -1);
      assert(component.element.childNodes[1].getAttribute('class').indexOf('card-body panel-body') !== -1);
      done();
    });
  });

  describe('Edit Form', () => {
    it('should include components for important settings', () => {
      const components = flattenComponents(panelEditForm().components);
      const keys = Object.keys(components).map(path => components[path].key);
      const settings = [
        'breadcrumb',
        'breadcrumbClickable'
      ];

      assert(settings.every(s => keys.includes(s)));
    });
  });
});
