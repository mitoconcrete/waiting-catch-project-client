import { api } from "@/utils/apis";
const state = {
  restaurants: [],
  restaurantBasicInfo: {},
  restaurantDetailInfo: {},
  menus: [],
  events: [],
  reviews: [],
};

const mutations = {
  setRestaurants(state, status) {
    state.restaurants = status;
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
    console.log(status);
    state.events = status;
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
    commit("setRestaurants", data);
  },
  async syncRestaurantsByKeywords({ commit }, params) {
    // const token = window.localStorage.getItem("accessToken");
    // if (!token) {
    //   return;
    // }
    // api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantSearch(params);
    commit("setRestaurants", data);
  },
  async syncRestaurantBasicInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantBasicInfo(restaurantId);
    commit("setRestaurantsBasicInfo", data);
  },
  async syncRestaurantDetailInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantDetailInfo(restaurantId);
    commit("setRestaurantDetailInfo", data);
  },
  async syncRestaurantMenus({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantMenus(restaurantId);
    commit("setRestaurantMenus", data);
  },
  async syncRestaurantReviews({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantReviews(restaurantId);
    commit("setRestaurantReviews", data.data);
  },
  async syncRestaurantEvents({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return (window.location.href = "/login");
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantEvents(restaurantId);
    commit("setRestaurantEvents", data);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
