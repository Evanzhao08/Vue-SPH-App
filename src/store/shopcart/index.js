import {reqCarList} from '@/api'

const state ={
    shopCarList:[]
};
const mutations={
    GETCARTLIST(state,shopCarList){
        state.shopCarList = shopCarList
    }
};
const actions={
   async getCartList({commit}){
        let result =await reqCarList();
        if (result.code =='200') {
            commit('GETCARTLIST',result.data)
        }
    }
};
const getters={};


export default{
    state,
    mutations,
    actions,
    getters
}