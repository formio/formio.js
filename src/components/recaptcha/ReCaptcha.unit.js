import ReCaptchaComponent from './ReCaptcha';

import { comp1 } from './fixtures';

describe('reCAPTCHA Component', function () {
    it('Should build a reCAPTCHA component in builder mode', function (done) {
        new ReCaptchaComponent(comp1, {
            builder: true,
        });
        done();
    });
});
