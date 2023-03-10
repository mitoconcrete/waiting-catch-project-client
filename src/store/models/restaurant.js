import { api } from "@/utils/apis";
const state = {
  restaurants: [],
  restaurantBasicInfo: {},
  restaurantDetailInfo: {},
  menus: [],
  events: [],
  reviews: [],
  alreadyCallRestaurants: [],
  alreadyCallReviews: [],
  alreadyCallEvents: [],
  hasRemainReviewData: false,
  hasRemainEventData: false,
  hasRemainRestaurantData: false,
};

const mutations = {
  initRestaurants(state) {
    state.alreadyCallRestaurants = [];
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
    state.reviews = [...state.reviews, ...status];
  },
  setRestaurantEvents(state, status) {
    state.events = [...state.events, ...status];
  },
  setHasRemainRestaurantData(state, status) {
    state.hasRemainRestaurantData = status;
  },
  setHasRemainReviewData(state, status) {
    state.hasRemainReviewData = status;
  },
  setHasRemainEventData(state, status) {
    state.hasRemainEventData = status;
  },
  initReviews(state) {
    state.alreadyCallReviews = [];
    state.reviews = [];
  },
  initEvents(state) {
    state.alreadyCallEvents = [];
    state.events = [];
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
  getHasRemainReviewData(state) {
    return state.hasRemainReviewData;
  },
  getHasRemainEventData(state) {
    return state.hasRemainEventData;
  },
};

const actions = {
  async syncRestaurants({ commit, state }, params) {
    if (state.alreadyCallRestaurants.includes(params.id)) {
      return;
    }
    state.alreadyCallRestaurants.push(params.id);
    api.default.deleteHeadersAuthorization();
    const { data } = await api.getRestaurants(params);
    commit("setHasRemainRestaurantData", !data.data.last);
    commit("setRestaurants", data.data.content);
  },
  async syncRestaurantsByKeywords({ commit, state }, params) {
    if (state.alreadyCallRestaurants.includes(params.id)) {
      return;
    }

    state.alreadyCallRestaurants.push(params.id);
    const { data } = await api.getRestaurantSearch(params);
    commit("setHasRemainRestaurantData", !data.data.last);
    commit("setRestaurants", data.data.content);
  },
  async syncRestaurantBasicInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantBasicInfo(restaurantId);
    commit("setRestaurantsBasicInfo", data.data);
  },
  async syncRestaurantDetailInfo({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantDetailInfo(restaurantId);
    commit("setRestaurantDetailInfo", data.data);
  },
  async syncRestaurantMenus({ commit }, restaurantId) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantMenus(restaurantId);
    commit("setRestaurantMenus", data.data);
  },
  async syncRestaurantReviews({ commit, state }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }

    if (state.alreadyCallReviews.includes(payload.lastId)) {
      return;
    }
    state.alreadyCallReviews.push(payload.lastId);
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantReviews(payload);
    commit("setRestaurantReviews", data.data.content);
    commit("setHasRemainReviewData", !data.data.last);
  },
  async syncRestaurantEvents({ commit, state }, payload) {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    if (state.alreadyCallEvents.includes(payload.page)) {
      return;
    }
    state.alreadyCallEvents.push(payload.page);
    api.default.setHeadersAuthorization(token);
    const { data } = await api.getRestaurantEvents(payload);
    commit("setRestaurantEvents", data.data.content);
    commit("setHasRemainEventData", !data.data.last);
  },
  initRestaurants({ commit }) {
    commit("initRestaurants");
  },
  initReviews({ commit }) {
    commit("initReviews");
  },
  initEvents({ commit }) {
    commit("initEvents");
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
