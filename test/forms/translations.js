import assert from 'power-assert';
import { Harness } from '../harness';
module.exports = {
  title: 'Translations Form Test',
  form: {
    components: [
      {
        type: 'textfield',
        label: 'Default Label',
        key: 'typeShow',
        input: true,
        inputType: 'text',
        validate: {}
      }
    ]
  },
  tests: {
    'Test hidden components': (form, done) => {
      let inputs = Harness.testElements(form, 'input[type="text"]', 4);
      Harness.testConditionals(form, {data: {}}, ['typeMe', 'typeThe', 'typeMonkey', 'monkey'], done);
    },
    'Test validation errors on typeShow field': (form, done) => {
      Harness.testErrors(form, {data: {
        typeShow: 'sho',
        typeMe: '',
        typeThe: '',
        typeMonkey: ''
      }}, [
        {
          component: 'typeShow',
          message: 'You must type "Show"'
        }
      ], done);
    },
    'Test validation errors on typeMe field': (form, done) => {
      Harness.testErrors(form, {data: {
        typeShow: 'Show',
        typeMe: '',
        typeThe: '',
        typeMonkey: ''
      }}, [
        {
          component: 'typeMe',
          message: 'You must type "Me"'
        }
      ], done);
    },
    'Test validation errors on typeMe field': (form, done) => {
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
    'Test validation errors on typeThe field': (form, done) => {
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
    'Test validation errors on typeMonkey field': (form, done) => {
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
    'Test conditional when typeShow is set': (form, done) => {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show'
        }
      }, ['typeThe', 'typeMonkey', 'monkey'], done);
    },
    'Test conditional when typeShow, typeMe is set': (form, done) => {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show',
          typeMe: 'Me'
        }
      }, ['typeMonkey', 'monkey'], done);
    },
    'Test conditional when typeShow, typeMe, typeThe is set': (form, done) => {
      Harness.testConditionals(form, {
        data: {
          typeShow: 'Show',
          typeMe: 'Me',
          typeThe: 'The'
        }
      }, ['monkey'], done);
    },
    'Test conditional when typeShow, typeMe, typeThe, typeMonkey is set': (form, done) => {
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

