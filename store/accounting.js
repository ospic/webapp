const state = () => ({
  showLoader: Boolean,
  billsperday: [],
  transactionsperday: [],
  billsummation: {},
  transactionsummation: {}
});

const mutations = {
  /**Fetch bills */

  ["BILLS_PER_DAY"](state) {
    state.showLoader = true;
  },
  ["BILLS_PER_DAY_FAILED"](state) {
    state.showLoader = false;
  },
  ["BILLS_PER_DAY_ERROR"](state) {
    state.showLoader = false;
    state.billsperday = [];
  },
  ["BILLS_PER_DAY_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.billsperday = payload;
  },

  ["BILLS_SUMMATION"](state) {
    state.showLoader = true;
  },
  ["BILLS_SUMMATION_FAILED"](state) {
    state.showLoader = false;
  },
  ["BILLS_SUMMATION_ERROR"](state) {
    state.showLoader = false;
  },
  ["BILLS_SUMMATION_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.billsummation = payload;
  },

  ["TRANSACTIONS_PER_DAY"](state) {
    state.showLoader = true;
  },
  ["TRANSACTIONS_PER_DAY_FAILED"](state) {
    state.showLoader = false;
  },
  ["TRANSACTIONS_PER_DAY_ERROR"](state) {
    state.showLoader = false;
    state.billsperday = [];
  },
  ["TRANSACTIONS_PER_DAY_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.transactionsperday = payload;
  },

  ["TRANSACTIONS_SUMMATIONS"](state) {
    state.showLoader = true;
  },
  ["TRANSACTIONS_SUMMATIONS_FAILED"](state) {
    state.showLoader = false;
  },
  ["TRANSACTIONS_SUMMATIONS_ERROR"](state) {
    state.showLoader = false;
    state.billsperday = [];
  },
  ["TRANSACTIONS_SUMMATIONS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.transactionsummation = payload;
  },
}

const actions = {

  async get_bills_perday({ commit }) {
    commit("BILLS_PER_DAY");
    await this.$api.$get('accounting/statistics/?type=billsperday')
      .then(response => {
        commit("BILLS_PER_DAY_SUCCESS", response);
      }).catch(error => {
        commit("BILLS_PER_DAY_ERROR");
        console.log(error);

      });
  },
  async get_bills_summation({ commit }) {
    commit("BILLS_SUMMATION");
    await this.$api.$get('accounting/statistics/?type=billsummation')
      .then(response => {
        commit("BILLS_SUMMATION_SUCCESS", response);
      }).catch(error => {
        commit("BILLS_SUMMATION_ERROR");
        console.log(error);

      });
  },
  async get_transactions_perday({ commit }) {
    commit("TRANSACTIONS_PER_DAY");
    await this.$api.$get('accounting/statistics/?type=transactionsperday')
      .then(response => {
        commit("TRANSACTIONS_PER_DAY_SUCCESS", response);
      }).catch(error => {
        commit("TRANSACTIONS_PER_DAY_ERROR");
        console.log(error);

      });
  },
  async get_transactions_summations({ commit }) {
    commit("TRANSACTIONS_SUMMATIONS");
    await this.$api.$get('accounting/statistics/?type=transactionsummation')
      .then(response => {
        commit("TRANSACTIONS_SUMMATIONS_SUCCESS", response);
      }).catch(error => {
        commit("TRANSACTIONS_SUMMATIONS_ERROR");
        console.log(error);

      });
  },

}
const getters = {
  transactionsperday: function (state) {
    return state.transactionsperday;
  },
  billsperday: function (state) {
    return state.billsperday;
  },
  billsummation: function (state) {
    return state.billsummation;
  },
  transactionsummation: function (state) {
    return state.transactionsummation;
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
