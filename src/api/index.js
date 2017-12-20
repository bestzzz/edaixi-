import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
axios.interceptors.response.use((res)=>{
    return res.data;
});
export let typeOne=()=>{
    return axios.get('/type?typesOne=1');
}
export let comments=(pageIndex,perPage)=>{
    return axios.get(`/comments?pageIndex=${pageIndex}&perPage=${perPage}`);
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

