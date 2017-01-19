(function(module) {
  var reposObj = {};

  reposObj.allRepos = [];

  reposObj.requestRepos = function(callback) {
    $.ajax('https://api.github.com/user/repos', {
      method: 'GET',
      data: {
        access_token: token
      },
      success: function(response) {
        console.log('SUCCESS!');
        console.log('response');
        response.forEach(function(ele) {
          reposObj.allRepos.push(ele);
        });
        callback();
      },
      error: function(response) {
        console.log('error');
        console.log(response);
      }
    });
  };

  reposObj.withTheAttribute = function(myAttr) {
    return reposObj.allRepos.filter(function(aRepo){
      return aRepo[myAttr];
    });
  };

  module.reposObj = reposObj;
})(window);
