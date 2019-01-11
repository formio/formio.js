import Harness from '../../../test/harness';
import FormComponent from './Form';
import { expect } from 'chai';
import sinon from 'sinon';

import {
  comp1,
  comp3
} from './fixtures';

describe('Form Component', () => {
  it('Should build a form component', (done) => {
    Harness.testCreate(FormComponent, comp1).then(() => {
      done();
    });
  });

  describe('renderSubForm', () => {
    let formcmp = null;
    it('should set sub form parentVisible', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          formcmp.visible = false;
          return formcmp.subFormReady;
        }, done)
        .then(subForm => {
          expect(formcmp).to.not.be.null;
          expect(formcmp.visible).to.be.false;
          expect(subForm.parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('set visible', () => {
    it('should set visible flag on instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._visible).to.be.true;
          formcmp.visible = false;
          expect(formcmp._visible).to.be.false;
          done();
        }, done)
        .catch(done);
    });

    it('should update sub form visibility', done => {
      let formcmp;
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          return formcmp.subFormReady;
        }, done)
        .then(subform => {
          expect(formcmp.visible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          formcmp.visible = false;
          expect(formcmp.visible).to.be.false;
          expect(subform.parentVisible).to.be.false;
          formcmp.visible = true;
          expect(formcmp.visible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('get visible', () => {
    it('should get visible flag from instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._visible).to.be.true;
          expect(formcmp.visible).to.be.true;
          formcmp.visible = false;
          expect(formcmp.visible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('set parentVisible', () => {
    it('should set parentVisible flag on instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp._parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });

    it('should update sub form visibility', done => {
      let formcmp;
      Harness.testCreate(FormComponent, comp1)
        .then(cmp => {
          formcmp = cmp;
          return formcmp.subFormReady;
        }, done)
        .then(subform => {
          expect(formcmp.parentVisible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp.parentVisible).to.be.false;
          expect(subform.parentVisible).to.be.false;
          formcmp.parentVisible = true;
          expect(formcmp.parentVisible).to.be.true;
          expect(subform.parentVisible).to.be.true;
          done();
        }, done)
        .catch(done);
    });
  });

  describe('get parentVisible', () => {
    it('should get parentVisible flag from instance', done => {
      Harness.testCreate(FormComponent, comp1)
        .then(formcmp => {
          expect(formcmp._parentVisible).to.be.true;
          expect(formcmp.parentVisible).to.be.true;
          formcmp.parentVisible = false;
          expect(formcmp.parentVisible).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });
});

describe('Wizard Component', () => {
  it('Should build a wizard component and disable cancel, next and breadcrumbs', (done) => {
    Harness.testCreate(FormComponent, comp3, {
      breadcrumbSettings:
        { clickable: false },
      buttonSettings:
        { showCancel: false, showPrevious: false }
    }).then(() => {
      done();
    });
  });
});
