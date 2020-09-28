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
}

function reg(login, password){
    connection.query('INSERT INTO users values (login, password)', (err, data, fields) => {
        if (err) {
            return "error"
        } else {
            return "success"
        }
    })

}
//
// connection.query('SELECT * FROM users', (err, data, fields)=> {
//     console.log("Тут коллбек ( это типо функция которая вызывается когда запрос к бд завершён  ) ")
//     console.log(data[0].id)
// });

module.exports;