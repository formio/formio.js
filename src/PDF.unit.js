import { expect } from 'chai';
import { spy } from 'sinon';

import './PDF';
import { GlobalFormio as Formio } from './Formio';

describe('PDF Component', () => {
  describe('message listener', () => {
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
      window.dispatchEvent(new MessageEvent('message', {
        data: typeof data === 'string' ? data : JSON.stringify(data),
        origin,
        source,
      }));
    };

    beforeEach(() => {
      hadPreviousForm = Formio.forms.hasOwnProperty(formId);
      previousForm = Formio.forms[formId];
      iframe = document.createElement('iframe');
      iframe.src = `${iframeOrigin}/pdf.html`;
      document.body.appendChild(iframe);

      form = {
        emit: spy(),
        iframeElement: iframe,
      };
      Formio.forms[formId] = form;
    });

    afterEach(() => {
      if (hadPreviousForm) {
        Formio.forms[formId] = previousForm;
      }
      else {
        delete Formio.forms[formId];
      }

      iframe.remove();
    });

    it('Should accept messages from the matching PDF iframe source and origin', () => {
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
      expect(form.emit.firstCall.args).to.deep.equal([
        'iframe-change',
        submission,
      ]);
    });

    it('Should ignore messages from the wrong source window', () => {
      const otherIframe = document.createElement('iframe');
      otherIframe.src = `${iframeOrigin}/other.html`;
      document.body.appendChild(otherIframe);

      try {
        dispatchMessage({
          source: otherIframe.contentWindow,
        });

        expect(form.emit.called).to.equal(false);
      }
      finally {
        otherIframe.remove();
      }
    });

    it('Should ignore messages from the wrong origin', () => {
      dispatchMessage({
        origin: 'https://attacker.example.test',
      });

      expect(form.emit.called).to.equal(false);
    });

    it('Should ignore messages without a source window', () => {
      dispatchMessage({
        source: null,
      });

      expect(form.emit.called).to.equal(false);
    });

    it('Should ignore malformed messages and unknown form ids', () => {
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
  });
});
