var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */
router.get('/articles', function(req, res, next){
  Article.findAll()
    .then(result => res.json(result))
    .catch(next);
});

router.get('/articles/:id', function(req, res, next){
  var currentId = req.params.id;

  Article.findById(currentId)
    .then(result => {
      if (result){
        res.json(result);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

router.post('/articles', function(req, res, next){
  Article.create(req.body)
    .then(result => res.json({
      message: 'Created successfully',
      article: result
    }))
  .catch(next);
});

router.put('/articles/:id', function(req, res, next){
  var currentId = req.params.id;

  Article.findById(currentId)
    .then(result => result.update(req.body))
    .then(result => res.json({
      message: 'Updated successfully',
      article: result
    }))
    .catch(next);
});

module.exports = router;
