var portfolios = [];

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
  $newPortfolio.attr('data-category', this.category);
  $newPortfolio.find('a').html(this.author);
  $newPortfolio.find('a').attr('href', this.authorUrl);
  $newPortfolio.find('h1').html(this.title);
  $newPortfolio.find('section.article-body').html(this.body);

  $newPortfolio.find('time[pubdate]').attr('title', this.publishedOn);
  $newPortfolio.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newPortfolio.removeAttr('class');

  return $newPortfolio;
};

portfolioData.sort(function(curElem, nextElem) {
  return (new
  Date(nextElem.publishedOn)) - (new Date(curElem.publishedOn));
});

portfolioData.forEach(function(ele) {
  portfolios.push(new Portfolio(ele));
});

portfolios.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
