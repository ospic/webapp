import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  physician: {},
  physicians: [],
  template: {},
  medicine_template: []
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
  [mutation.MEDICINE_TEMPLATE](state) {
    state.showLoader = true;
  },
  [mutation.MEDICINE_TEMPLATE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.MEDICINE_TEMPLATE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.MEDICINE_TEMPLATE_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicine_template = payload;
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

  },
  async retrieve_medicine_template({ commit }) {
    commit(mutation.MEDICINE_TEMPLATE);
    await this.$api.$get(`pharmacy/medicines/template/`)
      .then(response => {
        commit(mutation.MEDICINE_TEMPLATE_SUCCESS, response);
      }).catch(error => {
        commit(mutation.MEDICINE_TEMPLATE_FAILED);
        console.log(error);

      });

  }
}
const getters = {
  physicians: function (state) {
    return state.physicians;
  },
  medicine_templates: function (state) {
    return state.medicine_template;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}