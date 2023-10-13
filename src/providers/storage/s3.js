import NativePromise from 'native-promise-only';
import XHR from './xhr';
function s3(formio) {
  return {
    async uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback, multipartOptions) {
      const xhrCallback = async(xhr, response, abortCallback) => {
        response.data.fileName = fileName;
        response.data.key = XHR.path([response.data.key, dir, fileName]);
        if (response.signed) {
          if (multipartOptions && Array.isArray(response.signed)) {
            // patch abort callback
            const abortController = new AbortController();
            const abortSignal = abortController.signal;
            if (typeof abortCallback === 'function') {
              abortCallback(() => abortController.abort());
            }
            try {
              const parts = await this.uploadParts(
                file,
                response.signed,
                response.data.headers,
                response.partSizeActual,
                multipartOptions,
                abortSignal
              );
              await withRetries(this.completeMultipartUpload, [response, parts, multipartOptions], 3);
              return;
            }
            catch (err) {
              // abort in-progress fetch requests
              abortController.abort();
              // attempt to cancel the multipart upload
              this.abortMultipartUpload(response);
              throw err;
            }
          }
          else {
            xhr.openAndSetHeaders('PUT', response.signed);
            xhr.setRequestHeader('Content-Type', file.type);
            Object.keys(response.data.headers).forEach((key) => {
              xhr.setRequestHeader(key, response.data.headers[key]);
            });
            return file;
          }
        }
        else {
          const fd = new FormData();
          for (const key in response.data) {
            fd.append(key, response.data[key]);
          }
          fd.append('file', file);
          xhr.openAndSetHeaders('POST', response.url);
          return fd;
        }
      };
      const response = await XHR.upload(
        formio,
        's3',
        xhrCallback,
        file,
        fileName,
        dir,
        progressCallback,
        groupPermissions,
        groupId,
        abortCallback,
        multipartOptions
      );
      return {
        storage: 's3',
        name: fileName,
        bucket: response.bucket,
        key: response.data.key,
        url: XHR.path([response.url, response.data.key]),
        acl: response.data.acl,
        size: file.size,
        type: file.type
      };
    },
    async completeMultipartUpload(serverResponse, parts, multipart) {
      const { changeMessage } = multipart;
      changeMessage('Completing AWS S3 multipart upload...');
      const response = await fetch(`${formio.formUrl}/storage/s3/multipart/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parts, uploadId: serverResponse.uploadId, key: serverResponse.key })
      });
      const message = await response.text();
      if (!response.ok) {
        throw new Error(message);
      }
      // the AWS S3 SDK CompleteMultipartUpload command can return a HTTP 200 status header but still error;
      // we need to parse, and according to AWS, to retry
      if (message.match(/Error/)) {
          throw new Error(message);
      }
    },
    abortMultipartUpload(serverResponse) {
      const { uploadId, key } = serverResponse;
      fetch(`${formio.formUrl}/storage/s3/multipart/abort`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uploadId, key })
      });
    },
    uploadParts(file, urls, headers, partSize, multipart, abortSignal) {
      const { changeMessage, progressCallback } = multipart;
      changeMessage('Chunking and uploading parts to AWS S3...');
      const promises = [];
      for (let i = 0; i < urls.length; i++) {
        const start = i * partSize;
        const end = (i + 1) * partSize;
        const blob = i < urls.length ? file.slice(start, end) : file.slice(start);
        const promise = fetch(urls[i], {
          method: 'PUT',
          headers,
          body: blob,
          signal: abortSignal,
        }).then((res) => {
          if (res.ok) {
            progressCallback(urls.length);
            const eTag = res.headers.get('etag');
            if (!eTag) {
              throw new Error('ETag header not found; it must be exposed in S3 bucket CORS settings');
            }
            return { ETag: eTag, PartNumber: i + 1 };
          }
          else {
            throw new Error(`Part no ${i} failed with status ${res.status}`);
          }
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    },
    downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', `${formio.formUrl}/storage/s3?bucket=${XHR.trim(file.bucket)}&key=${XHR.trim(file.key)}`, 'GET');
      }
      else {
        return Promise.resolve(file);
      }
    }
  };
}

s3.title = 'S3';
export default s3;
