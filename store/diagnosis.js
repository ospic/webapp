import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  diagnosis: {},
  diagnoses: []
});

const mutations = {
  [mutation.ADD_NEW_DIAGNOSIS](state) {
    state.showLoader = true;
  },
  [mutation.ADD_NEW_DIAGNOSIS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.ADD_NEW_DIAGNOSIS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.ADD_NEW_DIAGNOSIS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.diagnosis = payload;

  },
}

const actions = {
  async create_new_diagnosis({ commit }, id, payload) {
    commit(mutation.ADD_NEW_DIAGNOSIS);
    await this.$api.$post(`diagnoses/${id}`, payload)
      .then(response => {
        commit(mutation.ADD_NEW_DIAGNOSIS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.ADD_NEW_DIAGNOSIS_ERROR);
        console.log(error);

      });

  },
}

const getters = {

}
export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}