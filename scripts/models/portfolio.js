(function(module) {
  function Portfolio (opts) {
    Object.keys(opts).forEach(function(element, index, keys) {
      this[element] = opts[element];
    }, this);
  }

  Portfolio.portfolios = [];

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

  Portfolio.fetchAll = function() {
    webDB.execute('SELECT * FROM portfolios ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Portfolio.loadAll(rows);
        portfolioView.renderIndex();
        portfolioView.initAdminPage();
      } else {
        $.getJSON('/data/portfolio.json', function(rawData) {
          rawData.forEach(function(item) {
            var portfolio = new Portfolio(item);
            portfolio.insertRecord();
          });
          webDB.execute('SELECT * FROM portfolios ORDER BY publishedOn DESC', function(rows) {
            Portfolio.loadAll(rows);
            portfolioView.renderIndex();
            portfolioView.initAdminPage();
          });
        });
      }
    });
  };

  Portfolio.allAuthors = function() {
    return Portfolio.portfolios.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name){
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Portfolio.numWordsAll = function() {
    return Portfolio.portfolios.map(function(article) {
      return article.body.match(/\w+/g).length;
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
        })
      };
    });
  };
  Portfolio.createTable();
  Portfolio.fetchAll();
  module.Portfolio = Portfolio;
})(window);
