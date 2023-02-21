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
};

const mutations = {
  setUserProfile(state, status) {
    state.user = status;
  },
};

const getters = {
  getUserNickname(state) {
    console.log("!", state);
    return state.user.nickname;
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
};

export default {
  state,
  mutations,
  getters,
  actions,
};
