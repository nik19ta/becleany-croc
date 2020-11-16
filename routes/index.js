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
const baseURL = "194.242.120.3:3000";

// let parameters = { crap: 'taskybasky' };
// let finalURL = createURLwithParameters(baseURL, parameters);
// //console.log("final URL is " , finalURL);

const csvWriter = require('csv-write-stream');
const csv = require('csv-parser');
const fs = require("fs");

let writer = csvWriter({
    sendHeaders: false
});




router.get('/', function (req, res) {
    res.sendFile(path.resolve(html + '/index.html'));
});
router.get('/redirect', function (req, res) {
    res.sendFile(path.resolve(html + '/redir.html'));
    // TODO cookies verification

    // let parameters = {crap1: 'toilet', crap2: 'handywash'};
    // let finalURL = createURLwithParameters(baseURL, parameters);
    // //console.log("final URL is ", finalURL);
    // res.redirect(finalURL)
});


router.get('/lk', function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    if (user != null) {
        res.sendFile(path.resolve(html + '/task.html'));
    } else {
        res.redirect("/login")
    }
});
router.get('/congrats', function (req, res) {
    res.sendFile(path.resolve(html + '/congrats.html'));
});
router.get('/login', function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    if (user != null) {
        res.redirect("/lk")
    } else {
        res.sendFile(path.resolve(html + '/login.html'));
    }
});

router.get('/admin', function (req, res) {
    obj = db.select_user_cookie(req.cookies['user']);
    //console.log();
    try {
        if (obj.login == 'admin@croc.ru') {
            res.sendFile(path.resolve(html + '/admin.html'));
        } else {
            res.sendFile(path.resolve(html + '/no.html'));
        }
    } catch (error) {
        res.sendFile(path.resolve(html + '/no.html'));
    }
});
router.get('/get_users_in_csv', function (req, res) {
    obj = db.select_user_cookie(req.cookies['user']);

    if (obj.login == 'admin@croc.ru') {
        let objs = db.getAllUsers()

        writer.pipe(fs.createWriteStream('./data.csv', {
            flags: 'a'
        }));

        for (let i = 0; i < objs.length; i++) {

            let tc = false;
            if (objs[i].task1 != '' && objs[i].task2 != '' && objs[i].task3 != '' && objs[i].task4 != '' && objs[i].task5 != '' && objs[i].task6 != '') {
                tc = true;
            } else {
                tc = false;
            }

            writer.write({
                login: objs[i].login,
                tasks_complete: tc,
            });

        }
        writer.end()

        setTimeout(() => {
            res.sendFile(path.resolve('./data.csv'));
        }, 600);
        setTimeout(() => {
            fs.unlink('./data.csv', function (err) {
                if (err) return console.log(err);
            });

        }, 1000)
    } else {
        res.sendFile(path.resolve(html + '/no.html'));
    }
});
router.post('/login_form', jsonParser, async function (req, res) {
    let cookie = db.generate(12);
    let user = db.select_user_obj(req.body.login, req.body.password);
    if (user) {
        await db.add_cookie(req.body.login, req.body.password, cookie)
        res.cookie("user", cookie);
        res.send({
            "status": "ok"
        });
    } else {
        res.send({
            "status": "error"
        });
    }
})
// removeA(ary, 'seven');
// VLHIrdjOaWUEirY
router.post('/exit', jsonParser, async function (req, res) {
    db.cookie_del(req.cookies['user'])
    res.cookie("user", null);
    res.send({
        "status": "ok"
    });
})
router.post('/task_get', jsonParser, function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    let tasks = db.select_tasks();
    if (user != null) {
        res.send({
            "data": user,
            "tasks": tasks
        });
    } else {
        res.send({
            "status": "error"
        });
    }
})
router.post('/user_cookie', jsonParser, function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    if (user != null) {
        res.send({
            "status": true
        });
    } else {
        res.send({
            "status": false
        });
    }
})
router.post('/reg_form', jsonParser, async function (req, res) {
    let cookie = db.generate(12);
    //console.log(cookie);
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
        cookie: [`${cookie}`],
        time: ""
    })
    res.cookie("user", cookie);
    res.send('ok');
})
router.get('/registration', function (req, res) {
    let user = db.select_user_cookie(req.cookies['user']);
    if (user != null) {
        res.redirect("/lk")
    } else {
        res.sendFile(path.resolve(html + '/registration.html'));
    }
});
router.get('/congrats', function (req, res) {
    res.sendFile(path.resolve(html + '/congrats.html'));
});
router.get('/form', function (req, res) {

})
router.post('/getForm', jsonParser, function (req, res) {
    //console.log(req.body.login, req.body.password);
})
router.post('/checkParams', jsonParser, function (req, res) {
    obj = db.select_user_cookie(req.cookies['user']);
    if (obj != null) {
        try {
            let param_name = db.select_task(req.body.param1, req.body.param2)
            if (param_name) {
                db.edit_user(obj.login, obj.password, `task${param_name['num']}`, param_name['name'])
                if (
                    obj.task1 == '' &&
                    obj.task2 == '' &&
                    obj.task3 == '' &&
                    obj.task4 == '' &&
                    obj.task5 == '' &&
                    obj.task6 == ''
                ) {
                    db.edit_user(obj.login, obj.password, 'time', new Date)
                }

                res.send({
                    staus: 'ok'
                });
            } else {
                res.send({
                    staus: 'error task'
                })
            }
        } catch (error) {
            res.send({
                staus: 'error task'
            })
        }
    } else {
        res.send({
            staus: 'no cookie'
        });
    }

})



module.exports = router;