import axios from "axios";
//引入进度条
import nprogress from 'nprogress';

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