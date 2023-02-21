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
};

const actions = {
  async syncUserProfile({ commit }) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
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
      return;
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
      return;
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
};

export default {
  state,
  mutations,
  getters,
  actions,
};