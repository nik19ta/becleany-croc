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
const baseURL = "213.189.216.91:3000";

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
    obj = db.select_user_cookie(req.cookies['user']);
    console.log();
    try {
        if (obj.login == 'admin') {
        res.sendFile(path.resolve(html + '/admin.html'));
    } else {
        res.sendFile(path.resolve(html + '/no.html'));
    }
    } catch (error) {
        res.sendFile(path.resolve(html + '/no.html'));
    }
});
router.post('/login_form', jsonParser, async function (req, res) {
    let cookie = db.generate(12);
    let user = db.select_user_obj(req.body.login, req.body.password);
    if (user) {
        await db.add_cookie(req.body.login, req.body.password, cookie)
        res.cookie("user", cookie);
        res.send({"status":"ok"});
    } else {
        res.send({"status":"error"});
    }
})
router.post('/task_get', jsonParser, function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    let tasks = db.select_tasks();
    if (user != null) {
        res.send({"data":user, "tasks": tasks});
    } else {
        res.send({"status":"error"});
    }
})
router.post('/reg_form', jsonParser, async function (req, res) {
    let cookie = db.generate(12);
    console.log(cookie);
    await db.new_obj({
        login: req.body.login,
        password: req.body.password,
        task1: "",
        task2: "",
        task3: "",
        task4: "",
        task5: "",
        task6: "",
        task7: "",
        cookie: [`${cookie}`]
    })
    res.cookie("user", cookie);
    res.send('ok');
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
    obj = db.select_user_cookie(req.cookies['user']);
    if (obj != null) {
        try {
            let param_name = db.select_task(req.body.param1,req.body.param2)
            if (param_name) {
                db.edit_user(obj.login, obj.password, `task${param_name['num']}`, param_name['name'])
                res.send({staus:'ok'});
            } else {
                res.send({staus:'error task'})
            }
        } catch (error) {
            res.send({staus:'error task'})
        }
    } else {
        res.send({staus:'no cookie'});
    }
    
})



module.exports = router;