import ReCaptchaComponent from './ReCaptcha';

import {
  comp1
} from './fixtures';

describe('reCAPTCHA Component', () => {
  it('Should build a reCAPTCHA component in builder mode', (done) => {
    new ReCaptchaComponent(comp1, {
      builder: true
    });
    done();
  });
});
