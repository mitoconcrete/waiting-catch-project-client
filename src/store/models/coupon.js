import { api } from "@/utils/apis";
const state = {
  globalEvents: [],
  myCoupons: [],
  hasRemainGlobalEvents: false,
  alreadyCallCoupon: [],
  alreadyCallEvent: [],
};

const mutations = {
  setMyCoupons(state, status) {
    state.myCoupons = status;
  },
  setGlobalEvents(state, status) {
    state.globalEvents = [...state.globalEvents, ...status];
  },
  setHasRemainGlobalEvents(state, status) {
    state.hasRemainGlobalEvents = status;
  },
  initGlobalEvents(state) {
    state.alreadyCallEvent = [];
    state.globalEvents = [];
  },
  initMyCoupons(state) {
    state.alreadyCallCoupon = [];
    state.myCoupons = [];
  },
};

const getters = {
  getMyCoupons(state) {
    return state.myCoupons;
  },
  getGlobalEvents(state) {
    return state.globalEvents;
  },
  getHasRemainGlobalEvents(state) {
    return state.hasRemainGlobalEvents;
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

  async syncGlobalEvents({ commit, state }, params) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    if (state.alreadyCallEvent.includes(params.page)) {
      return;
    }
    state.alreadyCallEvent.push(params.page);
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getGlobalEvents(params);
    commit("setGlobalEvents", data.data.content);
    commit("setHasRemainGlobalEvents", !data.data.last);
  },

  async syncMyCoupons({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerCoupons();
    commit("setMyCoupons", data.data);
  },

  async downloadCoupon({ commit }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    await api.postCoupon(payload);
  },
  initGlobalEvents({ commit }) {
    commit("initGlobalEvents");
  },
  initMyCoupons({ commit }) {
    commit("initMyCoupons");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
