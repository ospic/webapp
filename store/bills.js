const state = () => ({
  showLoader: Boolean,
  bills: []
});

const mutations = {
  /**Fetch bills */

  ["GET_BILLS"](state) {
    state.showLoader = true;
  },
  ["GET_BILLS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_BILLS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_BILLS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.bills = payload;
  },

}

const actions = {

  async get_bills({ commit }) {
    commit("GET_BILLS");
    await this.$api.$get('bills/')
      .then(response => {
        commit("GET_BILLS_SUCCESS", response);
      }).catch(error => {
        commit("GET_BILLS_ERROR");
        console.log(error);

      });
  }
}
const getters = {
  bills: function (state) {
    return state.bills;
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
