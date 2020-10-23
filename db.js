const fs = require('fs');
const filename = "./db.json";
const encoding = "utf8";

const randint = (min, max) => {
    return +(Math.random() * (max - min) + min).toFixed(0)
};

function new_user(login, password) {
    let user = {
        login: login,
        password: password,
        task1: '',
        task2: '',
        task3: '',
        task4: '',
        task5: '',
        task6: '',
        task7: '',
        cookie: ''
    };
    fs.readFile(filename, encoding, function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        data['users'].push(user);
        fs.writeFileSync(filename, JSON.stringify(data));
    });
    return true
}
function new_obj(obj) {
    fs.readFile(filename, encoding, function (err, data) {
        if (err) throw err;
        data = JSON.parse(data);
        data.users.push(obj)
        fs.writeFileSync(filename, JSON.stringify(data));
    });
    return true
}

function select_user(login, password) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        if (login === data['users'][i].login && password === data['users'][i].password) {
            count = 1;
            break
        }
    }
    return count > 0
};

function edit_user(login, password, taskNum, text) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let count = 0;
    for (let i = 0; i < data['users'].length; i++) {
        if (login === data['users'][i].login && password === data['users'][i].password) {
            data['users'][i][taskNum] = text;
        }
    }
    console.log(data);
    fs.writeFileSync(filename, JSON.stringify(data));
    return count > 0
}
function getAllUsers() {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    return data['users']
}
function select_task(param1, param2) {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    let name = false;
    for (let i = 0; i < data['task_list'].length; i++) {
        if (param1 === data['task_list'][i].param1 && param2 === data['task_list'][i].param2) {
            name = data['task_list'][i].name;
            break
        }
    }
    return name
}
function zeroing() {
    let file = fs.readFileSync(filename, encoding);
    let data = JSON.parse(file);
    for (let i = 0; i < data['users'].length; i++) {
        data['users'][i]['task1'] = "";
        data['users'][i]['task2'] = "";
        data['users'][i]['task3'] = "";
        data['users'][i]['task4'] = "";
        data['users'][i]['task5'] = "";
        data['users'][i]['task6'] = "";
        data['users'][i]['task7'] = "";
    }
    fs.writeFileSync(filename, JSON.stringify(data));
    return true
}
function generate() {
    const cl = 'qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*';
    let rand = "";

    for (let i = 0; i < 12; i++) {
        rand = rand + cl[randint(0,cl.length)]
    }

    return rand
}

// создать новго юзера
// new_user('login', 'password')

// проверить если ли такой юзер 
// console.log(select_user('alex', 3275));

// первым и вторым параметром предаётмя логин а пароль, третьем task чётвёртым значения таска
// edit_user('alex', 3275, 'task2','тшлс')

// для того что бы получить всех юзеров
// console.log(getAllUsers());

// что того что бы получить какой то task или проверить есть ли он вообще
// console.log(select_task(477, 3731));

// функция которая обнуляет все таски у юзеров
// zeroing()

module.exports.zeroing = zeroing;
module.exports.select_task = select_task;
module.exports.getAllUsers = getAllUsers;
module.exports.edit_user = edit_user;
module.exports.select_user = select_user;
module.exports.new_user = new_user;
module.exports.generate = generate;
module.exports.new_obj = new_obj;