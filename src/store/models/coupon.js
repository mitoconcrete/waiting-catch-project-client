import { api } from "@/utils/apis";
const state = {
  globalEvents: [],
  myCoupons: [],
};

const mutations = {
  setMyCoupons(state, status) {
    state.myCoupons = status;
  },
  setGlobalEvents(state, status) {
    state.globalEvents = status;
  },
};

const getters = {
  getMyCoupons(state) {
    return state.myCoupons;
  },
  getGlobalEvents(state) {
    return state.globalEvents;
  },
};

const actions = {
  syncRestaurantEvents() {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
  },

  async syncGlobalEvents({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getGlobalEvents();
    commit("setGlobalEvents", data);
  },

  async syncMyCoupons({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerCoupons();
    commit("setMyCoupons", data);
  },

  async downloadCoupon({ commit }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    await api.postCoupon(payload);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
