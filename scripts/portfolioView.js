var portfolioView = {};

// portfolioView.populateFilters = function() {
//   $('article').not('.template').each(function() {
//     var authorName, category, optionTag;
//     authorName = $(this).find('address a').text();
//     optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
//     $('#author-filter').append(optionTag);
//     category = $(this).attr('data-category');
//     optionTag = '<option value="' + category + '">' + category + '</option>';
//     if ($('#category-filter option[value="' + category + '"]').length === 0) {
//       $('#category-filter').append(optionTag);
//     }
//   });
// };

portfolioView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn(2000);

      // $('article').not('.template').each(function(){
      //   var author = $(this).find('address a').text();
      //   var selection = $('#author-filter').val();
      //   if( author === selection ){
      //     $(this).fadeIn(3000);
        //};
      //});
    } else {
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
      $('article[data-category="' + $(this).val() + '"]').fadeIn(2000);

    //   $('article').not('.template').each(function(){
    //     var category = $(this).attr('data-category');
    //     var selection = $('#category-filter').val();
    //     if( category === selection ){
    //       $(this).fadeIn(3000);
    //     };
    //   });
    } else {
      $('article').not('.template').fadeIn(3000);
    }
    $('#author-filter').val('');
  }
);
};

portfolioView.handleMainNav = function () {
  $('.nav-menu').on('click', '.tab', function() {
    $('.tab-content').hide();
    var content = $(this).attr('data-content');
    $('#' + content).fadeIn(2000);
  });
  $('.nav-menu .tab:first').click();
};

portfolioView.setTeasers = function() {
  // $('.article-body *:nth-of-type(n+2)').hide();
  //
  // $('.read-on').on('click', function(event) {
  //   event.preventDefault();
  //   if ($(this).text() === 'Read on') {
  //     $(this).parent().find('*').fadeIn();
  //     $(this).hide();
  $('h2').prev('p').remove();
  $('h2').next('p').remove();
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
    //$(this).html('Show Less &larr;');
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
    $('#articles').append(a.toHtml('#article-template'));
    if($('#category-filter option:contains("'+ a.category + '")').length === 0) {
      $('#category-filter').append(a.toHtml('#category-filter-template'));
    };
    if($('#author-filter option:contains("'+ a.author + '")').length === 0) {
      $('#author-filter').append(a.toHtml('#author-filter-template'));
    };
  });
//portfolioView.populateFilters();
  portfolioView.handleAuthorFilter();
  portfolioView.handleCategoryFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();
};

$.getJSON('data/portfolio.json').done( function(data) {
  Portfolio.sortDataAndPush(data);
  portfolioView.renderIndex();
});
