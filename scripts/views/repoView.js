(function(module) {
  var repoView = {};

  var repoCompiler = function (element) {
    var source = $('#repo-template').html();
    var template = Handlebars.compile(source);
    var html = template(element);
    return html;
  };

  repoView.renderRepos = function () {
    $('#about ul').empty().append(reposObj.withTheAttribute('name')
    .map(repoCompiler)
    );
  };

  reposObj.requestRepos(repoView.renderRepos);
})(window);
