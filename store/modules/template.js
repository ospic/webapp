import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  physician: {},
  physicians: []
});

const mutations = {

  [mutation.GET_PATIENT_CREATION_TEMPLATE](state) {
    state.showLoader = true;
  },
  [mutation.GET_PATIENT_CREATION_TEMPLATE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENT_CREATION_TEMPLATE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENT_CREATION_TEMPLATE_SUCCESS](state, payload) {
    state.showLoader = false;
    state.physicians = payload.physicianOptions;

  },

}
const actions = {
  async retrievephysicians({ commit }) {
    commit(mutation.GET_PATIENT_CREATION_TEMPLATE);
    await this.$api.$get(`patients/?command=template`)
      .then(response => {
        commit(mutation.GET_PATIENT_CREATION_TEMPLATE_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_PATIENT_CREATION_TEMPLATE_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  physicians: function (state) {
    return state.physicians.reverse();
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}