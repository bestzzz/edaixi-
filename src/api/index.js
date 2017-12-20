import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res)=>{
    return res.data;
});

//获取一级类
export let typeOne = () => {
    return axios.get('/type?typesOne=1');
};
//获取二级类
export let typeTwoOrProducts = (typeId) => {
    return axios.get(`/type?oneId=${typeId}`);
};
//获取产品
export let getProducts=(typeId)=>{
    return axios.get(`/type?twoId=${typeId}`);
};