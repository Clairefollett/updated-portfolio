(function(module) {
  var portfolioController = {};

  portfolioController.index = function () {
    $('.tab-content').hide();
    $('#articles').fadeIn();
  };

  module.portfolioController = portfolioController;
})(window);
