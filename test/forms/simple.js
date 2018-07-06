import assert from 'power-assert';
import { Harness } from '../harness';
module.exports = {
  title: 'Simple Form Test',

  /** https://lyozsrwunugzxwe.form.io/basic */
  form: {"_id":"58813a6cf6267a006d569892","modified":"2017-01-29T05:40:54.825Z","title":"Basic Form","display":"form","type":"form","name":"basicForm","path":"basic","project":"58704bed7cc4b7006c4b8a6c","created":"2017-01-19T22:15:08.941Z","components":[{"tags":[],"type":"textfield","conditional":{"eq":"","when":null,"show":""},"validate":{"customPrivate":false,"custom":"","pattern":"","maxLength":10,"minLength":2,"required":false},"persistent":true,"unique":false,"protected":false,"defaultValue":"","multiple":false,"suffix":"","prefix":"","placeholder":"","key":"firstName","label":"First Name","inputMask":"","inputType":"text","tableView":true,"input":true},{"tags":[],"type":"textfield","conditional":{"eq":"","when":null,"show":""},"validate":{"customPrivate":false,"custom":"","pattern":"","maxLength":"","minLength":"","required":false},"persistent":true,"unique":false,"protected":false,"defaultValue":"","multiple":false,"suffix":"","prefix":"","placeholder":"","key":"lastName","label":"Last Name","inputMask":"","inputType":"text","tableView":true,"input":true},{"conditional":{"eq":"","when":null,"show":""},"tags":[],"type":"email","kickbox":{"enabled":false},"persistent":true,"unique":false,"protected":false,"defaultValue":"","suffix":"","prefix":"","placeholder":"","key":"email","label":"Email","inputType":"email","tableView":true,"input":true},{"conditional":{"eq":"","when":null,"show":""},"tags":[],"type":"password","persistent":true,"protected":true,"suffix":"","prefix":"","placeholder":"","key":"password","label":"Password","inputType":"password","tableView":false,"input":true},{"validate":{"custom":"valid = (input == '{{ password }}') ? true : 'Passwords must match.';"},"conditional":{"eq":"","when":null,"show":""},"tags":[],"type":"password","persistent":true,"protected":true,"suffix":"","prefix":"","placeholder":"","key":"verifyPassword","label":"Verify Password","inputType":"password","tableView":false,"input":true},{"maxDate":null,"minDate":null,"input":true,"tableView":true,"label":"Date","key":"date","placeholder":"","format":"yyyy-MM-dd hh:mm","enableDate":true,"enableTime":true,"defaultDate":"","datepickerMode":"day","datePicker":{"showWeeks":true,"startingDay":0,"initDate":"","minMode":"day","maxMode":"year","yearRange":"20","datepickerMode":"day"},"timePicker":{"hourStep":1,"minuteStep":1,"showMeridian":true,"readonlyInput":false,"mousewheel":true,"arrowkeys":true},"protected":false,"persistent":true,"validate":{"required":false,"custom":""},"type":"datetime","tags":[],"conditional":{"show":"","when":null,"eq":""}},{"type":"button","theme":"primary","disableOnInvalid":false,"action":"submit","block":false,"rightIcon":"","leftIcon":"","size":"md","key":"submit","tableView":false,"label":"Submit","input":true}],"owner":"553dbfc08d22d5cb1a7024f2","submissionAccess":[{"type":"create_all","roles":[]},{"type":"read_all","roles":["58704bed7cc4b7006c4b8a6f"]},{"type":"update_all","roles":[]},{"type":"delete_all","roles":[]},{"type":"create_own","roles":["58704bed7cc4b7006c4b8a6f"]},{"type":"read_own","roles":[]},{"type":"update_own","roles":[]},{"type":"delete_own","roles":[]},{"type":"team_read","roles":[]},{"type":"team_write","roles":[]},{"type":"team_admin","roles":[]}],"access":[{"type":"create_all","roles":[]},{"type":"read_all","roles":["58704bed7cc4b7006c4b8a6d","58704bed7cc4b7006c4b8a6e","58704bed7cc4b7006c4b8a6f"]},{"type":"update_all","roles":[]},{"type":"delete_all","roles":[]},{"type":"create_own","roles":[]},{"type":"read_own","roles":[]},{"type":"update_own","roles":[]},{"type":"delete_own","roles":[]},{"type":"team_read","roles":[]},{"type":"team_write","roles":[]},{"type":"team_admin","roles":[]}],"tags":[]},
  tests: {
    'Test valid submission': (form, done) => {
      let inputs = Harness.testElements(form, 'input[type="text"]', 3);
      Harness.testSubmission(form, {
        data: {
          firstName: 'Joe',
          lastName: 'Smith',
          email: 'test@example.com',
          password: '123test',
          verifyPassword: '123test',
          date: Harness.getDate()
        }
      });
      done();
    },
    'Test invalid email': (form, done) => {
      Harness.testErrors(form, {data: {
        date: Harness.getDate(),
        firstName: 'test',
        lastName: 'test2',
        email: 'bademail',
        submit: false,
        password: '',
        verifyPassword: ''
      }}, [{
        component: 'email',
        message: 'Email must be a valid email.'
      }], done);
    }
  }
};

