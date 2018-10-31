import ContainerComponent from './Container';
import assert from 'assert';
describe('Container Unit Tests', () => {
  it('Should create a new Columns component', () => {
    const container = new ContainerComponent({
      label: 'Container',
      key: 'container',
      type: 'container'
    });

    assert.equal(container.component.key, 'container');
  });
});
