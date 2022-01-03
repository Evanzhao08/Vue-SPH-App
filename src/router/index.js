//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

import routes from './routes';
import store from '@/store'

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject) {
    if (resolve && reject) {
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
   // console.log("重写push");
}
VueRouter.prototype.replace = function (location,resolve,reject) {
    if (resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location,()=>{},()=>{})
    }
   // console.log("重写replace");
}

let router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y: 0 }
      }
});
//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  //to:可以获取到你要跳转到那个路由信息
  //from:可以获取到你从那个路由而来
  //next:放行函数 next()放行 next('/login') 放行到login路由 next(false)
  //用户登录了、才会有token、未登录一定不会有token;
  let { user } = store.state;
  
  let token = user.token;
  
  //用户信息
  let name = user.userInfo.name;
  if (token) {
    //用户已经登录了 不能去login 停留在首页
    if (to.path == "/login") {
      next("/home");
    } else {
    //登录去的不是 login【home|search|detail|shopcart】
    //如果用户名已有
      if (name) {
           next();
      } else {
          //没有用户信息,派发action让仓库存储用户信息跳转
         try {
             //获取用户信息成功放行
            await store.dispatch('getUserInfo');
            next();
         } catch (error) {
             //token失效 获取不到用户信息
             //清除token
             await store.dispatch('userLogout');
            next('/login')
         }
      }
    }
  } else {
    //未登录:不能去交易相关、不能去支付相关 【pay|paysuccess】
    let toPath = to.path;
    if (toPath.indexOf('/trade') !=-1||toPath.indexOf('/pay') !=-1||toPath.indexOf('/center') !=-1) {
        next('/login?redirect='+toPath)
    } else {
      next();
    }
   
  }
  //console.log(store.state.user.token);
});

export default router;