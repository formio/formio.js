import NativePromise from 'native-promise-only';
var url = function (formio) {
    var xhrRequest = function (url, name, query, data, options, onprogress) {
        return new NativePromise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            var json = (typeof data === 'string');
            var fd = new FormData();
            if (typeof onprogress === 'function') {
                xhr.upload.onprogress = onprogress;
            }
            if (!json) {
                for (var key in data) {
                    fd.append(key, data[key]);
                }
            }
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    // Need to test if xhr.response is decoded or not.
                    var respData = {};
                    try {
                        respData = (typeof xhr.response === 'string') ? JSON.parse(xhr.response) : {};
                        respData = (respData && respData.data) ? respData.data : respData;
                    }
                    catch (err) {
                        respData = {};
                    }
                    // Get the url of the file.
                    var respUrl = respData.hasOwnProperty('url') ? respData.url : xhr.responseURL + "/" + name;
                    // If they provide relative url, then prepend the url.
                    if (respUrl && respUrl[0] === '/') {
                        respUrl = "" + url + respUrl;
                    }
                    resolve({ url: respUrl, data: respData });
                }
                else {
                    reject(xhr.response || 'Unable to upload file');
                }
            };
            xhr.onerror = function () { return reject(xhr); };
            xhr.onabort = function () { return reject(xhr); };
            var requestUrl = url + (url.indexOf('?') > -1 ? '&' : '?');
            for (var key in query) {
                requestUrl += key + "=" + query[key] + "&";
            }
            if (requestUrl[requestUrl.length - 1] === '&') {
                requestUrl = requestUrl.substr(0, requestUrl.length - 1);
            }
            xhr.open('POST', requestUrl);
            if (json) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }
            var token = formio.getToken();
            if (token) {
                xhr.setRequestHeader('x-jwt-token', token);
            }
            //Overrides previous request props
            if (options) {
                var parsedOptions = typeof options === 'string' ? JSON.parse(options) : options;
                for (var prop in parsedOptions) {
                    xhr[prop] = parsedOptions[prop];
                }
            }
            xhr.send(json ? data : fd);
        });
    };
    return {
        title: 'Url',
        name: 'url',
        uploadFile: function (file, name, dir, progressCallback, url, options, fileKey) {
            var uploadRequest = function (form) {
                var _a;
                return xhrRequest(url, name, {
                    baseUrl: encodeURIComponent(formio.projectUrl),
                    project: form ? form.project : '',
                    form: form ? form._id : ''
                }, (_a = {},
                    _a[fileKey] = file,
                    _a.name = name,
                    _a.dir = dir,
                    _a), options, progressCallback).then(function (response) {
                    // Store the project and form url along with the metadata.
                    response.data = response.data || {};
                    response.data.baseUrl = formio.projectUrl;
                    response.data.project = form ? form.project : '';
                    response.data.form = form ? form._id : '';
                    return {
                        storage: 'url',
                        name: name,
                        url: response.url,
                        size: file.size,
                        type: file.type,
                        data: response.data
                    };
                });
            };
            if (file.private && formio.formId) {
                return formio.loadForm().then(function (form) { return uploadRequest(form); });
            }
            else {
                return uploadRequest();
            }
        },
        deleteFile: function (fileInfo) {
            return new NativePromise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('DELETE', fileInfo.url, true);
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve('File deleted');
                    }
                    else {
                        reject(xhr.response || 'Unable to delete file');
                    }
                };
                xhr.send(null);
            });
        },
        downloadFile: function (file) {
            if (file.private) {
                if (formio.submissionId && file.data) {
                    file.data.submission = formio.submissionId;
                }
                return xhrRequest(file.url, file.name, {}, JSON.stringify(file)).then(function (response) { return response.data; });
            }
            // Return the original as there is nothing to do.
            return NativePromise.resolve(file);
        }
    };
};
url.title = 'Url';
export default url;
