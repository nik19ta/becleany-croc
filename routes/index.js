
const express = require('express');
const router = express.Router();
const path = require('path');
let html = './public/html';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'VzCxia9LItze',
    database: 'croc'
});

function login(login, password){
    connection.query('SELECT * FROM users where login = login and password = password', (err, data, fields)=> {
        if (data.length > 0) {
            return "success"
        } else {
            return "error"
        }
    });
};
function reg(login, password) {
    connection.query('INSERT INTO users values (login, password)', (err, data, fields) => {
        if (err) {
            return "error"
        } else {
            return "success"
        }
    })}






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