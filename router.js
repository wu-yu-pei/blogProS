let list = require('./mysql.js')

module.exports = function(app) {

    // 查询所有用户的id和密码,进行登录
    app.get('/users',async (req,res) => {
        let allusers = await list.list(`select * from blogpro.usersinfo where userid=${req.query.userid} and userpassword="${req.query.password}"`)
        res.send(allusers)
    })
    // 用户注册 为用户创建数据库,并记录用户到usersinfo里面
    app.get('/setusers',async (req,res) => {
        list.connection.query('insert into blogpro.usersinfo(userid,userpassword,username,userinit) values (?,?,?,?)', [req.query.userid, req.query.password,req.query.username,req.query.userinit],err => {
            if(err){
                res.send(false)
            }else {
                res.send(true)
            }
        })
    })
    // 请求用户相关数据
    app.get('/userinfo',async (req,res) => {
        let allusers = await list.list(`select * from blogpro.usersinfo where userid=${req.query.userid}`)
        res.send(allusers)
    })
    // // 获取数据库里所有博客展示并且 按照时间排序
    // app.get('/blog',async(req,res) => {
    //     let arrs =  await list.list("SELECT * FROM blog.myblog  order by Myblogtime desc")
    //     res.send(arrs)
    // }),

    // // 提交保存博客
    // app.get('/save',(req,res) => {
    //     list.connection.query('insert into blog.myblog(Myblogid,Myblogtitle,Myblogbody,Myblogtime) values (?,?,?,?)', [req.query.id, req.query.title, req.query.body, req.query.time],err => {
    //         if(err) {
    //             console.log(err);
    //         }else {
    //             // console.log('Ok');
    //         }
    //     })
    // })

    // //查看博客
    // app.get('/search',async (req,res) => {
    //     let item =await  list.list(`select * from blog.myblog where Myblogid="${req.query.id}"`,err => {
    //         if(err) {
    //             console.log(err);
    //         }else {
    //             // console.log('oKK');
    //         }
    //     })
    //     res.send(item)
    // })
    
    // // 搜索博客
    // app.get('/searchdate',async (req,res) => {
    //     let items =await  list.list(`select * from blog.myblog where Myblogtitle REGEXP '${req.query.searchdate}'`,err => {
    //         if(err) {
    //             console.log(err);
    //         }else {
    //             // console.log('oKK');
    //         }
    //     })
    //     res.send(items)
    // })

}