const express = require('express');
const router = express.Router();
const path = require('path');
let html = './public/html';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

const urlgenerator = require('urlgenerator');
const createURLwithParameters = urlgenerator.createURLwithParameters;
const baseURL = "localhost:3000";

// let parameters = { crap: 'taskybasky' };
// let finalURL = createURLwithParameters(baseURL, parameters);
// console.log("final URL is " , finalURL);




router.get('/', function(req, res) {
  res.sendFile(path.resolve(html + '/index.html'));
});
router.get('/redirect', function(req, res) {
    res.sendFile(path.resolve(html + '/redir.html'));

    let parameters = {crap1: 'toilet', crap2: 'handywash'};
    let finalURL = createURLwithParameters(baseURL, parameters);
    console.log("final URL is ", finalURL);
    res.redirect(finalURL)
});


    router.get('/task', function (req, res) {
        res.sendFile(path.resolve(html + '/task.html'));
    });




    router.get('/congrats', function (req, res) {
        res.sendFile(path.resolve(html + '/congrats.html'));
    });

    router.get('/form', function (req, res) {

    })

    router.post('/getForm', jsonParser, function (req, res) {
        console.log(req.body.login, req.body.password);
        
    } )



module.exports = router;
