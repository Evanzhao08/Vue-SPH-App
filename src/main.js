import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图
import Carsousel  from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
//第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carsousel.name,Carsousel);
Vue.component(Pagination.name,Pagination);
//引入MockServer.js ---mock数据
import '@/mock/mockServe';
//引入swiper样式 
import 'swiper/css/swiper.css'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store';

new Vue({
  render: h => h(App),
  //注册路由
  router,
  //注册仓库 
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
