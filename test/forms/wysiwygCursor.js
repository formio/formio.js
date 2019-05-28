import assert from 'power-assert';

export default {
  title: 'Textarea Cursor Jumping Test',
  form: {
    'type': 'resource',
    'components': [
      {
        'input': true,
        'label': 'Textarea',
        'key': 'textarea',
        'wysiwyg': {
          'theme': 'snow',
          'modules': {}
        },
        'type': 'textarea',
        'inputFormat': 'html'
      }
    ],
    'display': 'form'
  },
  tests: {
    'WYSIWYG cursor should not jump to the beginning when typing in ng-formio'(form, done) {
      const submission = { 'data': { textarea: 'lorem' } };
      form.submission = submission;
      form.on('change', function(event) {
        if (event.changed && event.changed.component.key === 'textarea' && event.changed.value.indexOf(submission.data['textarea']) > -1) {
          //only after initial value has finished setting
          event.changed.instance.editorReady.then(editor => {
            let isCalled = false;
            const initialSetContents = editor.setContents;
            editor.setContents = () => {
              isCalled = true;
            };
            //setSubmission method emulates ng-formio behavior: when user is typing, it watches for submission change and sets submission (which is actually same as was previously)
            //we're setting same submission which form currently has, so WYSIWYG should not update its value which means setContents method should not be called
            form.setSubmission(form.submission).then(() => {
              assert(!isCalled);
              editor.setContents = initialSetContents;
              done();
            });
          });
        }
      });
    }
  }
};
