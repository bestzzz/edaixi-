let express = require('express');
let app = express();
app.listen('3000');
let util = require('util');
let fs = require('fs');
let readP = util.promisify(fs.readFile);
let writeP = util.promisify(fs.writeFile);

async function read(url, cb) {
    let result = await readP(url);
    if(result){
        cb(result);
    }else {
        cb([])
    }
}

async function write(url,result,cb) {
    await writeP(url,JSON.stringify(result));
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
    read('./mock/comments.json',function (comments) {
        let coms = JSON.parse(comments).slice((pageIndex - 1) * perPage, perPage * pageIndex);
        res.json(coms);
    })
})
app.post('/comments', function (req, res) {
    let comment=req.body;
    read('./mock/comments.json',function (comments) {
        let comments=JSON.parse(comments);
        comments.ID=comments.length>0?comments[comments.length-1].ID+1:1;
        comments=[...comments,comment];
        write('./mock/comments.json',comments,function () {
            res.json(comment);
        })
    })
})