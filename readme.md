#### 获取一级大类~
```
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res)=>{
  return res.data;
})
export let typeOne=()=>{
  return axios.get('/type?typesOne=1');
}
后台返回json格式：
[{"pid":0,"typeId":1,"typeName":"洗衣"},{"pid":0,"typeId":2,"typeName":"洗鞋"},{"pid":0,"typeId":3,"typeName":"洗家纺"},{"pid":0,"typeId":4,"typeName":"洗窗帘"},{"pid":0,"typeId":5,"typeName":"袋洗"}]
```

#### 点击一级类，如果有二级类则获取二级类+二级类第一个类别的产品，如果没有二级类，则直接显示产品
```
export let typeTwoOrProducts=(typeId)=>{
  return axios.get(`/type?oneId=${typeId}`);
}
后台返回格式一个对象：
有二级类情况：
{"twoTypes":[{"pid":1,"typeId":6,"typeName":"上衣"},{"pid":1,"typeId":7,"typeName":"大衣外套"},{"pid":1,"typeId":8,"typeName":"裙装裤装"},{"pid":1,"typeId":9,"typeName":"配件"}],"DefaultProducts":[{"typeId":6,"productID":1,"productName":"单衬衫","price":15,"img":"https://img.alicdn.com/bao/uploaded/i3/196993935/TB13CrqnjuhSKJjSspmXXcQDpXa_!!0-item_pic.jpg_430x430q90.jpg"},{"typeId":6,"productID":2,"productName":"保暖衬衫","price":25,"img":"https://img.alicdn.com/bao/uploaded/i2/2269753886/TB1aoLfcwjN8KJjSZFkXXaboXXa_!!0-item_pic.jpg_430x430q90.jpg"}}]}
没有二级类情况
{"DefaultProducts":[{"typeId":4,"productID":91,"productName":"e袋洗","price":299,"img":""},{"typeId":4,"productID":92,"productName":"窗帘拆装费","price":100,"img":""}]}

就是一个对象里有twoTypes属性，一个没有
```

#### 评论列表
 ```
  //列表页显示 pageIndex第几页，perPage每页显示几条
 export let comments=(pageIndex，perPage)=>{
   return axios.get(`/comments?pageIndex=${pageIndex}&perPage=${perPage}`);
 }
 格式如下
 [{"ID":11,"userId":2,"typeId":5,"content":"服务很好呀！！","tel":"13146593373","time":"2017-12-11"},{"ID":12,"userId":1,"typeId":5,"content":"服务很好呀！！","tel":"13146593373","time":"2017-12-11"}]
 ```

 - 添加评论
 ```
 <!--  comment 是一个对象格式为{userId:,typeId:,content:,tel}-->
 export let addComment = (comment) => {
   return axios.post(`/comment`,comment);
 };
 ```
- 注册
```
 user是一个对象{username:"fly1",password:"111111"}
 export let Reg = (user) => {
   return axios.post(`/user`,user);
 };
 成功返回：{"code":0,"success":"注册成功"}
 失败返回：{code: 1, err: '用户名重复'}
```
- 登陆
```
user是一个对象{username:"fly1",password:"111111"}
 export let login = (user) => {
   return axios.get(`/login`,user);
 };
 成功返回：{"code":0,"success":"登陆成功","user":{"username":"fly1","password":"111111","userId":2,"time":"2017-12-15T11:48:24.429Z"}}
 失败返回：{"code":1,"err":"用户名或密码错误"}
```
- 获取某个用户的订单列表
```
export let orders = (userid) => {
   return axios.get(`/orders?userid=${userid}`);
 };
返回格式：
[
            {
                "userId": 1,
                "orderId": 1,
                "orderProduct": [{"proId": 1, "sum": 1}, {"proId": 2, "sum": 4}],
                "orderPriceSum": 100,
                "addressId": 1,
                "time": "2017-12-07"
            },
            {
                "userId": 1,
                "orderId": 2,
                "orderProduct": [{"proId": 1, "sum": 1}, {"proId": 2, "sum": 4}],
                "orderPriceSum": 100,
                "addressId": 1,
                "time": "2017-12-07"
            }
        ]
```
- 获取某个用户关联的地址
```
export let adresses = (userid) => {
   return axios.get(`/adresses?userid=${userid}`);
 };
 返回格式为一个数组：
  [{
             "ID": 1,
             "userId": 1,
             "province": "北京市",
             "city": "北京市",
             "address1": "通州区",
             "address2": "新潮嘉园3期",
             "name": "李唐菲",
             "tel": "13146593373",
             "sex": "女"
         }, {
             "ID": 2,
             "userId": 1,
             "province": "河南省",
             "city": "郑州市",
             "address1": "海淀区",
             "address2": "新潮嘉园3期",
             "name": "左钊",
             "tel": "13146593374",
             "sex": "男"
         }]
```
- 获取某个订单关联的地址
```
export let address = (addressid) => {
   return axios.get(`/address?addressid=${addressid}`);
 };
 返回内容是一个对象：
 {"ID":1,"userId":1,"province":"北京市","city":"北京市","address1":"通州区","address2":"新潮嘉园3期","name":"李唐菲","tel":"13146593373","sex":"女"}
```

- 提交一个订单
```
order={userId:3,orderProduct:[{proId:1,sum:1},{proId:2,sum:4}],orderPriceSum:100,addressId:1}
export let order = (order) => {
   return axios.post('/order',order);
 };
```