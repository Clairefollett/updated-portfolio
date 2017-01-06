var portfolioView = {};

portfolioView.populateFilters = function() {
  $('article').not('.template').each(function() {
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

portfolioView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {

      $('article').hide();

      $('article').not('.template').each(function(){
        var author = $(this).find('address a').text();
        var selection = $('#author-filter').val();
        if( author === selection ){
          $(this).fadeIn(3000);
        };
      });
    }
    else {
      $('article').not('.template').fadeIn(3000);
    }
    $('#category-filter').val('');
  }
);
};

portfolioView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();

      $('article').not('.template').each(function(){
        var category = $(this).attr('data-category');
        var selection = $('#category-filter').val();
        if( category === selection ){
          $(this).fadeIn(3000);
        };
      });
    }
    else {
      $('article').not('.template').fadeIn(3000);
    }
    $('#author-filter').val('');
  }
);
};

portfolioView.handleMainNav = function () {
  $('.nav-menu').on('click', '.tab', function() {
    $('.tab').show();
    $(this).hide();

    var content = $(this).attr('data-content');

    $('.tab-content').hide();
    $('#' + content).fadeIn(3000);
  });

  $('.nav-menu .tab:first').click();
};

portfolioView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();

  $('.read-on').on('click', function(event) {
    event.preventDefault();
    if ($(this).text() === 'Read on') {
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    };
  });
};

portfolioView.populateFilters();
portfolioView.handleAuthorFilter();
portfolioView.handleCategoryFilter();
portfolioView.handleMainNav();
portfolioView.setTeasers();
