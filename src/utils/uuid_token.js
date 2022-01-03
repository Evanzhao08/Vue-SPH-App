import { v4 as uuidv4 } from 'uuid';
//生成一个随机字符串、每次执行不变、游客身份持久存储
export const getUUID =()=>{
    //先从local存储获取
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    //如果没有生成
    if (!uuid_token) {
        //生成游客临时身份
        uuid_token = uuidv4();
        //本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    } 
    return uuid_token;
}