const state = {
    mobile: false
};

const getters = {
    
};

const actions = {
    setMobileUser({commit},user){
        commit('SET_MOBILE_USER',user);
    },
};

const mutations = {
    SET_MOBILE_USER: (state,user) => state.mobile = user,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};