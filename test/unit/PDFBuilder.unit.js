import { fake } from 'sinon';
import { expect } from 'chai';
import { Formio } from '../../src/Formio';
import FormBuilder from '../../src/FormBuilder';

describe('PDF Builder tests', function() {
  describe('PDF Auto Conversion', function() {
    let originalUploadFile, originalLoadProject;
    
    before(function() {
      originalUploadFile = Formio.prototype.uploadFile;
      originalLoadProject = Formio.prototype.loadProject;
    });

    after(function() {
      Formio.prototype.uploadFile = originalUploadFile;
      Formio.prototype.loadProject = originalLoadProject;
    });

    beforeEach(function() {
      Formio.prototype.loadProject = fake.resolves(null);
    });

    const getUploadResponseMock = (withNonFillable) => ({
      data: {
        file: 'fileId',
        filesServer: 'http://fakeserver.test',
        path: '/path/to/pdf/file',
        formfields: {
          components: [
            {
              input: true,
              label: 'Test',
              key: 'testTextField',
              type: 'textfield',
              overlay: {
                top: 135,
                left: 211.516,
                height: 20,
                width: 100,
                page: 1,
              },
            },
          ],
          ...(withNonFillable && { nonFillableConversionUsed: true })
        },
      },
    });

    it('Should assign fields from PDF auto conversion to the empty form', function(done) {
      const uploadResponseMock = getUploadResponseMock();

      Formio.prototype.uploadFile = fake.resolves(uploadResponseMock);

      const form = {
        type: 'form',
        components: [],
        display: 'pdf',
        name: 'testPdfForm',
      };
      const builder = new FormBuilder(document.createElement('div'), form, {});

      builder.ready
        .then(function(builder) {
          builder.on('pdfUploaded', (result) => {
            expect(result).to.be.deep.equal(uploadResponseMock.data);
            expect(builder.webform.form.components).to.be.deep.equal(uploadResponseMock.data.formfields.components);
            expect(builder.webform.form.settings.pdf.nonFillableConversionUsed).to.be.undefined;

            done();
          });

          builder.upload();
        });
    });

    it('Should assign fields from PDF auto conversion to the initial form', function(done) {
      const uploadResponseMock = getUploadResponseMock();

      Formio.prototype.uploadFile = fake.resolves(uploadResponseMock);

      const form = {
        type: 'form',
        components: [
          {
            input: true,
            label: 'Submit',
            key: 'submit',
            action: 'submit',
            type: 'button',
          },
        ],
        display: 'pdf',
        name: 'testPdfForm',
      };
      const builder = new FormBuilder(document.createElement('div'), form, {});

      builder.ready
        .then(function(builder) {
          builder.on('pdfUploaded', (result) => {
            expect(result).to.be.deep.equal(uploadResponseMock.data);
            expect(builder.webform.form.components).to.be.deep.equal(uploadResponseMock.data.formfields.components);
            expect(builder.webform.form.settings.pdf.nonFillableConversionUsed).to.be.undefined;

            done();
          });

          builder.upload();
        });
    });

    it('Should assign fields from PDF non fillable conversion to the initial form', function(done) {
      const uploadResponseMock = getUploadResponseMock(true);

      Formio.prototype.uploadFile = fake.resolves(uploadResponseMock);

      const form = {
        type: 'form',
        components: [
          {
            input: true,
            label: 'Submit',
            key: 'submit',
            action: 'submit',
            type: 'button',
          },
        ],
        display: 'pdf',
        name: 'testPdfForm',
      };
      const builder = new FormBuilder(document.createElement('div'), form, {});

      builder.ready
        .then(function(builder) {
          builder.on('pdfUploaded', (result) => {
            expect(result).to.be.deep.equal(uploadResponseMock.data);
            expect(builder.webform.form.components).to.be.deep.equal(uploadResponseMock.data.formfields.components);
            expect(builder.webform.form.settings.pdf.nonFillableConversionUsed).to.be.true;

            done();
          });

          builder.upload();
        });
    });

    it('Should not assign fields from PDF auto conversion to non pristine form', function(done) {
      const uploadResponseMock = getUploadResponseMock(true);

      Formio.prototype.uploadFile = fake.resolves(uploadResponseMock);

      const form = {
        type: 'form',
        components: [
          {
            input: true,
            label: 'Text Field',
            key: 'textField',
            type: 'textfield',
            overlay: {
              top: 135,
              left: 211.516,
              height: 20,
              width: 100,
              page: 1,
            },
          },
          {
            input: true,
            label: 'Submit',
            key: 'submit',
            action: 'submit',
            type: 'button',
          },
        ],
        display: 'pdf',
        name: 'testPdfForm',
      };
      const builder = new FormBuilder(document.createElement('div'), form, {});

      builder.ready
        .then(function(builder) {
          builder.on('pdfUploaded', (result) => {
            expect(result).to.be.deep.equal(uploadResponseMock.data);
            expect(builder.webform.form.components).to.be.deep.equal(form.components);
            expect(builder.webform.form.settings.pdf.nonFillableConversionUsed).to.be.false;

            done();
          });

          builder.upload();
        });
    });
  });

  it('Should emit change event when component position changed', function(done) {
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
