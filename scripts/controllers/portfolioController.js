(function(module) {
  var portfolioController = {};

  portfolioController.reveal = function () {
    $('section[id="about"]').hide();
    $('section[id="articles"]').show();
  };

  module.portfolioController = portfolioController;
})(window);
