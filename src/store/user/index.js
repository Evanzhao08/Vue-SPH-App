//登录与注册
import {reqGetCode,reqRegister,reqLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'

const state ={
    code:'',
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        //仓库中相关信息清空 
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const actions = {
   async getCode({commit},phone){
        let result = await reqGetCode(phone);
       // console.log(result);
        if (result.code == 200) {
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //注册业务
    async userRegister({commit},user){
        let result = await reqRegister(user);
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务【token】
    async userLogin({commit},data){
    let result =  await reqLogin(data);
     if (result.code == 200) {
         commit("USERLOGIN",result.data.token);
         //持久化存储token
        // localStorage.setItem("TOKEN",result.data.token);
         setToken(result.data.token);
         return "ok"
     }else{
         return Promise.reject(new Error("faile"))
     }
    },
    //获取用户信息
    async getUserInfo({commit}){
      let result = await reqUserInfo();
      if (result.code == 200) {
          //提交用户信息
          commit('GETUSERINFO',result.data)
         return "ok"
      }else{
        return Promise.reject(new Error("faile"))
      }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout();
        //action里面不能操作state,提交mutation
        if (result.code ==200) {
            commit('CLEAR');
            return "ok";
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
} 