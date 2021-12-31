import { reqCarList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
  shopCarList: [],
};
const mutations = {
  GETCARTLIST(state, shopCarList) {
    state.shopCarList = shopCarList;
  },
};
const actions = {
  async getCartList({ commit }) {
    let result = await reqCarList();
    if (result.code == "200") {
      commit("GETCARTLIST", result.data);
    }
  },
  async deleteCartById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    //代表删除成功
    if (result.code == 200) {
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("faile"));
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    //代表删除成功
    if (result.code == 200) {
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("faile"));
    }
  },
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
        let promise =
        item.isChecked == 1
          ? dispatch("deleteCartById", item.skuId)
          : "";
      //将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise);
    });
    //只要全部p1|p2...都成功、返回结果成功
    return Promise.all(PromiseAll);
  },
  updateAllCartIsChecked({ dispatch, getters },isChecked){
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item)=>{
      let promise = item.isChecked !== isChecked? dispatch('updateCheckedById',{skuId:item.skuId, isChecked }):"";
     // let promise = dispatch('updateCheckedById',{skuId:item.skuId, isChecked })
     //将每一次返回的Promise添加到数组当中
      PromiseAll.push(promise);
    });
    //只要全部p1|p2...都成功、返回结果成功
    return Promise.all(PromiseAll);
  }
};
const getters = {
  cartList(state) {
    return state.shopCarList[0] || {};
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
