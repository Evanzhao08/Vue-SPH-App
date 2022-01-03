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
// /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked} get
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码 /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册  /api/user/passport/register post
export const reqRegister = (data)=>requests({url:`/user/passport/register`,data,method:'post'})
// 登录  /api/user/passport/login post
export const reqLogin = (data)=>requests({url:`/user/passport/login`,data,method:'post'})
// api/user/passport/auth/getUserInfo  get
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'})
// /api/user/passport/logout  get
export const reqLogout =()=>requests({url:`/user/passport/logout`,method:'get'})
///api/user/userAddress/auth/findUserAddressList 获取用户地址
export const reqAddressInfo =()=>requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})
/* api/order/auth/trade 获取用户订单信息 get */
export const reqOrderInfo =()=>requests({url:`/order/auth/trade`,method:'get'})
/* 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} */
export const reqSubmitOrder =(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
/* /api/payment/weixin/createNative/{orderId} 获取订单支付信息 */
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//查询订单支付转态  /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取个人中心数据 /api/order/auth/{page}/{limit}
export const reqOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})