import XHR from './xhr';
function s3(formio) {
  return {
    async uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback, multipart) {
      const xhrCallback = async(xhr, response) => {
        response.data.fileName = fileName;
        response.data.key = XHR.path([response.data.key, dir, fileName]);
        if (response.signed) {
          if (multipart && Array.isArray(response.signed)) {
            try {
              const parts = await this.uploadParts(file, response.signed, response.data.headers, multipart);
              await this.completeMultipartUpload(response, parts, multipart, 3);
              return;
            }
            catch (err) {
              // attempt to cancel the multipart upload
              this.abortMultipartUpload(response);
              throw err;
            }
          }
          else {
            xhr.openAndSetHeaders('PUT', response.signed);
            xhr.setRequestHeader('Content-Type', file.type);
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
        multipart
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
    async completeMultipartUpload(serverResponse, parts, multipart, retries) {
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
        if (retries <= 0) {
          throw new Error(message);
        }
        this.completeMultipartUpload(serverResponse, parts, retries - 1);
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
    uploadParts(file, urls, headers, multipart) {
      const { partSize, changeMessage, progressCallback } = multipart;
      changeMessage('Chunking and uploading parts to AWS S3...');
      const promises = [];
      for (let i = 0; i < urls.length; i++) {
        const calculatedPartSize = partSize * 1048576;
        const start = i * calculatedPartSize;
        const end = (i + 1) * calculatedPartSize;
        const blob = i < urls.length ? file.slice(start, end) : file.slice(start);
        const promise = fetch(urls[i], {
          method: 'PUT',
          headers,
          body: blob
        }).then((res) => {
          progressCallback(urls.length);
          return { ETag: res.headers.get('etag'), PartNumber: i + 1 };
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
