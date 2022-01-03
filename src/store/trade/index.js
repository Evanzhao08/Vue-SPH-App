import { reqAddressInfo, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};
const mutations = {
  GETADDRESS(state, address) {
    state.address = address;
  },
  GETORDER(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  //获取用户地址
  async getAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit("GETADDRESS", result.data);
      return "ok";
    }else {
      return Promise.reject(new Error("faile"));
    }
  },
  //获取用户订单信息
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit("GETORDER", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
