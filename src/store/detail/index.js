import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index';
//封装临时游客身份
import {getUUID} from '@/utils/uuid_token'
const state ={
    goodInfo:{},
    uuid_token:getUUID()
};
const mutations ={
    GETGOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
};
const actions ={
   async getGoodsInfo(context,skuId){
        let result = await reqGoodsInfo(skuId);
        if (result.code ==200) {
            context.commit('GETGOODSINFO',result.data)
        }
    },
    //产品添加到购物车
   async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车 写入数据成功 并没有返回其他的数据
      let result = await reqAddOrUpdateShopCart(skuId,skuNum);
      //代表服务器加入购物车成功
      if (result.code == 200) {
          return "ok"
      }else{
          //代表加入购物车失败
          return Promise.reject(new Error('faile'))
      }
    }
};
//简化数据
const getters ={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 路径导航
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}