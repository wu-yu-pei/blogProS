const { query, json } = require('express')
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

    // 请求用户所有文章
    app.get('/userallactive',async (req,res) => {
        // 按时间排序
        let userallactive = await list.list(`SELECT * FROM blogpro.acticle,blogpro.acticleinfo where userphone=${req.query.phone} and blogpro.acticle.acticleid = blogpro.acticleinfo.acticleinfoid order by acticleinfotime desc`)
        // console.log(userallactive);
        res.send(userallactive)
    })

    //请求用户的指定文章
    app.get('/useraticle',async (req,res) => {
        // console.log(req.query);
        // let useraticle = await list.list(`SELECT * FROM blogpro.acticle,blogpro.acticleinfo where userphone=${req.query.phone} and blogpro.acticle.acticleid = blogpro.acticleinfo.acticleinfoid and blogpro.acticle.acticleid = "${req.query.id}"`)
        let useraticle = await list.list(`SELECT * FROM blogpro.acticleinfo where  blogpro.acticleinfo.acticleinfoid ="${req.query.id}"`)
        res.send(useraticle)
    }) 

    //修改用户数据
    app.get('/change',async (req,res) => {
            list.connection.query(`update blogpro.acticleinfo set acticleinfobody = ?,  acticleinfotime = ? , acticleinfotitle = ?, acticleinfocol = ? where acticleinfoid = ? `, [req.query.body,req.query.time,req.query.title,req.query.type,req.query.id],err => {
            if(err) {
                console.log(err);
            }else {
                res.send('ok')
            }
        })
    })
    // 提交blog
    app.get('/write', (req,res) => {
            list.connection.query('insert into blogpro.acticle(userphone,acticleid) values (?,?)', [req.query.phone, req.query.id],err => {
                if(err) {
                    console.log(err);
                }else {
                    res.send('ok')
                }
            })
    })
    app.get('/writeinfo', (req,res) => {
        let id = req.query.id
        let title = req.query.title
        let time = req.query.time
        let body = req.query.body
        let readcount = req.query.readcount
        let likecount = req.query.likecount
        let type = req.query.type
            list.connection.query('insert into blogpro.acticleinfo(acticleinfoid,acticleinfotitle,acticleinfotime,acticleinfobody,acticleinforeadcount,acticleinfolikecount,acticleinfocol) values (?,?,?,?,?,?,?)', [id, title,time,body,readcount,likecount,type],err => {
                if(err) {
                    console.log(err);
                }else {
                    res.send('ok')
                }
        })
    })
    // 请求所有用户的文章
    app.get('/alluseracticle',async (req,res) => {
        let allusersacticle = await list.list(`SELECT * FROM blogpro.acticleinfo order by acticleinfotime desc`)
        res.send(allusersacticle)
    })
    // 查询用户信息
    app.get('/searchuser',async (req,res) => {
        let user = await list.list(`SELECT * FROM blogpro.usersinfo,blogpro.acticle,blogpro.acticleinfo where blogpro.acticleinfo.acticleinfoid = "${req.query.id}" and blogpro.acticleinfo.acticleinfoid=blogpro.acticle.acticleid and  blogpro.acticle.userphone = blogpro.usersinfo.userid`)
        res.send(user)
    })
    // 点赞接口
    app.get('/getlikecount',async (req,res) => {
        let count = await list.list(`SELECT acticleinfolikecount FROM blogpro.acticleinfo where acticleinfoid="${req.query.id}"`)
        res.send(count)
    })
    app.get('/setlikecount', (req,res) => {
        list.connection.query(`update blogpro.acticleinfo set acticleinfolikecount = ? where acticleinfoid = ? `, [req.query.count,req.query.id],err => {
            if(err) {
                console.log(err);
            }else {
                res.send('ok')
            }
        })
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