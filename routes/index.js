const express = require('express');
const router = express.Router();
const path = require('path');
let html = '/Users/alex/Library/repos/becleany/public/html';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve( html +'/index.html'));
});

router.get('/task', function(req, res, next) {
  res.sendFile(path.resolve( html +'/task.html'));
});

router.get('/congrats', function(req, res, next) {
  res.sendFile(path.resolve( html +'/congrats.html'));
});



module.exports = router;
