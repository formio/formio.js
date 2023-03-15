import { fake } from 'sinon';
import { expect } from 'chai';

import { GlobalFormio as Formio } from './Formio';
import FormBuilder from './FormBuilder';

describe('PDF Builder tests', () => {
  describe('PDF Auto Conversion', () => {
    const originalUploadFile = Formio.prototype.uploadFile;
    const originalLoadProject = Formio.prototype.loadProject;

    after(() => {
      Formio.prototype.uploadFile = originalUploadFile;
      Formio.prototype.loadProject = originalLoadProject;
    });

    beforeEach(() => {
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

    it('Should assign fields from PDF auto conversion to the empty form', (done) => {
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

    it('Should assign fields from PDF auto conversion to the initial form', (done) => {
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

    it('Should assign fields from PDF non fillable conversion to the initial form', (done) => {
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

    it('Should not assign fields from PDF auto conversion to non pristine form', (done) => {
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
});
