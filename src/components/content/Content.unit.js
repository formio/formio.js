import assert from 'power-assert';

import Harness from '../../../test/harness';
import ContentComponent from './Content';
import Formio from '../../Formio';

import {
  comp1
} from './fixtures';

describe('Content Component', () => {
  it('Should build a content component', () => {
    return Harness.testCreate(ContentComponent, comp1).then((component) => {
      const html = component.element.querySelector('[ref="html"]');
      assert.equal(html.innerHTML.trim(), comp1.html.trim());
    });
  });

  it('Should update after submission set', (done) => {
    const formJson =  {
      components: [{
        html: '<p>{{submission.data.textField}}</p>',
        label: 'Content',
        refreshOnChange: false,
        key: 'content',
        type: 'content',
      }, {
        label: 'Text Field',
        tableView: true,
        key: 'textField',
        type: 'textfield',
        input: true
      },]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.submission = {
          data: {
            textField: 'textField'
          }
        };
        const content = form.getComponent('content');
        form.dataReady.then(() => {
          assert.equal(content.refs.html.innerHTML, '<p>textField</p>');
          done();
        });
      })
      .catch(done);
  });
});
