'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  snippet: {
    type: Sequelize.VIRTUAL,
    get () {
      if (this.content){
        return `${this.content.slice(0, 23)}...`;
      } else {
        return '';
      }
    }
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
    allowNull: true,
    get () {
      if (this.dataValues.tags.length > 0){
        return this.dataValues.tags.join(', ')
      }
    }
  }
});

Article.prototype.truncate = function(num){
  this.content = this.content.slice(0, num);
};

Article.findByTitle = function(currentTitle){
  return Article.findOne({
    where: {title: currentTitle}
  });
};

Article.hook('beforeUpdate', function(article){
  article.version++;
});

Article.belongsTo(User, {as: 'author'});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
