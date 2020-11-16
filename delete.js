const db = require('./db')


function check() {

    let users = db.getAllUsers();

    for (let i = 0; i < users.length; i++) {
        if (users[i].time) {
            console.log(users[i].time);

            if (!if_time(users[i].time)) {
                users[i].task1 = ''
                users[i].task2 = ''
                users[i].task3 = ''
                users[i].task4 = ''
                users[i].task5 = ''
                users[i].task6 = ''
                users[i].task7 = ''
                users[i].time = ''
            }
        }
    }

    db.write_users(users)
}

function if_time(data) {
    return !((Date.parse(
            new Date()) / 1000 - Date.parse(data) / 1000) >
        (60 * 60 * 24 * 14) ?
        true : false);
}

// check()
module.exports.check = check;