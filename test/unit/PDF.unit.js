import { expect } from 'chai';
import { spy, stub } from 'sinon';

import '../../src/formio.form';
import PDF from '../../src/PDF';
import { Formio } from '../../src/Formio';

describe('PDF Component', function () {
  describe('message listener', function () {
    const formId = 'pdf-message-form';
    const iframeOrigin = 'https://pdf.example.test';
    let form;
    let iframe;
    let hadPreviousForm;
    let previousForm;

    const dispatchMessage = ({
      data = {
        formId,
        name: 'change',
        data: {
          data: {
            textField: 'trusted',
          },
        },
      },
      origin = iframeOrigin,
      source = iframe.contentWindow,
    } = {}) => {
      window.dispatchEvent(
        new MessageEvent('message', {
          data: typeof data === 'string' ? data : JSON.stringify(data),
          origin,
          source,
        }),
      );
    };

    beforeEach(function () {
      hadPreviousForm = Formio.forms.hasOwnProperty(formId);
      previousForm = Formio.forms[formId];
      iframe = document.createElement('iframe');
      iframe.src = `${iframeOrigin}/pdf.html`;
      document.body.appendChild(iframe);

      form = {
        emit: spy(),
        getComponent: stub(),
        iframeElement: iframe,
      };
      Formio.forms[formId] = form;
    });

    afterEach(function () {
      if (hadPreviousForm) {
        Formio.forms[formId] = previousForm;
      } else {
        delete Formio.forms[formId];
      }

      iframe.remove();
    });

    it('Should accept messages from the matching PDF iframe source and origin', function () {
      const submission = {
        data: {
          textField: 'trusted',
        },
      };

      dispatchMessage({
        data: {
          formId,
          name: 'change',
          data: submission,
        },
      });

      expect(form.emit.calledOnce).to.equal(true);
      expect(form.emit.firstCall.args).to.deep.equal(['iframe-change', submission]);
    });

    it('Should ignore messages from the wrong source window', function () {
      const otherIframe = document.createElement('iframe');
      otherIframe.src = `${iframeOrigin}/other.html`;
      document.body.appendChild(otherIframe);

      try {
        dispatchMessage({
          source: otherIframe.contentWindow,
        });

        expect(form.emit.called).to.equal(false);
      } finally {
        otherIframe.remove();
      }
    });

    it('Should ignore messages from the wrong origin', function () {
      dispatchMessage({
        origin: 'https://attacker.example.test',
      });

      expect(form.emit.called).to.equal(false);
    });

    it('Should emit component messages from the matching PDF iframe source and origin', function () {
      const component = {
        emit: spy(),
      };
      const data = {
        key: 'textField',
      };
      form.getComponent.withArgs('data.textField').returns(component);

      dispatchMessage({
        data: {
          formId,
          name: 'focus',
          compPath: 'data.textField',
          data,
        },
      });

      expect(form.getComponent.calledOnceWith('data.textField')).to.equal(true);
      expect(component.emit.calledOnce).to.equal(true);
      expect(component.emit.firstCall.args).to.deep.equal(['focus', component]);
      expect(form.emit.called).to.equal(false);
    });

    it('Should ignore malformed messages and unknown form ids', function () {
      expect(() => dispatchMessage({ data: '{bad json' })).not.to.throw();
      dispatchMessage({
        data: {
          formId: 'missing-form',
          name: 'change',
          data: {},
        },
      });

      expect(form.emit.called).to.equal(false);
    });

    it('Should emit iframe-pageEnd for pageEnd messages from the PDF iframe', function () {
      const pageEnd = {
        page: 1,
        isLastPage: false,
      };

      dispatchMessage({
        data: {
          formId,
          name: 'pageEnd',
          data: pageEnd,
        },
      });

      expect(form.emit.calledOnce).to.equal(true);
      expect(form.emit.firstCall.args).to.deep.equal(['iframe-pageEnd', pageEnd]);
    });
  });

  describe('parent shell', function () {
    let element;

    const pdfForm = (components) => ({
      display: 'pdf',
      settings: {
        pdf: {
          src: 'https://files.form.io/pdf/test.pdf',
        },
      },
      components,
    });

    beforeEach(function () {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(function () {
      element.remove();
    });

    it('Should mark every component it builds as the PDF shell', function () {
      const pdf = new PDF(element, {});
      pdf.setForm(
        pdfForm([
          { type: 'textfield', key: 'textField', label: 'Text Field', input: true },
          {
            type: 'panel',
            key: 'panel',
            label: 'Panel',
            input: false,
            components: [{ type: 'textfield', key: 'nested', label: 'Nested', input: true }],
          },
        ]),
      );

      const flags = {};
      pdf.everyComponent((component) => {
        flags[component.component.key] = component.options.pdfShell;
      });

      expect(flags).to.deep.equal({
        textField: true,
        panel: true,
        nested: true,
      });
    });

    it('Should not mark the options object the caller owns', function () {
      const callerOptions = {};

      new PDF(element, callerOptions);

      expect(callerOptions.pdfShell).to.equal(undefined);
    });
  });

  describe('event forwarding', function () {
    let element;

    const dataSourceForm = (refreshOnEvent) => ({
      display: 'pdf',
      settings: {
        pdf: {
          src: 'https://files.form.io/pdf/test.pdf',
        },
      },
      components: [
        {
          type: 'datasource',
          key: 'dataSource',
          label: 'Data Source',
          input: true,
          refreshOnEvent,
        },
      ],
    });

    const forwardedEvents = (pdf, messages) => {
      pdf.postMessage = (message) => messages.push(message);
      return messages;
    };

    beforeEach(function () {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(function () {
      element.remove();
    });

    it('Should forward an event a component refreshes on to the iframe', function () {
      const messages = [];
      const pdf = new PDF(element, {});
      forwardedEvents(pdf, messages);
      pdf.setForm(dataSourceForm('refreshIt'));

      pdf.emit('refreshIt');

      expect(messages.filter((message) => message.name === 'emit')).to.deep.equal([
        { name: 'emit', data: 'refreshIt' },
      ]);
    });

    it('Should not forward an event no component refreshes on', function () {
      const messages = [];
      const pdf = new PDF(element, {});
      forwardedEvents(pdf, messages);
      pdf.setForm(dataSourceForm('refreshIt'));

      pdf.emit('unrelated');

      expect(messages.filter((message) => message.name === 'emit')).to.deep.equal([]);
    });
  });
});
