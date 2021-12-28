//当前这个模块:API进行统一管理
import requests from '@/api/ajax';
import mockRequests from './mockAjax';
//发请求 axios发请求返回结果是Promise对象
export const reqCategoryList =()=>requests({url:'/product/getBaseCategoryList',method:'get'});
//切记：当前函数执行需要把服务器返回结果返回

export const reqBannerList = ()=>mockRequests({url:'/banner',method:'get'})

//获取floor数据
export const reqFloorList =()=> mockRequests({url:'/floor',method:'get'})

//获取搜索模块数据 地址:/api/list  请求方式:post  带参数 params至少是个空对象
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
  export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

  //获取detail详情数据  /api/item/{ skuId }  get 参数:skuId
export const reqGoodsInfo = (skuId)=> requests({url:`/item/${skuId}`,method:'get'});
//  添加购物车/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=> requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车list /api/cart/cartList get
export const reqCarList = ()=>requests({url:'/cart/cartList',method:'get'})

