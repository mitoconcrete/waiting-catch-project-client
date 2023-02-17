const state = {
  isMapModalActive: false,
  isCouponModalActive: false,
};

const mutations = {
  setIsMapModalStatus(state, status) {
    state.isMapModalActive = status;
  },
  setIsCouponModalStatus(state, status) {
    state.isCouponModalActive = status;
  },
};

const getters = {
  getIsMapModalActive(state) {
    return state.isMapModalActive;
  },
  getIsCouponModalActive(state) {
    return state.isCouponModalActive;
  },
};

const actions = {};

export default {
  state,
  mutations,
  getters,
  actions,
};
