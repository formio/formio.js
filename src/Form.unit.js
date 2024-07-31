import Form from "./Form";
import assert from 'power-assert';

describe('Form', () => {
  it('Should set myApiUrl property in _form instance variable when calling setForm', () => {
    const tempLoadForm = Formio.prototype.loadForm;
    Formio.prototype.loadForm = async ()=> {
      return {
        "path": "formKey",
      }
    }
    const myForm = new Form(document.createElement('div'), 'http://localhost:3000/projectKey/formKey', {});
    return myForm.setForm('http://localhost:3000/projectKey/formKey').then((instance) => {
      assert.equal(instance._form.config.myApiUrl, 'http://localhost:3000/projectKey', 'could not find myApiUrl property on form');
      Formio.prototype.loadForm = tempLoadForm;
    }).catch((err) => {
      Formio.prototype.loadForm = tempLoadForm;
    });
  });
});
