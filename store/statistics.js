import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  statistics: []
});

const mutations = {


  //End patient admission
  [mutation.STATISTICS](state) {
    state.showLoader = true;
  },
  [mutation.STATISTICS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.STATISTICS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.STATISTICS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.statistics = payload;
  },
}
const actions = {

  async retrieve_statistics({ commit }) {
    commit(mutation.STATISTICS);
    await this.$api.$get('statistics/')
      .then(response => {
        commit(mutation.STATISTICS_SUCCESS, response);
      }).catch(error => {
        commit(mutation.STATISTICS_ERROR);
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