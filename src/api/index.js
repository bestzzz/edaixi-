import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res)=>{
    return res.data;
});
export let typeOne=()=>{
    return axios.get('/type?typesOne=1');
};

//注册
export let Reg = (user) => {
    return axios.post('/user',user);
};

//登录
export let Login=(user)=> {
    return axios.post('/login',user);
};

//退出
export let Logout=() =>{
    return axios.get('/logout')
}

//验证是否登录
export let validate = () => {
    return axios.get('/validate');
};

//增加用户
export let addAddress = (address) => {
    return axios.post('/address',address);
};

//获取某个用户关联的地址
export let addresses = (userid) => {
    return axios.get(`/adresses?userid=${userid}`);
};

//删除某个地址
export let deladdress = (id) => {

    return axios.delete(`/address?id=${id}`);
};

//上传头像
export let uploadImge = (user) => {
    return axios.post('/uploadImge',user);
};