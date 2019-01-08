import assert from 'power-assert';

export default {
  title: 'Child Metadata Test',
  form: {
    'type': 'resource',
    'components': [
      {
        'label': 'Parent Text',
        'type': 'textfield',
        'input': true,
        'key': 'parentText'
      },
      {
        'label': 'Parent',
        'type': 'checkbox',
        'input': true,
        'key': 'parent'
      },
      {
        'input': true,
        'key': 'child',
        'components': [
          {
            'label': 'Child Text',
            'type': 'textfield',
            'input': true,
            'key': 'childText'
          },
          {
            'label': 'Child',
            'type': 'checkbox',
            'input': true,
            'key': 'child'
          },
          {
            'input': true,
            'label': 'Submit',
            'key': 'submit',
            'type': 'button',
            'action': 'submit'
          }
        ],
        'label': 'child',
        'type': 'form'
      },
      {
        'input': true,
        'label': 'Submit',
        'key': 'submit',
        'type': 'button',
        'action': 'submit'
      }
    ],
    'title': 'nested parent',
    'display': 'form',
    'name': 'nestedParent'
  },
  tests: {
    'Parent form with nested child form should have access to child submission metadata'(form, done) {
      form.submission = {
        data: {}
      };

      form.submissionReady.then(function() {
        form.submit();
        form.on('submit', function(submission) {
          const isChildMetadataPresent = !!(
            submission.data.child.metadata &&
            Object.keys(submission.data.child.metadata).length
          );
          assert(isChildMetadataPresent);
          done();
        });
      });
    }
  }
};
