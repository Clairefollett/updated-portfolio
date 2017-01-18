(function(module) {
  var aboutControlller = {};

  aboutController.reveal = function() {
    $('section[id="articles"]').hide();
    $('section[id="about"]').show();
  };

  module.aboutController = aboutController;
})(window);
