(function(module) {
  function Portfolio (opts) {
    Object.keys(opts).forEach(function(element) {
      this[element] = opts[element];
    }, this);
  }

  Portfolio.portfolios = [];

  Portfolio.prototype.toHtml = function (scriptTemplateId) {
    var template = Handlebars.compile($(scriptTemplateId).text());
    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
    return template(this);
  };

  Portfolio.createTable = function () {
    webDB.execute(
      'CREATE TABLE IF NOT EXISTS portfolios (' +
      'id INTEGER PRIMARY KEY, ' +
      'title VARCHAR(255) NOT NULL, ' +
      'author VARCHAR(255) NOT NULL, ' +
      'authorUrl VARCHAR (255), ' +
      'category VARCHAR(20), ' +
      'publishedOn DATETIME, ' +
      'body TEXT NOT NULL);',
    function() {
      console.log('Successfully set up the portfolios table.');
    });
  };

  Portfolio.truncateTable = function() {
    webDB.execute(
      'DELETE FROM portfolios;'
    );
  };

  Portfolio.prototype.insertRecord = function() {
    webDB.execute(
      [
        {
          'sql': 'INSERT INTO portfolios (title, author, authorUrl, category, publishedOn, body) VALUES (?,?,?,?,?,?);',
          'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.body],
        }
      ]
    );
  };

  Portfolio.prototype.deleteRecord = function() {
    webDB.execute(
      [
        {
          'sql': 'DELETE FROM portfolios WHERE id = ?;',
          'data': [this.id]
        }
      ]
    );
  };

  //updaterecord
  Portfolio.prototype.updateRecord = function () {
    webDB.execute(
      [
        {
          'sql': 'UPDATE portfolios SET title = ?, author = ?, authorUrl = ?, category = ?, publishedOn = ?, body = ? WHERE ID = ?;',
          'data': [this.title, this.author, this.authorUrl, this.category, this.punlishedOn, this.body, this.id]
        }
      ]
    );
  };

  Portfolio.loadAll = function(rows) {
    Portfolio.portfolios = rows.map(function(ele) {
      return new Portfolio(ele);
    });
  };

  Portfolio.fetchAll = function(next) {
    webDB.execute('SELECT * FROM portfolios ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Portfolio.loadAll(rows);
        next();
      } else {
        $.getJSON('/data/portfolio.json', function(rawData) {
          rawData.forEach(function(item) {
            var portfolio = new Portfolio(item);
            portfolio.insertRecord();
          });
          webDB.execute('SELECT * FROM portfolios ORDER BY publishedOn DESC', function(rows) {
            Portfolio.loadAll(rows);
            next();
          });
        });
      }
    });
  };

  Portfolio.allAuthors = function() {
    return Portfolio.portfolios.map(function(article) {
      return portfolio.author;
    })
    .reduce(function(names, name){
      if (names.indexOf(name) < 0) {
        name.push(name);
      }
      return names;
    }, []);
  };

  Portfolio.numWordsAll = function() {
    return Portfolio.portfolios.map(function(article) {
      return portfolio.body.match(/\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Portfolio.numWordsByAuthor = function() {
    return Portfolio.allAuthors().map(function(author) {
      console.log(author);
      return {
        name: author,
        numWords: Portfolio.portfolios.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        }, 0)
      };
    });
  };
  Portfolio.createTable();
  module.Portfolio = Portfolio;
})(window);
