import Vuex from "vuex";
import Modal from "./modal";
export default new Vuex.Store({
  modules: { Modal },
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
