module.exports = function(that) {
  var oAuthProvider = {};
  var settings = that.component.oauth;

  // Return Submission Data
  oAuthProvider.initiate = function (callback) {
    var params = {
      response_type: 'code',
      client_id: settings.clientId,
      redirect_uri: window.location.origin || window.location.protocol + '//' + window.location.host,
      state: settings.state,
      scope: settings.scope
    };

    params = Object.keys(params).map(function(key) {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    oAuthProvider.launch(params, callback)
  };


  // launch OAuth Window
  oAuthProvider.launch = function (params, callback) {
    var url = settings.authURI + '?' + params;
    var popup = window.open(url,settings.provider, 'width=1020,height=618');
    var interval = setInterval(function() {
      try {
        var popupHost = popup.location.host;
        var currentHost = window.location.host;
        if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
          popup.close();
          var params = popup.location.search.substr(1).split('&').reduce(function(params, param) {
            var split = param.split('=');
            params[split[0]] = split[1];
            return params;
          }, {});

          if (params.error) {
            alert(params.error_description || params.error)
          }

          if (settings.state !== params.state) {
            alert("OAuth state does not match. Please try logging in again.");
            return;
          }

          var submission = {data: {}, oauth: {}};
          submission.oauth[settings.provider] = params;
          submission.oauth[settings.provider].redirectURI = window.location.origin || window.location.protocol + '//' + window.location.host;
          return callback(that, submission);
        }
      }
      catch (error) {
        if (error.name !== 'SecurityError') {
          alert(error.message || error);
        }
      }
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(interval);
      }
    }, 100);
  };

  return oAuthProvider
};















