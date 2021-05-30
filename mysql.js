let mysql = require('mysql')

// MySQL部分
let options = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'blogpro',
        useConnectionPooling: true
    }
    // 创建实列
let connection = mysql.createConnection(options)
    // 连接
connection.connect(err => {
    if(err) {
        console.log(err);
    }else {
        console.log("连接成功");
    }
})

function getServeData(sqlstr) {
    return new Promise((resolve, reject) => {
        connection.query(sqlstr, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}


module.exports = {
    async list(sqlstr) {
        let res = await getServeData(sqlstr)
        return res
    },
    connection
}