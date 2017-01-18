(function(module) {
  function Portfolio (opts) {
    for (key in opts) {
      this[key] = opts[key];
    }
  }


  Portfolio.portfolios = [];

  Portfolio.prototype.toHtml = function (scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    this.body = marked(this.body);
    return template(this);
  };

  Portfolio.loadAll = function(dataWePassIn) {
    Portfolio.portfolios = dataWePassIn.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).map(function(ele) {
      return new Portfolio(ele);
    });
  };

  Portfolio.fetchAll = function(nextFunction) {
    if (localStorage.portfolio) {
      $.ajax({
        type: 'HEAD',
        url: '/data/portfolio.json',
        success: function(data, message, xhr) {
          var eTag = xhr.getResponseHeader('eTag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Portfolio.getAll(nextFunction);
          } else {
            Portfolio.loadAll(JSON.parse(localStorage.portfolio));
            nextFunction();
          }
        }
      });
    } else {
      Portfolio.getAll(nextFunction);
    }
  };

  Portfolio.getAll = function(nextFunction) {
    $.getJSON('/data/portfolio.json', function(responseData) {
      Portfolio.loadAll(responseData);
      localStorage.portfolio = JSON.stringify(responseData);
      nextFunction();
    });
  };

  Portfolio.numWordsAll = function() {
    return Portfolio.portfolios.map(function(article) {
      return article.body.match(/\w+/g).length;
    })
    .reduce(function(acc, curr) {
      return acc + curr;
    }, 0);
  };

  Portfolio.allAuthors = function() {
    return Portfolio.portfolios.map(function(article) {
      return article.author;
    })
    .reduce(function(uniqueAuthors, author){
      if (uniqueAuthors.indexOf(author) < 0) {
        uniqueAuthors.push(author);
      };
      return uniqueAuthors;
    }, []);
  };

  Portfolio.numWordsByAuthor = function() {
    return Portfolio.allAuthors().map(function(author) {
      console.log(author);
      return {
        name: author,
        numWords: Portfolio.portfolios.filter(function(curArticle) {
          if (author === curArticle.author) {return true;}
        })
        .map(function(curArticle) {
          return curArticle.body.match(/\w+/g).length;
        })
        .reduce(function(acc, cur) {
          return acc + cur;
        }, 0)
      };
    });
  };
  module.Portfolio = Portfolio;
})(window);
