(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('section[id="articles"]').hide();
    $('section[id="about"]').show();
  };

  module.aboutController = aboutController;
})(window);
