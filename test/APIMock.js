import _ from 'lodash';
import Formio from '../src/Formio';
import fetchMock from 'fetch-mock/es5/server';
Formio.fetch = fetchMock.fetchHandler;
import Chance from 'chance';
import esc from 'escape-string-regexp';
const chance = Chance();
export const APIMock = {
  submission: function(url, form) {
    const submissions = {};
    const domain = url.match(/http[s]?:\/\/[^/]+/)[0];
    const requests = {
      formLoad: new RegExp(esc(`${url}?live=1`)),
      formSubmissionIndex: new RegExp(`${domain}\\/form\\/(.*)\\/submission\\?(.*)`),
      formSubmission: new RegExp(`${domain}\\/form\\/(.*)\\/submission\\/(.*)`),
      submissionCreate: new RegExp(esc(`${url}/submission`)),
      submissionGet: new RegExp(`${esc(`${url}/submission/`)}(.*)`),
      submissionUpdate: new RegExp(`${esc(`${url}/submission/`)}(.*)`),
      submissionIndex: new RegExp(`${esc(`${url}/submission?`)}(.*)`)
    };
    fetchMock
      .get(requests.formLoad, () => {
        return form;
      })
      // Create a new submission.
      .post(requests.submissionCreate, (url, req) => {
        const owner = Formio.getUser();
        req.body = JSON.parse(req.body);
        if (!req.body._id) {
          req.body._id = chance.string({ length: 21, pool: 'ABCDEFG1234567890' });
        }
        if (owner) {
          req.body.owner = owner._id;
        }
        submissions[req.body._id] = req.body;
        return req.body;
      })
      // Update a submission.
      .put(requests.submissionUpdate, (url, req) => {
        req.body = JSON.parse(req.body);
        const matches = url.match(requests.submissionUpdate);
        const id = matches[1];
        if (!id || !submissions[id]) {
          return 401;
        }
        submissions[id] = req.body;
        return submissions[id];
      })
      .get(requests.formSubmission, () => {
        const matches = url.match(requests.formSubmission);
        if (!matches || !matches[3]) {
          return 401;
        }
        const id = matches[3];
        if (!id || !submissions[id]) {
          return 401;
        }
        return submissions[id];
      })
      // Get a submission
      .get(requests.submissionGet, (url) => {
        const matches = url.match(requests.submissionUpdate);
        const id = matches[1];
        if (!id || !submissions[id]) {
          return 401;
        }
        return submissions[id];
      })
      .get(requests.formSubmissionIndex, (url) => {
        const matches = url.match(requests.formSubmissionIndex);
        if (!matches[2]) {
          return [];
        }
        return _.filter(submissions, _.chain(matches[2])
          .split('&')
          .map(_.partial(_.split, _, '=', 2))
          .fromPairs()
          .omit(['limit', 'skip'])
          .value());
      })
      // Mock the submission index.
      .get(requests.submissionIndex, (url) => {
        const matches = url.match(requests.submissionIndex);
        if (!matches[1]) {
          return [];
        }
        return _.filter(submissions, _.chain(matches[1])
          .split('&')
          .map(_.partial(_.split, _, '=', 2))
          .fromPairs()
          .omit(['limit', 'skip'])
          .value());
      });
  }
};
