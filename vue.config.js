module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
    },
  },
   lintOnSave:false,// false 关闭语法检查, true 开启
    //开启代理服务器(方式一)
   /*   devServer: {
    proxy: "http://localhost:5000",
  }, */
  //开启代理服务器(方式二)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
       //  pathRewrite:{'^/api':''},
       // ws: true, //用于支持websocket
       // changeOrigin: true
      }
    }
  }
};
