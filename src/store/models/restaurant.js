import { api } from "@/utils/apis";
const state = {
  restaurants: [],
};

const mutations = {
  setRestaurants(state, status) {
    state.restaurants = status;
  },
};

const getters = {
  getRestaurants(state) {
    return state.restaurants;
  },
};

const actions = {
  async syncRestaurants({ commit }, params) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurants(params);
    commit("setRestaurants", data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
