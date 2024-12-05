import assert from 'power-assert';
import Harness from '../harness';
import ContentComponent from '../../src/components/content/Content';
import { Formio } from '../../src/Formio';
import {
  comp1
} from './fixtures/content';

describe('Content Component', function() {
  it('Should build a content component', function() {
    return Harness.testCreate(ContentComponent, comp1).then((component) => {
      const html = component.element.querySelector('[ref="html"]');
      assert.equal(html.innerHTML.trim(), comp1.html.trim());
    });
  });

  it('Should update after submission set', function(done) {
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
