import assert from 'assert';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';

import S3 from './s3';
import { withRetries } from './util';

describe('S3 Provider', () => {
  describe('Function Unit Tests', () => {
    it('withRetries should retry a given function three times, then throw the provided error', (done) => {
      function sleepAndReject(ms) {
        return new Promise((_, reject) => setTimeout(reject, ms));
      }

      const spy = sinon.spy(sleepAndReject);
      withRetries(spy, [200], 3, 'Custom error message').catch((err) => {
        assert.equal(err.message, 'Custom error message');
        assert.equal(spy.callCount, 3);
        done();
      });
    });
  });

  describe('Provider Integration Tests', () => {
    describe('AWS S3 Multipart Uploads', () => {
      before('Mocks fetch', () => {
        fetchMock
          .post('https://fakeproject.form.io/fakeform/storage/s3', {
            signed: new Array(5).fill('https://fakebucketurl.aws.com/signed'),
            minio: false,
            url: 'https://fakebucketurl.aws.com',
            bucket: 'fakebucket',
            uploadId: 'fakeuploadid',
            key: 'test.jpg',
            partSizeActual: 1,
            data: {}
          })
          .put('https://fakebucketurl.aws.com/signed', { status: 200, headers: { 'Etag': 'fakeetag' } })
          .post('https://fakeproject.form.io/fakeform/storage/s3/multipart/complete', 200)
          .post('https://fakeproject.form.io/fakeform/storage/s3/multipart/abort', 200);
      });
      it('Given an array of signed urls it should upload a file to S3 using multipart upload', (done) => {
        const mockFormio = {
          formUrl: 'https://fakeproject.form.io/fakeform',
          getToken: () => {}
        };
        const s3 = new S3(mockFormio);
        const uploadSpy = sinon.spy(s3, 'uploadParts');
        const completeSpy = sinon.spy(s3, 'completeMultipartUpload');

        const mockFile = new File(['test!'], 'test.jpg', { type: 'image/jpeg' });
        s3.uploadFile(
          mockFile,
          'test.jpg',
          '',
          () => {},
          '',
          {},
          'test.jpg',
          {},
          '',
          () => {},
          { partSize: 1, changeMessage: () => {}, progressCallback: () => {} }
        ).then((response) => {
          assert.equal(response.storage, 's3');
          assert.equal(response.name, 'test.jpg');
          assert.equal(response.bucket, 'fakebucket');
          assert.equal(response.url, 'https://fakebucketurl.aws.com/test.jpg');
          assert.equal(response.acl, undefined);
          assert.equal(response.size, 5);
          assert.equal(response.type, 'image/jpeg');
          assert.equal(uploadSpy.callCount, 1);
          assert.equal(completeSpy.callCount, 1);
          done();
        });
      });
    });
  });
});
