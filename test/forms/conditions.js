import Harness from '../harness';

export default {
  title: 'Conditional Form Test',
  form: {
    components: [
      {
        type: 'textfield',
        label: 'Type "Show"',
        key: 'typeShow',
        input: true,
        inputType: 'text',
        validate: {
          json: {
            if: [
              {
                '==': [
                  {
                    var: 'data.typeShow'
                  },
                  'Show'
                ]
              },
              true,
              'You must type "Show"'
            ]
          }
        }
      },
      {
        type: 'textfield',
        label: 'Type "Me"',
        key: 'typeMe',
        input: true,
        inputType: 'text',
        validate: {
          json: {
            if: [
              {
                '==': [
                  {
                    var: 'data.typeMe'
                  },
                  'Me'
                ]
              },
              true,
              'You must type "Me"'
            ]
          }
        },
        conditional: {
          json: {
            '===': [
              {
                var: 'data.typeShow'
              },
              'Show'
            ]
          }
        }
      },
      {
        type: 'textfield',
        label: 'Type "The"',
        key: 'typeThe',
        input: true,
        inputType: 'text',
        validate: {
          json: {
            if: [
              {
                '==': [
                  {
                    var: 'data.typeThe'
                  },
                  'The'
                ]
              },
              true,
              'You must type "The"'
            ]
          }
        },
        conditional: {
          json: {
            '===': [
              {
                var: 'data.typeMe'
              },
              'Me'
            ]
          }
        }
      },
      {
        type: 'textfield',
        input: true,
        inputType: 'text',
        label: 'Type "Monkey!"',
        key: 'typeMonkey',
        validate: {
          json: {
            if: [
              {
                '==': [
                  {
                    var: 'data.typeMonkey'
                  },
                  'Monkey!'
                ]
              },
              true,
              'You must type "Monkey!"'
            ]
          }
        },
        conditional: {
          json: {
            '===': [
              {
                var: 'data.typeThe'
              },
              'The'
            ]
          }
        }
      },
      {
        key: 'monkey',
        input: false,
        tag: 'img',
        attrs: [
          {
            attr: 'src',
            value: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/025B/production/_85730600_monkey2.jpg'
          },
          {
            attr: 'style',
            value: 'width: 100%;'
          }
        ],
        className: '',
        content: '',
        type: 'htmlelement',
        conditional: {
          json: {
            '===': [
              {
                var: 'data.typeMonkey'
              },
              'Monkey!'
            ]
          }
        }
      }
    ]
  },
  tests: {
    'Test hidden components'(form, done) {
      Harness.testElements(form, 'input[type="text"]', 1);
      Harness.testConditionals(form, {data: {}}, ['typeMe', 'typeThe', 'typeMonkey', 'monkey'], done);
    },
    'Test validation errors on typeShow field'(form, done) {
      Harness.testErrors(
        form,
        {
          data: {
            typeShow: 'sho',
            typeMe: '',
            typeThe: '',
            typeMonkey: ''
          }
        },
        [
          {
            component: 'typeShow',
            message: 'You must type "Show"'
          }
        ],
        done
      );
    },
    'Test validation errors on typeMe field'(form, done) {
      Harness.testErrors(form, {data: {
        typeShow: 'Show',
        typeMe: 'me',
        typeThe: '',
        typeMonkey: ''
      }}, [
        {
          component: 'typeMe',
          message: 'You must type "Me"'
        }
      ], done);
    },
    'Test validation errors on typeThe field'(form, done) {
      Harness.testErrors(form, {data: {
        typeShow: 'Show',
        typeMe: 'Me',
        typeThe: 'the',
        typeMonkey: ''
      }}, [
        {
          component: 'typeThe',
          message: 'You must type "The"'
        }
      ], done);
    },
    'Test validation errors on typeMonkey field'(form, done) {
      Harness.testErrors(form, {data: {
        typeShow: 'Show',
        typeMe: 'Me',
        typeThe: 'The',
        typeMonkey: 'Monkey'
      }}, [
        {
          component: 'typeMonkey',
          message: 'You must type "Monkey!"'
        }
      ], done);
    },
    'Test conditional when typeShow is set'(form, done) {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show'
        }
      }, ['typeThe', 'typeMonkey', 'monkey'], done);
    },
    'Test conditional when typeShow, typeMe is set'(form, done) {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show',
          typeMe: 'Me'
        }
      }, ['typeMonkey', 'monkey'], done);
    },
    'Test conditional when typeShow, typeMe, typeThe is set'(form, done) {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show',
          typeMe: 'Me',
          typeThe: 'The'
        }
      }, ['monkey'], done);
    },
    'Test conditional when typeShow, typeMe, typeThe, typeMonkey is set'(form, done) {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show',
          typeMe: 'Me',
          typeThe: 'The',
          typeMonkey: 'Monkey!'
        }
      }, [], done);
    }
  }
};
