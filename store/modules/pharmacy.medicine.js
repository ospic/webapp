import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  medicine: {},
  medicines: []
});

const mutations = {

  [mutation.FETCH_MEDICINE](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_MEDICINE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_SUCCESS](state, payload) {
    state.showLoader = false;
    this.medicines = payload;

  },

}
const actions = {

  async getmedicines({ commit }) {
    commit(mutation.FETCH_MEDICINE);
    await this.$api.$get(`pharmacy/medicine/`)
      .then(response => {
        console.log(response);
        commit(mutation.FETCH_MEDICINE_SUCCESS, response);

      }).catch(error => {
        commit(mutation.FETCH_MEDICINE_ERROR);
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