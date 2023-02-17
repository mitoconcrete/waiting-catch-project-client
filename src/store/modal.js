const state = {
  isMapModalActive: false,
};

const mutations = {
  setIsMapModalStatus(state, status) {
    console.log(status);
    state.isMapModalActive = status;
  },
};

const getters = {
  getIsMapModalActive(state) {
    return state.isMapModalActive;
  },
};

const actions = {};

export default {
  state,
  mutations,
  getters,
  actions,
};
