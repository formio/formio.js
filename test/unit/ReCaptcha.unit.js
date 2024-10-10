import ReCaptchaComponent from '../../src/components/recaptcha/ReCaptcha';

import {
  comp1
} from './fixtures/recaptcha';

describe('reCAPTCHA Component', () => {
  it('Should build a reCAPTCHA component in builder mode', (done) => {
    new ReCaptchaComponent(comp1, {
      builder: true
    });
    done();
  });
});
