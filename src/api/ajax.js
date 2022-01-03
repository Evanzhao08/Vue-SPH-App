import axios from "axios";
//引入进度条
import nprogress from 'nprogress';
//在当前模块中引入store
import store from '@/store';

//引入进度条样式
import "nprogress/nprogress.css";

const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    timeout:5000,
})
//请求拦截器：发请求之前 拦截器检测到，发请求之前做些事情
requests.interceptors.request.use((config)=>{
    //进度条开始动
    if (store.state.detail.uuid_token) {
        //请求头添加个字段
        config.headers.userTempId = store.state.detail.uuid_token
    };
    //判断是否需要token带给服务器
    if (store.state.user.token) {
        //请求头添加个字段
        config.headers.token = store.state.user.token
    }
    nprogress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    //成功的回调函数：
    //进度条结束 
    nprogress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('faile'))
});


export default requests;