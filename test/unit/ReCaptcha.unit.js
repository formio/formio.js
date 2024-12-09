import ReCaptchaComponent from '../../src/components/recaptcha/ReCaptcha';

import { comp1 } from './fixtures/recaptcha';

describe('reCAPTCHA Component', function () {
  it('Should build a reCAPTCHA component in builder mode', function (done) {
    new ReCaptchaComponent(comp1, {
      builder: true,
    });
    done();
  });
});
