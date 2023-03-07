import { api } from "@/utils/apis";
import { da } from "date-fns/locale";

const state = {
  user: {
    banned: false,
    createdDate: "",
    deleted: false,
    email: "",
    id: 0,
    modifiedDate: "",
    name: "",
    nickname: "",
    role: "",
    username: "",
  },
  position: {
    latitude: -1,
    longitude: -1,
    stringAddress: "",
  },
  reviews: [],
  waitings: [],
  hasRemainReviews: false,
  hasRemainWaitingHistories: false,
};

const mutations = {
  setUserProfile(state, status) {
    state.user = status;
  },
  setUserPosition(state, status) {
    state.position = {
      ...status,
      ...state.stringAddress,
    };
  },
  setStringAddress(state, status) {
    state.position.stringAddress = status;
  },
  setUserReviews(state, status) {
    state.reviews = [...state.reviews, ...status];
  },
  setUserWaitings(state, status) {
    state.waitings = status;
  },
  setHasRemainWaitingHistories(state, status) {
    state.hasRemainWaitingHistories = status;
  },
  setUserWaitingHistories(state, status) {
    state.waitings = [...state.waitings, ...status];
  },
  setHasRemainReviews(state, status) {
    state.hasRemainReviews = status;
  },
  initReviews(state) {
    state.reviews = [];
  },
  initWaitings(state) {
    state.waitings = [];
  },
};

const getters = {
  getUserNickname(state) {
    return state.user.nickname;
  },
  getUserProfile(state) {
    return state.user;
  },
  getUserPosition(state) {
    return state.position;
  },
  getUserReviews(state) {
    return state.reviews;
  },
  getUserWaitings(state) {
    return state.waitings;
  },
  getHasRemainWaitingHistories(state) {
    return state.hasRemainWaitingHistories;
  },
  getUserWaitingHistories(state) {
    return state.waitings;
  },
  getHasRemainReviews(state) {
    return state.hasRemainReviews;
  },
};

const actions = {
  async syncUserProfile({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return this.$router.push("/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerDetailInfo();
    commit("setUserProfile", data.data);
  },

  syncUserPosition({ commit }, status) {
    commit("setUserPosition", status);
  },

  async logout({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    await api.logout();
    commit("setUserProfile", {
      banned: false,
      createdDate: "",
      deleted: false,
      email: "",
      id: 0,
      modifiedDate: "",
      name: "",
      nickname: "",
      role: "",
      username: "",
    });
    window.localStorage.removeItem("accessToken");
  },

  async withdraw({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    await api.deleteCustomer();
    commit("setUserProfile", {
      banned: false,
      createdDate: "",
      deleted: false,
      email: "",
      id: 0,
      modifiedDate: "",
      name: "",
      nickname: "",
      role: "",
      username: "",
    });
    window.localStorage.removeItem("accessToken");
  },
  async syncUserReviews({ commit }, params) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerReviews(params);
    commit("setUserReviews", data.data.content);
    commit("setHasRemainReviews", !data.data.last);
  },
  async syncUserWaitings({ commit }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = payload
      ? await api.getWaitings(payload)
      : await api.getWaitings();
    commit("setUserWaitings", data.data);
  },
  async syncUserWaitingHistories({ commit }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getWaitingHistories(payload);
    commit("setUserWaitingHistories", data.data.content);
    commit("setHasRemainWaitingHistories", !data.data.last);
  },
  initWaitings({ commit }) {
    commit("initWaitings");
  },
  initReviews({ commit }) {
    commit("initReviews");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
