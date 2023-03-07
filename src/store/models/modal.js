const state = {
  isMapModalActive: false,
  isCouponModalActive: false,
  isLineupModalActive: false,
  isRestaurantModalActive: false,
};

const mutations = {
  setIsMapModalStatus(state, status) {
    state.isMapModalActive = status;
  },
  setIsCouponModalStatus(state, status) {
    state.isCouponModalActive = status;
  },
  setIsLineupModalStatus(state, status) {
    state.isLineupModalActive = status;
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
  getIsLineupModalActive(state) {
    return state.isLineupModalActive;
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
