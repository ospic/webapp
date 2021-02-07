const state = () => ({
  showLoader: Boolean
});

const mutations = {
  //CREATE MEDICAL SERVICE
  ["INITIATE_TRANSACTION"](state) {
    state.showLoader = true;
  },
  ["INITIATE_TRANSACTION_FAILED"](state) {
    state.showLoader = false;
  },
  ["INITIATE_TRANSACTION_ERROR"](state) {
    state.showLoader = false;
  },
  ["INITIATE_TRANSACTION_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

}

const actions = {

  async initiate_medical_transaction({ commit }, payload) {
    commit("INITIATE_TRANSACTION");
    await this.$api.$post('transactions/', payload)
      .then(response => {
        commit("INITIATE_TRANSACTION_SUCCESS", response);
      }).catch(error => {
        commit("INITIATE_TRANSACTION_ERROR");
        console.log(error);

      });

  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
