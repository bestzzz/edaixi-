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

let session = require('express-session');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'fly'
}));
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
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
});
//评论
app.get('/comments', function (req, res) {
    //列表页显示 pageIndex第几页，perPage每页显示几条
    let {pageIndex, perPage} = req.query;
    read('./mock/comments.json', function (comments) {
        let coms = JSON.parse(comments).slice((pageIndex - 1) * perPage, perPage * pageIndex);
        res.json(coms);
    })
});
//添加评论
app.post('/comment', function (req, res) {
    let comment = req.body;
    let url='./mock/comments.json';
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
app.get('/login', function (req, res) {
     let user = req.body;
    let url = './mock/users.json';
    read(url, function (users) {
        users = JSON.parse(users);
        let oldUser = users.find(item => item.username == user.username && item.password == user.password);
        if (oldUser) {
            req.session.user=oldUser;
            res.json({code: 0, success: '登陆成功', user:oldUser});
        } else {
            res.json({code: 1, err: '用户名或密码错误'})
        }
    })
})