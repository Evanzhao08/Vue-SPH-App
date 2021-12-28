//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

import routes from './routes';

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

export default new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y: 0 }
      }
})