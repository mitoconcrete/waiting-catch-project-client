const state = {
  isMapModalActive: false,
  isCouponModalActive: false,
  isRestaurantModalActive: false,
};

const mutations = {
  setIsMapModalStatus(state, status) {
    state.isMapModalActive = status;
  },
  setIsCouponModalStatus(state, status) {
    state.isCouponModalActive = status;
  },
  setIsRestaurantModalStatus(state, status) {
    state.isRestaurantModalActive = status;
  },
};

const getters = {
  getIsMapModalActive(state) {
    return state.isMapModalActive;
  },
  getIsCouponModalActive(state) {
    return state.isCouponModalActive;
  },
  getIsRestaurantModalActive(state) {
    return state.isRestaurantModalActive;
  },
};

const actions = {};

export default {
  state,
  mutations,
  getters,
  actions,
};
