import Vuex from "vuex";
import Modal from "./models/modal";
import User from "./models/user";
export default new Vuex.Store({
  modules: { Modal, User },
  state: {
    isGlobalLoading: false,
  },
  mutations: {
    setIsGlobalLoading(state, status) {
      state.isGlobalLoading = status;
    },
  },
  getters: {
    getIsGlobalLoading(state) {
      return state.isGlobalLoading;
    },
  },
});
