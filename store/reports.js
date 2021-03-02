
const state = () => ({
  showLoader: Boolean,
  report: {},
  reports: []
});

const mutations = {

  ["GET_REPORTS"](state) {
    state.showLoader = true;
  },
  ["GET_REPORTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_REPORTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_REPORTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.reports = payload;
  },

}
const actions = {

  async get_reports({ commit }) {
    commit("GET_REPORTS");
    await this.$api.$get('reports/')
      .then(response => {
        commit("GET_REPORTS_SUCCESS", response);

      }).catch(error => {
        commit("GET_REPORTS_ERROR");
        console.log(error);

      });

  }

}
const getters = {
  reports: function (state) {
    return state.reports
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}