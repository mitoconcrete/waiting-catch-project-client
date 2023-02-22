import { api } from "@/utils/apis";

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
    state.reviews = status;
  },
  setUserWaitings(state, status) {
    state.waitings = status;
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
};

const actions = {
  async syncUserProfile({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return this.$router.push("/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerDetailInfo();
    console.log(data);
    commit("setUserProfile", data);
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
  async syncUserReviews({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getCustomerReviews();
    commit("setUserReviews", data.data);
  },
  async syncUserWaitings({ commit }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);

    console.log(payload);
    const { data } = payload
      ? await api.getWaitingHistories(payload)
      : await api.getWaitingHistories();
    commit("setUserWaitings", data.data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
