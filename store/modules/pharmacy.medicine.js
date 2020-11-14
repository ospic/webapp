import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  medicine: {},
  medicines: []
});

const mutations = {

  [mutation.GET_MEDICINE_PRODUCTS](state) {
    state.showLoader = true;
  },
  [mutation.GET_MEDICINE_PRODUCTS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_PRODUCTS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_PRODUCTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicines = payload;

  },

}
const actions = {

  async getmedicines({ commit }) {
    commit(mutation.GET_MEDICINE_PRODUCTS);
    await this.$api.$get(`pharmacy/medicines/`)
      .then(response => {
        commit(mutation.GET_MEDICINE_PRODUCTS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_MEDICINE_PRODUCTS_ERROR);
        console.log(error);

      });

  }

}
const getters = {
  medicines: function (state, getters) {
    return state.medicines.reverse();
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}