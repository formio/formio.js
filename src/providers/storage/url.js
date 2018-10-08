import Storage from './Storage';

export default class Url extends Storage {
  static name = 'url';

  getAdditionalFileData(response) {
    // Need to test if xhr.response is decoded or not.
    let respData = {};
    try {
      respData = (response === 'string') ? JSON.parse(response) : {};
      respData = (respData && respData.data) ? respData.data : respData;
    }
    catch (err) {
      respData = {};
    }

    const result = {
      data: respData,
    };

    if (respData.url) {
      result.url = respData.url;
    }

    return result;
  }
}
