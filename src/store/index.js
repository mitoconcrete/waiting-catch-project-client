import Vuex from "vuex";
import Modal from "./models/modal";
import User from "./models/user";
import Restaurant from "./models/restaurant";
import Coupon from "./models/coupon";
export default new Vuex.Store({
  modules: { Modal, User, Restaurant, Coupon },
  state: {
    isGlobalLoading: false,
  },
  mutations: {
    setIsGlobalLoading(state, status) {
      console.log(status);
      state.isGlobalLoading = status;
    },
  },
  getters: {
    getIsGlobalLoading(state) {
      return state.isGlobalLoading;
    },
  },
});
