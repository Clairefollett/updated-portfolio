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
  var source = $('#article-template').html();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  var html = template(this);

  return html;
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
