const express = require('express');
const router = express.Router();
const path = require('path');
let html = '/Users/alex/Library/repos/becleany/public/html';



const urlgenerator = require('urlgenerator');
const createURLwithParameters = urlgenerator.createURLwithParameters;
const baseURL = "localhost:3000";

// let parameters = { crap: 'taskybasky' };
// let finalURL = createURLwithParameters(baseURL, parameters);
// console.log("final URL is " , finalURL);



router.get('/redirect', function(req, res) {
  res.sendFile(path.resolve( html +'/redirect.html'));
  let parameters = { crap1: 'toilet', crap2 : 'handywash' };
  let finalURL = createURLwithParameters(baseURL, parameters);
  console.log("final URL is " , finalURL);
  res.redirect(finalURL)
});

router.get('/', function(req, res) {
  res.sendFile(path.resolve( html +'/index.html'));
});


router.get('/task', function(req, res) {
  res.sendFile(path.resolve( html +'/task.html'));
});

router.get('/congrats', function(req, res) {
  res.sendFile(path.resolve( html +'/congrats.html'));
});



module.exports = router;
