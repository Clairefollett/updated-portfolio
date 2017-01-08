//var portfolio = [];
Portfolio.portfolios = [];

localStorage.setItem('getStatus', 'false');

function Portfolio (opts) {
  for (keys in opts) {
    this[keys] = opts[keys];
  }
}



Portfolio.prototype.toHtml = function (scriptTemplateId) {
  //var source = $('#article-template').html();
  //var template = Handlebars.compile(source);
  var template = Handlebars.compile($(scriptTemplateId).text());
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  //var html = template(this);
  this.body = marked(this.body);
  return template(this);
  //return html;
};
Portfolio.sortDataAndPush = function(localData) {
  localData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  localData.forEach(function(ele) {
    Portfolio.portfolios.push(new Portfolio(ele));
  });
};
//portfolio.forEach(function(a) {
  //$('#articles').append(a.toHtml());
//});
