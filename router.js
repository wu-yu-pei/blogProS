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
    // 点赞查询接口
    app.get('/getlikecount',async (req,res) => {
        let count = await list.list(`SELECT acticleinfolikecount FROM blogpro.acticleinfo where acticleinfoid="${req.query.id}"`)
        res.send(count)
    })
    // 点赞设置接口
    app.get('/setlikecount', (req,res) => {
        list.connection.query(`update blogpro.acticleinfo set acticleinfolikecount = ? where acticleinfoid = ? `, [req.query.count,req.query.id],err => {
            if(err) {
                console.log(err);
            }else {
                res.send('ok')
            }
        })
    })
    // 首页所有分类
    app.get('/qianduan',async (req,res) => {
        let qianduan = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol in("前端","JavaScript","Vue","React","Html","Css")  order by acticleinfotime desc`)
        res.send(qianduan)
    })
    app.get('/houduan',async (req,res) => {
        let houduan = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol in ("后端","C++","Java","node.js")  order by acticleinfotime desc`)
        res.send(houduan)
    })
    app.get('/vue',async (req,res) => {
        let vue = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="Vue"  order by acticleinfotime desc`)
        res.send(vue)
    })
    app.get('/react',async (req,res) => {
        let react = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="React"  order by acticleinfotime desc`)
        res.send(react)
    })
    app.get('/css',async (req,res) => {
        let css = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="Css"  order by acticleinfotime desc`)
        res.send(css)
    })
    app.get('/html',async (req,res) => {
        let html = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="Html"  order by acticleinfotime desc`)
        res.send(html)
    })
    app.get('/java',async (req,res) => {
        let java = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="Java"  order by acticleinfotime desc`)
        res.send(java)
    })
    app.get('/node',async (req,res) => {
        let node = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="node.js"  order by acticleinfotime desc`)
        res.send(node)
    })
    app.get('/javascript',async (req,res) => {
        let qianduan = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="JavaScript"  order by acticleinfotime desc`)
        res.send(qianduan)
    })
    app.get('/c',async (req,res) => {
        let c = await list.list(`SELECT * FROM blogpro.acticleinfo where acticleinfocol="C++"  order by acticleinfotime desc`)
        res.send(c)
    })
    // 修改用户名 接口
    app.get('/changeuname',(req,res) => {
        list.connection.query(`update blogpro.usersinfo set username = ? where userid = ? `, [req.query.uname,req.query.id],err => {
            if(err) {
                console.log(err);
            }else {
                res.send('ok')
            }
        })
    })
    // 修改用户图片接口
    app.get('/changeimg',(req,res)=> {
        list.connection.query(`update blogpro.usersinfo set userimg = ? where userid = ? `, [req.query.uimg,req.query.id],err => {
            if(err) {
                console.log(err);
            }else {
                res.send('ok')
            }
        })
    })
    // 评论接口
    app.get('/comment',(req,res) => {
        list.connection.query('insert into blogpro.commentinfo(acticleid,selfid,content,time) values (?,?,?,?)', [req.query.acticleid, req.query.selfid,req.query.content,req.query.time],err => {
            if(err){
                res.send(false)
            }else {
                res.send(true)
            }
        })
    })
    // 查询评论接口
    app.get("/searchcomment",async (req,res) => {
            var allcomment = await list.list(`SELECT * FROM blogpro.commentinfo where acticleid="${req.query.id}"  order by time desc`)
            res.send(allcomment)
    })
    // 查询评论接口
    // 设置评论接口
}