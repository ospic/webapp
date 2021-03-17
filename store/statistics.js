const state = () => ({
  showLoader: Boolean,
  statistics: []
});

const mutations = {


  //End patient admission
  ["STATISTICS"](state) {
    state.showLoader = true;
  },
  ["STATISTICS_FAILED"](state) {
    state.showLoader = false;
  },
  ["STATISTICS_ERROR"](state) {
    state.showLoader = false;
  },
  ["STATISTICS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.statistics = payload;
  },
}
const actions = {

  async retrieve_statistics({ commit }) {
    commit("STATISTICS");
    await this.$api.$get('statistics/')
      .then(response => {
        commit("STATISTICS_SUCCESS", response);
      }).catch(error => {
        commit("STATISTICS_ERROR");
        console.log(error);

      });

  }
}
const getters = {
  statistics: function (state) {
    return state.statistics;
  },
  patienttrends: function (state) {
    return state.statistics.patientTrends;
  },
  servicestatistics: function (state) {
    return state.statistics.serviceStatistics;
  },
  wardstatistics: function (state) {
    return state.statistics.wardStatistics;
  },
  patientStatistics: function (state) {
    return state.statistics.patientStatistics;
  },
  userStatistics: function (state) {
    return state.statistics.userStatistics;
  },
  serviceTrends: function (state) {
    return state.statistics.serviceTrends;
  },
  staffStatistics: function (state) {
    return state.statistics.staffStatistics;
  }


}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}