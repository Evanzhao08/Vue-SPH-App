<template>
  <div>
    <Header/>
    <!-- 书写路由组件出口的地方  -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {Header,Footer},
  mounted() {
       //通知VUex发请求，获取数据
    this.$store.dispatch("categoryList");
  },
}
</script>

<style scoped>
  
</style>
