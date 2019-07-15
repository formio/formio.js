import assert from 'power-assert';

import Harness from '../../../test/harness';
import { flattenComponents } from '../../utils/formUtils';
import PanelComponent from './Panel';
import panelEditForm from './Panel.form';

import {
  comp1
} from './fixtures';

describe('Panel Component', () => {
  it('Should build a panel component', () => {
    return Harness.testCreate(PanelComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
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
