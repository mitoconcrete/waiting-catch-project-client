import { api } from "@/utils/apis";
const state = {
  restaurants: [],
  restaurantBasicInfo: {},
  restaurantDetailInfo: {},
  menus: [],
  events: [],
  reviews: [],
  hasRemainRestaurantData: false,
};

const mutations = {
  initRestaurants(state) {
    state.restaurants = [];
  },
  setRestaurants(state, status) {
    state.restaurants = [...state.restaurants, ...status];
  },
  setRestaurantsBasicInfo(state, status) {
    state.restaurantBasicInfo = status;
  },
  setRestaurantDetailInfo(state, status) {
    state.restaurantDetailInfo = status;
  },
  setRestaurantMenus(state, status) {
    state.menus = status;
  },
  setRestaurantReviews(state, status) {
    state.reviews = status;
  },
  setRestaurantEvents(state, status) {
    state.events = status;
  },
  setHasRemainRestaurantData(state, status) {
    state.hasRemainRestaurantData = status;
  },
};

const getters = {
  getRestaurants(state) {
    return state.restaurants;
  },
  getRestaurantBasicInfo(state) {
    return state.restaurantBasicInfo;
  },
  getRestaurantDetailInfo(state) {
    return state.restaurantDetailInfo;
  },
  getRestaurantMenus(state) {
    return state.menus;
  },
  getRestaurantReviews(state) {
    return state.reviews;
  },
  getResaturantEvents(state) {
    return state.events;
  },
  getHasRemainRestaurantData(state) {
    return state.hasRemainRestaurantData;
  },
};

const actions = {
  async syncRestaurants({ commit }, params) {
    // const token = window.localStorage.getItem("accessToken");
    // if (!token) {
    //   return;
    // }
    // api.default.setHeadersAuthorization(token);
    api.default.deleteHeadersAuthorization();
    const { data } = await api.getRestaurants(params);
    commit("setHasRemainRestaurantData", !data.data.last);
    commit("setRestaurants", data.data.content);
  },
  async syncRestaurantsByKeywords({ commit }, params) {
    // const token = window.localStorage.getItem("accessToken");
    // if (!token) {
    //   return;
    // }
    // api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantSearch(params);
    commit("setHasRemainRestaurantData", !data.data.last);
    commit("setRestaurants", data.data.content);
  },
  async syncRestaurantBasicInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantBasicInfo(restaurantId);
    commit("setRestaurantsBasicInfo", data.data);
  },
  async syncRestaurantDetailInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantDetailInfo(restaurantId);
    commit("setRestaurantDetailInfo", data.data);
  },
  async syncRestaurantMenus({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantMenus(restaurantId);
    commit("setRestaurantMenus", data.data);
  },
  async syncRestaurantReviews({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantReviews(restaurantId);
    commit("setRestaurantReviews", data.data.content);
  },
  async syncRestaurantEvents({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantEvents(restaurantId);
    commit("setRestaurantEvents", data.data);
  },
  initRestaurants({ commit }) {
    commit("initRestaurants");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
