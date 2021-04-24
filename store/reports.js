
const state = () => ({
  showLoader: Boolean,
  report: {},
  reports: [],
  financialreports: []
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

  //Get financial reports
  ["GET_FINANCIAL_REPORTS"](state) {
    state.showLoader = true;
  },
  ["GET_FINANCIAL_REPORTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_FINANCIAL_REPORTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_FINANCIAL_REPORTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.financialreports = payload;
  },

  ["UPLOAD_REPORT"](state) {
    state.showLoader = true;
  },
  ["UPLOAD_REPORT_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPLOAD_REPORT_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPLOAD_REPORT_SUCCESS"](state, payload) {
    state.showLoader = false;
    console.log(payload)
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
  },
  async uploadreport({ commit }, payload) {
    commit("UPLOAD_REPORT");
    await this.$api.$post('reports/', payload)
      .then(response => {
        commit("UPLOAD_REPORT_SUCCESS", response);

      }).catch(error => {
        commit("UPLOAD_REPORT_ERROR");
        console.log(error);

      });
  },
  async get_financial_reports({ commit }) {
    commit("GET_FINANCIAL_REPORTS");
    await this.$api.$get('reports/2')
      .then(response => {
        commit("GET_FINANCIAL_REPORTS_SUCCESS", response);

      }).catch(error => {
        commit("GET_FINANCIAL_REPORTS_ERROR");
        console.log(error);

      });
  },

}
const getters = {
  reports: function (state) {
    return state.reports
  },
  financialreports: function (state) {
    return state.financialreports;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}