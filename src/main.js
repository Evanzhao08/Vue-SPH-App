import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图
import Carsousel  from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);

Vue.use(Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入MockServer.js ---mock数据
import '@/mock/mockServe';
//引入swiper样式 
import 'swiper/css/swiper.css'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store';
//统一接口文件夹里的全部请求 统一引入
import * as API from '@/api'
//引入插件
import VueLazyload from 'vue-lazyload'
import lodadgif from '@/assets/images/loading.gif'
Vue.use(VueLazyload, {
  preLoad: 1.3,
 // error: 'dist/error.png',
  loading: lodadgif,
 // attempt: 1
})
//引入表单校验插件
import  "@/plugins/validate"
new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库 
  store,
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
