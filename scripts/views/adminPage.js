(function() {
  var adminView = {
    initAdminPage : function() {
      var template = Handlebars.compile($('#author-template').text());
      Portfolio.numWordsByAuthor().forEach(function(stat) {
        $('.author-stats').append(template(stat));
      });
      $('#blog-stats .articles').text(Portfolio.portfolios.length);
      $('#blog-stats .words').text(Portfolio.numWordsAll());
    }
  };
  Portfolio.fetchAll(portfolioView.initAdminPage);
})();
