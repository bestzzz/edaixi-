let express = require('express');
let app = express();
app.listen('3000');
let util = require('util');
let fs = require('fs');
let readP = util.promisify(fs.readFile);
let writeP = util.promisify(fs.writeFile);

async function read(url, cb) {
    let result = await readP(url);
    if (result) {
        cb(result);
    } else {
        cb([])
    }
}

async function write(url, result, cb) {
    await writeP(url, JSON.stringify(result));
    cb();
}

//处理base64图片
let reg = /^data:image\/\w+;base64,/;

let session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'fly'
}));
let bodyParser = require('body-parser');
app.use(bodyParser.json());
//接收跨域请求
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:8080");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', "true");
    if (req.method == 'OPTIONS') {
        res.end('');
    } else {
        next();
    }
});
let types = require('./mock/types');
let products = require('./mock/products');
// 类别
app.get('/type', function (req, res) {
    let {typesOne, oneId, twoId} = req.query;
    //获取一级大类
    if (typesOne) {
        let oneTypes = types.filter(item => item.pid == 0)
        return res.json(oneTypes);
    }
    //点击一级类
    if (oneId) {
        let twoTypes = types.filter(item => item.pid == oneId);
        //如果有二级类则获取二级类+二级类第一个类别的产品
        if (twoTypes.length > 0) {
            let DefaultProducts = products.filter(item => item.typeId == twoTypes[0].typeId)
            res.json({twoTypes, DefaultProducts});
        } else {
            //如果没有二级类，则直接显示产品
            let DefaultProducts = products.filter(item => item.typeId == oneId)
            res.json({DefaultProducts});
        }
    }
    //点击二级类
    if (twoId) {
        let Products = products.filter(item => item.typeId == twoId)
        res.json({Products});
    }
});

//评论
app.get('/comments', function (req, res) {
    //列表页显示 pageIndex第几页，perPage每页显示几条
    let {pageIndex: offset, perPage: limit} = req.query;
    offset=parseInt(offset)||0;
    limit=parseInt(limit)||5;
    read('./mock/comments.json', function (comments) {
        let hasMore = limit + offset < JSON.parse(comments).length;
        let coms = JSON.parse(comments).slice(offset, offset + limit);
        res.json({coms, hasMore});
    })
});

//添加评论
app.post('/comment', function (req, res) {
    let comment = req.body;
    let url = './mock/comments.json';
    read(url, function (comments) {
        comments = JSON.parse(comments);
        comment.ID = comments.length > 0 ? comments[comments.length - 1].ID + 1 : 1;
        comment.time = new Date;
        comments = [...comments, comment];
        write(url, comments, function () {
            res.json(comment);
        })
    })
});
// 注册
app.post('/user', function (req, res) {
    let user = req.body;
    let url = './mock/users.json';
    read(url, function (users) {
        users = JSON.parse(users);
        let oldUser = users.find(item => item.username == user.username);
        if (oldUser) {
            res.json({code: 1, err: '用户名重复'});
        } else {
            user.userId = users.length ? users[users.length - 1].userId + 1 : 1;
            user.time = new Date();
            users.push(user);
            write(url, users, function () {
                res.json({code: 0, success: '注册成功'})
            })
        }
    })
});

// 登陆
app.post('/login', function (req, res) {
    let user = req.body;
    let url = './mock/users.json';
    read(url, function (users) {
        users = JSON.parse(users);
        let oldUser = users.find(item => item.username == user.username && item.password == user.password);
        if (oldUser) {
            req.session.user = oldUser;
            res.json({code: 0, success: '登陆成功', user: oldUser});
        } else {
            res.json({code: 1, err: '用户名或密码错误'})
        }
    })
});
//处理base64图片

function changeToJpg(imgData){
    let reg=/^data:image\/\w+;base64,/;
    let base64Data=imgData.replace(reg, ""),
        dataBuffer = new Buffer(base64Data, 'base64'),
        name='../img/'+Math.floor(Math.random()*9000000+1000000)+'.jpg';  //生成一个随机数 做图片的名字并存放到img文件夹下
    console.log(base64Data);
    console.log(dataBuffer);
    write(name,dataBuffer,(err)=>{
        if(err){
            throw err;
        }
    });

    return name;
}
//上传头像
// app.post("/uploadImge", (req, res) => {
//     let {userid, img} = req.body;
//         let imgName=changeToJpg(img);
//         debugger;
//         let url = './mock/users.json';
//         read(url, function (users) {
//             users = JSON.parse(users);
//             let user = users.find(item => item.userId == userid);
//             //如果之前user.img有值，则从文件夹中删除这张图片
//             if (user.img) {
//                 fs.unlinkSync(user.img);
//             }
//             user.img = imgName;
//             users = users.map(item => item.userId == userid ? user : item);
//             write(url, users, function () {
//                 res.json({code: 0,user})
//             })
//         })
// });
//当应用初始化的时候，会向后台发送一个请求，询问当前用户是否登录，如果登录的话则返回登录的用户并存放在仓库里。
app.get('/validate', function (req, res) {
    if (req.session.user) {
        res.json({code: 0, user: req.session.user});
    } else {
        res.json({code: 1})
    }
});

app.get("/logout", function (req, res) {
    req.session.destroy();
    res.json({code: 0, success: '退出成功'})
})
//获取某个用户的订单列表
app.get('/orders', function (req, res) {
    let {userid} = req.query;
    let url = './mock/orderList.json';
    read(url, function (orders) {
        orders = JSON.parse(orders);
        res.json(orders.filter(item => item.userId == userid));
    })
});
//提交一个订单
app.post('/order', function (req, res) {
    let order = req.body;
    let url = './mock/orderList.json';
    read(url, function (orders) {
        orders = JSON.parse(orders);
        order.ID = orders.length > 0 ? orders[orders.length - 1].ID + 1 : 1;
        order.time = new Date;
        orders = [...orders, order];
        write(url, orders, function () {
            res.json(order);
        })
    })
})
//获取某个用户关联的地址
app.get('/adresses', function (req, res) {
    let {userid} = req.query;
    let url = './mock/adresses.json';
    read(url, function (adresses) {
        adresses = JSON.parse(adresses);
        res.json(adresses.filter(item => item.userId == userid));
    })
});

//获取某个订单关联的地址
app.get('/address', function (req, res) {
    let {addressid} = req.query;
    let url = './mock/adresses.json';
    read(url, function (adresses) {
        adresses = JSON.parse(adresses);
        res.json(adresses.find(item => item.ID == addressid));
    })
});

//增加一个地址
app.post('/address', function (req, res) {
    let address = req.body;
    let url = './mock/adresses.json';
    read(url, function (adresses) {
        adresses = JSON.parse(adresses);
        address.ID = adresses.length > 0 ? adresses[adresses.length - 1].ID + 1 : 1;
        address.time = new Date;
        adresses = [...adresses, address];
        write(url, adresses, function () {
            res.json(address);
        })
    })
});
//修改一个地址
app.put('/address', function (req, res) {
    let address = req.body;
    let url = './mock/adresses.json';
    read(url, function (adresses) {
        adresses = JSON.parse(adresses);
        adresses =address.map(item=>(item.ID==address.ID?address:item))
        write(url, adresses, function () {
            res.json(address);
        })
    })
});
//删除一个地址
app.delete('/address', function (req, res) {
    let {id} = req.query;
    let url = './mock/adresses.json';
    read(url, function (adresses) {
        adresses = JSON.parse(adresses);
        adresses = adresses.filter(item => item.ID !== parseInt(id)?item:null)
        write(url, adresses, function () {
            res.json(adresses);
        })
    })
});

//根据产品id获取产品详细信息
app.get('/product', function (req, res) {
    let {proid} = req.query;
    res.json(products.find(item => item.productID == proid));
});