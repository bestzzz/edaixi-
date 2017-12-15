import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use((res)=>{
    return res.data;
})
export let typeOne=()=>{
    return axios.get('/type?typesOne=1');
}