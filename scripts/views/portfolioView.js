(function(module) {
  var portfolioView = {};

  portfolioView.handleAuthorFilter = function() {
    $('#author-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-author="' + $(this).val() + '"]').fadeIn(2000);
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#category-filter').val('');
    });
  };

  portfolioView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('article').hide();
        $('article[data-category="' + $(this).val() + '"]').fadeIn(2000);
      } else {
        $('article').fadeIn();
        $('article.template').hide();
      }
      $('#author-filter').val('');
    });
  };

  /*portfolioView.handleMainNav = function () {
    $('.nav-menu').on('click', '.tab', function(e) {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn(2000);
    });
    $('.nav-menu .tab:first').click();
  };*/

  portfolioView.setTeasers = function() {
    $('h2').prev('p').remove();
    $('h2').next('p').remove();
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      if($(this).text() === 'Read on →') {
        $(this).parent().find('*').fadeIn();
      } else {
        $('body').animate({
          scrollTop: ($(this).parent().offset().top)
        },200);
        $(this).html('Read on &rarr;');
        $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
      }
    });
  };

  portfolioView.renderIndex = function() {
    Portfolio.portfolios.forEach(function(a) {
      if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
        $('#category-filter').append(a.toHtml($('#category-filter-template')));
      };
      if($('#author-filter option:contains("'+ a.author + '")').length === 0) {
        $('#author-filter').append(a.toHtml($('#author-filter-template')));
      };
      $('#articles').append(a.toHtml($('#article-template')));
    });
    portfolioView.handleAuthorFilter();
    portfolioView.handleCategoryFilter();
    //portfolioView.handleMainNav();
    portfolioView.setTeasers();
  };
  Portfolio.fetchAll(portfolioView.renderIndex);
  module.portfolioView = portfolioView;
})(window);
