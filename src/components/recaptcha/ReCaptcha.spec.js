import ReCaptchaComponent from './ReCaptcha';
import assert from 'power-assert';

import {
  comp1
} from './fixtures';

describe('reCAPTCHA Component', () => {
  it('Should build a reCAPTCHA component in builder mode', (done) => {
    const componentInstance = new ReCaptchaComponent(comp1, {
      builder: true
    });
    componentInstance.build();
    assert(componentInstance.element && componentInstance.element.innerHTML);
    done();
  });
});
