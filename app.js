let express = require('express')

let router = require('./router')

let app = express()


// 服务端解决跨域问题   允许所有人访问
// app.all('*', function(req, res, next) {
//     //设为指定的域
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header("X-Powered-By", ' 3.2.1');
//     next();
// });


router(app)

app.listen(8081, () => {
    console.log("服务器启动成功····✈····🚆");
})
