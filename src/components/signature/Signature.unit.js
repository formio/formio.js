import Signature from './Signature';
import assert from 'assert';
describe('Signature Unit Tests', () => {
  it('Should create a new Signature component', () => {
    const signature = new Signature();
    assert.equal(signature.key,'signature');
  });
  it('Checking the  default schema of the signature component', () => {
    const signature = new Signature();
    assert.equal(signature.defaultSchema.type,'signature');
    assert.equal(signature.defaultSchema.footer,'Sign above');
    assert.equal(signature.defaultSchema.backgroundColor,'rgb(245,245,235)');
    assert.equal(signature.defaultSchema.penColor,'black');
  });
  it('Checking the class', () => {
    const signature = new Signature();
    assert.equal(signature.className,'form-group has-feedback formio-component formio-component-signature formio-component-signature  signature-pad');
  });
  it('Rendering the component', () => {
    const signature = new Signature();
    assert.equal(signature.rendered,false);
    signature.render();
    assert.equal(signature.rendered,true);
  });
  it('Get the view', () => {
    const signature = new Signature();
    assert.equal(signature.getView(null),'No');
    signature.render();
    assert.equal(signature.getView('Test'),'Yes');
  });
});
