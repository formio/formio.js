import FormBuilder from './FormBuilder';

describe('Formio PDF Form Builder tests', () => {
  it('Should emit change event when component position changed', (done) => {
    const form = {
      'type': 'form',
      'components': [
        {
          'input': true,
          'label': 'Text',
          'key': 'text',
          'type': 'textfield',
          'overlay': {
            'top': 135,
            'left': 211.516,
            'height': 20,
            'width': 100,
            'page': 1
          }
        },
        {
          'input': true,
          'label': 'Submit',
          'key': 'submit',
          'action': 'submit',
          'type': 'button'
        }
      ],
      'display': 'pdf',
      'name': 'testPdfForm'
    };
    const element = document.createElement('div');
    document.body.appendChild(element);
    const builder = new FormBuilder(element, form, {});
    builder.ready
      .then(function(builder) {
        let isPfdFormInitilized = false;
        builder.on('change', function() {
          if (isPfdFormInitilized) { //ignore any change events fired before initialized event
            //remove builder elements from DOM
            builder.destroy();
            try {
              document.body.removeChild(element);
            }
            catch (err) {
              console.warn(err);
            }
            done();
          }
          else {
            done();
          }
        });
        builder.pdfForm.on('initialized', () => {
          isPfdFormInitilized = true;
          const component = Object.assign({}, builder.pdfForm.getComponent('text').component);
          component.overlay = { 'top': 225, 'left': 405.516, 'height': 20, 'width': 100, 'page': 1 };
          builder.pdfForm.emit('iframe-componentUpdate', component);
        });
      });
  });
});
