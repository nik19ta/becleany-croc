const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();
const path = require('path');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const db = require('../db')

const html = './public/html';

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
    // TODO cookies verification

    // let parameters = {crap1: 'toilet', crap2: 'handywash'};
    // let finalURL = createURLwithParameters(baseURL, parameters);
    // console.log("final URL is ", finalURL);
    // res.redirect(finalURL)
});


router.get('/task', function (req, res) {
    res.sendFile(path.resolve(html + '/task.html'));
});
router.get('/login', function (req, res) {
    res.sendFile(path.resolve(html + '/login.html'));

});
router.get('/admin', function (req, res) {
    res.sendFile(path.resolve(html + '/admin.html'));
    // TODO cookies verification

});
router.post('/login_form', jsonParser, function (req, res) {
    console.log(req.body.login, req.body.password);
    if (db.select_user(req.body.login, req.body.password)) {
        let cookie = db.generate();
        db.edit_user(req.body.login, req.body.password, 'cookie', cookie)
        res.cookie('user', cookie).send('cookie set');
        res.send('ok');
    } else {
        res.send('error');
    }
})
router.get('/registration', function (req, res) {
    res.sendFile(path.resolve(html + '/registration.html'));
});
router.get('/congrats', function (req, res) {
    res.sendFile(path.resolve(html + '/congrats.html'));
});
router.get('/form', function (req, res) {

})
router.post('/getForm', jsonParser, function (req, res) {
    console.log(req.body.login, req.body.password);   
})
router.post('/checkParams', jsonParser, function (req, res) {
    console.log(`Человек перешёл по ссылки у которой параметры ${req.body.param1}, ${req.body.param2}`);

})



module.exports = router;