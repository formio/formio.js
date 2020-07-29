import NativePromise from 'native-promise-only';
var base64 = function () { return ({
    title: 'Base64',
    name: 'base64',
    uploadFile: function (file, fileName) {
        var _this = this;
        var reader = new FileReader();
        return new NativePromise(function (resolve, reject) {
            reader.onload = function (event) {
                var url = event.target.result;
                resolve({
                    storage: 'base64',
                    name: fileName,
                    url: url,
                    size: file.size,
                    type: file.type,
                });
            };
            reader.onerror = function () {
                return reject(_this);
            };
            reader.readAsDataURL(file);
        });
    },
    downloadFile: function (file) {
        // Return the original as there is nothing to do.
        return NativePromise.resolve(file);
    }
}); };
base64.title = 'Base64';
export default base64;
