/* eslint-disable no-shadow */
const state = {
  active: false,

  autoHideAfter: 0,
  title: '',
  msg: '',
  role: 'default',
  type: 'toast',
  posX: 'center',
  posY: 'bottom',
};

const getters = {

};

const actions = {

  showNotification({ commit }, options) {
    commit('SET_NOTIFICATION_OPTIONS', options);
    commit('SET_NOTIFICATION_ACTIVE');
  },

  hideNotification({ commit }) {
    commit('SET_NOTIFICATION_INACTIVE');
    commit('RESET_NOTIFICATION_OPTIONS');
  },

};

const mutations = {

  SET_NOTIFICATION_ACTIVE() { state.active = true; },
  SET_NOTIFICATION_INACTIVE() { state.active = false; },
  SET_NOTIFICATION_OPTIONS: (state, options) => {
    state.autoHideAfter = options.autoHideAfter || 0;
    state.title = options.title || '';
    state.msg = options.msg || '';
    state.role = options.role || 'default';
    state.type = options.type || 'toast';
    state.posX = options.posX || 'center';
    state.posY = options.posY || 'bottom';
  },

  RESET_NOTIFICATION_OPTIONS: () => {
    state.autoHideAfter = 0;
    state.title = '';
    state.msg = '';
    state.role = 'default';
    state.type = 'toast';
    state.posX = 'center';
    state.posY = 'bottom';
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
