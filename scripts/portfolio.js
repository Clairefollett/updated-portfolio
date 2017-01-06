var portfolio = [];

function Portfolio (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Portfolio.prototype.toHtml = function () {
  var $newPortfolio = $('article.template').clone();
  $newPortfolio.removeClass('template');
  $newPortfolio.attr('data-author', this.author);
  $newPortfolio.attr('data-category', this.category);

  $newPortfolio.find('.byline a').text(this.author);
  $newPortfolio.find('.byline a').attr('href', this.authorUrl);
  $newPortfolio.find('h1:first').html(this.title);
  $newPortfolio.find('.article-body').html(this.body);
  $newPortfolio.find('time[pubdate]').attr('datetime', this.publishedOn);
  $newPortfolio.find('time[pubdate]').attr('title', this.publishedOn);
  $newPortfolio.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  return $newPortfolio;
};

data.sort(function(a, b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

data.forEach(function(ele) {
  portfolio.push(new Portfolio(ele));
});

portfolio.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
