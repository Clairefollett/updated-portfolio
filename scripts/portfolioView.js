var portfolioView = {};

portfolioView.populateFilters = function () {
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

portfolioView.handleAuthorFilter = function () {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      var $article = $('article');
      var authorName = $(this).val();

      $article.hide();

      $('article[data-author="' + authorName + '"]').fadeIn(2000);
    } else {
      $article.not('template').show();
    }
    $('#category-filter').val('');
  });
};

portfolioView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var $article = $('article');
      var category = $(this).val();
      $article.hide();
      $('article[data-category="' + category + '"]').fadeIn(2000);
    } else {
      $article.not('template').show();
    }
    $('#author-filter').val('');
  });
};

portfolioView.handleMainNav = function () {
  $('.nav-menu').on('click', '.tab', function() {
    var clickedTab = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + clickedTab).fadeIn(2000);
  });
  $('.nav-menu .tab:first').click();
};

/*portfolioView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide();
  var $readOn = $('a.read-on');
  $readOn.on('click', function(event){
    event.preventDefault();
    $readOn.parent().find('*').show();
    $readOn.hide();
  });
};*/

portfolioView.populateFilters();
portfolioView.handleAuthorFilter();
portfolioView.handleCategoryFilter();
portfolioView.handleMainNav();
/*portfolioView.setTeasers();*/
