import assert from 'power-assert';
import Harness from '../../../test/harness';
import TreeComponent from './Tree';
import {
  comp1,
} from './fixtures';

describe('Tree Component', () => {
  it('Should set and render values in readOnly mode', function(done) {
    Harness.testCreate(TreeComponent, comp1).then((component) => {
    component.setValue({
      data: {
        number: 111,
      },
      children: [{
        data: {
          number: 222,
        },
        children: [{
          data: {
            number: 333,
          },
          children: []
        }]
      }]
    });

    assert.equal(component.element.querySelectorAll('.tree__node-content').length, 3);
    assert.equal(component.element.querySelectorAll('.editNode').length, 3);

    component.options.readOnly = true;
    component.redraw();

    const valueContainers = component.element.querySelectorAll('.col-sm-2');

    assert.equal(component.element.querySelectorAll('.tree__node-content').length, 3);
    assert.equal(component.element.querySelectorAll('.editNode').length, 0);
    assert.equal(valueContainers[0].innerHTML.trim(), '111');
    assert.equal(valueContainers[1].innerHTML.trim(), '222');
    assert.equal(valueContainers[2].innerHTML.trim(), '333');

    done();
    });
  });
});
