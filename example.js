const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123321123321',
    database: 'example'
});

connection.query('SELECT * FROM users', (err, data, fields)=> {
    console.log("Тут коллбек ( это типо функция которая вызывается когда запрос к бд завершён  ) ")
    console.log(data[0].id)
});

